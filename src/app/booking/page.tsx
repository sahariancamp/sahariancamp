'use client'

import BookingFlow from '@/components/saharian/BookingFlow'
import SectionDivider from '@/components/saharian/SectionDivider'

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#0F0F1E] flex flex-col relative overflow-visible">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(196,163,90,0.05),transparent)]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto w-full flex flex-col">
          <div className="relative">
            <BookingFlow />
          </div>
        </div>
      </div>
    </main>
  )
}
