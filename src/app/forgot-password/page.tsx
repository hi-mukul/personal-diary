'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi'
import { Button } from '../components/ui/moving-border'
import FloatingParticles from '../components/ui/FloatingParticles'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [step, setStep] = useState<'email' | 'sent'>('email')
  const [error, setError] = useState<string>('')
  const { resetPassword } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await resetPassword(email)
      setStep('sent')
    } catch (error: any) {
      console.error(error)
      setError(error.message || 'Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToSignIn = () => {
    router.push('/')
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
      <FloatingParticles count={20} className="from-purple-400/20 to-cyan-400/20" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-10 bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20 w-full max-w-md mx-4"
      >
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 blur-xl -z-10" />

        {step === 'email' ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/25"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiMail className="text-white" size={28} />
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Reset Password
              </h1>
              <p className="text-purple-300 text-sm font-medium mb-3">
                DivineLog
              </p>
              <p className="text-gray-300 text-base">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10" size={20} />
                  <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 focus:bg-white/10 transition-all duration-300 text-base hover:bg-white/10 hover:border-white/20"
                    placeholder="your.email@example.com"
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
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

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
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
                      <span>Sending reset link...</span>
                    </div>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FiMail size={18} />
                      Send Reset Link
                    </span>
                  )}
                </Button>
              </motion.div>

              {/* Back to Login */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <button
                  type="button"
                  onClick={handleBackToSignIn}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 mx-auto"
                >
                  <FiArrowLeft size={16} />
                  Back to Sign In
                </button>
              </motion.div>
            </motion.form>
          </>
        ) : (
          <>
            {/* Success State */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              >
                <FiCheck className="text-white" size={28} />
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Check Your Email
              </h1>
              <p className="text-gray-300 text-base mb-8">
                We've sent a password reset link to <span className="text-purple-400 font-medium">{email}</span>.
                Click the link in the email to reset your password.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  type="button"
                  onClick={handleBackToSignIn}
                  containerClassName="w-full h-14"
                  borderClassName="bg-[radial-gradient(#10b981_40%,transparent_60%)]"
                  className="bg-gradient-to-r from-green-600/90 to-emerald-600/90 backdrop-blur-xl border-white/10 text-white font-semibold text-base hover:from-green-500/90 hover:to-emerald-500/90 transition-all duration-300"
                  borderRadius="1rem"
                  duration={3000}
                >
                  <span className="flex items-center gap-2">
                    <FiArrowLeft size={18} />
                    Back to Sign In
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  )
}
