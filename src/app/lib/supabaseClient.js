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