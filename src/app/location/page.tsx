import MapboxMap from '@/components/saharian/Map'
import { MapPin, Plane, Car, Compass, Navigation } from 'lucide-react'

export const metadata = {
  title: 'Location & Travel | Saharian Camp',
  description: 'How to reach Saharian Camp in Merzouga, Morocco. Discover travel routes from Marrakech, Fes, and airport transfers.',
}

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Journey to the Dunes</h2>
          <h1 
            className="text-4xl md:text-6xl font-light text-foreground mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How to <span className="text-primary italic">Find Us</span>
          </h1>
          <p 
            className="text-muted-foreground/70 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "'Amiri', serif" }}
          >
            Your luxury desert experience begins the moment you set out for Merzouga. Explore our interactive map and travel guides below.
          </p>
        </div>

        {/* Immersive Mapbox Map */}
        <div className="w-full h-[600px] bg-card rounded-3xl border border-primary/30 overflow-hidden relative shadow-2xl mb-24">
          <MapboxMap />
        </div>

        {/* Travel Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-8">
            <h3 className="text-3xl text-foreground font-light mb-8 border-b border-primary/20 pb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Meeting Point
            </h3>
            
            <div className="bg-card p-8 rounded-2xl border border-primary/10">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-foreground text-xl font-medium mb-4">Merzouga Village</h4>
              <p className="text-muted-foreground/70 text-sm leading-relaxed mb-6">
                All guests will meet our concierge team at our designated parking area in Merzouga. From here, you will be transferred to the luxury camp nestled deep within the Erg Chebbi dunes.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Compass className="w-4 h-4 text-primary" />
                  <span>GPS: 31.109867, -4.053158</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Navigation className="w-4 h-4 text-primary" />
                  <span>Transfer Options: 4x4 or Camel Trek</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-3xl text-foreground font-light mb-8 border-b border-primary/20 pb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Travel Routes
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* From Marrakech */}
              <div className="bg-card p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <Car className="w-8 h-8 text-primary" />
                  <h4 className="text-foreground text-xl">From Marrakech</h4>
                </div>
                <p className="text-muted-foreground/70 text-sm leading-relaxed mb-4">
                  A spectacular drive across the High Atlas Mountains via the Tizi n'Tichka pass, passing through Ouarzazate, the Rose Valley, and the Todra Gorges.
                </p>
                <div className="bg-background rounded-lg p-4 mt-auto">
                  <span className="text-primary block text-xs uppercase tracking-widest mb-1">Duration</span>
                  <span className="text-foreground font-medium">9 - 10 Hours driving</span>
                </div>
              </div>

              {/* From Fes */}
              <div className="bg-card p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <Car className="w-8 h-8 text-primary" />
                  <h4 className="text-foreground text-xl">From Fes</h4>
                </div>
                <p className="text-muted-foreground/70 text-sm leading-relaxed mb-4">
                  A beautiful journey south through the Middle Atlas Mountains, passing the cedar forests of Ifrane where wild macaques live, down through the Ziz Valley oasis.
                </p>
                <div className="bg-background rounded-lg p-4 mt-auto">
                  <span className="text-primary block text-xs uppercase tracking-widest mb-1">Duration</span>
                  <span className="text-foreground font-medium">7 - 8 Hours driving</span>
                </div>
              </div>

              {/* By Air */}
              <div className="md:col-span-2 bg-card p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-colors flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0 w-16 h-16 rounded-full border border-primary flex items-center justify-center">
                  <Plane className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-foreground text-xl mb-2">By Air (Errachidia Airport)</h4>
                  <p className="text-muted-foreground/70 text-sm leading-relaxed mb-4">
                    The closest airport is Moulay Ali Cherif Airport (ERH) in Errachidia, which offers direct flights from Casablanca (CMN). We offer private VIP transfers directly from the airport to our camp.
                  </p>
                  <span className="text-primary text-xs uppercase tracking-widest">Transfer time: 2 Hours</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
