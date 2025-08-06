import { supabase } from '../lib/supabaseClient'

// Test database connection and table existence
export async function testDatabaseConnection() {
  try {
    console.log('Testing Supabase connection...')

    // Test basic connection
    const { data: { user } } = await supabase.auth.getUser()
    console.log('Auth connection:', user ? 'Connected' : 'Not authenticated')

    // Test if diary_entries table exists
    const { error } = await supabase
      .from('diary_entries')
      .select('count', { count: 'exact', head: true })

    if (error) {
      console.error('Database error:', error)
      console.error('Error details:', {
        code: error?.code,
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
        status: error?.status
      })

      if (error.code === 'PGRST116' || error.message?.includes('404')) {
        console.error('❌ Table "diary_entries" does not exist!')
        console.log('📝 Please run the SQL commands from database-setup.sql in your Supabase SQL Editor')
        return false
      }

      // Check for network/connection issues
      if (error.message?.includes('fetch') || error.message?.includes('network')) {
        console.error('❌ Network connection issue!')
        console.log('📝 Check your internet connection and Supabase URL')
        return false
      }

      return false
    } else {
      console.log('✅ Database connection successful!')
      console.log('✅ Table "diary_entries" exists!')
      return true
    }
  } catch (error) {
    console.error('Connection test failed:', error)
    console.error('Error type:', typeof error)
    console.error('Error constructor:', error?.constructor?.name)
    return false
  }
}

// Check if user is authenticated and database is ready
export async function checkAppReadiness() {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    console.log('ℹ️ User not authenticated')
    return { authenticated: false, databaseReady: false }
  }

  const databaseReady = await testDatabaseConnection()

  return {
    authenticated: true,
    databaseReady,
    user
  }
}
