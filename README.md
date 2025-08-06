# Diary App

A modern, personal diary application built with Next.js, React, and Supabase. Features include user authentication, real-time updates, search functionality, and a beautiful dark/light theme.

## Features

- 🔐 User authentication with Supabase
- 📝 Create, edit, and delete diary entries
- 🔍 Search through your entries
- 🏷️ Tag system for organizing entries
- 🌙 Dark/light theme toggle
- 📱 Responsive design
- ⚡ Real-time updates
- 🎨 Beautiful animations with Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account and project

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local` and update with your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Supabase Setup

You'll need to create the following table in your Supabase database:

```sql
-- Create diary_entries table
CREATE TABLE diary_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own entries" ON diary_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own entries" ON diary_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own entries" ON diary_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own entries" ON diary_entries
  FOR DELETE USING (auth.uid() = user_id);
```

### Email Configuration

To enable proper email verification:

1. **In your Supabase Dashboard**:
   - Go to Authentication > Settings
   - Set the Site URL to: `http://localhost:3000` (for development)
   - Add redirect URLs: `http://localhost:3000/auth/callback`
   - For production, use your actual domain

2. **Email Templates** (Optional):
   - Go to Authentication > Email Templates
   - Customize the "Confirm signup" template for better user experience
   - Use a clear subject like "Confirm your Diary App account"

3. **SMTP Settings** (Optional):
   - Configure custom SMTP in Authentication > Settings > SMTP Settings
   - This provides better email deliverability than the default Supabase emails

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript/JavaScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: Zustand
- **Animations**: Framer Motion
- **UI Components**: Custom components with Tailwind
- **Notifications**: React Hot Toast

## Project Structure

```
src/
├── app/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts (Auth, Theme)
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utility functions and services
│   ├── styles/         # Global styles
│   └── utils/          # Helper functions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
