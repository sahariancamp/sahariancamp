'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Users, Sparkles, MapPin, ChevronRight, ChevronLeft, Minus, Plus, Check } from 'lucide-react'

const steps = [
  { id: 'when', label: 'When', icon: Calendar },
  { id: 'who', label: 'Who', icon: Users },
  { id: 'what', label: 'What', icon: Sparkles },
  { id: 'where', label: 'Where From', icon: MapPin },
]

const experienceOptions = [
  { id: 'camel', name: 'Camel Trekking', price: 45 },
  { id: 'quad', name: 'Quad Biking', price: 75 },
  { id: 'music', name: 'Berber Music Night', price: 0 },
  { id: 'yoga', name: 'Sunrise Yoga', price: 25 },
  { id: 'cooking', name: 'Cooking Class', price: 35 },
  { id: 'stargazing', name: 'Stargazing Tour', price: 30 },
]

const departurePoints = [
  { id: 'marrakech', name: 'Marrakech', distance: '560 km', duration: '9-10 hours', price: 0 },
  { id: 'fes', name: 'Fès', distance: '470 km', duration: '7-8 hours', price: 0 },
  { id: 'essaouira', name: 'Essaouira', distance: '680 km', duration: '10-11 hours', price: 30 },
  { id: 'casablanca', name: 'Casablanca', distance: '630 km', duration: '9-10 hours', price: 20 },
]

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export default function JourneyPlanner() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([])
  const [departure, setDeparture] = useState<string | null>(null)
  const [nights, setNights] = useState(2)

  const basePricePerNight = 280
  const experienceTotal = selectedExperiences.reduce((acc, id) => {
    const exp = experienceOptions.find(e => e.id === id)
    return acc + (exp?.price || 0) * (adults + children)
  }, 0)

  const accommodationTotal = basePricePerNight * nights
  const departureExtra = departurePoints.find(d => d.id === departure)?.price || 0
  const transportTotal = departureExtra * (adults + children)
  const totalPrice = accommodationTotal + experienceTotal + transportTotal

  const toggleExperience = (id: string) => {
    setSelectedExperiences(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    )
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }
  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  return (
    <section id="journey" className="py-16 md:py-24 px-6 desert-gradient relative">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <motion.span
            className="text-[#C4A35A] text-xs tracking-[0.5em] uppercase block mb-6"
            style={{ fontFamily: "'Amiri', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Your Path
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-light text-[#E8D5B7] mb-6 text-glow"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Plan Your <span className="text-[#C4A35A]">Journey</span>
          </motion.h2>
          <motion.p
            className="text-[#D4C4A8]/60 text-lg max-w-xl mx-auto"
            style={{ fontFamily: "'Amiri', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Answer four questions, and we&apos;ll craft your perfect desert escape.
          </motion.p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.id} className="flex items-center">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all border ${
                    i === currentStep
                      ? 'bg-[#C4A35A]/15 border-[#C4A35A]/40 text-[#C4A35A]'
                      : i < currentStep
                        ? 'bg-[#2D5A4A]/10 border-[#2D5A4A]/30 text-[#2D5A4A]'
                        : 'border-[#C4A35A]/10 text-[#8A8A9E]'
                  }`}
                  onClick={() => setCurrentStep(i)}
                  data-cursor-hover
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-xs tracking-wider uppercase hidden sm:inline" style={{ fontFamily: "'Amiri', serif" }}>
                    {step.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-[1px] mx-1 ${i < currentStep ? 'bg-[#2D5A4A]/50' : 'bg-[#C4A35A]/10'}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Step content */}
        <div className="glass-card rounded-3xl p-6 md:p-10 min-h-[400px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 0: When */}
            {currentStep === 0 && (
              <motion.div
                key="when"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl md:text-3xl font-light text-[#E8D5B7] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  When do you wish to travel?
                </h3>
                <p className="text-[#D4C4A8]/60 text-sm mb-8" style={{ fontFamily: "'Amiri', serif" }}>
                  Choose your month — each season offers a different face of the Sahara
                </p>

                {/* Circular month selector */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-8">
                  {months.map((month, i) => (
                    <button
                      key={month}
                      className={`relative py-4 rounded-2xl transition-all border ${
                        selectedMonth === i
                          ? 'bg-[#C4A35A]/15 border-[#C4A35A]/40 text-[#C4A35A]'
                          : 'bg-[#1A1A2E]/50 border-[#C4A35A]/10 text-[#D4C4A8]/60 hover:border-[#C4A35A]/20 hover:text-[#D4C4A8]'
                      }`}
                      onClick={() => setSelectedMonth(i)}
                      data-cursor-hover
                    >
                      <span className="text-sm" style={{ fontFamily: "'Amiri', serif" }}>{month}</span>
                      {/* Moon phase indicator */}
                      {selectedMonth === i && (
                        <motion.div
                          className="absolute top-1 right-1 w-3 h-3 rounded-full bg-[#C4A35A]"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring' }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Nights selector */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#1A1A2E]/50 border border-[#C4A35A]/10">
                  <span className="text-[#D4C4A8] text-sm" style={{ fontFamily: "'Amiri', serif" }}>Number of nights</span>
                  <div className="flex items-center gap-4">
                    <button
                      className="w-8 h-8 rounded-full border border-[#C4A35A]/30 flex items-center justify-center text-[#C4A35A] hover:bg-[#C4A35A]/10"
                      onClick={() => setNights(Math.max(1, nights - 1))}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-[#E8D5B7] text-xl font-light w-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {nights}
                    </span>
                    <button
                      className="w-8 h-8 rounded-full border border-[#C4A35A]/30 flex items-center justify-center text-[#C4A35A] hover:bg-[#C4A35A]/10"
                      onClick={() => setNights(Math.min(7, nights + 1))}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Who */}
            {currentStep === 1 && (
              <motion.div
                key="who"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl md:text-3xl font-light text-[#E8D5B7] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Who is traveling?
                </h3>
                <p className="text-[#D4C4A8]/60 text-sm mb-8" style={{ fontFamily: "'Amiri', serif" }}>
                  Every guest is a story — tell us about yours
                </p>

                <div className="space-y-6">
                  {/* Adults */}
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-[#1A1A2E]/50 border border-[#C4A35A]/10">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {Array.from({ length: Math.min(adults, 4) }).map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-[#C4A35A]/20 border-2 border-[#1A1A2E] flex items-center justify-center">
                            <Users className="w-3 h-3 text-[#C4A35A]" />
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-[#E8D5B7] text-sm font-medium">Adults</p>
                        <p className="text-[#8A8A9E] text-xs">Age 13+</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        className="w-10 h-10 rounded-full border border-[#C4A35A]/30 flex items-center justify-center text-[#C4A35A] hover:bg-[#C4A35A]/10"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-[#E8D5B7] text-2xl font-light w-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {adults}
                      </span>
                      <button
                        className="w-10 h-10 rounded-full border border-[#C4A35A]/30 flex items-center justify-center text-[#C4A35A] hover:bg-[#C4A35A]/10"
                        onClick={() => setAdults(Math.min(6, adults + 1))}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between p-6 rounded-2xl bg-[#1A1A2E]/50 border border-[#C4A35A]/10">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#2D5A4A]/20 border-2 border-[#1A1A2E] flex items-center justify-center">
                        <Users className="w-3 h-3 text-[#2D5A4A]" />
                      </div>
                      <div>
                        <p className="text-[#E8D5B7] text-sm font-medium">Children</p>
                        <p className="text-[#8A8A9E] text-xs">Age 2-12</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        className="w-10 h-10 rounded-full border border-[#C4A35A]/30 flex items-center justify-center text-[#C4A35A] hover:bg-[#C4A35A]/10"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-[#E8D5B7] text-2xl font-light w-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {children}
                      </span>
                      <button
                        className="w-10 h-10 rounded-full border border-[#C4A35A]/30 flex items-center justify-center text-[#C4A35A] hover:bg-[#C4A35A]/10"
                        onClick={() => setChildren(Math.min(4, children + 1))}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: What */}
            {currentStep === 2 && (
              <motion.div
                key="what"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl md:text-3xl font-light text-[#E8D5B7] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  What experiences call to you?
                </h3>
                <p className="text-[#D4C4A8]/60 text-sm mb-8" style={{ fontFamily: "'Amiri', serif" }}>
                  Toggle to add — each one weaves into your desert story
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {experienceOptions.map((exp) => {
                    const isSelected = selectedExperiences.includes(exp.id)
                    return (
                      <button
                        key={exp.id}
                        className={`p-4 rounded-2xl transition-all border text-left flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#C4A35A]/10 border-[#C4A35A]/40'
                            : 'bg-[#1A1A2E]/50 border-[#C4A35A]/10 hover:border-[#C4A35A]/20'
                        }`}
                        onClick={() => toggleExperience(exp.id)}
                        data-cursor-hover
                      >
                        <div>
                          <p className={`text-sm font-medium ${isSelected ? 'text-[#C4A35A]' : 'text-[#E8D5B7]'}`}>
                            {exp.name}
                          </p>
                          <p className="text-[#8A8A9E] text-xs mt-1">
                            {exp.price === 0 ? 'Complimentary' : 'Included in Quote'}
                          </p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected ? 'border-[#C4A35A] bg-[#C4A35A]' : 'border-[#C4A35A]/20'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-[#0F0F1E]" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 3: Where From */}
            {currentStep === 3 && (
              <motion.div
                key="where"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl md:text-3xl font-light text-[#E8D5B7] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Where does your journey begin?
                </h3>
                <p className="text-[#D4C4A8]/60 text-sm mb-8" style={{ fontFamily: "'Amiri', serif" }}>
                  We arrange private transport from major Moroccan cities
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {departurePoints.map((point) => {
                    const isSelected = departure === point.id
                    return (
                      <button
                        key={point.id}
                        className={`p-5 rounded-2xl transition-all border text-left ${
                          isSelected
                            ? 'bg-[#C4A35A]/10 border-[#C4A35A]/40'
                            : 'bg-[#1A1A2E]/50 border-[#C4A35A]/10 hover:border-[#C4A35A]/20'
                        }`}
                        onClick={() => setDeparture(point.id)}
                        data-cursor-hover
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className={`w-4 h-4 ${isSelected ? 'text-[#C4A35A]' : 'text-[#8A8A9E]'}`} />
                          <p className={`text-base font-medium ${isSelected ? 'text-[#C4A35A]' : 'text-[#E8D5B7]'}`}>
                            {point.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-[#8A8A9E] ml-7">
                          <span>{point.distance}</span>
                          <span>•</span>
                          <span>{point.duration}</span>
                          {point.price > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-[#C4A35A]">Upon Request</span>
                            </>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Summary */}
                {departure && (
                  <motion.div
                    className="p-6 rounded-2xl bg-[#1A1A2E]/80 border border-[#C4A35A]/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h4 className="text-[#C4A35A] text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Amiri', serif" }}>
                      Your Journey Summary
                    </h4>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#D4C4A8]/60">Accommodation ({nights} nights)</span>
                        <span className="text-[#E8D5B7]">Included</span>
                      </div>
                      {experienceTotal > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[#D4C4A8]/60">Experiences ({selectedExperiences.length} selected)</span>
                          <span className="text-[#E8D5B7]">Included</span>
                        </div>
                      )}
                      {transportTotal > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[#D4C4A8]/60">Transport from {departurePoints.find(d => d.id === departure)?.name}</span>
                          <span className="text-[#E8D5B7]">Included</span>
                        </div>
                      )}
                      <div className="golden-line my-4" />
                      <div className="flex justify-between">
                        <span className="text-[#E8D5B7] font-medium">Total Price</span>
                        <motion.span
                          className="text-2xl text-[#C4A35A] font-light"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Upon Request
                        </motion.span>
                      </div>
                    </div>

                    <button
                      className="magnetic-btn w-full py-4 rounded-full bg-[#C4A35A] text-[#0F0F1E] text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#E8D5A0] transition-all"
                      style={{ fontFamily: "'Amiri', serif" }}
                      data-cursor-hover
                    >
                      Request a Quote
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#C4A35A]/10">
            <button
              className={`flex items-center gap-2 text-sm tracking-wider uppercase transition-all ${
                currentStep > 0 ? 'text-[#C4A35A] hover:text-[#E8D5A0]' : 'text-transparent pointer-events-none'
              }`}
              style={{ fontFamily: "'Amiri', serif" }}
              onClick={prevStep}
              data-cursor-hover
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex items-center gap-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentStep ? 'bg-[#C4A35A] w-6' : i < currentStep ? 'bg-[#2D5A4A]' : 'bg-[#C4A35A]/20'
                  }`}
                />
              ))}
            </div>

            {currentStep < steps.length - 1 && (
              <button
                className="flex items-center gap-2 text-sm tracking-wider uppercase text-[#C4A35A] hover:text-[#E8D5A0] transition-all"
                style={{ fontFamily: "'Amiri', serif" }}
                onClick={nextStep}
                data-cursor-hover
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
