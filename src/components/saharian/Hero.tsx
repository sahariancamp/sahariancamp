'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
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
        {/* Fallback gradient and Poster Image (LCP optimized) */}
        <div className="absolute inset-0 bg-background" />
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.1)`,
          }}
        >
          <Image
            src="/images/hero-desert.png"
            alt="Saharian Luxury Camp"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Background Video - Loaded lazily */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.1)`,
          }}
        >
          <source src="/video/hero-video.webm" type="video/webm" />
        </video>

        {/* Dynamic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background transition-colors duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 transition-colors duration-1000" />
        {/* Warm golden glow at center bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
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
          className="flex items-center gap-2 md:gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="w-8 md:w-12 h-[1px] bg-primary/40" />
          <span
            className="text-primary/60 text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            Merzouga • Morocco
          </span>
          <div className="w-8 md:w-12 h-[1px] bg-primary/40" />
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
                color: i === 2 || i === 3 ? 'var(--primary)' : 'var(--foreground)',
                lineHeight: 1.1,
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + i * 0.1,
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
          className="mt-8 text-muted-foreground/70 max-w-lg text-base md:text-lg tracking-wide"
          style={{ fontFamily: "'Amiri', serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Luxury camp at the edge of the impossible
        </motion.p>

        {/* Golden line separator */}
        <motion.div
          className="mt-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        />

        {/* CTA Button */}
        <motion.button
          className="magnetic-btn mt-10 px-10 py-4 border border-primary/50 text-primary text-sm tracking-[0.3em] uppercase rounded-full hover:bg-primary/10 transition-all relative overflow-hidden group"
          style={{ fontFamily: "'Amiri', serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.querySelector('#camp')?.scrollIntoView({ behavior: 'smooth' })}
          data-cursor-hover
        >
          <span className="relative z-10">Begin Your Journey</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8  flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.8, duration: 1 }}
        >
          <span
            className="text-muted-foreground/60 text-[10px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            Scroll to discover
          </span>
          <motion.div
            className="w-5 h-8 rounded-full border border-primary/30 flex items-start justify-center p-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-primary"
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
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-primary/30" />
        <span
          className="text-muted-foreground/60 text-[10px] tracking-[0.3em] uppercase"
          style={{ writingMode: 'vertical-rl', fontFamily: "'Amiri', serif" }}
        >
          31°N 4°W
        </span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-primary/30 to-transparent" />
      </motion.div>
    </section>
  )
}
