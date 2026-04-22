'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Navigation, Thermometer, Calendar, Backpack } from 'lucide-react'

const routeInfo = [
  { from: 'Marrakech', distance: '560 km', duration: '9-10h', description: 'Through the Atlas Mountains via Ait Benhaddou' },
  { from: 'Fès', distance: '470 km', duration: '7-8h', description: 'Through the Middle Atlas via Ifrane and Midelt' },
  { from: 'Essaouira', distance: '680 km', duration: '10-11h', description: 'Coastal route via Agadir and Taroudant' },
]

const climateInfo = [
  { season: 'Spring (Mar-May)', temp: '25-35°C', note: 'Perfect weather, wildflowers bloom' },
  { season: 'Summer (Jun-Aug)', temp: '38-50°C', note: 'Extreme heat, early morning activities only' },
  { season: 'Autumn (Sep-Nov)', temp: '25-35°C', note: 'Ideal season, golden light' },
  { season: 'Winter (Dec-Feb)', temp: '10-20°C', note: 'Cool nights, clear skies, best for stargazing' },
]

const packingList = [
  { item: 'Sun protection (SPF 50+)', essential: true },
  { item: 'Light layers for day', essential: true },
  { item: 'Warm layer for nights', essential: true },
  { item: 'Comfortable walking shoes', essential: true },
  { item: 'Camera with extra batteries', essential: false },
  { item: 'Headlamp or flashlight', essential: false },
  { item: 'Reusable water bottle', essential: true },
  { item: 'Sunglasses (polarized)', essential: true },
]

