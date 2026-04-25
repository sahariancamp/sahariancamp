import { fetchTents } from '@/lib/api'
import Accommodations from '@/components/saharian/Accommodations'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Our Tents | Luxury Accommodations in Merzouga",
  description: "Discover our selection of luxury desert tents. From standard comfort to deluxe suites, every tent offers a unique blend of Berber authenticity and modern elegance.",
}

export const revalidate = 3600

export default async function TentsPage() {
  // Fetch data on the server for SEO
  const tents = await fetchTents()

  return (
    <main className="pt-24 min-h-screen bg-background">
      <Accommodations initialData={tents} />
    </main>
  )
}
