import { NextResponse } from 'next/server'

// This route is no longer needed for Firebase Auth as it handles OAuth via popup
// Keeping it as a simple redirect for backwards compatibility
export async function GET(request) {
  const requestUrl = new URL(request.url)

  // Simply redirect to home page
  // Firebase Auth handles the OAuth flow client-side via popup
  return NextResponse.redirect(`${requestUrl.origin}/`)
}
