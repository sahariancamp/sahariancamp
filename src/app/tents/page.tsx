import { fetchTents } from '@/lib/api'
import Accommodations from '@/components/saharian/Accommodations'

export const dynamic = 'force-dynamic'

export default async function TentsPage() {
  // Fetch data on the server for SEO
  const tents = await fetchTents()

  return (
    <main className="pt-24 min-h-screen bg-[#0F0F1E]">
      <Accommodations initialData={tents} />
    </main>
  )
}
