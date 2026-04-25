'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowUp } from 'lucide-react'
import Link from 'next/link'
import { campInfo } from '@/lib/info'
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa6";
const starConstellation = [
  // North Star + nearby
  { x: 50, y: 8, size: 2.5, isNorth: true },
  { x: 48, y: 10, size: 1 },
  { x: 52, y: 11, size: 1 },
  { x: 46, y: 12, size: 0.8 },
  { x: 54, y: 13, size: 0.8 },
  // Orion-like
  { x: 30, y: 25, size: 1.5 },
  { x: 32, y: 27, size: 1 },
  { x: 28, y: 27, size: 1 },
  { x: 30, y: 29, size: 1.5 },
  { x: 30, y: 31, size: 1 },
  { x: 30, y: 33, size: 0.8 },
  // Scorpius-like
  { x: 70, y: 20, size: 1.5 },
  { x: 72, y: 22, size: 1 },
  { x: 74, y: 24, size: 1 },
  { x: 73, y: 26, size: 0.8 },
  { x: 71, y: 28, size: 0.8 },
  { x: 69, y: 30, size: 1 },
  // Scattered
  { x: 15, y: 15, size: 0.6 },
  { x: 85, y: 12, size: 0.6 },
  { x: 20, y: 35, size: 0.5 },
  { x: 80, y: 35, size: 0.5 },
  { x: 10, y: 25, size: 0.7 },
  { x: 90, y: 22, size: 0.7 },
  { x: 40, y: 18, size: 0.4 },
  { x: 60, y: 15, size: 0.4 },
  { x: 35, y: 38, size: 0.3 },
  { x: 65, y: 40, size: 0.3 },
  { x: 45, y: 32, size: 0.5 },
  { x: 55, y: 28, size: 0.5 },
  { x: 12, y: 40, size: 0.4 },
  { x: 88, y: 38, size: 0.4 },
  { x: 75, y: 8, size: 0.6 },
  { x: 25, y: 5, size: 0.6 },
  { x: 42, y: 42, size: 0.3 },
  { x: 58, y: 44, size: 0.3 },
]

const socialLinks = [
  { icon: FaInstagram, label: 'Instagram', href: campInfo.instagram },
  { icon: FaFacebook, label: 'Facebook', href: campInfo.facebook },
  { icon: FaWhatsapp, label: 'WhatsApp', href: `https://wa.me/${campInfo.whatsapp}` },
  { icon: Mail, label: 'Email', href: `mailto:${campInfo.email}` },
]

const footerLinks = [
  {
    title: 'Camp',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'The Tents', href: '/tents' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Sustainability', href: '/about' },
    ],
  },
  {
    title: 'Experience',
    links: [
      { label: 'Camel Trekking', href: '/activities' },
      { label: 'Buggy Adrenaline', href: '/activities' },
      { label: 'Stargazing', href: '/activities' },
      { label: 'Wellness', href: '/activities' },
    ],
  },
  {
    title: 'Practical',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Weather', href: '/weather' },
      { label: 'Location', href: '/location' },
    ],
  },
]

