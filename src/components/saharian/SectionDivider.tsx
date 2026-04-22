'use client'

import { motion } from 'framer-motion'

interface SectionDividerProps {
  variant?: 'gold-line' | 'compass' | 'ornament' | 'minimal'
  className?: string
}

export default function SectionDivider({ variant = 'gold-line', className = '' }: SectionDividerProps) {
  if (variant === 'gold-line') {
    return (
      <motion.div
        className={`flex items-center justify-center py-12 ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#C4A35A]/40" />
          <div className="w-2 h-2 rounded-full border border-[#C4A35A]/40" />
          <div className="w-16 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#C4A35A]/40" />
        </div>
      </motion.div>
    )
  }

  if (variant === 'compass') {
    return (
      <motion.div
        className={`flex items-center justify-center py-16 ${className}`}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border border-[#C4A35A]/20" />
          <div className="absolute inset-2 rounded-full border border-[#C4A35A]/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#C4A35A]" />
          {/* Compass points */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C4A35A]/30 text-[8px]" style={{ fontFamily: "'Amiri', serif" }}>N</div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[#C4A35A]/20 text-[8px]" style={{ fontFamily: "'Amiri', serif" }}>S</div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 text-[#C4A35A]/20 text-[8px]" style={{ fontFamily: "'Amiri', serif" }}>W</div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-[#C4A35A]/20 text-[8px]" style={{ fontFamily: "'Amiri', serif" }}>E</div>
        </div>
      </motion.div>
    )
  }

  if (variant === 'ornament') {
    return (
      <motion.div
        className={`flex items-center justify-center py-12 ${className}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-[1px] bg-[#C4A35A]/30" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#C4A35A]/30" />
          <div className="w-3 h-3 rounded-full border border-[#C4A35A]/20" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#C4A35A]/30" />
          <div className="w-8 h-[1px] bg-[#C4A35A]/30" />
        </div>
      </motion.div>
    )
  }

  // Minimal
  return (
    <motion.div
      className={`py-8 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="golden-line" />
    </motion.div>
  )
}
