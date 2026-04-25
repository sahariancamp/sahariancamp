'use client'

import { useState, useRef, MouseEvent, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { fetchActivities } from '@/lib/api'

// Data fetched from API

function TiltCard({ experience, onClick }: { experience: any; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -15, y: x * 15 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className="perspective-container group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      data-cursor-hover
    >
      <div
        className="tilt-card glass-card rounded-2xl overflow-hidden h-[360px] md:h-[400px]"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Image */}
        <div className="relative h-40 md:h-48 overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
            <Image
              src={experience.image_url}
              alt={experience.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Color accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: experience.color || 'var(--primary)' }}
          />
          
          {/* Duration badge */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/70 backdrop-blur-sm border border-primary/20">
            <span className="text-muted-foreground text-xs" style={{ fontFamily: "'Amiri', serif" }}>
              {experience.duration}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 tilt-card-content">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-2"
            style={{ color: experience.color || 'var(--primary)', fontFamily: "'Amiri', serif" }}
          >
            {experience.subtitle || 'Experience'}
          </p>
          <h3
            className="text-xl md:text-2xl font-light text-foreground mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {experience.name}
          </h3>
          <p className="text-muted-foreground/60 text-sm line-clamp-2 leading-relaxed">
            {experience.description}
          </p>
          <div className="mt-4 flex items-center gap-2 group/btn">
            <span
              className="text-xs tracking-wider uppercase"
              style={{ color: experience.color || 'var(--primary)', fontFamily: "'Amiri', serif" }}
            >
              Discover more
            </span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Experiences({ initialData = [] }: { initialData?: any[] }) {
  const [experiences, setExperiences] = useState<any[]>(initialData)
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null)
  const [loading, setLoading] = useState(initialData.length === 0)

  useEffect(() => {
    if (initialData.length === 0) {
      fetchActivities().then(data => {
        setExperiences(data)
        setLoading(false)
      }).catch(err => {
        console.error(err)
        setLoading(false)
      })
    }
  }, [initialData])

  if (loading || experiences.length === 0) {
    return (
      <section id="experiences" className="py-16 text-center text-foreground desert-gradient">
        <div className="animate-pulse">Loading Rituals...</div>
      </section>
    )
  }

  return (
    <section id="experiences" className="py-16 md:py-24 px-6 desert-gradient">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.span
            className="text-primary text-xs tracking-[0.5em] uppercase block mb-6"
            style={{ fontFamily: "'Amiri', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Rituals
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-6 text-glow"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ancient <span className="text-primary">Rituals</span>,<br />
            Timeless Thrills
          </motion.h2>
          <motion.div
            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {experiences.map((exp) => (
            <TiltCard
              key={exp.id}
              experience={exp}
              onClick={() => setSelectedExperience(exp)}
            />
          ))}
        </div>
      </div>

      {/* Expanded experience modal */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
              onClick={() => setSelectedExperience(null)}
            />
            <motion.div
              className="relative z-10 max-w-2xl w-full glass-card rounded-3xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Image */}
              <div className="relative h-64 md:h-80">
                <div className="absolute inset-0">
                  <Image
                    src={selectedExperience.image_url}
                    alt={selectedExperience.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: selectedExperience.color || 'var(--primary)' }}
                />
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setSelectedExperience(null)}
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ color: selectedExperience.color || 'var(--primary)', fontFamily: "'Amiri', serif" }}
                >
                  {selectedExperience.subtitle || 'Experience'}
                </p>
                <h3
                  className="text-3xl md:text-4xl font-light text-foreground mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {selectedExperience.name}
                </h3>
                <p className="text-muted-foreground/70 text-base leading-relaxed mb-6">
                  {selectedExperience.description}
                </p>
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs" style={{ fontFamily: "'Amiri', serif" }}>Duration:</span>
                    <span className="text-foreground text-sm">{selectedExperience.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs" style={{ fontFamily: "'Amiri', serif" }}>Level:</span>
                    <span className="text-foreground text-sm">{selectedExperience.difficulty}</span>
                  </div>
                </div>
                {/* Booking removed as per user request - bookable on-site only */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
