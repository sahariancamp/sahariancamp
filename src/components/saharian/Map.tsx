'use client'

import { useState, useRef, useEffect } from 'react'
import Map, { Marker, NavigationControl, FullscreenControl, Source, Layer } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapPin } from 'lucide-react'

// Merzouga coordinates
const LATITUDE = 31.109867
const LONGITUDE = -4.053158

export default function MapboxMap() {
  const [viewState, setViewState] = useState({
    longitude: LONGITUDE,
    latitude: LATITUDE,
    zoom: 13,
    pitch: 65, // Highly angled for maximum 3D mountain effect
    bearing: -20, // Slightly rotated
  })

  // To make this work, the user needs to add NEXT_PUBLIC_MAPBOX_TOKEN to their .env.local file
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  if (!mapboxToken) {
    return (
      <div className="w-full h-full bg-[#1A1A2E] flex flex-col items-center justify-center text-center p-6 border border-[#C4A35A]/20">
        <MapPin className="w-8 h-8 text-[#C4A35A] mb-4 opacity-50" />
        <h3 className="text-[#E8D5B7] font-medium mb-2">Mapbox Token Required</h3>
        <p className="text-[#D4C4A8]/60 text-sm">
          Please add <code>NEXT_PUBLIC_MAPBOX_TOKEN=pk...</code> to your <code>.env.local</code> file to view the luxury interactive map.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden relative">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12" // High-res satellite view
        mapboxAccessToken={mapboxToken}
        attributionControl={false}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }} // Exaggerate dunes for dramatic effect
      >
        {/* 3D Terrain Elevation Data */}
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />

        {/* Sky Layer for depth and horizon */}
        <Layer
          id="sky"
          type="sky"
          paint={{
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15
          }}
        />

        {/* Navigation and Fullscreen controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <NavigationControl showCompass={true} position="top-right" />
          <FullscreenControl position="top-right" />
        </div>

        {/* Custom Luxury Marker for the Camp */}
        <Marker longitude={LONGITUDE} latitude={LATITUDE} anchor="bottom">
          <div className="relative group cursor-pointer flex flex-col items-center">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1A1A2E]/90 backdrop-blur-sm border border-[#C4A35A]/50 text-[#E8D5B7] px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-2xl z-50">
              Saharian Camp Meeting Point
            </div>
            {/* The Pin */}
            <div className="w-12 h-12 bg-[#0F0F1E] border-2 border-[#C4A35A] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(196,163,90,0.5)] transform transition-transform group-hover:scale-110 group-hover:-translate-y-2 z-40 relative">
              <MapPin className="w-6 h-6 text-[#C4A35A]" />
            </div>
            {/* The shadow/dot on the ground */}
            <div className="w-3 h-3 bg-[#C4A35A] rounded-full mt-1 animate-pulse shadow-[0_0_10px_rgba(196,163,90,1)]"></div>
          </div>
        </Marker>
      </Map>
    </div>
  )
}
