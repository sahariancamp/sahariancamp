'use client'

import { useState } from 'react'
import LenisProvider from '@/components/saharian/LenisProvider'
import Preloader from '@/components/saharian/Preloader'
import CustomCursor from '@/components/saharian/CustomCursor'
import ScrollProgress from '@/components/saharian/ScrollProgress'
import Navbar from '@/components/saharian/Navbar'
import Hero from '@/components/saharian/Hero'
import Camp from '@/components/saharian/Camp'
import Experiences from '@/components/saharian/Experiences'
import Accommodations from '@/components/saharian/Accommodations'
import Testimonials from '@/components/saharian/Testimonials'
import JourneyPlanner from '@/components/saharian/JourneyPlanner'
import Gallery from '@/components/saharian/Gallery'
import Location from '@/components/saharian/Location'
import Footer from '@/components/saharian/Footer'
import SectionDivider from '@/components/saharian/SectionDivider'

export default function Home() {
  const [preloaderComplete, setPreloaderComplete] = useState(false)

  return (
    <LenisProvider>
      {/* Preloader */}
      <Preloader onComplete={() => setPreloaderComplete(true)} />

      {/* Global effects */}
      <CustomCursor />
      <ScrollProgress />
      <div className="sand-grain-overlay" />

      {/* Main content */}
      <main className="relative">
        {/* Navbar */}
        {preloaderComplete && <Navbar />}

        {/* Sections - The Journey */}
        <Hero />
        <SectionDivider variant="compass" />
        <Camp />
        <SectionDivider variant="gold-line" />
        <Experiences />
        <SectionDivider variant="ornament" />
        <Accommodations />
        <SectionDivider variant="gold-line" />
        <Testimonials />
        <SectionDivider variant="compass" />
        <JourneyPlanner />
        <SectionDivider variant="gold-line" />
        <Gallery />
        <SectionDivider variant="ornament" />
        <Location />
        <Footer />
      </main>
    </LenisProvider>
  )
}