export default function Footer() {
  const [showProverb, setShowProverb] = useState(false)
  const [email, setEmail] = useState('')
  const [emailFocused, setEmailFocused] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Shooting stars animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = 600

    interface ShootingStar {
      x: number
      y: number
      length: number
      speed: number
      opacity: number
      active: boolean
    }

    const stars: ShootingStar[] = []
    
    const width = canvas.width
    const height = canvas.height

    function createStar(): ShootingStar {
      return {
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        length: 50 + Math.random() * 100,
        speed: 3 + Math.random() * 5,
        opacity: 0,
        active: true,
      }
    }

    let animFrame: number
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Random shooting star
      if (Math.random() < 0.005 && stars.length < 3) {
        stars.push(createStar())
      }

      for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i]
        star.x += star.speed
        star.y += star.speed * 0.6
        star.opacity = Math.max(0, star.opacity - 0.008)

        if (star.opacity <= 0 && star.active) {
          star.active = false
        }

        if (!star.active) {
          stars.splice(i, 1)
          continue
        }

        if (star.active && star.opacity < 0.8) {
          star.opacity += 0.05
        }

        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - star.length * 0.7, star.y - star.length * 0.4
        )
        gradient.addColorStop(0, `rgba(196, 163, 90, ${star.opacity})`)
        gradient.addColorStop(1, 'rgba(196, 163, 90, 0)')

        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(star.x - star.length * 0.7, star.y - star.length * 0.4)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      animFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => cancelAnimationFrame(animFrame)
  }, [])

  return (
    <footer className="relative min-h-[600px] overflow-hidden bg-background">
      {/* Night sky background - becomes Day background in light mode */}
      <div className="absolute inset-0 night-sky-gradient" />

      {/* Stars - Only visible in dark mode */}
      <div className="absolute inset-0 top-0 h-3/4 dark:opacity-100 opacity-0 transition-opacity duration-1000">
        {starConstellation.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-foreground"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              cursor: star.isNorth ? 'pointer' : 'default',
            }}
            animate={{
              opacity: [0.3 + Math.random() * 0.3, 0.8 + Math.random() * 0.2, 0.3 + Math.random() * 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            onClick={() => {
              if (star.isNorth) setShowProverb(!showProverb)
            }}
          />
        ))}
        {/* Shooting stars canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      </div>

      {/* Campfire glow at bottom - Only in dark mode */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 dark:opacity-100 opacity-0 transition-opacity duration-1000">
        <div className="relative">
          {/* Glow layers */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full bg-primary/5 blur-3xl" style={{ animation: 'campfire-flicker 3s ease-in-out infinite' }} />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-20 rounded-full bg-destructive/5 blur-2xl" style={{ animation: 'campfire-flicker 2s ease-in-out infinite' }} />

          {/* Ember particles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
              style={{ bottom: 0 }}
              animate={{
                y: [-20, -80 - Math.random() * 40],
                opacity: [0.8, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      </div>

      {/* Easter egg - Berber proverb */}
      {showProverb && (
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center px-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-primary text-lg italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            &ldquo;The desert teaches that even emptiness can be full.&rdquo;
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2" style={{ fontFamily: "'Amiri', serif" }}>
            — Berber Proverb
          </p>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-8">
        {/* Newsletter */}
        <div className="text-center mb-16">
          <motion.h3
            className="text-2xl md:text-4xl font-light text-foreground mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Join the Caravan
          </motion.h3>
          <motion.p
            className="text-muted-foreground/50 text-sm mb-6"
            style={{ fontFamily: "'Amiri', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Receive stories from the desert, exclusive offers, and moon-phase travel guides
          </motion.p>
          <motion.div
            className="flex items-center max-w-md mx-auto gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="your@email.com"
                className="desert-input w-full px-4 py-3 rounded-full text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
              {/* Smoke effect on focus */}
              {emailFocused && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-primary/5"
                      style={{ left: `${(i - 1) * 10}px` }}
                      animate={{
                        y: [0, -30],
                        opacity: [0.3, 0],
                        scale: [1, 2],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <button
              className="px-6 py-3 rounded-full bg-primary text-background text-xs tracking-[0.2em] uppercase font-medium hover:opacity-90 transition-all"
              style={{ fontFamily: "'Amiri', serif" }}
              data-cursor-hover
            >
              Join
            </button>
          </motion.div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-primary text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Amiri', serif" }}>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground/40 hover:text-foreground text-sm transition-colors"
                      data-cursor-hover
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social constellation */}
        <div className="flex items-center justify-center gap-8 mb-12">
          {socialLinks.map((social, i) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target='_blank'
                className="group relative"
                data-cursor-hover
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-primary/60 group-hover:bg-primary/10 transition-all">
                  <Icon className="w-4 h-4 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                </div>
                {/* Connecting lines on hover */}
                {i < socialLinks.length - 1 && (
                  <div className="absolute top-1/2 -right-8 w-8 h-[1px] bg-primary/0 group-hover:bg-primary/20 transition-all" />
                )}
              </motion.a>
            )
          })}
        </div>

        {/* Bottom bar */}
        <div className="golden-line mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
             
            <span
              className="text-primary text-sm tracking-[0.2em]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              SAHARIAN CAMP
            </span>
          </div>

          <p className="text-muted-foreground/60 text-xs text-center" style={{ fontFamily: "'Amiri', serif" }}>
            © {new Date().getFullYear()} Saharian Camp. Merzouga, Morocco. All rights reserved.
          </p>

          <button
            className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-muted-foreground/60 hover:text-primary hover:border-primary/40 transition-all"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            data-cursor-hover
          >
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  )
}
