'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Bed, Bath, Wind, Wifi, Sun, Moon } from 'lucide-react'

const amenities = [
  { icon: Bed, label: 'King Bed', detail: 'Egyptian cotton linens' },
  { icon: Bath, label: 'Private Bathroom', detail: 'Hot shower & organic amenities' },
  { icon: Wind, label: 'Climate Control', detail: 'Air conditioning & heating' },
  { icon: Wifi, label: 'High-Speed WiFi', detail: 'Stay connected in the desert' },
]

const tentTypes = [
  {
    id: 'quadruple',
    name: 'Quadruple Deluxe Tent',
    tagline: 'Ideal for friends and families',
    description: 'Every Tent is widely separated from the others with a big space in the middle to provide the best privacy. Every tent has selected bed linen and a wide ensuite private bathroom with everything you need for the highest comfortable stay including electricity and WiFi.',
    features: ['Selected bed linen', 'Ensuite private bathroom', 'Air Conditioner', 'Free WiFi', 'Tea/Coffee making facilities', 'Dunes views'],
    size: '32m²',
    occupancy: '4 persons',
    price: 'Check Availability',
    image: '/images/hero-desert.png',
  },
  {
    id: 'family',
    name: 'Family Deluxe Tent',
    tagline: 'Perfect for family getaways',
    description: 'Designed for families seeking adventure without compromise. Enjoy the desert life from the highest comfort with a spacious setup that accommodates the whole family while ensuring privacy and relaxation.',
    features: ['Large family bed setup', 'Ensuite private bathroom', 'Air Conditioner', 'Free WiFi', 'Tea/Coffee making facilities', 'Dunes views'],
    size: '35m²',
    occupancy: 'Up to 5 persons',
    price: 'Check Availability',
    image: '/images/camp-tent.png',
  },
  {
    id: 'triple',
    name: 'Triple Deluxe Tent',
    tagline: 'Comfort for small groups',
    description: 'A spacious and luxurious tent perfect for a group of three. Wake up to stunning dune views, refreshed by desert air and golden light. Features premium bedding and an authentic Moroccan atmosphere.',
    features: ['3 Comfortable beds', 'Ensuite private bathroom', 'Air Conditioner', 'Free WiFi', 'Moroccan décor', 'Dunes views'],
    size: '28m²',
    occupancy: '3 persons',
    price: 'Check Availability',
    image: '/images/tent-interior.png',
  },
  {
    id: 'double',
    name: 'Double Deluxe Tent',
    tagline: 'A romantic desert retreat',
    description: 'An intimate retreat for couples. The Double Deluxe offers a perfect balance of comfort and authenticity, with hand-crafted furnishings, uninterrupted views, and a romantic atmosphere.',
    features: ['Queen/King bed', 'Ensuite private bathroom', 'Air Conditioner', 'Free WiFi', 'Romantic setup', 'Dunes views'],
    size: '24m²',
    occupancy: '2 persons',
    price: 'Check Availability',
    image: '/images/camp-tent.png',
  },
  {
    id: 'single',
    name: 'Single Deluxe Tent',
    tagline: 'Your private sanctuary',
    description: 'Perfect for the solo traveler seeking peace and reflection in the Sahara. Enjoy all the luxury amenities in a cozy, private setting overlooking the majestic dunes.',
    features: ['Comfortable single bed', 'Ensuite private bathroom', 'Air Conditioner', 'Free WiFi', 'Tea/Coffee making facilities', 'Dunes views'],
    size: '18m²',
    occupancy: '1 person',
    price: 'Check Availability',
    image: '/images/tent-interior.png',
  },
]

