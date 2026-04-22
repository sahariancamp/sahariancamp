'use client'

import Gallery from '@/components/saharian/Gallery'
import SectionDivider from '@/components/saharian/SectionDivider'

export default function GalleryPage() {
  return (
    <main className="pt-24 min-h-screen bg-[#0F0F1E]">
      <div className="py-20 text-center">
        <h1 
          className="text-5xl md:text-7xl font-light text-[#E8D5B7] mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Visual <span className="text-[#C4A35A]">Poetry</span>
        </h1>
        <p 
          className="text-[#D4C4A8]/70 max-w-2xl mx-auto px-6 text-lg"
          style={{ fontFamily: "'Amiri', serif" }}
        >
          A window into the timeless beauty of the Saharian Camp and the mesmerizing landscapes of the Merzouga desert.
        </p>
      </div>
      <SectionDivider variant="ornament" />
      <Gallery />
    </main>
  )
}
