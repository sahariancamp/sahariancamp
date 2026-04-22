'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [showText, setShowText] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Animate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setShowText(true)
          setTimeout(() => {
            setIsExiting(true)
            setTimeout(onComplete, 600)
          }, 1000)
          return 100
        }
        return prev + 3
      })
    }, 40)

    // Sand grain animation on canvas
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const grains: { x: number; y: number; vy: number; size: number; opacity: number }[] = []
    for (let i = 0; i < 50; i++) {
      grains.push({
        x: Math.random() * canvas.width,
        y: -Math.random() * canvas.height,
        vy: 0.5 + Math.random() * 2,
        size: 1 + Math.random() * 2,
        opacity: 0.2 + Math.random() * 0.5,
      })
    }

    let animFrame: number
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (const grain of grains) {
        grain.y += grain.vy
        if (grain.y > canvas.height) {
          grain.y = -10
          grain.x = Math.random() * canvas.width
        }
        ctx.fillStyle = `rgba(196, 163, 90, ${grain.opacity})`
        ctx.beginPath()
        ctx.arc(grain.x, grain.y, grain.size, 0, Math.PI * 2)
        ctx.fill()
      }
      
      animFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      clearInterval(interval)
      cancelAnimationFrame(animFrame)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A1A]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
          
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Falling grain animation */}
            <motion.div
              className="w-2 h-2 rounded-full bg-[#C4A35A]"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            
            {/* Shockwave ring */}
            <motion.div
              className="absolute w-4 h-4 rounded-full border border-[#C4A35A]/30"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: progress > 50 ? 30 : 0, opacity: progress > 50 ? 0 : 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />

            {/* Logo mark */}
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="text-[#C4A35A] text-4xl tracking-[0.3em] font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                SAHARIAN
              </div>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C4A35A] to-transparent" />
              <div className="text-[#D4C4A8] text-sm tracking-[0.5em] uppercase" style={{ fontFamily: "'Amiri', serif" }}>
                Camp
              </div>
            </motion.div>

            {/* Progress */}
            <div className="flex flex-col items-center gap-3 mt-8">
              <div className="w-48 h-[1px] bg-[#1A1A2E] relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#C4A35A]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="text-[#8A8A9E] text-xs tracking-[0.3em]" style={{ fontFamily: "'Amiri', serif" }}>
                {progress}%
              </div>
            </div>

            {/* Quote text */}
            <AnimatePresence>
              {showText && (
                <motion.p
                  className="text-[#D4C4A8]/60 text-sm italic text-center max-w-xs"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  &ldquo;The Sahara doesn&apos;t ask for attention. It commands it.&rdquo;
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
