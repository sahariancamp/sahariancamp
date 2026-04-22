'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const headlineWords = ['Where', 'the', 'Dunes', 'Whisper']

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden" id="hero">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        {/* Fallback gradient in case image doesn't load */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E] via-[#2A1A0A] to-[#0F0F1E]" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-desert.png')",
            transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.1)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A1A]/60 via-[#0A0A1A]/20 to-[#0F0F1E]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A1A]/40 via-transparent to-[#0A0A1A]/40" />
        {/* Warm golden glow at center bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-[#C4A35A]/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Film grain overlay */}
      <div className="film-grain" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
        style={{ opacity }}
      >
        {/* Decorative top element */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1 }}
        >
          <div className="w-12 h-[1px] bg-[#C4A35A]/40" />
          <span
            className="text-[#C4A35A]/60 text-xs tracking-[0.5em] uppercase"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            Merzouga • Morocco
          </span>
          <div className="w-12 h-[1px] bg-[#C4A35A]/40" />
        </motion.div>

        {/* Main headline */}
        <h1 className="max-w-5xl">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em] text-glow"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                fontWeight: 300,
                color: i === 2 || i === 3 ? '#C4A35A' : '#E8D5B7',
                lineHeight: 1.1,
              }}
              initial={{ opacity: 0, y: 60, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 3.0 + i * 0.12,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-8 text-[#D4C4A8]/70 max-w-lg text-base md:text-lg tracking-wide"
          style={{ fontFamily: "'Amiri', serif" }}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 3.6, duration: 1 }}
        >
          Luxury camp at the edge of the impossible
        </motion.p>

        {/* Golden line separator */}
        <motion.div
          className="mt-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C4A35A] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 4.0, duration: 1 }}
        />

        {/* CTA Button */}
        <motion.button
          className="magnetic-btn mt-10 px-10 py-4 border border-[#C4A35A]/50 text-[#C4A35A] text-sm tracking-[0.3em] uppercase rounded-full hover:bg-[#C4A35A]/10 transition-all relative overflow-hidden group"
          style={{ fontFamily: "'Amiri', serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.3, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.querySelector('#camp')?.scrollIntoView({ behavior: 'smooth' })}
          data-cursor-hover
        >
          <span className="relative z-10">Begin Your Journey</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#C4A35A]/0 via-[#C4A35A]/20 to-[#C4A35A]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.8, duration: 1 }}
        >
          <span
            className="text-[#8A8A9E] text-[10px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            Scroll to discover
          </span>
          <motion.div
            className="w-5 h-8 rounded-full border border-[#C4A35A]/30 flex items-start justify-center p-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-[#C4A35A]"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Side decorative elements */}
      <motion.div
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 1 }}
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-[#C4A35A]/30" />
        <span
          className="text-[#8A8A9E] text-[10px] tracking-[0.3em] uppercase"
          style={{ writingMode: 'vertical-rl', fontFamily: "'Amiri', serif" }}
        >
          31°N 4°W
        </span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-[#C4A35A]/30 to-transparent" />
      </motion.div>
    </section>
  )
}
