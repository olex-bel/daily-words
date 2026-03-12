
CREATE OR REPLACE FUNCTION prepare_daily_entries(target_limit INT, v_timezone text DEFAULT 'UTC')
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  current_user_id uuid := auth.uid();
  words_count INT;
  needed_count INT;
  last_login date;
  v_today date;
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated' 
        USING ERRCODE = '42501',
              HINT = 'Check if your Supabase client has a valid session.';
  END IF;

  v_today := (CURRENT_TIMESTAMP AT TIME ZONE v_timezone)::date;

  IF target_limit > 10 OR target_limit < 3 THEN
    RAISE 'target_limit values are outside the range --> %', target_limit
      USING HINT = 'Please pass the value between 3 and 10';
  END IF;

  INSERT INTO public.daily_sessions (user_id, session_date)
  VALUES (current_user_id, v_today)
  ON CONFLICT DO NOTHING;

  IF NOT FOUND THEN
    RETURN;
  END IF;

  SELECT count(*) INTO words_count FROM public.user_entries
  WHERE user_id = current_user_id AND due_at <= v_today;

  needed_count = GREATEST(0, target_limit - words_count);

  IF needed_count > 0 THEN
    INSERT INTO public.user_entries (user_id, entry_id, due_at)
        SELECT current_user_id, e.id, v_today
        FROM public.entries e
        WHERE NOT EXISTS (
            SELECT 1 FROM public.user_entries ue 
            WHERE ue.entry_id = e.id AND ue.user_id = current_user_id
        )
        ORDER BY e.id
        LIMIT needed_count;
  END IF;

  WITH max_entries AS (
    SELECT entry_id FROM public.user_entries
    WHERE user_id = current_user_id AND due_at <= v_today
    ORDER BY due_at ASC, stage ASC
    LIMIT target_limit
  )
  UPDATE public.user_entries ue SET session_date = v_today
    FROM max_entries AS me
    WHERE ue.user_id = current_user_id AND ue.entry_id = me.entry_id;
END;
$$;


