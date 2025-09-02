import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Use placeholder values during build if environment variables are not set or are placeholders
const isValidUrl = (url) => {
  try {
    new URL(url)
    return !url.includes('your-project-id') && !url.includes('your_supabase_project_url')
  } catch {
    return false
  }
}

const isValidKey = (key) => {
  return key && !key.includes('your_supabase_anon_key')
}

// Use fallback values for build time if real values aren't provided
const finalUrl = (supabaseUrl && isValidUrl(supabaseUrl))
  ? supabaseUrl
  : 'https://placeholder.supabase.co'

const finalKey = (supabaseAnonKey && isValidKey(supabaseAnonKey))
  ? supabaseAnonKey
  : 'placeholder-key'

// Only throw error at runtime if we're actually trying to use Supabase
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey || !isValidUrl(supabaseUrl) || !isValidKey(supabaseAnonKey))) {
  console.error(
    'Missing or invalid Supabase environment variables. Please check your .env.local file and ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set with valid values.'
  )
  // Show a user-friendly error in the UI instead of throwing
  if (typeof document !== 'undefined') {
    const errorMessage = document.createElement('div')
    errorMessage.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#ef4444;color:white;padding:1rem;text-align:center;z-index:9999;'
    errorMessage.innerHTML = '⚠️ Database connection not configured. Please check the setup guide.'
    document.body.appendChild(errorMessage)
  }
}

export const supabase = createClient(finalUrl, finalKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})