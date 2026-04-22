'use client'

import BookingFlow from '@/components/saharian/BookingFlow'
import SectionDivider from '@/components/saharian/SectionDivider'

export default function BookingPage() {
  return (
    <main className="pt-24 min-h-screen bg-[#0F0F1E]">
      <div className="py-20 text-center">
        <h1 
          className="text-5xl md:text-7xl font-light text-[#E8D5B7] mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your <span className="text-[#C4A35A]">Saharian</span> Escape
        </h1>
        <p 
          className="text-[#D4C4A8]/70 max-w-2xl mx-auto px-6 text-lg"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          Select your experience, pick your dates, and let us handle the rest. Your journey into the heart of the dunes starts here.
        </p>
      </div>
      <SectionDivider variant="compass" />
      <BookingFlow />
    </main>
  )
}
