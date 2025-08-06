# 🚀 Complete Setup Guide

## ❌ Current Issue: Database Table Missing

The error you're seeing indicates that the `diary_entries` table doesn't exist in your Supabase database. Here's how to fix it:

## 📋 Step-by-Step Database Setup

### 1. Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project: `ioxpnviobqmcfmcbxvbb`

### 2. Open SQL Editor
1. In your Supabase dashboard, click on **"SQL Editor"** in the left sidebar
2. Click **"New Query"**

### 3. Run Database Setup
1. Copy the entire contents of `database-setup.sql` file
2. Paste it into the SQL Editor
3. Click **"Run"** button

The script will create:
- ✅ `diary_entries` table with proper structure
- ✅ Row Level Security (RLS) policies
- ✅ Indexes for better performance
- ✅ Auto-update triggers

### 4. Verify Setup
After running the SQL:
1. Go to **"Table Editor"** in Supabase dashboard
2. You should see the `diary_entries` table listed
3. The table should have these columns:
   - `id` (UUID, Primary Key)
   - `user_id` (UUID, Foreign Key)
   - `title` (Text)
   - `content` (Text)
   - `tags` (Text Array)
   - `created_at` (Timestamp)
   - `updated_at` (Timestamp)

### 5. Configure Authentication Settings
1. Go to **"Authentication"** → **"Settings"** in Supabase
2. Set **Site URL** to: `http://localhost:3000`
3. Add **Redirect URLs**: `http://localhost:3000/auth/callback`
4. Save the settings

## 🔧 Alternative: Quick Setup via Supabase CLI

If you have Supabase CLI installed:

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref ioxpnviobqmcfmcbxvbb

# Run the migration
supabase db push
```

## ✅ Testing the Fix

1. **Refresh your browser** after setting up the database
2. **Sign up/Sign in** to your diary app
3. **Try creating a new entry** - it should work now!

## 🚨 If You Still See Errors

1. **Check browser console** for detailed error messages
2. **Verify RLS policies** are enabled in Supabase Table Editor
3. **Ensure your user is authenticated** before trying to access entries
4. **Check network tab** to see the exact API calls being made

## 📞 Need Help?

If you're still having issues:
1. Check the browser console for error details
2. Verify your Supabase project URL and API key in `.env.local`
3. Make sure you're signed in to the app
4. Try the database test utility: `src/app/utils/testDatabase.js`

## 🎉 Once Fixed

After the database is set up, you'll be able to:
- ✅ Create diary entries
- ✅ Edit and delete entries
- ✅ Search through your entries
- ✅ Use tags to organize entries
- ✅ Real-time updates across devices
