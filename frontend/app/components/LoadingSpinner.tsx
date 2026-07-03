'use client'

// components/LoadingSpinner.tsx
// Cinematic PieNet-branded loading animation.

import { motion } from 'framer-motion'

export default function LoadingSpinner({ size = 40 }: { size?: number }) {
  return (
    <div className="flex flex-col items-center gap-4" aria-label="Loading">
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{ borderTopColor: '#E50914', borderRightColor: 'rgba(229,9,20,0.3)' }}
        />
        {/* Inner dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-pienet-red" />
        </div>
      </motion.div>
      <span className="font-inter text-xs tracking-widest uppercase text-pienet-zinc animate-pulse">
        Loading
      </span>
    </div>
  )
}
