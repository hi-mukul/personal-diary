'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import { FiMail, FiLock, FiEye, FiEyeOff, FiBookOpen } from 'react-icons/fi'
import { FaGoogle } from 'react-icons/fa'
import { Button } from '../ui/moving-border'
import FloatingParticles from '../ui/FloatingParticles'

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [googleLoading, setGoogleLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const { signIn, signUp, signInWithGoogle } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignUp) {
        await signUp(email, password)
      } else {
        await signIn(email, password)
      }
    } catch (error: any) {
      console.error(error)
      if (error.message === 'USER_EXISTS') {
        setError('This email is already registered. Please sign in instead or use a different email.')
        // Auto-switch to sign in mode after a delay
        setTimeout(() => {
          setIsSignUp(false)
          setError('')
        }, 3000)
      } else {
        // Error message is already user-friendly from AuthContext
        setError(error.message || 'An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    try {
      await signInWithGoogle()
    } catch (error: any) {
      console.error(error)
      // Error message is already user-friendly from AuthContext
      if (error.message) {
        setError(error.message)
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div
      className="h-screen w-full relative overflow-hidden"
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
      <FloatingParticles count={25} className="from-purple-400/30 to-cyan-400/30" />

      {/* Content Container */}
      <div className="relative z-10 h-screen flex flex-col lg:flex-row">
        {/* Left Side - Welcome Text */}
        <motion.div
          className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-8 lg:py-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* App Name */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <FiBookOpen className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-3xl font-bold tracking-tight">DivineLog</span>
              <span className="text-purple-300 text-sm font-medium">Your Sacred Digital Journal</span>
            </div>
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-lg"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              BEGIN YOUR{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                DIVINE
              </span>{' '}
              JOURNEY
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light max-w-lg">
              Create a sacred digital sanctuary for your thoughts, dreams, and reflections.
              DivineLog transforms your personal journey into a beautiful, secure diary experience.
            </p>

            {/* Minimal Features */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                <span className="text-base font-medium">Sacred & Secure</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full shadow-lg shadow-pink-400/50"></div>
                <span className="text-base font-medium">Beautiful & Intuitive</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
                <span className="text-base font-medium">Always Accessible</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          className="w-full lg:w-1/2 xl:w-2/5 flex flex-col justify-center px-6 sm:px-8 lg:px-8 py-8 lg:py-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Form Card */}
          <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl p-5 sm:p-6 border border-white/10 shadow-2xl shadow-black/20 mx-auto w-full max-w-md">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 blur-xl -z-10" />
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mb-4"
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg shadow-purple-500/25"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiBookOpen className="text-white" size={18} />
              </motion.div>
              <h2 className="text-lg lg:text-xl font-bold text-white mb-0.5">
                {isSignUp ? 'Start Your Journey' : 'Welcome Back'}
              </h2>
              <p className="text-purple-300 text-xs font-medium mb-0.5">
                DivineLog
              </p>
              <p className="text-gray-300 text-xs leading-relaxed">
                {isSignUp
                  ? 'Create your personal sanctuary'
                  : 'Continue your journey'
                }
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative group">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10" size={14} />
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300 text-sm hover:bg-white/10 hover:border-white/20"
                    placeholder="your.email@example.com"
                    required
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative group">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10" size={14} />
                  <motion.input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300 text-sm hover:bg-white/10 hover:border-white/20"
                    placeholder="Enter your secure password"
                    required
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </motion.button>
                </div>
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

              {/* Forgot Password Link */}
              {!isSignUp && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="text-center"
                >
                  <button
                    type="button"
                    onClick={() => router.push('/forgot-password')}
                    className="text-purple-400 hover:text-purple-300 text-sm transition-colors duration-200 hover:underline"
                  >
                    Forgot your password?
                  </button>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="pt-1"
              >
                <Button
                  type="submit"
                  disabled={loading || googleLoading}
                  containerClassName="w-full h-10"
                  borderClassName="bg-[radial-gradient(#8b5cf6_40%,transparent_60%)]"
                  className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-xl border-white/10 text-white font-semibold text-sm hover:from-purple-500/90 hover:to-pink-500/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  borderRadius="0.5rem"
                  duration={3000}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating your sanctuary...</span>
                    </div>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FiBookOpen size={18} />
                      {isSignUp ? 'Begin Your Journey' : 'Continue Writing'}
                    </span>
                  )}
                </Button>
              </motion.div>

              {/* Divider */}
              <motion.div
                className="relative py-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white/5 backdrop-blur-xl text-gray-400 text-xs rounded-full border border-white/10">
                    Or continue with
                  </span>
                </div>
              </motion.div>

              {/* Google Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 }}
              >
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading || googleLoading}
                  containerClassName="w-full h-10"
                  borderClassName="bg-[radial-gradient(#ef4444_40%,transparent_60%)]"
                  className="bg-white/5 backdrop-blur-xl border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  borderRadius="0.5rem"
                  duration={4000}
                >
                  <div className="flex items-center justify-center gap-3">
                    <FaGoogle className="text-white" size={18} />
                    <span>
                      {googleLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Connecting...
                        </div>
                      ) : (
                        'Continue with Google'
                      )}
                    </span>
                  </div>
                </Button>
              </motion.div>
            </motion.form>

            {/* Footer */}
            <motion.div
              className="mt-3 text-center space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              <p className="text-gray-400 text-xs">
                By {isSignUp ? 'creating an account' : 'signing in'} you agree to our{' '}
                <a
                  href="/terms"
                  className="text-purple-400 hover:text-purple-300 hover:underline cursor-pointer transition-colors"
                >
                  Terms
                </a>{' '}
                and{' '}
                <a
                  href="/privacy"
                  className="text-purple-400 hover:text-purple-300 hover:underline cursor-pointer transition-colors"
                >
                  Privacy Policy
                </a>
              </p>

              <div className="bg-white/5 backdrop-blur-xl rounded-lg p-2.5 border border-white/10">
                <motion.button
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setError('')
                    setEmail('')
                    setPassword('')
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-xs"
                >
                  {isSignUp
                    ? "Already have an account? Welcome back!"
                    : "New to DivineLog? Start your journey!"
                  }
                </motion.button>
              </div>

              <p className="text-gray-500 text-xs">
                Your thoughts are safe with us 🔒
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}