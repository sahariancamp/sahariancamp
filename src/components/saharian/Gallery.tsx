'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Maximize2, X } from 'lucide-react'
import { fetchGallery } from '@/lib/api'

const categories = ['Sanctuaries', 'Experiences', 'Camp Life']

export default function Gallery({ initialData = [] }: { initialData?: any[] }) {
  const [items, setItems] = useState<any[]>(initialData)
  const [activeCategory, setActiveCategory] = useState('Sanctuaries')
  const [selectedImage, setSelectedImage] = useState<any | null>(null)
  const [loading, setLoading] = useState(initialData.length === 0)

  useEffect(() => {
    if (initialData.length === 0) {
      fetchGallery().then(data => {
        setItems(data)
        setLoading(false)
      }).catch(err => {
        console.error(err)
        setLoading(false)
      })
    }
  }, [initialData])

  const filteredImages = items.filter(img => img.category === activeCategory && img.image_url)

  if (loading) return <div className="text-center py-24 text-[#C4A35A]">Invoking Visual Poetry...</div>

  return (
    <section className="py-12 bg-[#0F0F1E]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-6xl font-light text-[#E8D5B7] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Visual <span className="text-[#C4A35A]">Poetry</span>
          </motion.h2>
          <motion.p 
            className="text-[#D4C4A8]/70 max-w-2xl mx-auto text-base"
            style={{ fontFamily: "'Amiri', serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            A window into the timeless beauty of the Saharian Camp.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2 rounded-full text-xs tracking-[0.2em] uppercase transition-all border ${
                activeCategory === cat
                  ? 'bg-[#C4A35A] border-[#C4A35A] text-[#0F0F1E]'
                  : 'border-[#C4A35A]/10 text-[#8A8A9E] hover:border-[#C4A35A]/40 hover:text-[#D4C4A8]'
              }`}
              style={{ fontFamily: "'Amiri', serif" }}
              data-cursor-hover
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative group cursor-pointer break-inside-avoid rounded-2xl overflow-hidden border border-[#C4A35A]/10"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-[4/5] bg-[#1A1A2E] overflow-hidden">
                  <Image
                    src={image.image_url}
                    alt={image.title}
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#0F0F1E]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#C4A35A] flex items-center justify-center mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Maximize2 className="w-4 h-4 text-[#0F0F1E]" />
                  </div>
                  <h4 className="text-[#E8D5B7] text-lg font-light mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {image.title}
                  </h4>
                  <p className="text-[#C4A35A] text-xs tracking-widest uppercase">
                    {image.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0A0A1A]/95 flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-[#1A1A2E] border border-[#C4A35A]/20 flex items-center justify-center text-[#C4A35A] hover:bg-[#C4A35A]/10 transition-all"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.div 
              className="relative max-w-5xl w-full max-h-full aspect-video md:aspect-auto rounded-3xl overflow-hidden border border-[#C4A35A]/20"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.image_url}
                alt={selectedImage.title}
                width={1920}
                height={1080}
                className="w-full h-full object-contain"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0A0A1A] to-transparent">
                <h3 className="text-2xl md:text-4xl text-[#E8D5B7] font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {selectedImage.title}
                </h3>
                <p className="text-[#C4A35A] tracking-[0.3em] uppercase text-xs mt-2">
                  {selectedImage.category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
