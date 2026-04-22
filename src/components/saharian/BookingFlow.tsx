'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Users, Sparkles, Tent, ArrowRight, ChevronLeft, Check, Send } from 'lucide-react'
import Image from 'next/image'

const tentTypes = [
  { id: 'quadruple', name: 'Quadruple Deluxe Tent', price: 320, image: '/images/hero-desert.png' },
  { id: 'family', name: 'Family Deluxe Tent', price: 380, image: '/images/camp-tent.png' },
  { id: 'triple', name: 'Triple Deluxe Tent', price: 280, image: '/images/tent-interior.png' },
  { id: 'double', name: 'Double Deluxe Tent', price: 220, image: '/images/camp-tent.png' },
  { id: 'single', name: 'Single Deluxe Tent', price: 150, image: '/images/tent-interior.png' },
]

const activityOptions = [
  { id: 'camel', name: 'Dromedary Ride', price: 45, image: '/images/camel-trek.png' },
  { id: 'buggy', name: 'Buggy Adrenaline', price: 85, image: '/images/quad-biking.png' },
  { id: 'sandboard', name: 'Dunes Boarding', price: 30, image: '/images/sunrise-yoga.png' },
  { id: 'drums', name: 'Drums Rhythm Show', price: 25, image: '/images/berber-music.png' },
]

