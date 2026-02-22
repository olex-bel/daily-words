
CREATE OR REPLACE FUNCTION prepare_daily_entries(target_limit INT)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
  current_user_id uuid := auth.uid();
  words_count INT;
  needed_count INT;
  last_login date;
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated' 
        USING ERRCODE = '42501',
              HINT = 'Check if your Supabase client has a valid session.';
  END IF;

  IF target_limit > 10 OR target_limit < 3 THEN
    RAISE 'target_limit values are outside the range --> %', target_limit
      USING HINT = 'Please pass the value between 3 and 10';
  END IF;

  SELECT last_seen_at INTO last_login FROM public.profiles
  WHERE user_id = current_user_id
  FOR UPDATE;

  IF last_login = CURRENT_DATE THEN
    RETURN;
  END IF;

  UPDATE public.profiles SET last_seen_at = CURRENT_DATE
  WHERE user_id = current_user_id;

  SELECT count(*) INTO words_count FROM public.user_entries
  WHERE user_id = current_user_id AND due_at <= CURRENT_DATE;

  needed_count = GREATEST(0, target_limit - words_count);

  IF needed_count > 0 THEN
    INSERT INTO public.user_entries (user_id, entry_id, due_at)
        SELECT current_user_id, e.id, CURRENT_DATE
        FROM public.entries e
        WHERE NOT EXISTS (
            SELECT 1 FROM public.user_entries ue 
            WHERE ue.entry_id = e.id AND ue.user_id = current_user_id
        )
        LIMIT needed_count;
  END IF;
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
BEGIN 
  PERFORM prepare_daily_entries(target_limit);

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
    WHERE ue.user_id = auth.uid() AND ue.due_at <= CURRENT_DATE;
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
RETURNS VOID AS $$
BEGIN
    UPDATE public.user_entries 
    SET 
        stage = CASE p_rating
            WHEN 'unknown' THEN 0
            WHEN 'hard'    THEN stage
            WHEN 'know'    THEN stage + 1
            ELSE stage
        END,
        
        due_at = CASE p_rating
            WHEN 'unknown' THEN CURRENT_DATE + INTERVAL '1 day'
            WHEN 'hard'    THEN CURRENT_DATE + INTERVAL '2 days'
            WHEN 'know'    THEN CURRENT_DATE + (LEAST(POWER(2, stage + 1)::INT, 365) || ' days')::INTERVAL
        END,

        review_count = review_count + 1
    WHERE entry_id = p_entry_id AND user_id = auth.uid();
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS TABLE (
    total_system_words bigint,
    user_total_words bigint,
    mastered_words bigint,
    total_stages bigint,
    in_learning bigint,
    daily_task_total bigint,
    new_today bigint
) 
LANGUAGE plpgsql
AS $$
DECLARE
    all_words_count bigint;
BEGIN
    SELECT count(*) INTO all_words_count FROM public.entries;

    RETURN QUERY
    SELECT
        all_words_count,
        count(*) as user_total_words,
        count(*) FILTER (WHERE stage >= 5) as mastered_words,
        sum(stage) as total_stages, 
        count(*) FILTER (WHERE stage > 0 AND stage < 5) as in_learning,
        count(*) FILTER (WHERE due_at <= CURRENT_DATE) as daily_task_total,
        count(*) FILTER (WHERE due_at <= CURRENT_DATE AND review_count = 0) as new_today
    FROM public.user_entries
    WHERE user_id = auth.uid();
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