export default function Location() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeRoute, setActiveRoute] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const pathProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 1])

  return (
    <section id="location" ref={containerRef} className="py-24 md:py-32 px-6 relative overflow-hidden">
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
            The Edge of the Map
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-light text-[#E8D5B7] mb-4 text-glow"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Find <span className="text-[#C4A35A]">Us</span>
          </motion.h2>
          <motion.p
            className="text-[#D4C4A8]/60 text-lg max-w-xl mx-auto"
            style={{ fontFamily: "'Amiri', serif" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Merzouga, at the edge of Erg Chebbi — where the road ends and the desert begins
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map visualization */}
          <motion.div
            className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden glass-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Stylized desert map */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#1F1F35] to-[#1A1A2E]">
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10">
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="#C4A35A" strokeWidth="0.5" />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`v${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="#C4A35A" strokeWidth="0.5" />
                ))}
              </svg>

              {/* Morocco outline simplified */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                {/* Dune shapes */}
                <path d="M50,350 Q100,300 150,320 T250,290 T350,310 L400,350 L400,400 L0,400 Z" fill="#C4A35A" opacity="0.05" />
                <path d="M0,360 Q80,330 160,345 T320,320 T400,340 L400,400 L0,400 Z" fill="#C4A35A" opacity="0.03" />

                {/* Route lines */}
                {routeInfo.map((route, i) => {
                  const routes = [
                    'M120,180 Q140,220 160,250 Q180,280 220,290 Q240,295 260,300',
                    'M250,120 Q240,160 230,200 Q220,240 240,260 Q250,275 260,300',
                    'M80,220 Q100,230 120,250 Q140,270 180,280 Q220,290 260,300',
                  ]
                  return (
                    <g key={i}>
                      <motion.path
                        d={routes[i]}
                        fill="none"
                        stroke={activeRoute === i ? '#C4A35A' : 'rgba(196, 163, 90, 0.2)'}
                        strokeWidth={activeRoute === i ? 2 : 1}
                        strokeDasharray={activeRoute === i ? '0' : '4 4'}
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: i * 0.3 }}
                      />
                      {/* City markers */}
                      <circle
                        cx={i === 0 ? 120 : i === 1 ? 250 : 80}
                        cy={i === 0 ? 180 : i === 1 ? 120 : 220}
                        r="4"
                        fill={activeRoute === i ? '#C4A35A' : 'rgba(196, 163, 90, 0.3)'}
                      />
                    </g>
                  )
                })}

                {/* Camp beacon */}
                <g>
                  <circle cx="260" cy="300" r="6" fill="#C4A35A" />
                  <motion.circle
                    cx="260" cy="300" r="6"
                    fill="none"
                    stroke="#C4A35A"
                    strokeWidth="1"
                    animate={{ r: [6, 20, 30], opacity: [1, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="260" cy="300" r="6"
                    fill="none"
                    stroke="#C4A35A"
                    strokeWidth="1"
                    animate={{ r: [6, 20, 30], opacity: [1, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </g>

                {/* Labels */}
                <text x="260" y="325" fill="#C4A35A" fontSize="10" textAnchor="middle" style={{ fontFamily: "'Amiri', serif" }}>
                  SAHARIAN CAMP
                </text>
                <text x="120" y="175" fill="#8A8A9E" fontSize="9" textAnchor="middle" style={{ fontFamily: "'Amiri', serif" }}>
                  Marrakech
                </text>
                <text x="250" y="115" fill="#8A8A9E" fontSize="9" textAnchor="middle" style={{ fontFamily: "'Amiri', serif" }}>
                  Fès
                </text>
                <text x="80" y="215" fill="#8A8A9E" fontSize="9" textAnchor="middle" style={{ fontFamily: "'Amiri', serif" }}>
                  Essaouira
                </text>

                {/* Coordinates */}
                <text x="380" y="385" fill="rgba(196, 163, 90, 0.3)" fontSize="8" textAnchor="end" style={{ fontFamily: "'Amiri', serif" }}>
                  31°06&apos;N 4°00&apos;W
                </text>
              </svg>
            </div>

            {/* Route selector overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-col gap-2">
                {routeInfo.map((route, i) => (
                  <button
                    key={i}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      activeRoute === i
                        ? 'bg-[#0F0F1E]/80 backdrop-blur-sm border-[#C4A35A]/30'
                        : 'bg-[#0F0F1E]/50 backdrop-blur-sm border-transparent hover:border-[#C4A35A]/10'
                    }`}
                    onClick={() => setActiveRoute(i)}
                    data-cursor-hover
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Navigation className={`w-3 h-3 ${activeRoute === i ? 'text-[#C4A35A]' : 'text-[#8A8A9E]'}`} />
                        <span className={`text-xs font-medium ${activeRoute === i ? 'text-[#C4A35A]' : 'text-[#D4C4A8]/60'}`}>
                          From {route.from}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-[#8A8A9E]">
                        <span>{route.distance}</span>
                        <span>•</span>
                        <span>{route.duration}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Info sidebar */}
          <div className="space-y-6">
            {/* Climate */}
            <motion.div
              className="glass-card rounded-2xl p-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Thermometer className="w-4 h-4 text-[#C4A35A]" />
                <h4 className="text-[#E8D5B7] text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "'Amiri', serif" }}>
                  Climate & Seasons
                </h4>
              </div>
              <div className="space-y-3">
                {climateInfo.map((info) => (
                  <div key={info.season} className="flex items-start gap-3 p-3 rounded-xl bg-[#1A1A2E]/50 border border-[#C4A35A]/5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#E8D5B7] text-xs font-medium">{info.season}</span>
                        <span className="text-[#C4A35A] text-xs">({info.temp})</span>
                      </div>
                      <p className="text-[#D4C4A8]/50 text-[11px]">{info.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Best time */}
            <motion.div
              className="glass-card rounded-2xl p-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-4 h-4 text-[#C4A35A]" />
                <h4 className="text-[#E8D5B7] text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "'Amiri', serif" }}>
                  Best Time to Visit
                </h4>
              </div>
              <div className="flex gap-2">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => {
                  const isBest = [2, 3, 4, 8, 9, 10].includes(i)
                  const isGood = [0, 1, 11].includes(i)
                  return (
                    <div
                      key={m}
                      className={`flex-1 py-2 rounded-lg text-center text-[10px] ${
                        isBest ? 'bg-[#2D5A4A]/30 text-[#2D5A4A] border border-[#2D5A4A]/30' :
                        isGood ? 'bg-[#C4A35A]/10 text-[#C4A35A] border border-[#C4A35A]/20' :
                        'bg-[#1A1A2E]/50 text-[#8A8A9E] border border-transparent'
                      }`}
                      style={{ fontFamily: "'Amiri', serif" }}
                    >
                      {m}
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center gap-4 mt-3 text-[10px] text-[#8A8A9E]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#2D5A4A]/30" /> Best</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#C4A35A]/10" /> Good</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-[#1A1A2E]" /> Hot</span>
              </div>
            </motion.div>

            {/* Packing list */}
            <motion.div
              className="glass-card rounded-2xl p-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Backpack className="w-4 h-4 text-[#C4A35A]" />
                <h4 className="text-[#E8D5B7] text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "'Amiri', serif" }}>
                  Packing Essentials
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {packingList.map((item) => (
                  <div key={item.item} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.essential ? 'bg-[#C4A35A]' : 'bg-[#8A8A9E]'}`} />
                    <span className="text-[#D4C4A8]/60 text-xs">{item.item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
