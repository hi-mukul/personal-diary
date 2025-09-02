'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingParticlesProps {
  count?: number
  className?: string
}

export default function FloatingParticles({ 
  count = 15, 
  className = "from-purple-400/30 to-cyan-400/30" 
}: FloatingParticlesProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(count)].map((_, i) => {
        // Use deterministic values based on index to avoid hydration mismatch
        const leftPos = (i * 6.7) % 100
        const topPos = (i * 9.3) % 100
        const xOffset = (i % 3 - 1) * 20
        const duration = 4 + (i % 3)
        const delay = (i % 4) * 0.75

        return (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r ${className} rounded-full`}
            style={{
              left: `${leftPos}%`,
              top: `${topPos}%`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, xOffset, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </div>
  )
}
