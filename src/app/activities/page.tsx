import { fetchActivities } from '@/lib/api'
import Experiences from '@/components/saharian/Experiences'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Desert Activities & Experiences | Saharian Camp",
  description: "From camel trekking at sunset to traditional Berber music, discover the unique activities and experiences that await you at Saharian Camp.",
}

export const revalidate = 3600

export default async function ActivitiesPage() {
  // Fetch data on the server for SEO
  const activities = await fetchActivities()

  return (
    <main className="pt-24 min-h-screen bg-background">
      <Experiences initialData={activities} />
    </main>
  )
}
