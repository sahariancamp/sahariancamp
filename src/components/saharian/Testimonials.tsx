'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Award, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Emma & James',
    location: 'London, UK',
    text: 'We came for the dunes but stayed for the silence. The Saharian Camp is not just a place to sleep — it\'s a place to finally hear yourself think.',
    rating: 5,
    date: 'October 2024',
    image: '/images/stargazing.png',
    rotation: -2,
  },
  {
    id: 2,
    name: 'Sophie Laurent',
    location: 'Paris, France',
    text: 'Le luxe du désert, tout simplement. The bio gastronomy was a revelation — each meal told the story of Morocco. We\'ve already booked our return.',
    rating: 5,
    date: 'September 2024',
    image: '/images/dining-stars.png',
    rotation: 1.5,
  },
  {
    id: 3,
    name: 'Marco Rossi',
    location: 'Milan, Italy',
    text: 'I\'ve traveled to 60+ countries and this is among my top 3 experiences ever. The stargazing alone is worth the journey. The staff made us feel like family.',
    rating: 5,
    date: 'November 2024',
    image: '/images/camel-trek.png',
    rotation: -1,
  },
  {
    id: 4,
    name: 'Yuki & Kenji',
    location: 'Tokyo, Japan',
    text: 'モロッコの砂漠でこんな贅沢な体験ができるとは思いませんでした。The attention to detail, from the tea ceremony to the tent design, was impeccable.',
    rating: 5,
    date: 'December 2024',
    image: '/images/tea-ceremony.png',
    rotation: 2,
  },
  {
    id: 5,
    name: 'Isabel García',
    location: 'Barcelona, Spain',
    text: 'El atardecer en Erg Chebbi desde la terraza de la tienda es algo que nunca olvidaré. The sunset from our tent terrace at Erg Chebbi is something I\'ll never forget.',
    rating: 5,
    date: 'August 2024',
    image: '/images/hero-desert.png',
    rotation: -1.5,
  },
  {
    id: 6,
    name: 'David Chen',
    location: 'San Francisco, USA',
    text: 'The camel trek at sunset followed by Berber music under the stars — this is what travel should feel like. Authentic, luxurious, and deeply moving.',
    rating: 5,
    date: 'January 2025',
    image: '/images/berber-music.png',
    rotation: 1,
  },
]

const trustBadges = [
  { label: 'TripAdvisor', detail: 'Certificate of Excellence', icon: '🏆' },
  { label: 'Google', detail: '4.9 ★ Average', icon: '⭐' },
  { label: 'Booking.com', detail: '9.6 Rating', icon: '🏅' },
]

function PolaroidCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      className="flex-shrink-0 w-72 md:w-80 polaroid-card group cursor-pointer"
      style={{ transform: `rotate(${testimonial.rotation}deg)` }}
      whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      data-cursor-hover
    >
      {/* Image */}
      <div className="relative h-44 md:h-52 overflow-hidden rounded-sm">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url('${testimonial.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Rating */}
        <div className="absolute top-2 right-2 flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-[#C4A35A] text-[#C4A35A]" />
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="p-3">
        <Quote className="w-4 h-4 text-[#C4A35A]/30 mb-2" />
        <p className="text-[#1A1A2E] text-xs leading-relaxed line-clamp-4 mb-3" style={{ fontFamily: "'Amiri', serif" }}>
          {testimonial.text}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#1A1A2E] text-xs font-semibold">{testimonial.name}</p>
            <p className="text-[#8A8A9E] text-[10px]">{testimonial.location}</p>
          </div>
          <p className="text-[#8A8A9E] text-[10px]">{testimonial.date}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background - dune silhouette */}
      <div className="absolute inset-0 desert-gradient" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F0F1E] to-transparent" />

      {/* Dune silhouette SVG */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-48 opacity-10"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,200 Q200,50 400,120 T800,80 T1200,130 T1440,100 L1440,200 Z"
          fill="#C4A35A"
        />
      </svg>

      <div className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 px-6">
          <motion.span
            className="text-[#C4A35A] text-xs tracking-[0.5em] uppercase block mb-6"
            style={{ fontFamily: "'Amiri', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Voices of the Dune
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-light text-[#E8D5B7] mb-6 text-glow"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What They <span className="text-[#C4A35A]">Whisper</span>
          </motion.h2>
        </div>

        {/* Marquee - Row 1 */}
        <div
          className="relative mb-8 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={marqueeRef}
            className="flex gap-6 px-3"
            style={{
              animation: `marquee 40s linear infinite`,
              animationPlayState: isHovered ? 'paused' : 'running',
            }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <PolaroidCard key={`row1-${i}`} testimonial={t} index={i} />
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-12 px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-3 px-6 py-3 rounded-full glass-card"
            >
              <span className="text-xl">{badge.icon}</span>
              <div>
                <p className="text-[#E8D5B7] text-sm font-medium">{badge.label}</p>
                <p className="text-[#C4A35A] text-xs" style={{ fontFamily: "'Amiri', serif" }}>
                  {badge.detail}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
