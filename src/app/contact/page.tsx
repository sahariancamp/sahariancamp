'use client'

import JourneyPlanner from '@/components/saharian/JourneyPlanner'
import Location from '@/components/saharian/Location'
import SectionDivider from '@/components/saharian/SectionDivider'

export default function ContactPage() {
  return (
    <main className="pt-24 min-h-screen bg-[#0F0F1E]">
      <div className="py-20 text-center">
        <h1 
          className="text-5xl md:text-7xl font-light text-[#E8D5B7] mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Begin Your <span className="text-[#C4A35A]">Journey</span>
        </h1>
        <p 
          className="text-[#D4C4A8]/70 max-w-2xl mx-auto px-6 text-lg"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          Have questions or ready to book your escape? Our team is here to help you plan the perfect Saharian experience.
        </p>
      </div>
      <SectionDivider variant="compass" />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 py-12">
        <div className="space-y-12">
            <div>
                <h3 className="text-[#C4A35A] text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Amiri', serif" }}>Visit Us</h3>
                <p className="text-[#E8D5B7] text-2xl font-light mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Saharian Camp</p>
                <p className="text-[#D4C4A8]/60">Merzouga, 52202, Morocco</p>
            </div>
            <div>
                <h3 className="text-[#C4A35A] text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: "'Amiri', serif" }}>Get in Touch</h3>
                <p className="text-[#D4C4A8]/60 mb-2">Email: contact@sahariancamp.com</p>
                <p className="text-[#D4C4A8]/60">Phone: +212 625-886083</p>
            </div>
        </div>
        <div className="glass-card p-8 rounded-3xl border border-[#C4A35A]/10">
            <JourneyPlanner />
        </div>
      </div>
      <SectionDivider variant="gold-line" />
      <Location />
    </main>
  )
}