export default function Accommodations() {
  const [activeTent, setActiveTent] = useState(0)
  const [isNight, setIsNight] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  const currentTent = tentTypes[activeTent]

  return (
    <section id="accommodations" ref={containerRef} className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute inset-0 transition-all duration-1000 ${isNight ? 'night-sky-gradient' : 'desert-gradient'}`} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            className="text-[#C4A35A] text-xs tracking-[0.5em] uppercase block mb-6"
            style={{ fontFamily: "'Amiri', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Sanctuaries
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-light text-[#E8D5B7] mb-6 text-glow"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Your Desert <span className="text-[#C4A35A]">Sanctuary</span>
          </motion.h2>

          {/* Day/Night toggle */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Sun className={`w-4 h-4 transition-colors ${!isNight ? 'text-[#C4A35A]' : 'text-[#8A8A9E]'}`} />
            <button
              className="w-14 h-7 rounded-full bg-[#1A1A2E] border border-[#C4A35A]/20 flex items-center p-1 transition-all"
              onClick={() => setIsNight(!isNight)}
              data-cursor-hover
            >
              <motion.div
                className="w-5 h-5 rounded-full bg-[#C4A35A]"
                animate={{ x: isNight ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            </button>
            <Moon className={`w-4 h-4 transition-colors ${isNight ? 'text-[#C4A35A]' : 'text-[#8A8A9E]'}`} />
            <span className="text-[#8A8A9E] text-xs tracking-wider" style={{ fontFamily: "'Amiri', serif" }}>
              {isNight ? 'Night' : 'Day'}
            </span>
          </motion.div>
        </div>

        {/* Tent type selector */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {tentTypes.map((tent, i) => (
            <button
              key={tent.id}
              className={`px-6 py-2 rounded-full text-xs tracking-[0.2em] uppercase transition-all border ${
                activeTent === i
                  ? 'bg-[#C4A35A]/15 border-[#C4A35A]/50 text-[#C4A35A]'
                  : 'border-[#C4A35A]/10 text-[#8A8A9E] hover:border-[#C4A35A]/30 hover:text-[#D4C4A8]'
              }`}
              style={{ fontFamily: "'Amiri', serif" }}
              onClick={() => setActiveTent(i)}
              data-cursor-hover
            >
              {tent.name}
            </button>
          ))}
        </div>

        {/* Main content - split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Image with parallax */}
          <motion.div className="relative" style={{ y: imageY }}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
                style={{ backgroundImage: `url('${currentTent.image}')` }}
              />
              <div className={`absolute inset-0 transition-all duration-1000 ${
                isNight ? 'bg-[#0A0A1A]/60' : 'bg-gradient-to-t from-[#0F0F1E]/60 to-transparent'
              }`} />

              {/* Night stars overlay */}
              {isNight && (
                <div className="absolute inset-0">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 60}%`,
                      }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Price badge */}
              <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-[#0F0F1E]/80 backdrop-blur-sm border border-[#C4A35A]/20">
                <span className="text-[#C4A35A] text-sm font-light" style={{ fontFamily: "'Amiri', serif" }}>
                  {currentTent.price}
                </span>
              </div>

              {/* Size badge */}
              <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-[#0F0F1E]/80 backdrop-blur-sm border border-[#C4A35A]/20">
                <span className="text-[#D4C4A8] text-xs" style={{ fontFamily: "'Amiri', serif" }}>
                  {currentTent.size} • {currentTent.occupancy}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.p
              className="text-[#C4A35A] text-xs tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "'Amiri', serif" }}
              key={`tag-${currentTent.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentTent.tagline}
            </motion.p>
            <motion.h3
              className="text-3xl md:text-4xl font-light text-[#E8D5B7] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
              key={`name-${currentTent.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentTent.name}
            </motion.h3>
            <motion.p
              className="text-[#D4C4A8]/70 text-base leading-relaxed mb-8"
              key={`desc-${currentTent.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {currentTent.description}
            </motion.p>

            {/* Amenities grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {amenities.map((amenity) => {
                const Icon = amenity.icon
                return (
                  <div key={amenity.label} className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1A2E]/50 border border-[#C4A35A]/10">
                    <div className="w-8 h-8 rounded-full bg-[#C4A35A]/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#C4A35A]" />
                    </div>
                    <div>
                      <p className="text-[#E8D5B7] text-xs font-medium">{amenity.label}</p>
                      <p className="text-[#8A8A9E] text-[10px]">{amenity.detail}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Features list */}
            <motion.div
              className="mb-8"
              key={`features-${currentTent.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentTent.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C4A35A]" />
                    <span className="text-[#D4C4A8]/60 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <button
              className="magnetic-btn w-full sm:w-auto px-10 py-4 rounded-full bg-[#C4A35A] text-[#0F0F1E] text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#E8D5A0] transition-all"
              style={{ fontFamily: "'Amiri', serif" }}
              onClick={() => document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' })}
              data-cursor-hover
            >
              Reserve Your Sanctuary
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
