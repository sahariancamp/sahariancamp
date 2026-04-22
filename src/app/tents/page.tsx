'use client'

import Accommodations from '@/components/saharian/Accommodations'
import SectionDivider from '@/components/saharian/SectionDivider'

export default function TentsPage() {
  return (
    <main className="pt-24 min-h-screen bg-[#0F0F1E]">
      <div className="py-20 text-center">
        <h1 
          className="text-5xl md:text-7xl font-light text-[#E8D5B7] mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our <span className="text-[#C4A35A]">Sanctuaries</span>
        </h1>
        <p 
          className="text-[#D4C4A8]/70 max-w-2xl mx-auto px-6 text-lg"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          Discover a collection of uniquely designed luxury tents, each offering a distinct perspective of the Sahara dunes and unmatched comfort.
        </p>
      </div>
      <SectionDivider variant="gold-line" />
      <Accommodations />
    </main>
  )
}
