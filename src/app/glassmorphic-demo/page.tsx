'use client'

import { motion } from 'framer-motion'
import GlassmorphicContainer from '../components/ui/GlassmorphicContainer'
import FloatingParticles from '../components/ui/FloatingParticles'

export default function GlassmorphicDemoPage() {
  return (
    <div
      className="min-h-screen w-full relative"
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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <GlassmorphicContainer className="max-w-4xl w-full">
          <div className="text-center space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  DivineLog
                </span>
              </h1>
              <p className="text-purple-300 text-lg font-medium">
                Your Sacred Digital Journal
              </p>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-6 text-gray-300"
            >
              <p className="text-xl leading-relaxed">
                Create a sacred digital sanctuary for your thoughts, dreams, and reflections.
                DivineLog transforms your personal journey into a beautiful, secure diary experience.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-white font-bold">🔒</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Sacred & Secure</h3>
                  <p className="text-sm text-gray-400">Your thoughts are protected with enterprise-grade security</p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-white font-bold">✨</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Beautiful & Intuitive</h3>
                  <p className="text-sm text-gray-400">Elegant design that inspires daily reflection</p>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-white font-bold">📱</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Always Accessible</h3>
                  <p className="text-sm text-gray-400">Access your journal anywhere, anytime, on any device</p>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="pt-6"
            >
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                Start Your Journey
              </button>
            </motion.div>
          </div>
        </GlassmorphicContainer>
      </div>
    </div>
  )
}
