'use client'

import Experiences from '@/components/saharian/Experiences'
import SectionDivider from '@/components/saharian/SectionDivider'

export default function ActivitiesPage() {
  return (
    <main className="pt-24 min-h-screen bg-[#0F0F1E]">
      <div className="py-20 text-center">
        <h1 
          className="text-5xl md:text-7xl font-light text-[#E8D5B7] mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Desert <span className="text-[#C4A35A]">Rituals</span>
        </h1>
        <p 
          className="text-[#D4C4A8]/70 max-w-2xl mx-auto px-6 text-lg"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          From the thrill of the dunes to the tranquil rhythms of Berber life, discover experiences that will leave an eternal mark on your soul.
        </p>
      </div>
      <SectionDivider variant="compass" />
      <Experiences />
    </main>
  )
}
