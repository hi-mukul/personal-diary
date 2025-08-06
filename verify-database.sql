-- Verification script to check if diary_entries table exists
-- Run this in Supabase SQL Editor to verify your setup

-- 1. Check if table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'diary_entries'
) AS table_exists;

-- 2. Check table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'diary_entries'
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'diary_entries';

-- 4. Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'diary_entries'
AND schemaname = 'public';

-- 5. Test basic functionality (optional - only run if you want to test)
-- INSERT INTO diary_entries (user_id, title, content, tags) 
-- VALUES (auth.uid(), 'Test Entry', 'This is a test entry', ARRAY['test']);

-- SELECT COUNT(*) as entry_count FROM diary_entries;

-- Clean up test data (uncomment if you ran the test insert)
-- DELETE FROM diary_entries WHERE title = 'Test Entry';
