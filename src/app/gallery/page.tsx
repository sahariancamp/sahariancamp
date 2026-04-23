import Gallery from '@/components/saharian/Gallery'
import { fetchGallery } from '@/lib/api'

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const galleryItems = await fetchGallery()

  return (
    <main className="pt-24 min-h-screen bg-[#0F0F1E]">
      <Gallery initialData={galleryItems} />
    </main>
  )
}
