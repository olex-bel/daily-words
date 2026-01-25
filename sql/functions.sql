
CREATE OR REPLACE FUNCTION prepare_daily_words(target_limit INT)
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

  UPDATE public.user_entries SET last_session_at = CURRENT_DATE
  WHERE user_id = current_user_id AND due_at <= CURRENT_DATE;

  SELECT count(*) INTO words_count FROM public.user_entries
  WHERE user_id = current_user_id AND due_at <= CURRENT_DATE;

  needed_count = GREATEST(0, target_limit - words_count);

  IF needed_count > 0 THEN
    INSERT INTO public.user_entries (user_id, entry_id, due_at, last_session_at)
        SELECT current_user_id, e.id, CURRENT_DATE, CURRENT_DATE
        FROM public.entries e
        WHERE NOT EXISTS (
            SELECT 1 FROM public.user_entries ue 
            WHERE ue.entry_id = e.id AND ue.user_id = current_user_id
        )
        LIMIT needed_count;
  END IF;
END;
$$;


CREATE OR REPLACE FUNCTION get_daily_words(target_limit INT)
RETURNS TABLE (
  id bigint,
  content text,
  type public.entry_type,
  meanings jsonb,
  grammar jsonb,
  rating public.content_rating,
  stage smallint,
  example text
)
LANGUAGE plpgsql
AS $$
BEGIN 
  PERFORM prepare_daily_words(target_limit);

  RETURN QUERY
    SELECT 
      e.id,
      e.content,
      e.type,
      t.meanings,
      e.grammar,
      e.rating,
      ue.stage,
      ex.text AS example
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
    WHERE ue.user_id = auth.uid() AND ue.last_session_at = CURRENT_DATE;
END;
$$;