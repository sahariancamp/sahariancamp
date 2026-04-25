import { fetchTents, fetchActivities, fetchReviews } from '@/lib/api'
import ClientHome from '@/components/saharian/ClientHome'
import StructuredData from '@/components/saharian/StructuredData'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Saharian Camp — Where the Dunes Whisper",
  description: "Discover an immersive luxury camp at the edge of Erg Chebbi dunes. Experience authentic Berber hospitality, camel trekking, and unforgettable desert sunsets.",
}

// Force dynamic since we are fetching from an external API
// Cache this page for 1 hour
export const revalidate = 3600

export default async function Home() {
  // Fetch data on the server
  const [tents, activities, reviews] = await Promise.all([
    fetchTents(),
    fetchActivities(),
    fetchReviews()
  ])

  return (
    <>
      <StructuredData reviews={reviews} />
      <ClientHome 
        initialTents={tents} 
        initialActivities={activities} 
        initialReviews={reviews} 
      />
    </>
  )
}
