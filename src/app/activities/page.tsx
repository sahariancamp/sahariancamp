import { fetchActivities } from '@/lib/api'
import Experiences from '@/components/saharian/Experiences'

export const dynamic = 'force-dynamic'

export default async function ActivitiesPage() {
  // Fetch data on the server for SEO
  const activities = await fetchActivities()

  return (
    <main className="pt-24 min-h-screen bg-[#0F0F1E]">
      <Experiences initialData={activities} />
    </main>
  )
}
