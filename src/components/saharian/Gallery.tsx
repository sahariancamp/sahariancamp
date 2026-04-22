'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const galleryCategories = ['All', 'Dunes', 'Tents', 'Food', 'People', 'Stars']

const galleryImages = [
  { id: 1, src: '/images/hero-desert.png', category: 'Dunes', title: 'Golden hour at Erg Chebbi', span: 'col-span-1 row-span-2' },
  { id: 2, src: '/images/camp-tent.png', category: 'Tents', title: 'Luxury tent at dawn', span: 'col-span-1 row-span-1' },
  { id: 3, src: '/images/dining-stars.png', category: 'Food', title: 'Dinner under the stars', span: 'col-span-1 row-span-1' },
  { id: 4, src: '/images/camel-trek.png', category: 'Dunes', title: 'Caravan at sunset', span: 'col-span-1 row-span-2' },
  { id: 5, src: '/images/stargazing.png', category: 'Stars', title: 'The Milky Way reveals itself', span: 'col-span-1 row-span-1' },
  { id: 6, src: '/images/tea-ceremony.png', category: 'People', title: 'Traditional tea ceremony', span: 'col-span-1 row-span-1' },
  { id: 7, src: '/images/berber-music.png', category: 'People', title: 'Night of Berber music', span: 'col-span-1 row-span-1' },
  { id: 8, src: '/images/tent-interior.png', category: 'Tents', title: 'Inside the Sahara Suite', span: 'col-span-1 row-span-1' },
  { id: 9, src: '/images/sunrise-yoga.png', category: 'People', title: 'Sunrise yoga on the dunes', span: 'col-span-1 row-span-1' },
  { id: 10, src: '/images/quad-biking.png', category: 'Dunes', title: 'Adventure through the dunes', span: 'col-span-1 row-span-1' },
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null)

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory)

  return (
    <section id="gallery" className="py-24 md:py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span
            className="text-[#C4A35A] text-xs tracking-[0.5em] uppercase block mb-6"
            style={{ fontFamily: "'Amiri', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Light & Shadow
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-light text-[#E8D5B7] mb-6 text-glow"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Captured <span className="text-[#C4A35A]">Moments</span>
          </motion.h2>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full text-xs tracking-[0.2em] uppercase transition-all border ${
                activeCategory === cat
                  ? 'bg-[#C4A35A]/15 border-[#C4A35A]/40 text-[#C4A35A]'
                  : 'border-[#C4A35A]/10 text-[#8A8A9E] hover:border-[#C4A35A]/20 hover:text-[#D4C4A8]'
              }`}
              style={{ fontFamily: "'Amiri', serif" }}
              onClick={() => setActiveCategory(cat)}
              data-cursor-hover
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div className="masonry-grid" layout>
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                className="relative group cursor-pointer overflow-hidden rounded-xl"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxImage(image)}
                data-cursor-hover
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${image.src}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[#E8D5B7] text-sm font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {image.title}
                    </p>
                    <p className="text-[#C4A35A] text-xs mt-1" style={{ fontFamily: "'Amiri', serif" }}>
                      {image.category}
                    </p>
                  </div>
                </div>

                {/* Light leak effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#C4A35A]/10 to-transparent" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-[#0A0A1A]/95 backdrop-blur-xl"
              onClick={() => setLightboxImage(null)}
            />
            <motion.div
              className="relative z-10 max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${lightboxImage.src}')` }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-[#E8D5B7] text-lg font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {lightboxImage.title}
                  </p>
                  <p className="text-[#C4A35A] text-xs tracking-wider uppercase" style={{ fontFamily: "'Amiri', serif" }}>
                    {lightboxImage.category}
                  </p>
                </div>
                <button
                  className="w-10 h-10 rounded-full border border-[#C4A35A]/30 flex items-center justify-center text-[#D4C4A8] hover:text-[#C4A35A] transition-colors"
                  onClick={() => setLightboxImage(null)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