CREATE OR REPLACE FUNCTION get_daily_entries(target_limit INT)
RETURNS TABLE (
  id bigint,
  content text,
  type public.entry_type,
  meanings jsonb,
  grammar jsonb,
  rating public.content_rating,
  stage smallint,
  example text,
  audio_path text
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_timezone text;
  v_today date;
BEGIN 
  SELECT COALESCE(p.timezone, 'UTC') INTO v_timezone FROM public.profiles p
  WHERE p.user_id = auth.uid();

  PERFORM prepare_daily_entries(target_limit, v_timezone);

  v_today := (CURRENT_TIMESTAMP AT TIME ZONE v_timezone)::date;

  RETURN QUERY
    SELECT 
      e.id,
      e.content,
      e.type,
      t.meanings,
      e.grammar,
      e.rating,
      ue.stage,
      ex.text AS example,
      e.audio_path
    FROM public.user_entries ue
      JOIN public.entries e ON ue.entry_id = e.id
      JOIN public.translations t ON e.id = t.entry_id
      LEFT JOIN LATERAL (
          SELECT sub.text
          FROM (
              SELECT text, 
                    (row_number() OVER (ORDER BY exm.id) - 1) as row_idx,
                    count(*) OVER () as total_count
              FROM public.examples exm
              WHERE entry_id = e.id
          ) sub
          WHERE sub.total_count > 0 AND sub.row_idx = (ue.review_count % sub.total_count)
          LIMIT 1
      ) ex ON true
    WHERE ue.user_id = auth.uid() 
          AND ue.session_date = v_today
          AND ue.due_at <= v_today
          AND e.published = true
    LIMIT target_limit;
END;
$$;


CREATE OR REPLACE FUNCTION get_difficult_entries()
RETURNS TABLE (
  id bigint,
  content text,
  type public.entry_type,
  meanings jsonb,
  grammar jsonb,
  rating public.content_rating,
  stage smallint,
  example text,
  audio_path text
)
LANGUAGE plpgsql
AS $$
BEGIN 
  RETURN QUERY
    SELECT 
      e.id,
      e.content,
      e.type,
      t.meanings,
      e.grammar,
      e.rating,
      ue.stage,
      ex.text AS example,
      e.audio_path
    FROM public.user_entries ue
      JOIN public.entries e ON ue.entry_id = e.id
      JOIN public.translations t ON e.id = t.entry_id AND t.language_code = 'uk'
      LEFT JOIN LATERAL (
          SELECT sub.text
          FROM (
              SELECT text, 
                    (row_number() OVER (ORDER BY exm.id) - 1) as row_idx,
                    count(*) OVER () as total_count
              FROM public.examples exm
              WHERE entry_id = e.id
          ) sub
          WHERE sub.row_idx = (ue.review_count % sub.total_count)
          LIMIT 1
      ) ex ON true
    WHERE ue.user_id = auth.uid() AND ue.stage < 3
    ORDER BY ue.created_at DESC
    LIMIT 10;
END;
$$;

CREATE OR REPLACE FUNCTION update_card_review(
  p_entry_id bigint,
  p_rating review_rating
) 
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  v_stage smallint;
  v_interval_days int;
  current_user_id uuid := auth.uid();
BEGIN
  SELECT stage INTO v_stage FROM public.user_entries
  WHERE entry_id = p_entry_id AND user_id = current_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Entry not found for user %', current_user_id;
  END IF;

  v_stage := CASE p_rating
    WHEN 'unknown' THEN GREATEST(v_stage - 2, 0)
    WHEN 'hard'    THEN GREATEST(v_stage - 1, 0)
    WHEN 'know' THEN
      CASE
        WHEN v_stage = 0 THEN 3
        WHEN v_stage < 4 THEN LEAST(v_stage + 3, 8)
        ELSE LEAST(v_stage + 1, 8)
      END
    ELSE v_stage
  END;

  v_interval_days := (
    ARRAY[1,2,4,7,14,30,90,180,365]
  )[LEAST(v_stage + 1, 9)];

  IF v_stage >= 5 THEN
    v_interval_days := round(v_interval_days * (0.9 + random() * 0.2))::int;
  END IF;

  UPDATE public.user_entries
    SET
      stage = v_stage,
      due_at = CURRENT_DATE + v_interval_days,
      review_count = review_count + 1
    WHERE entry_id = p_entry_id AND user_id = current_user_id;
END;
$$;

CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS TABLE (
    session_started boolean,
    total_system_words bigint,
    user_total_words bigint,
    mastered_words bigint,
    total_stages bigint,
    in_learning bigint,
    remaining_words bigint
) 
LANGUAGE plpgsql
AS $$
DECLARE
    current_user_id uuid := auth.uid();
    all_words_count bigint;
    v_timezone text;
    v_today date;
    v_session_started boolean;
    v_remaining_words bigint;
BEGIN
    SELECT count(*) INTO all_words_count FROM public.entries;
    SELECT coalesce(timezone, 'UTC') INTO v_timezone FROM public.profiles WHERE user_id = current_user_id;

    v_today := (CURRENT_TIMESTAMP AT TIME ZONE v_timezone)::date;

    SELECT EXISTS (
      SELECT 1 FROM public.daily_sessions ds
      WHERE ds.user_id = current_user_id AND ds.session_date = v_today
    ) INTO v_session_started;

    IF v_session_started THEN
      SELECT count(*) INTO v_remaining_words 
      FROM public.user_entries ue
      WHERE ue.user_id = current_user_id AND ue.session_date = v_today AND ue.due_at <= v_today;
    ELSE
      SELECT count(*) INTO v_remaining_words
      FROM public.user_entries
      WHERE user_id = current_user_id AND due_at <= v_today;
    END IF;

    RETURN QUERY
    SELECT
        v_session_started,
        all_words_count,
        count(*) as user_total_words,
        count(*) FILTER (WHERE stage >= 5) as mastered_words,
        coalesce(sum(stage), 0) as total_stages, 
        count(*) FILTER (WHERE stage < 5) as in_learning,
        v_remaining_words
    FROM public.user_entries
    WHERE user_id = current_user_id;
END;
$$;

CREATE OR REPLACE FUNCTION get_recent_entries(target_limit INT)
RETURNS TABLE (
  id bigint,
  content text,
  created_at date
)
LANGUAGE plpgsql
AS $$
BEGIN 
  IF target_limit > 3 OR target_limit < 1 THEN
    RAISE 'target_limit values are outside the range --> %', target_limit
      USING HINT = 'Please pass the value between 1 and 5';
  END IF;

  RETURN QUERY
    SELECT 
      ue.entry_id,
      e.content,
      ue.created_at
    FROM public.user_entries ue
    JOIN public.entries e ON ue.entry_id = e.id
    WHERE ue.user_id = auth.uid()
    ORDER BY ue.created_at desc
    LIMIT target_limit;
END;
$$;