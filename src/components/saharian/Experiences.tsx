'use client'

import { useState, useRef, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const experiences = [
  {
    id: 'camel',
    title: 'Dromedary Ride through Dunes',
    subtitle: 'Silhouettes at sunset',
    description: 'Experience the tranquility of the desert on a dromedary ride through the dunes. These majestic creatures are perfectly adapted to the harsh desert environment. Watch the sun set over the dunes as you ride into the heart of the Sahara.',
    image: '/images/camel-trek.png',
    duration: '1-2 hours',
    difficulty: 'Easy',
    color: '#C4A35A',
  },
  {
    id: 'buggy',
    title: 'Buggy Adrenaline',
    subtitle: 'Adrenaline on sand',
    description: 'For those seeking an adrenaline rush, a desert buggy ride is an absolute must. These powerful vehicles are perfectly suited for navigating the challenging terrain of the Sahara, allowing you to experience the thrill of speeding across the dunes.',
    image: '/images/quad-biking.png',
    duration: '1-3 hours',
    difficulty: 'Moderate',
    color: '#D4763C',
  },
  {
    id: 'sandboard',
    title: 'Dunes Board',
    subtitle: 'Surf the Sahara',
    description: 'For a unique and adventurous experience, try dunes boarding. This exciting activity involves sliding down the steep slopes of the dunes on a specially designed board, similar to snowboarding. Feel the rush of adrenaline as you carve your way down.',
    image: '/images/sunrise-yoga.png',
    duration: '1-2 hours',
    difficulty: 'Moderate',
    color: '#E8D5A0',
  },
  {
    id: 'drums',
    title: 'Drums Rhythm Show',
    subtitle: 'Rhythm of the desert',
    description: 'Enjoy a captivating evening of traditional music and dance at a drums rhythm show. Lose yourself in the rhythmic beats and vibrant energy as local musicians and dancers showcase their skills under the starry night sky.',
    image: '/images/berber-music.png',
    duration: 'Evening',
    difficulty: 'Joyful',
    color: '#2D5A4A',
  },
  {
    id: 'villages',
    title: 'Deep Desert Villages Day Tour',
    subtitle: 'Cultural Immersion',
    description: 'Venture off the beaten path and discover the hidden gems of the Sahara Desert. Immerse yourself in the local culture as you visit traditional Berber villages, interact with friendly locals, and learn about their way of life.',
    image: '/images/dining-stars.png',
    duration: 'Half or Full Day',
    difficulty: 'Easy',
    color: '#D4C4A8',
  },
  {
    id: 'custom',
    title: 'Customized Travel Programs',
    subtitle: 'Tailored for you',
    description: 'Looking for a more personalized experience? Merzouga offers a variety of customized travel programs tailored to your specific interests and preferences. From luxury camping under the stars to cultural immersion tours.',
    image: '/images/hero-desert.png',
    duration: 'Flexible',
    difficulty: 'All levels',
    color: '#8A8A9E',
  },
]

function TiltCard({ experience, onClick }: { experience: typeof experiences[0]; onClick: () => void }) {
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
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url('${experience.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-transparent to-transparent" />
          
          {/* Color accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: experience.color }}
          />
          
          {/* Duration badge */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#0F0F1E]/70 backdrop-blur-sm border border-[#C4A35A]/20">
            <span className="text-[#D4C4A8] text-xs" style={{ fontFamily: "'Amiri', serif" }}>
              {experience.duration}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 tilt-card-content">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-2"
            style={{ color: experience.color, fontFamily: "'Amiri', serif" }}
          >
            {experience.subtitle}
          </p>
          <h3
            className="text-xl md:text-2xl font-light text-[#E8D5B7] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {experience.title}
          </h3>
          <p className="text-[#D4C4A8]/60 text-sm line-clamp-2 leading-relaxed">
            {experience.description}
          </p>
          <div className="mt-4 flex items-center gap-2 group/btn">
            <span
              className="text-xs tracking-wider uppercase"
              style={{ color: experience.color, fontFamily: "'Amiri', serif" }}
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

export default function Experiences() {
  const [selectedExperience, setSelectedExperience] = useState<typeof experiences[0] | null>(null)

  return (
    <section id="experiences" className="py-16 md:py-24 px-6 desert-gradient">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.span
            className="text-[#C4A35A] text-xs tracking-[0.5em] uppercase block mb-6"
            style={{ fontFamily: "'Amiri', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Rituals
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-light text-[#E8D5B7] mb-6 text-glow"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ancient <span className="text-[#C4A35A]">Rituals</span>,<br />
            Timeless Thrills
          </motion.h2>
          <motion.div
            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C4A35A] to-transparent mx-auto"
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
              className="absolute inset-0 bg-[#0A0A1A]/90 backdrop-blur-xl"
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
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${selectedExperience.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/50 to-transparent" />
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: selectedExperience.color }}
                />
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0F0F1E]/70 backdrop-blur-sm flex items-center justify-center text-[#D4C4A8] hover:text-[#C4A35A] transition-colors"
                  onClick={() => setSelectedExperience(null)}
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ color: selectedExperience.color, fontFamily: "'Amiri', serif" }}
                >
                  {selectedExperience.subtitle}
                </p>
                <h3
                  className="text-3xl md:text-4xl font-light text-[#E8D5B7] mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {selectedExperience.title}
                </h3>
                <p className="text-[#D4C4A8]/70 text-base leading-relaxed mb-6">
                  {selectedExperience.description}
                </p>
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-[#8A8A9E] text-xs" style={{ fontFamily: "'Amiri', serif" }}>Duration:</span>
                    <span className="text-[#E8D5B7] text-sm">{selectedExperience.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#8A8A9E] text-xs" style={{ fontFamily: "'Amiri', serif" }}>Level:</span>
                    <span className="text-[#E8D5B7] text-sm">{selectedExperience.difficulty}</span>
                  </div>
                </div>
                <button
                  className="magnetic-btn w-full py-4 rounded-full border border-[#C4A35A]/40 text-[#C4A35A] text-sm tracking-[0.2em] uppercase hover:bg-[#C4A35A]/10 transition-all"
                  style={{ fontFamily: "'Amiri', serif" }}
                  onClick={() => {
                    setSelectedExperience(null)
                    document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  data-cursor-hover
                >
                  Book This Experience
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
