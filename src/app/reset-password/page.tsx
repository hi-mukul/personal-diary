'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
// import { useAuth } from '../contexts/AuthContext' // Not needed for direct Supabase calls
import { supabase } from '../lib/supabaseClient'
import { FiLock, FiEye, FiEyeOff, FiCheck, FiBookOpen } from 'react-icons/fi'
import { Button } from '../components/ui/moving-border'
import FloatingParticles from '../components/ui/FloatingParticles'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)
  const [sessionReady, setSessionReady] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    // Listen for PASSWORD_RECOVERY event (primary method)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session ? 'Session exists' : 'No session')

      if (event === 'PASSWORD_RECOVERY') {
        console.log('PASSWORD_RECOVERY event detected - user can now reset password')
        setSessionReady(true)
        setError('')
      } else if (event === 'SIGNED_IN' && session) {
        console.log('User signed in - checking if this is a password recovery session')
        setSessionReady(true)
        setError('')
      }
    })

    // Also check for existing session on page load
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Error getting session:', error)
          setError('Unable to verify reset link. Please try again.')
          return
        }

        if (session) {
          console.log('Existing session found')
          setSessionReady(true)
          setError('')
        } else {
          console.log('No existing session - waiting for PASSWORD_RECOVERY event')
          // Don't set error immediately - wait for the auth state change event
          setTimeout(() => {
            // Only show error if still no session after 3 seconds
            supabase.auth.getSession().then(({ data: { session } }) => {
              if (!session) {
                setError('Invalid or expired reset link. Please request a new password reset.')
              }
            })
          }, 3000)
        }
      } catch (error) {
        console.error('Error checking session:', error)
        setError('Unable to verify reset link. Please try again.')
      }
    }

    checkSession()

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    // Check if component is mounted and session is ready
    if (!mounted || !sessionReady) {
      setError('Please wait for the page to load completely and try again.')
      return
    }

    // Validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    // Additional password strength validation
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number.')
      return
    }

    setLoading(true)

    try {
      // Verify we have a valid session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (sessionError) {
        throw new Error('Unable to verify session: ' + sessionError.message)
      }

      if (!session) {
        setError('Your session has expired. Please request a new password reset link.')
        setLoading(false)
        return
      }

      console.log('Updating password for user:', session.user.email)

      // Update password using Supabase directly (most reliable method)
      const { data, error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        throw error
      }

      if (data.user) {
        console.log('Password updated successfully for user:', data.user.email)
        setSuccess(true)

        // Sign out the user to ensure they use the new password
        await supabase.auth.signOut()

        // Redirect to sign-in page after 3 seconds
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } else {
        throw new Error('Password update failed - no user data returned')
      }

    } catch (error: any) {
      console.error('Password update error:', error)

      // Handle specific error cases
      if (error.message?.includes('Failed to fetch') || error.name === 'AuthRetryableFetchError') {
        setError('Unable to connect to authentication service. Please check your internet connection and try again.')
      } else if (error.message?.includes('session') || error.message?.includes('Auth session missing')) {
        setError('Your session has expired. Please request a new password reset link.')
      } else if (error.message?.includes('Password should be')) {
        setError('Password does not meet security requirements. Please choose a stronger password.')
      } else if (error.message?.includes('Invalid')) {
        setError('Invalid request. Please try requesting a new password reset link.')
      } else {
        setError(error.message || 'Failed to update password. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div
        className="min-h-screen w-full relative overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: 'url(/background-image/back.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/40" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20 w-full max-w-md mx-4"
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 blur-xl -z-10" />

          <div className="text-center">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            >
              <FiCheck className="text-white" size={28} />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Password Updated!
            </h1>
            <p className="text-gray-300 text-base mb-6">
              Your password has been successfully updated. You'll be redirected to your diary in a moment.
            </p>
            <div className="w-8 h-8 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin mx-auto" />
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: 'url(/background-image/back.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/40" />

      {/* Floating particles effect */}
      <FloatingParticles count={15} className="from-purple-400/30 to-cyan-400/30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20 w-full max-w-md mx-4"
      >
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 blur-xl -z-10" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiBookOpen className="text-white" size={28} />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Set New Password
          </h1>
          <p className="text-purple-300 text-sm font-medium mb-3">
            DivineLog
          </p>
          <p className="text-gray-300 text-base">
            Create a new secure password for your diary account
          </p>
        </motion.div>

        {/* Session Loading Indicator */}
        {!sessionReady && !error && mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-4"
          >
            <div className="inline-flex items-center space-x-2 text-purple-300">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
              <span>Establishing secure session...</span>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
          >
            <div className="flex items-center space-x-2 text-red-300">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
            <div className="mt-3 text-red-200 text-sm">
              <p>To reset your password:</p>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Go to the sign-in page</li>
                <li>Click "Forgot Password?"</li>
                <li>Enter your email address</li>
                <li>Check your email for a new reset link</li>
              </ol>
            </div>
            <div className="mt-4">
              <Button
                onClick={() => router.push('/')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl transition-all duration-300"
              >
                Go to Sign In Page
              </Button>
            </div>
          </motion.div>
        )}

        {/* Form - Only show if no error and session is ready or being established */}
        {!error && (
          <motion.form
            onSubmit={handleSubmit}
            className={`space-y-6 ${!sessionReady ? 'opacity-50 pointer-events-none' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* New Password Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10" size={20} />
                <motion.input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300 text-base hover:bg-white/10 hover:border-white/20"
                  placeholder="Enter your new password"
                  required
                  minLength={8}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </motion.button>
              </div>
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10" size={20} />
                <motion.input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300 text-base hover:bg-white/10 hover:border-white/20"
                  placeholder="Confirm your new password"
                  required
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </motion.button>
              </div>
            </motion.div>

            {/* Password Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-4"
            >
              <h3 className="text-blue-300 font-semibold mb-2 text-sm">Password Requirements:</h3>
              <ul className="text-xs text-gray-300 space-y-1">
                <li className="flex items-center space-x-2">
                  <span className={password.length >= 8 ? 'text-green-400' : 'text-gray-400'}>•</span>
                  <span>At least 8 characters long</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className={/[A-Z]/.test(password) ? 'text-green-400' : 'text-gray-400'}>•</span>
                  <span>One uppercase letter</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className={/[a-z]/.test(password) ? 'text-green-400' : 'text-gray-400'}>•</span>
                  <span>One lowercase letter</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className={/\d/.test(password) ? 'text-green-400' : 'text-gray-400'}>•</span>
                  <span>One number</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className={password === confirmPassword && password.length > 0 ? 'text-green-400' : 'text-gray-400'}>•</span>
                  <span>Passwords match</span>
                </li>
              </ul>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl p-4"
              >
                <p className="text-red-400 text-sm text-center">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                type="submit"
                disabled={loading}
                containerClassName="w-full h-14"
                borderClassName="bg-[radial-gradient(#8b5cf6_40%,transparent_60%)]"
                className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-xl border-white/10 text-white font-semibold text-base hover:from-purple-500/90 hover:to-pink-500/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                borderRadius="1rem"
                duration={3000}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Updating password...</span>
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    <FiLock size={18} />
                    Update Password
                  </span>
                )}
              </Button>
            </motion.div>
          </motion.form>
        )}
      </motion.div>
    </div>
  )
}
