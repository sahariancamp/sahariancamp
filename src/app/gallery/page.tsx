import Gallery from '@/components/saharian/Gallery'
import { fetchGallery } from '@/lib/api'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Gallery | Saharian Camp",
  description: "Explore the beauty of the Sahara through our lens. Photos of our luxury tents, desert excursions, and the majestic Erg Chebbi dunes.",
}

export const revalidate = 3600

export default async function GalleryPage() {
  const galleryItems = await fetchGallery()

  return (
    <main className="pt-24 min-h-screen bg-background">
      <Gallery initialData={galleryItems} />
    </main>
  )
}