export default function BookingFlow() {
  const [step, setStep] = useState(1) // 1: Type, 2: Dates/Who, 3: Selection, 4: Finalize
  const [bookingType, setBookingType] = useState<'stay' | 'activity' | null>(null)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [formData, setFormData] = useState({
    date: '',
    nights: 1,
    adults: 2,
    children: 0,
    name: '',
    email: '',
    phone: '',
  })

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  const toggleItem = (id: string) => {
    if (bookingType === 'stay') {
      setSelectedItems([id]) // For stay, usually one tent type at a time or simple selection
    } else {
      setSelectedItems(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      )
    }
  }

  const calculateTotal = () => {
    if (bookingType === 'stay') {
      const tent = tentTypes.find(t => t.id === selectedItems[0])
      return (tent?.price || 0) * formData.nights
    } else {
      return selectedItems.reduce((acc, id) => {
        const act = activityOptions.find(a => a.id === id)
        return acc + (act?.price || 0) * (formData.adults + formData.children)
      }, 0)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Progress Bar */}
      <div className="flex items-center justify-center gap-4 mb-16">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
              step >= s ? 'bg-[#C4A35A] border-[#C4A35A] text-[#0F0F1E]' : 'border-[#C4A35A]/20 text-[#8A8A9E]'
            }`}>
              {step > s ? <Check className="w-5 h-5" /> : s}
            </div>
            {s < 4 && <div className={`w-12 h-[1px] mx-2 ${step > s ? 'bg-[#C4A35A]' : 'bg-[#C4A35A]/10'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Type Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <button
              onClick={() => { setBookingType('stay'); nextStep() }}
              className="group relative h-[400px] rounded-3xl overflow-hidden border border-[#C4A35A]/10 hover:border-[#C4A35A]/40 transition-all"
            >
              <Image src="/images/camp-tent.png" alt="Stay" fill className="object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-t from-[#0A0A1A] via-transparent to-transparent">
                <Tent className="w-12 h-12 text-[#C4A35A] mb-4" />
                <h3 className="text-3xl font-light text-[#E8D5B7] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Luxury Stay</h3>
                <p className="text-[#D4C4A8]/60 text-sm">Experience a night under the stars in our premium tents.</p>
              </div>
            </button>

            <button
              onClick={() => { setBookingType('activity'); nextStep() }}
              className="group relative h-[400px] rounded-3xl overflow-hidden border border-[#C4A35A]/10 hover:border-[#C4A35A]/40 transition-all"
            >
              <Image src="/images/camel-trek.png" alt="Activity" fill className="object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-t from-[#0A0A1A] via-transparent to-transparent">
                <Sparkles className="w-12 h-12 text-[#C4A35A] mb-4" />
                <h3 className="text-3xl font-light text-[#E8D5B7] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Desert Activities</h3>
                <p className="text-[#D4C4A8]/60 text-sm">Adventure awaits. Buggies, camels, and Berber music.</p>
              </div>
            </button>
          </motion.div>
        )}

        {/* Step 2: Dates & People */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="glass-card p-8 md:p-12 rounded-3xl border border-[#C4A35A]/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h3 className="text-2xl font-light text-[#E8D5B7]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {bookingType === 'stay' ? 'When will you arrive?' : 'Pick a date'}
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#C4A35A] text-xs uppercase tracking-widest">Date</label>
                    <input 
                      type="date" 
                      className="desert-input p-4 rounded-xl w-full"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  {bookingType === 'stay' && (
                    <div className="flex flex-col gap-2">
                      <label className="text-[#C4A35A] text-xs uppercase tracking-widest">Number of Nights</label>
                      <div className="flex items-center gap-6 p-4 rounded-xl bg-[#1A1A2E]/50 border border-[#C4A35A]/10">
                        <button onClick={() => setFormData({...formData, nights: Math.max(1, formData.nights - 1)})} className="text-[#C4A35A]">-</button>
                        <span className="flex-1 text-center">{formData.nights}</span>
                        <button onClick={() => setFormData({...formData, nights: formData.nights + 1})} className="text-[#C4A35A]">+</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-2xl font-light text-[#E8D5B7]" style={{ fontFamily: "'Playfair Display', serif" }}>How many travelers?</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#1A1A2E]/50 border border-[#C4A35A]/10">
                    <span className="text-sm">Adults</span>
                    <div className="flex items-center gap-4">
                       <button onClick={() => setFormData({...formData, adults: Math.max(1, formData.adults - 1)})} className="text-[#C4A35A]">-</button>
                       <span>{formData.adults}</span>
                       <button onClick={() => setFormData({...formData, adults: formData.adults + 1})} className="text-[#C4A35A]">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#1A1A2E]/50 border border-[#C4A35A]/10">
                    <span className="text-sm">Children</span>
                    <div className="flex items-center gap-4">
                       <button onClick={() => setFormData({...formData, children: Math.max(0, formData.children - 1)})} className="text-[#C4A35A]">-</button>
                       <span>{formData.children}</span>
                       <button onClick={() => setFormData({...formData, children: formData.children + 1})} className="text-[#C4A35A]">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-12">
              <button onClick={prevStep} className="flex items-center gap-2 text-[#8A8A9E] hover:text-[#C4A35A] transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button 
                onClick={nextStep} 
                disabled={!formData.date}
                className="bg-[#C4A35A] text-[#0F0F1E] px-10 py-4 rounded-full font-medium disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Selection */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h3 className="text-3xl font-light text-[#E8D5B7] text-center mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
              {bookingType === 'stay' ? 'Choose Your Sanctuary' : 'Select Your Activities'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(bookingType === 'stay' ? tentTypes : activityOptions).map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`group relative rounded-3xl overflow-hidden border transition-all ${
                    selectedItems.includes(item.id) ? 'border-[#C4A35A] ring-1 ring-[#C4A35A]' : 'border-[#C4A35A]/10 hover:border-[#C4A35A]/40'
                  }`}
                >
                  <div className="relative h-48">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    {selectedItems.includes(item.id) && (
                      <div className="absolute inset-0 bg-[#C4A35A]/20 flex items-center justify-center">
                        <Check className="w-10 h-10 text-[#C4A35A]" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 bg-[#1A1A2E]/80 backdrop-blur-md">
                    <h4 className="text-[#E8D5B7] font-medium mb-1">{item.name}</h4>
                    <p className="text-[#C4A35A] text-sm">From €{item.price}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-12">
              <button onClick={prevStep} className="flex items-center gap-2 text-[#8A8A9E] hover:text-[#C4A35A] transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button 
                onClick={nextStep} 
                disabled={selectedItems.length === 0}
                className="bg-[#C4A35A] text-[#0F0F1E] px-10 py-4 rounded-full font-medium disabled:opacity-50"
              >
                Finalize Booking
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Finalize */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-card p-8 rounded-3xl border border-[#C4A35A]/10 space-y-8">
              <h3 className="text-3xl font-light text-[#E8D5B7] text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Complete Your Booking</h3>
              
              <div className="space-y-4">
                <input 
                  placeholder="Full Name" 
                  className="desert-input w-full p-4 rounded-xl"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  placeholder="Email Address" 
                  type="email"
                  className="desert-input w-full p-4 rounded-xl"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <input 
                  placeholder="Phone Number" 
                  className="desert-input w-full p-4 rounded-xl"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="bg-[#0F0F1E]/50 p-6 rounded-2xl border border-[#C4A35A]/10 space-y-4">
                <h4 className="text-[#C4A35A] text-xs uppercase tracking-widest">Summary</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-[#D4C4A8]/60">Booking Type</span>
                  <span className="capitalize">{bookingType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#D4C4A8]/60">Date</span>
                  <span>{formData.date}</span>
                </div>
                <div className="flex justify-between text-xl border-t border-[#C4A35A]/10 pt-4 mt-4">
                  <span className="text-[#E8D5B7]">Total Estimate</span>
                  <span className="text-[#C4A35A]">€{calculateTotal()}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={prevStep} className="px-8 py-4 rounded-full border border-[#C4A35A]/20 text-[#8A8A9E]">Back</button>
                <button 
                  className="flex-1 bg-[#C4A35A] text-[#0F0F1E] py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-[#E8D5A0] transition-all"
                  onClick={() => alert('Request sent successfully! Our team will contact you shortly.')}
                >
                  <Send className="w-4 h-4" /> Send Booking Request
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
