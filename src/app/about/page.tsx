import Image from 'next/image'
import { ArrowRight, Star, Wind, Compass } from 'lucide-react'

export const metadata = {
  title: 'About Us | Saharian Camp',
  description: 'Discover the story behind Saharian Camp, a luxury desert experience blending Berber heritage with modern comfort in Merzouga, Morocco.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0F0F1E] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hero Section */}
        <div className="text-center mb-24">
          <h1 
            className="text-5xl md:text-7xl font-light text-[#E8D5B7] mb-6 tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our <span className="text-[#C4A35A] italic">Story</span>
          </h1>
          <div className="w-24 h-px bg-[#C4A35A] mx-auto mb-8"></div>
          <p 
            className="text-[#D4C4A8]/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            Born from a deep love for the Sahara and its nomadic traditions, Saharian Camp was envisioned as a sanctuary where the timeless silence of the desert meets unparalleled luxury.
          </p>
        </div>

        {/* Vision & Heritage Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 lg:order-1 space-y-8">
            <div>
              <h2 className="text-[#C4A35A] text-sm tracking-[0.3em] uppercase mb-3">The Vision</h2>
              <h3 className="text-3xl md:text-4xl text-[#E8D5B7] font-light mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                A Mirage Made Real
              </h3>
              <p className="text-[#D4C4A8]/70 leading-relaxed text-lg" style={{ fontFamily: "'Amiri', serif" }}>
                We believe that experiencing the desert shouldn't mean sacrificing comfort. Our camp is meticulously designed to offer a seamless blend of authentic Berber culture and modern amenities. Every tent is a private oasis, offering panoramic views of the golden dunes while sheltering you in absolute elegance.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#C4A35A]/20">
              <div>
                <Wind className="w-8 h-8 text-[#C4A35A] mb-4" />
                <h4 className="text-[#E8D5B7] font-semibold mb-2">Sustainable Luxury</h4>
                <p className="text-[#D4C4A8]/60 text-sm">Eco-conscious practices honoring the fragile desert ecosystem.</p>
              </div>
              <div>
                <Compass className="w-8 h-8 text-[#C4A35A] mb-4" />
                <h4 className="text-[#E8D5B7] font-semibold mb-2">Authentic Experiences</h4>
                <p className="text-[#D4C4A8]/60 text-sm">Curated journeys guided by local Berber experts.</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative h-[600px] rounded-3xl overflow-hidden border border-[#C4A35A]/20">
            {/* Fallback image if R2 isn't ready, using a placeholder from the gallery we know exists or a general unsplash */}
            <Image
              src="images/gallery/camp-aerial-layout.jpg"
              alt="Saharian Camp Heritage"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1E] via-transparent to-transparent opacity-80"></div>
          </div>
        </div>

        {/* The Experience */}
        <div className="bg-[#1A1A2E] rounded-3xl p-8 md:p-16 border border-[#C4A35A]/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Star className="w-32 h-32 text-[#C4A35A]" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl text-[#E8D5B7] font-light mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Beyond Accommodation, <br/> <span className="text-[#C4A35A] italic">An Awakening</span>
            </h2>
            <p className="text-[#D4C4A8]/80 text-lg leading-relaxed mb-10" style={{ fontFamily: "'Amiri', serif" }}>
              At Saharian Camp, the day begins with the spectacular sunrise over Erg Chebbi and ends under a canopy of a million stars. Our dedicated team is committed to making your stay unforgettable—from exquisite traditional gastronomy served by the campfire to thrilling excursions across the dunes.
            </p>
            <a 
              href="/tents" 
              className="inline-flex items-center gap-3 border border-[#C4A35A] text-[#C4A35A] px-8 py-4 rounded-full hover:bg-[#C4A35A] hover:text-[#0F0F1E] transition-all duration-300"
            >
              <span className="tracking-[0.2em] uppercase text-sm font-medium">Explore Our Sanctuaries</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
