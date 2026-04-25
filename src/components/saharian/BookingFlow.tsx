'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarIcon, Users, Briefcase, Tent, ArrowRight, ChevronLeft, Check, Send } from 'lucide-react'
import Image from 'next/image'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { fetchTents, createBooking } from '@/lib/api'
import Link from 'next/link'

type BookingType = 'individual' | 'agency'

export default function BookingFlow({ initialTents = [] }: { initialTents?: any[] }) {
  const [step, setStep] = useState(1)
  const [tents, setTents] = useState<any[]>(initialTents)
  const [loading, setLoading] = useState(initialTents.length === 0)
  const [submitting, setSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [bookingNumber, setBookingNumber] = useState('')

  // Form State
  const [bookingType, setBookingType] = useState<BookingType>('individual')
  const [dates, setDates] = useState<{ checkIn: Date | undefined, checkOut: Date | undefined }>({ checkIn: undefined, checkOut: undefined })
  const [selectedTents, setSelectedTents] = useState<{ [id: number]: number }>({}) // { tent_id: quantity }
  const [details, setDetails] = useState({ name: '', email: '', phone: '' })

  useEffect(() => {
    if (initialTents.length === 0) {
      fetchTents().then(data => {
        setTents(data)
        setLoading(false)
      }).catch(err => {
        console.error(err)
        setLoading(false)
      })
    }
  }, [initialTents])

  // Derived Values
  const totalTentsSelected = Object.values(selectedTents).reduce((a, b) => a + b, 0)
  const isAgencyValid = bookingType === 'agency' ? totalTentsSelected >= 3 : totalTentsSelected >= 1
  
  const calculateNights = () => {
    let nights = 1
    if (dates.checkIn && dates.checkOut) {
      const diffTime = Math.abs(dates.checkOut.getTime() - dates.checkIn.getTime())
      nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      if (nights === 0) nights = 1
    }
    return nights
  }

  const calculateTotal = () => {
    let total = 0
    const nights = calculateNights()

    Object.entries(selectedTents).forEach(([idStr, quantity]) => {
      const tent = tents.find(t => t.id === parseInt(idStr))
      if (tent) {
        const price = bookingType === 'agency' && tent.agency_price ? Number(tent.agency_price) : Number(tent.price_per_night)
        total += (price * quantity) * nights
      }
    })
    return total
  }

  const handleTentSelect = (id: number, delta: number) => {
    setSelectedTents(prev => {
      const current = prev[id] || 0
      const newQty = Math.max(0, current + delta)
      const updated = { ...prev }
      if (newQty === 0) delete updated[id]
      else updated[id] = newQty
      return updated
    })
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const itemsArray = Object.entries(selectedTents).map(([idStr, qty]) => {
        return { id: parseInt(idStr), quantity: qty }
      })

      const payload = {
        booking_type: bookingType,
        customer_name: details.name,
        customer_email: details.email,
        customer_phone: details.phone,
        check_in: dates.checkIn ? format(dates.checkIn, 'yyyy-MM-dd') : '',
        check_out: dates.checkOut ? format(dates.checkOut, 'yyyy-MM-dd') : '',
        total_price: calculateTotal(),
        items: itemsArray,
      }
      const res = await createBooking(payload)
      setBookingNumber(payload.booking_type === 'agency' ? 'Agency Request' : (res as any).booking?.booking_number || 'Confirmed')
      setIsSuccess(true)
      // Reset state for potential next booking
      setSelectedTents({})
      setDetails({ name: '', email: '', phone: '' })
      setDates({ checkIn: undefined, checkOut: undefined })
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to send booking request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="text-center py-20 text-[#C4A35A] animate-pulse">Loading Booking System...</div>

  const changeStep = (newStep: number) => {
    setStep(newStep)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-20 px-6 bg-card/50 backdrop-blur-xl border border-primary/20 rounded-3xl"
      >
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-4xl font-serif text-foreground mb-4">Thank You!</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Your booking request has been received. Our team will review the details and contact you shortly.
        </p>
        <div className="inline-block px-6 py-3 bg-primary/10 border border-primary/30 rounded-xl mb-12">
          <span className="text-sm text-primary/70 uppercase tracking-widest block mb-1">Booking Reference</span>
          <span className="text-xl font-mono text-foreground tracking-wider">{bookingNumber}</span>
        </div>
          <Link 
            href="/" 
            className="text-primary hover:text-foreground transition-colors flex items-center justify-center gap-2 mx-auto text-center"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="flex items-center justify-center gap-4 mb-12">
        {[1, 2, 3, 4, 5].map(s => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= s ? 'bg-primary text-background shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]' : 'border border-primary/30 text-muted-foreground'
            }`}>
              {step > s ? <Check className="w-5 h-5" /> : s}
            </div>
            {s !== 5 && (
              <div className={`w-8 md:w-16 h-1 mx-2 rounded-full ${step > s ? 'bg-primary' : 'bg-primary/10'}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: Booking Type */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-light text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Who is booking?</h2>
              <p className="text-muted-foreground/70">Please select your traveler profile to get accurate pricing.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setBookingType('individual')}
                className={`p-8 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-4 ${
                  bookingType === 'individual' ? 'border-primary bg-card shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)]' : 'border-card hover:border-primary/50 bg-background'
                }`}
              >
                <Users className={`w-12 h-12 ${bookingType === 'individual' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div>
                  <h3 className="text-xl text-foreground font-medium mb-2">Individual Guest</h3>
                  <p className="text-sm text-muted-foreground/70">For couples, families, or solo luxury travelers.</p>
                </div>
              </button>
              <button
                onClick={() => setBookingType('agency')}
                className={`p-8 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-4 ${
                  bookingType === 'agency' ? 'border-primary bg-card shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)]' : 'border-card hover:border-primary/50 bg-background'
                }`}
              >
                <Briefcase className={`w-12 h-12 ${bookingType === 'agency' ? 'text-primary' : 'text-muted-foreground'}`} />
                <div>
                  <h3 className="text-xl text-foreground font-medium mb-2">Travel Agency (B2B)</h3>
                  <p className="text-sm text-muted-foreground/70">Special rates for tour operators (Minimum 3 tents required).</p>
                </div>
              </button>
            </div>
            <div className="flex justify-end mt-8">
              <button onClick={() => changeStep(2)} className="flex items-center gap-2 px-8 py-3 bg-primary text-background font-medium rounded-full hover:opacity-90 transition-colors shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
                Next Step <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Dates */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 min-h-[500px]">
            <div className="text-center">
              <h2 className="text-3xl font-light text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>When will you arrive?</h2>
              <p className="text-muted-foreground/70">Select your check-in and check-out dates.</p>
            </div>
            <div className="bg-card p-8 rounded-3xl border border-primary/20 max-w-lg mx-auto space-y-8">
              <div className="space-y-2 relative">
                <label className="block text-foreground text-sm font-medium">Check-in Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full flex items-center justify-between bg-background border border-primary/30 rounded-xl px-4 py-4 text-foreground hover:border-primary/60 transition-colors">
                      {dates.checkIn ? format(dates.checkIn, "PPP") : <span className="text-muted-foreground/50">Pick a date</span>}
                      <CalendarIcon className="w-5 h-5 text-primary" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background border-primary/30 text-foreground" align="start">
                    <Calendar
                      mode="single"
                      selected={dates.checkIn}
                      onSelect={(date) => setDates({ ...dates, checkIn: date })}
                      initialFocus
                      className="rounded-xl shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)]"
                      classNames={{
                        day_selected: "bg-primary text-background hover:bg-primary hover:text-background focus:bg-primary focus:text-background",
                        day_today: "bg-card text-primary",
                        button: "hover:bg-card hover:text-foreground",
                        head_cell: "text-muted-foreground",
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2 relative">
                <label className="block text-foreground text-sm font-medium">Check-out Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-full flex items-center justify-between bg-background border border-primary/30 rounded-xl px-4 py-4 text-foreground hover:border-primary/60 transition-colors">
                      {dates.checkOut ? format(dates.checkOut, "PPP") : <span className="text-muted-foreground/50">Pick a date</span>}
                      <CalendarIcon className="w-5 h-5 text-primary" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background border-primary/30 text-foreground" align="start">
                    <Calendar
                      mode="single"
                      selected={dates.checkOut}
                      onSelect={(date) => setDates({ ...dates, checkOut: date })}
                      initialFocus
                      disabled={(date) => dates.checkIn ? date < dates.checkIn : false}
                      className="rounded-xl shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)]"
                      classNames={{
                        day_selected: "bg-primary text-background hover:bg-primary hover:text-background focus:bg-primary focus:text-background",
                        day_today: "bg-card text-primary",
                        button: "hover:bg-card hover:text-foreground",
                        head_cell: "text-muted-foreground",
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={() => changeStep(1)} className="flex items-center gap-2 px-8 py-3 text-muted-foreground hover:text-primary transition-colors">
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              <button 
                onClick={() => changeStep(3)} 
                disabled={!dates.checkIn || !dates.checkOut}
                className="flex items-center gap-2 px-8 py-3 bg-primary text-background font-medium rounded-full hover:opacity-90 transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] disabled:shadow-none"
              >
                Next Step <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Tents Selection */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-light text-[#E8D5B7] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Select Your Tents</h2>
              <p className="text-[#D4C4A8]/70">
                {bookingType === 'agency' ? 'Agency Mode: Minimum 3 tents required.' : 'Select the tents for your stay.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tents.map(tent => {
                const qty = selectedTents[tent.id] || 0
                const price = bookingType === 'agency' && tent.agency_price ? tent.agency_price : tent.price_per_night
                
                return (
                   <div key={tent.id} className={`bg-card rounded-2xl overflow-hidden border transition-all flex h-32 ${qty > 0 ? 'border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]' : 'border-primary/10 hover:border-primary/30'}`}>
                    {tent.image_url && (
                      <div className="w-1/3 relative h-full">
                        <Image src={tent.image_url} alt={tent.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card" />
                      </div>
                    )}
                    <div className="p-4 relative flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg text-foreground font-medium truncate pr-2">{tent.name}</h3>
                        <p className="text-primary font-bold whitespace-nowrap">${price}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto bg-background rounded-lg border border-primary/20 overflow-hidden w-28">
                        <button onClick={() => handleTentSelect(tent.id, -1)} className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-card transition-colors">-</button>
                        <span className="text-sm font-medium text-foreground w-6 text-center">{qty}</span>
                        <button onClick={() => handleTentSelect(tent.id, 1)} className="w-8 h-8 flex items-center justify-center text-background bg-primary hover:opacity-90 transition-colors">+</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-between mt-8 items-center bg-card p-4 rounded-full border border-primary/10">
              <button onClick={() => changeStep(2)} className="flex items-center gap-2 px-6 py-2 text-muted-foreground hover:text-primary transition-colors">
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              
              <div className="flex items-center gap-6 pr-2">
                <span className="text-muted-foreground hidden sm:inline">Selected: <strong className="text-primary">{totalTentsSelected}</strong> tents</span>
                <button 
                  onClick={() => changeStep(4)} 
                  disabled={!isAgencyValid}
                  className="flex items-center gap-2 px-6 py-2 bg-primary text-background font-medium rounded-full hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] disabled:shadow-none"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Details */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-light text-[#E8D5B7] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Your Details</h2>
              <p className="text-[#D4C4A8]/70">Where should we send the confirmation?</p>
            </div>
            <div className="bg-card p-8 rounded-3xl border border-primary/20 max-w-xl mx-auto space-y-6">
              <div>
                <label className="block text-foreground mb-2 text-sm">{bookingType === 'agency' ? 'Agency Name' : 'Full Name'}</label>
                <input 
                  type="text" 
                  value={details.name}
                  onChange={e => setDetails({...details, name: e.target.value})}
                  className="w-full bg-background border border-primary/30 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary"
                  placeholder={bookingType === 'agency' ? 'e.g. Sahara Tours LLC' : 'e.g. John Doe'}
                />
              </div>
              <div>
                <label className="block text-foreground mb-2 text-sm">Email Address</label>
                <input 
                  type="email" 
                  value={details.email}
                  onChange={e => setDetails({...details, email: e.target.value})}
                  className="w-full bg-background border border-primary/30 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary"
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <label className="block text-foreground mb-2 text-sm">WhatsApp / Phone Number</label>
                <input 
                  type="tel" 
                  value={details.phone}
                  onChange={e => setDetails({...details, phone: e.target.value})}
                  className="w-full bg-background border border-primary/30 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary"
                  placeholder="+212 600 000 000"
                />
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={() => changeStep(3)} className="flex items-center gap-2 px-8 py-3 text-muted-foreground hover:text-primary transition-colors">
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              <button 
                onClick={() => changeStep(5)} 
                disabled={!details.name || !details.email || !details.phone}
                className="flex items-center gap-2 px-8 py-3 bg-primary text-background font-medium rounded-full hover:opacity-90 transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] disabled:shadow-none"
              >
                Review Booking <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Summary */}
        {step === 5 && (
          <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-light text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Booking Summary</h2>
              <p className="text-muted-foreground/70">Please review your request before submitting.</p>
            </div>
            
            <div className="bg-card rounded-3xl border border-primary/30 overflow-hidden max-w-2xl mx-auto shadow-2xl">
              <div className="p-8 border-b border-primary/10">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-muted-foreground/50 text-sm mb-1">{bookingType === 'agency' ? 'Agency' : 'Guest'}</p>
                    <p className="text-foreground font-medium">{details.name}</p>
                    <p className="text-muted-foreground text-sm">{details.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground/50 text-sm mb-1">Dates ({calculateNights()} {calculateNights() === 1 ? 'Night' : 'Nights'})</p>
                    <p className="text-foreground font-medium">{dates.checkIn ? format(dates.checkIn, "MMM do") : ''} to {dates.checkOut ? format(dates.checkOut, "MMM do") : ''}</p>
                  </div>
                </div>

                <h4 className="text-primary font-medium mb-4 uppercase tracking-wider text-sm border-b border-primary/20 pb-2">Selected Tents</h4>
                <div className="space-y-3">
                  {Object.entries(selectedTents).map(([idStr, qty]) => {
                    const tent = tents.find(t => t.id === parseInt(idStr))
                    if (!tent) return null
                    const price = bookingType === 'agency' && tent.agency_price ? Number(tent.agency_price) : Number(tent.price_per_night)
                    return (
                      <div key={idStr} className="flex justify-between items-center text-foreground">
                        <span>{qty}x {tent.name}</span>
                        <span>${price * qty} <span className="text-xs text-muted-foreground/50">/night</span></span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="p-8 bg-background flex justify-between items-center">
                <span className="text-muted-foreground uppercase tracking-wider text-sm">Estimated Total</span>
                <span className="text-4xl text-primary font-light">${calculateTotal()}</span>
              </div>
            </div>

            <div className="flex justify-between mt-8 max-w-2xl mx-auto">
              <button onClick={() => changeStep(4)} className="flex items-center gap-2 px-8 py-3 text-muted-foreground hover:text-primary transition-colors">
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              <button 
                onClick={handleSubmit} 
                disabled={submitting}
                className="flex items-center gap-2 px-8 py-3 bg-primary text-background font-medium rounded-full hover:opacity-90 transition-colors disabled:opacity-50 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]"
              >
                {submitting ? 'Submitting...' : 'Confirm Request'} <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
