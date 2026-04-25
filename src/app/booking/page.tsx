import BookingFlow from '@/components/saharian/BookingFlow'
import { fetchTents } from '@/lib/api'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Book Your Stay | Saharian Camp",
  description: "Reserve your luxury desert experience today. Choose from our premium tents and start planning your journey into the golden dunes of Merzouga.",
}

export const revalidate = 60

export default async function BookingPage() {
  const tents = await fetchTents()

  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-visible">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent)]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col pt-32 pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto w-full flex flex-col">
          <div className="relative">
            <BookingFlow initialTents={tents} />
          </div>
        </div>
      </div>
    </main>
  )
}
