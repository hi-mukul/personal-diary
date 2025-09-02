'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassmorphicContainerProps {
  children: ReactNode
  className?: string
  centered?: boolean
}

export default function GlassmorphicContainer({ 
  children, 
  className = '', 
  centered = true 
}: GlassmorphicContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`
        relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 
        shadow-2xl shadow-black/20 p-8 sm:p-10 lg:p-12
        ${centered ? 'mx-auto' : ''}
        ${className}
      `}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 blur-xl -z-10" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
