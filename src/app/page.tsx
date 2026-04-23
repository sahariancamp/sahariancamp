import { fetchTents, fetchActivities } from '@/lib/api'
import ClientHome from '@/components/saharian/ClientHome'

// Force dynamic since we are fetching from an external API
export const dynamic = 'force-dynamic'

export default async function Home() {
  // Fetch data on the server
  const [tents, activities] = await Promise.all([
    fetchTents(),
    fetchActivities()
  ])

  return <ClientHome initialTents={tents} initialActivities={activities} />
}
