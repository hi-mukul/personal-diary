# Troubleshooting Guide

## Common Issues and Solutions

### 1. Dashboard Not Found (404 Error)

**Problem**: After signing in, you get a 404 error for `/dashboard`

**Solution**: ✅ **FIXED** - The app now redirects to the home page (`/`) instead of a non-existent dashboard route.

### 2. Sign-up Success Message Not Appearing

**Problem**: When signing up, the "Check your email for confirmation!" message doesn't appear

**Solution**: ✅ **FIXED** - Updated the sign-up function to properly handle the response and show appropriate messages.

### 3. Email Verification Issues

**Problem**: Email verification emails are not formatted properly or not arriving

**Solutions**:
- ✅ **FIXED** - Added proper auth callback handling at `/auth/callback`
- Configure Supabase email settings (see README.md)
- Set up custom SMTP for better deliverability

### 4. Environment Variables

**Problem**: Supabase connection errors

**Solution**: 
- Ensure `.env.local` has valid Supabase URL and anon key
- URL format: `https://your-project-id.supabase.co`
- Get credentials from your Supabase project dashboard

### 5. Database Setup

**Problem**: Database errors when creating/fetching entries

**Solution**:
- Run the SQL commands provided in README.md to create the `diary_entries` table
- Ensure Row Level Security (RLS) policies are properly set up

### 6. Build Errors

**Problem**: Build fails with various errors

**Common Solutions**:
- Run `npm run lint` to check for code issues
- Ensure all environment variables are properly set
- Check that all imports are correct

### 7. Authentication Flow Issues

**Problem**: Users not being redirected properly after auth actions

**Solution**: ✅ **FIXED** - Updated AuthContext to handle redirects properly:
- Sign-in redirects to home page (`/`)
- Sign-out redirects to home page (`/`)
- Proper session handling

## Getting Help

If you encounter other issues:

1. Check the browser console for error messages
2. Check the terminal/console where the dev server is running
3. Verify your Supabase project settings
4. Ensure all dependencies are installed: `npm install`

## Development Commands

```bash
# Start development server
npm run dev

# Check for linting issues
npm run lint

# Build for production
npm run build

# Start production server
npm start
```
