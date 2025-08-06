-- Diary App Database Setup
-- Run these commands in your Supabase SQL Editor

-- 1. Create the diary_entries table
CREATE TABLE IF NOT EXISTS diary_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create an index for better performance
CREATE INDEX IF NOT EXISTS diary_entries_user_id_idx ON diary_entries(user_id);
CREATE INDEX IF NOT EXISTS diary_entries_created_at_idx ON diary_entries(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies
-- Policy for SELECT (users can view their own entries)
CREATE POLICY "Users can view their own entries" ON diary_entries
  FOR SELECT USING (auth.uid() = user_id);

-- Policy for INSERT (users can insert their own entries)
CREATE POLICY "Users can insert their own entries" ON diary_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for UPDATE (users can update their own entries)
CREATE POLICY "Users can update their own entries" ON diary_entries
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy for DELETE (users can delete their own entries)
CREATE POLICY "Users can delete their own entries" ON diary_entries
  FOR DELETE USING (auth.uid() = user_id);

-- 5. Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Create a trigger to automatically update updated_at
CREATE TRIGGER update_diary_entries_updated_at 
    BEFORE UPDATE ON diary_entries 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 7. Optional: Insert some sample data (remove this if you don't want sample data)
-- INSERT INTO diary_entries (user_id, title, content, tags) VALUES
-- (auth.uid(), 'Welcome to Your Diary', 'This is your first diary entry! Start writing about your day, thoughts, and experiences.', ARRAY['welcome', 'first-entry']);
