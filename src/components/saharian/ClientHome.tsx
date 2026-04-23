'use client'

import { useState } from 'react'
import Preloader from '@/components/saharian/Preloader'
import Hero from '@/components/saharian/Hero'
import Camp from '@/components/saharian/Camp'
import Accommodations from '@/components/saharian/Accommodations'
import Experiences from '@/components/saharian/Experiences'
import Testimonials from '@/components/saharian/Testimonials'
import SectionDivider from '@/components/saharian/SectionDivider'
import Footer from '@/components/saharian/Footer'

interface ClientHomeProps {
  initialTents: any[]
  initialActivities: any[]
}

export default function ClientHome({ initialTents, initialActivities }: ClientHomeProps) {
  const [preloaderComplete, setPreloaderComplete] = useState(false)

  return (
    <>
      <Preloader onComplete={() => setPreloaderComplete(true)} />

      <main className="relative">
        <Hero />
        <SectionDivider variant="compass" />
        <Camp />
        <SectionDivider variant="gold-line" />
        
        {/* Pass data to components */}
        <Accommodations initialData={initialTents} />
        
        <SectionDivider variant="ornament" />
        
        <Experiences initialData={initialActivities} />

        <SectionDivider variant="compass" />
        <Testimonials />
        <Footer />
      </main>
    </>
  )
}
