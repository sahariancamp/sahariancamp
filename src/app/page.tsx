'use client'

import { useState } from 'react'
import Preloader from '@/components/saharian/Preloader'
import Hero from '@/components/saharian/Hero'
import Camp from '@/components/saharian/Camp'
import Experiences from '@/components/saharian/Experiences'
import Testimonials from '@/components/saharian/Testimonials'
import SectionDivider from '@/components/saharian/SectionDivider'

export default function Home() {
  const [preloaderComplete, setPreloaderComplete] = useState(false)

  return (
    <>
      {/* Preloader */}
      <Preloader onComplete={() => setPreloaderComplete(true)} />

      {/* Main content */}
      <main className="relative">
        {/* Sections - Home View */}
        <Hero />
        <SectionDivider variant="compass" />
        <Camp />
        <SectionDivider variant="gold-line" />
        
        {/* Teaser sections */}
        {/* <div className="bg-[#0F0F1E]">
          <div className="max-w-7xl mx-auto py-24 px-6 text-center">
            <h2 
              className="text-3xl md:text-5xl font-light text-[#E8D5B7] mb-12"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Experience the <span className="text-[#C4A35A]">Extraordinary</span>
            </h2>
            <Experiences />
          </div>
        </div> */}

        <SectionDivider variant="ornament" />
        <Testimonials />
        <SectionDivider variant="compass" />
      </main>
    </>
  )
}
