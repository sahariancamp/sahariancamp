'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Compass, Coffee, Tent, UtensilsCrossed, Star } from 'lucide-react'

const campStops = [
  {
    id: 'approach',
    title: 'The Approach',
    subtitle: 'Journey through the dunes',
    description: 'A 4x4 adventure through the golden Erg Chebbi dunes, where the landscape shifts from palm-fringed oases to vast seas of sand. Every curve reveals a new horizon.',
    image: '/images/hero-desert.png',
    icon: Compass,
    accent: 'The road dissolves into sand. Civilization fades. The desert begins.',
  },
  {
    id: 'reception',
    title: 'The Welcome',
    subtitle: 'Tea ceremony & tradition',
    description: 'Be greeted with the traditional Berber tea ceremony — three glasses of sweet mint tea, each with its own meaning: life, love, and death. Sit on hand-woven carpets as the camp reveals itself.',
    image: '/images/tea-ceremony.png',
    icon: Coffee,
    accent: 'Three glasses. Three meanings. One unforgettable welcome.',
  },
  {
    id: 'tents',
    title: 'The Tents',
    subtitle: 'Luxury under canvas',
    description: 'Spacious glamping suites where traditional Berber craftsmanship meets modern luxury. King beds with Egyptian cotton, private en-suite bathrooms, and panoramic dune views from your private terrace.',
    image: '/images/camp-tent.png',
    icon: Tent,
    accent: 'Where the nomadic spirit meets uncompromising comfort.',
  },
  {
    id: 'dining',
    title: 'The Table',
    subtitle: 'Bio gastronomy under stars',
    description: 'A culinary journey through Moroccan flavors, prepared with organic ingredients from our garden. Each meal is a celebration of the land — from traditional tagines to innovative Berber-fusion cuisine.',
    image: '/images/dining-stars.png',
    icon: UtensilsCrossed,
    accent: 'Every meal tells the story of the land it comes from.',
  },
  {
    id: 'night',
    title: 'The Night',
    subtitle: 'Stargazing & silence',
    description: 'Under the unpolluted Saharan sky, a billion stars reveal themselves. Our stargazing deck offers telescopes and guided celestial tours. The Milky Way has never looked closer.',
    image: '/images/stargazing.png',
    icon: Star,
    accent: 'In the desert night, the sky is closer than the ground.',
  },
]

export default function Camp() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(campStops.length - 1) * 100}%`])

  return (
    <section id="camp" ref={containerRef} className="relative">
      {/* Section header */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <motion.span
            className="text-[#C4A35A] text-xs tracking-[0.5em] uppercase block mb-6"
            style={{ fontFamily: "'Amiri', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            The Camp
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-light text-[#E8D5B7] mb-6 text-glow"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Walk Through<br />
            <span className="text-[#C4A35A]">Oasis</span>
          </motion.h2>
          <motion.p
            className="text-[#D4C4A8]/60 text-lg max-w-xl mx-auto"
            style={{ fontFamily: "'Amiri', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Scroll to walk through our camp. Each step reveals a new chapter of the Saharian experience.
          </motion.p>
          <motion.div
            className="mt-8 flex items-center justify-center gap-2 text-[#8A8A9E]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Amiri', serif" }}>
              Keep scrolling
            </span>
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Horizontal scroll section */}
      <div className="relative h-[500vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            className="flex h-full"
            style={{ x }}
          >
            {campStops.map((stop, i) => {
              const Icon = stop.icon
              return (
                <div key={stop.id} className="min-w-full h-full relative flex items-center">
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${stop.image}')` }}
                  />
                  <div className="absolute inset-0 bg-[#0F0F1E]/70" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F1E]/80 via-[#0F0F1E]/40 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
                    <div className="max-w-xl">
                      <motion.div
                        className="flex items-center gap-3 mb-6"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="w-10 h-10 rounded-full border border-[#C4A35A]/40 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[#C4A35A]" />
                        </div>
                        <span
                          className="text-[#C4A35A]/60 text-xs tracking-[0.3em] uppercase"
                          style={{ fontFamily: "'Amiri', serif" }}
                        >
                          {String(i + 1).padStart(2, '0')} / {String(campStops.length).padStart(2, '0')}
                        </span>
                      </motion.div>

                      <motion.h3
                        className="text-3xl md:text-5xl lg:text-6xl font-light text-[#E8D5B7] mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                      >
                        {stop.title}
                      </motion.h3>

                      <motion.p
                        className="text-[#C4A35A] text-sm tracking-[0.2em] uppercase mb-6"
                        style={{ fontFamily: "'Amiri', serif" }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                      >
                        {stop.subtitle}
                      </motion.p>

                      <motion.p
                        className="text-[#D4C4A8]/70 text-base leading-relaxed mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.4 }}
                      >
                        {stop.description}
                      </motion.p>

                      <motion.div
                        className="pl-4 border-l-2 border-[#C4A35A]/30"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                      >
                        <p
                          className="text-[#C4A35A]/60 text-sm italic"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {stop.accent}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* Progress dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            {campStops.map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[#C4A35A]/30"
                style={{
                  backgroundColor: scrollYProgress.get() > (i - 0.5) / campStops.length && scrollYProgress.get() < (i + 0.5) / campStops.length
                    ? '#C4A35A'
                    : 'rgba(196, 163, 90, 0.3)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
