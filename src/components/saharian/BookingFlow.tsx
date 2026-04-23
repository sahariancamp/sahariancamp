'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Users, Sparkles, Tent, ArrowRight, ChevronLeft, Check, Send } from 'lucide-react'
import Image from 'next/image'

import { useEffect } from 'react'
import { fetchTents, fetchActivities, createBooking } from '@/lib/api'

export default function BookingFlow() {
  const [tentTypes, setTentTypes] = useState<any[]>([])
  const [activityOptions, setActivityOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState(1) // 1: Type, 2: Dates/Who, 3: Selection, 4: Finalize

  useEffect(() => {
    Promise.all([fetchTents(), fetchActivities()]).then(([tents, acts]) => {
      setTentTypes(tents)
      setActivityOptions(acts)
      setLoading(false)
    }).catch(err => {
      console.error(err)
      setLoading(false)
    })
  }, [])

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

  const handleBookingSubmit = async () => {
    setSubmitting(true)
    try {
      const payload = {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        check_in: formData.date,
        total_price: calculateTotal(),
        notes: `Nights: ${formData.nights}, Adults: ${formData.adults}, Children: ${formData.children}, Type: ${bookingType}`,
      }
      await createBooking(payload)
      alert('Request sent successfully! Our team will contact you soon.')
      setStep(1)
      setSelectedItems([])
    } catch (error) {
      console.error(error)
      alert('Failed to send request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="text-center py-10 text-[#C4A35A]">Preparing Booking Engine...</div>


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
      const tent = tentTypes.find(t => t.id === selectedItems[0] || t.slug === selectedItems[0])
      return (tent?.price_per_night || 0) * formData.nights
    } else {
      return selectedItems.reduce((acc, id) => {
        const act = activityOptions.find(a => a.id === id || a.slug === id)
        return acc + (act?.price_per_person || 0) * (formData.adults + formData.children)
      }, 0)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col">
      {/* Progress Bar - More compact */}
      <div className="flex-none flex items-center justify-center gap-4 mb-8">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full text-xs flex items-center justify-center border transition-all ${
              step >= s ? 'bg-[#C4A35A] border-[#C4A35A] text-[#0F0F1E]' : 'border-[#C4A35A]/20 text-[#8A8A9E]'
            }`}>
              {step > s ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 4 && <div className={`w-8 h-[1px] mx-1 ${step > s ? 'bg-[#C4A35A]' : 'bg-[#C4A35A]/10'}`} />}
          </div>
        ))}
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {/* Step 1: Compact Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <button
                onClick={() => { setBookingType('stay'); nextStep() }}
                className="group relative h-[280px] rounded-2xl overflow-hidden border border-[#C4A35A]/10 hover:border-[#C4A35A]/40 transition-all"
              >
                <Image src="/images/gallery/camp-aerial-layout.jpg" alt="Stay" fill className="object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-[#0A0A1A] via-transparent to-transparent">
                  <Tent className="w-10 h-10 text-[#C4A35A] mb-3" />
                  <h3 className="text-2xl font-light text-[#E8D5B7] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Luxury Stay</h3>
                  <p className="text-[#D4C4A8]/60 text-xs">A night under the stars in premium tents.</p>
                </div>
              </button>

              <button
                onClick={() => { setBookingType('activity'); nextStep() }}
                className="group relative h-[280px] rounded-2xl overflow-hidden border border-[#C4A35A]/10 hover:border-[#C4A35A]/40 transition-all"
              >
                <Image src="/images/gallery/sunset-lounge-area.jpg" alt="Activity" fill className="object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-[#0A0A1A] via-transparent to-transparent">
                  <Sparkles className="w-10 h-10 text-[#C4A35A] mb-3" />
                  <h3 className="text-2xl font-light text-[#E8D5B7] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Desert Experiences</h3>
                  <p className="text-[#D4C4A8]/60 text-xs">Buggies, camels, and Berber music.</p>
                </div>
              </button>
            </motion.div>
          )}

          {/* Step 2: Compact Dates & People */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="glass-card p-6 md:p-8 rounded-2xl border border-[#C4A35A]/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-light text-[#E8D5B7]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {bookingType === 'stay' ? 'Arrival Details' : 'Pick a Date'}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#C4A35A] text-[10px] uppercase tracking-widest">Date</label>
                      <input 
                        type="date" 
                        className="desert-input p-3 rounded-xl w-full text-sm"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                    {bookingType === 'stay' && (
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[#C4A35A] text-[10px] uppercase tracking-widest">Nights</label>
                        <div className="flex items-center gap-4 p-2.5 rounded-xl bg-[#1A1A2E]/50 border border-[#C4A35A]/10">
                          <button onClick={() => setFormData({...formData, nights: Math.max(1, formData.nights - 1)})} className="w-8 h-8 rounded-lg hover:bg-[#C4A35A]/10 text-[#C4A35A]">-</button>
                          <span className="flex-1 text-center text-sm">{formData.nights}</span>
                          <button onClick={() => setFormData({...formData, nights: formData.nights + 1})} className="w-8 h-8 rounded-lg hover:bg-[#C4A35A]/10 text-[#C4A35A]">+</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-light text-[#E8D5B7]" style={{ fontFamily: "'Playfair Display', serif" }}>Number of Guests</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1A1A2E]/50 border border-[#C4A35A]/10">
                      <span className="text-xs">Adults</span>
                      <div className="flex items-center gap-3">
                         <button onClick={() => setFormData({...formData, adults: Math.max(1, formData.adults - 1)})} className="w-8 h-8 rounded-lg hover:bg-[#C4A35A]/10 text-[#C4A35A]">-</button>
                         <span className="text-sm w-4 text-center">{formData.adults}</span>
                         <button onClick={() => setFormData({...formData, adults: formData.adults + 1})} className="w-8 h-8 rounded-lg hover:bg-[#C4A35A]/10 text-[#C4A35A]">+</button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1A1A2E]/50 border border-[#C4A35A]/10">
                      <span className="text-xs">Children</span>
                      <div className="flex items-center gap-3">
                         <button onClick={() => setFormData({...formData, children: Math.max(0, formData.children - 1)})} className="w-8 h-8 rounded-lg hover:bg-[#C4A35A]/10 text-[#C4A35A]">-</button>
                         <span className="text-sm w-4 text-center">{formData.children}</span>
                         <button onClick={() => setFormData({...formData, children: formData.children + 1})} className="w-8 h-8 rounded-lg hover:bg-[#C4A35A]/10 text-[#C4A35A]">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={prevStep} className="flex items-center gap-2 text-[#8A8A9E] hover:text-[#C4A35A] transition-colors text-xs uppercase tracking-widest">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button 
                  onClick={nextStep} 
                  disabled={!formData.date}
                  className="bg-[#C4A35A] text-[#0F0F1E] px-8 py-3 rounded-full text-sm font-medium disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Compact Selection */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="pb-4"
            >
              <h3 className="text-2xl font-light text-[#E8D5B7] text-center mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                {bookingType === 'stay' ? 'Choose Your Sanctuary' : 'Select Activities'}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(bookingType === 'stay' ? tentTypes : activityOptions).map((item) => (
                  <button
                    key={item.id || item.slug}
                    onClick={() => toggleItem(item.id || item.slug)}
                    className={`group relative rounded-2xl overflow-hidden border transition-all ${
                      selectedItems.includes(item.id || item.slug) ? 'border-[#C4A35A] ring-1 ring-[#C4A35A]' : 'border-[#C4A35A]/10 hover:border-[#C4A35A]/40'
                    }`}
                  >
                    <div className="relative h-32">
                      <Image src={item.image_url || '/images/hero-desert.png'} alt={item.name} fill className="object-cover" />
                      {selectedItems.includes(item.id || item.slug) && (
                        <div className="absolute inset-0 bg-[#C4A35A]/20 flex items-center justify-center">
                          <Check className="w-8 h-8 text-[#C4A35A]" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-[#1A1A2E]/90 backdrop-blur-sm text-left">
                      <h4 className="text-[#E8D5B7] text-sm font-medium">{item.name}</h4>
                      <p className="text-[#C4A35A] text-[10px] uppercase tracking-wider">Available Upon Request</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={prevStep} className="flex items-center gap-2 text-[#8A8A9E] hover:text-[#C4A35A] transition-colors text-xs uppercase tracking-widest">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button 
                  onClick={nextStep} 
                  disabled={selectedItems.length === 0}
                  className="bg-[#C4A35A] text-[#0F0F1E] px-8 py-3 rounded-full text-sm font-medium disabled:opacity-50"
                >
                  Finalize Booking
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Compact Finalize */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto"
            >
              <div className="glass-card p-6 rounded-2xl border border-[#C4A35A]/10 space-y-6">
                <h3 className="text-2xl font-light text-[#E8D5B7] text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Confirm Reservation</h3>
                
                <div className="space-y-3">
                  <input 
                    placeholder="Full Name" 
                    className="desert-input w-full p-3.5 rounded-xl text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      placeholder="Email" 
                      type="email"
                      className="desert-input w-full p-3.5 rounded-xl text-sm"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <input 
                      placeholder="Phone" 
                      className="desert-input w-full p-3.5 rounded-xl text-sm"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="bg-[#0F0F1E]/50 p-4 rounded-xl border border-[#C4A35A]/10 space-y-3">
                  <div className="flex justify-between text-[10px] text-[#C4A35A] uppercase tracking-[0.2em]">
                    <span>Summary</span>
                    <span className="capitalize">{bookingType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#D4C4A8]/60">Date</span>
                    <span>{formData.date}</span>
                  </div>
                  <div className="flex justify-between text-lg border-t border-[#C4A35A]/10 pt-3 mt-3">
                    <span className="text-[#E8D5B7] font-light">Price Quote</span>
                    <span className="text-[#C4A35A]">Upon Request</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={prevStep} className="px-6 py-3 rounded-full border border-[#C4A35A]/20 text-[#8A8A9E] text-sm">Back</button>
                  <button 
                    className="flex-1 bg-[#C4A35A] text-[#0F0F1E] py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-[#E8D5A0] transition-all text-sm disabled:opacity-50"
                    onClick={handleBookingSubmit}
                    disabled={submitting || !formData.name || !formData.email}
                  >
                    {submitting ? 'Sending...' : <><Send className="w-4 h-4" /> Send Request</>}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
