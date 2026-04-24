import { Sun, Cloud, Wind, Sunrise, Sunset, CloudRain, Droplets, MapPin } from 'lucide-react'

export const metadata = {
  title: 'Desert Weather | Saharian Camp',
  description: 'Current weather conditions and forecast for Saharian Camp in Merzouga, Morocco.',
}

// Function to interpret WMO weather codes from Open-Meteo
function getWeatherInfo(code: number) {
  if (code === 0) return { text: 'Clear Sky', icon: Sun }
  if (code === 1 || code === 2 || code === 3) return { text: 'Partly Cloudy', icon: Cloud }
  if (code === 45 || code === 48) return { text: 'Fog', icon: Cloud }
  if (code >= 51 && code <= 67) return { text: 'Rain', icon: CloudRain }
  if (code >= 71 && code <= 82) return { text: 'Showers', icon: Droplets }
  if (code >= 95) return { text: 'Thunderstorm', icon: CloudRain }
  return { text: 'Clear', icon: Sun }
}

// Format time from ISO string (e.g., "2023-10-25T07:30" -> "07:30 AM")
function formatTime(isoString: string) {
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

// Format date (e.g., "2023-10-25" -> "Wed, Oct 25")
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export default async function WeatherPage() {
  let weatherData: any = null
  let error: string | null = null

  try {
    // Fetch weather data for Merzouga (Latitude: 31.2113, Longitude: -3.9508)
    // Using Next.js caching: revalidate every 3600 seconds (1 hour)
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=31.2113&longitude=-3.9508&current=temperature_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Africa%2FCasablanca',
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) throw new Error('Failed to fetch weather data')
    weatherData = await res.json()
  } catch (e) {
    console.error("Weather fetch error:", e)
    error = "Could not load weather data at this moment."
  }

  const current = weatherData?.current
  const daily = weatherData?.daily

  const currentWeatherInfo = current ? getWeatherInfo(current.weather_code) : null
  const CurrentIcon = currentWeatherInfo?.icon || Sun

  return (
    <div className="min-h-screen bg-[#0F0F1E] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#C4A35A] text-sm tracking-[0.3em] uppercase mb-4">Merzouga Desert</h2>
          <h1 
            className="text-4xl md:text-6xl font-light text-[#E8D5B7] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Live <span className="text-[#C4A35A] italic">Weather</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-[#D4C4A8]/70 text-sm">
            <MapPin className="w-4 h-4 text-[#C4A35A]" />
            <span>Saharian Camp, Morocco</span>
          </div>
        </div>

        {error ? (
          <div className="text-center text-[#D4C4A8] py-12">{error}</div>
        ) : (
          <div className="space-y-12">
            
            {/* Current Weather Card */}
            <div className="bg-[#1A1A2E] rounded-3xl p-8 md:p-12 border border-[#C4A35A]/20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <CurrentIcon className="w-64 h-64 text-[#C4A35A]" />
              </div>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-[#D4C4A8] text-sm tracking-[0.2em] uppercase mb-6">Current Conditions</h3>
                  <div className="flex items-end gap-4 mb-4">
                    <span className="text-7xl md:text-9xl font-light text-[#E8D5B7] tracking-tighter">
                      {Math.round(current?.temperature_2m)}°
                    </span>
                    <span className="text-2xl text-[#C4A35A] mb-4">C</span>
                  </div>
                  <p className="text-2xl text-[#E8D5B7] font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {currentWeatherInfo?.text}
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Wind */}
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full border border-[#C4A35A]/20 flex items-center justify-center bg-[#0F0F1E]">
                      <Wind className="w-5 h-5 text-[#C4A35A]" />
                    </div>
                    <div>
                      <p className="text-[#D4C4A8]/60 text-xs uppercase tracking-widest mb-1">Wind Speed</p>
                      <p className="text-[#E8D5B7] text-lg">{current?.wind_speed_10m} km/h</p>
                    </div>
                  </div>

                  {/* Golden Hours */}
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#C4A35A]/10">
                    <div>
                      <div className="flex items-center gap-2 text-[#C4A35A] mb-2">
                        <Sunrise className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wider">Sunrise</span>
                      </div>
                      <p className="text-[#E8D5B7]">{formatTime(daily?.sunrise[0])}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[#C4A35A] mb-2">
                        <Sunset className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wider">Sunset</span>
                      </div>
                      <p className="text-[#E8D5B7]">{formatTime(daily?.sunset[0])}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Forecast */}
            <div>
              <h3 className="text-2xl text-[#E8D5B7] font-light mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                3-Day Forecast
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((index) => {
                  const dayCode = daily?.weather_code[index]
                  const DayIcon = dayCode !== undefined ? getWeatherInfo(dayCode).icon : Sun
                  
                  return (
                    <div key={index} className="bg-[#1A1A2E]/50 rounded-2xl p-6 border border-[#C4A35A]/10 text-center hover:bg-[#1A1A2E] hover:border-[#C4A35A]/30 transition-all duration-300">
                      <p className="text-[#C4A35A] text-sm uppercase tracking-widest mb-4">
                        {formatDate(daily?.time[index])}
                      </p>
                      <div className="flex justify-center mb-4">
                        <DayIcon className="w-10 h-10 text-[#E8D5B7]" />
                      </div>
                      <div className="flex justify-center gap-4 text-lg">
                        <span className="text-[#E8D5B7]">{Math.round(daily?.temperature_2m_max[index])}°</span>
                        <span className="text-[#D4C4A8]/50">{Math.round(daily?.temperature_2m_min[index])}°</span>
                      </div>
                      <p className="text-[#D4C4A8]/70 text-sm mt-3">
                        {dayCode !== undefined ? getWeatherInfo(dayCode).text : 'Clear'}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Seasonal Guide */}
            <div className="pt-16 border-t border-[#C4A35A]/10">
              <div className="text-center mb-12">
                <h3 className="text-3xl text-[#E8D5B7] font-light mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Desert Seasons & Packing Guide
                </h3>
                <p className="text-[#D4C4A8]/70 text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Amiri', serif" }}>
                  The Sahara transforms throughout the year. Here is what to expect and how to prepare for your luxurious stay.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Autumn / Spring */}
                <div className="bg-[#1A1A2E]/30 rounded-2xl p-8 border border-[#C4A35A]/10 hover:border-[#C4A35A]/30 transition-all">
                  <h4 className="text-[#C4A35A] text-lg mb-2 font-medium tracking-wide">Autumn & Spring</h4>
                  <p className="text-[#D4C4A8]/50 text-sm mb-4 uppercase tracking-widest">Sept - Nov & Mar - May</p>
                  <p className="text-[#E8D5B7] text-sm leading-relaxed mb-6">
                    The most popular times to visit. Expect beautiful, warm days (20-30°C) and pleasantly cool nights (10-15°C). The sky is exceptionally clear, making it perfect for stargazing and all desert activities.
                  </p>
                  <div className="bg-[#0F0F1E] rounded-xl p-4 border border-[#C4A35A]/5">
                    <strong className="text-[#C4A35A] block mb-1 text-sm">What to pack:</strong>
                    <span className="text-[#D4C4A8]/80 text-sm">Light, breathable layers for the day, and a warm sweater or light jacket for the evenings around the campfire.</span>
                  </div>
                </div>

                {/* Winter */}
                <div className="bg-[#1A1A2E]/30 rounded-2xl p-8 border border-[#C4A35A]/10 hover:border-[#C4A35A]/30 transition-all">
                  <h4 className="text-[#C4A35A] text-lg mb-2 font-medium tracking-wide">Winter</h4>
                  <p className="text-[#D4C4A8]/50 text-sm mb-4 uppercase tracking-widest">Dec - Feb</p>
                  <p className="text-[#E8D5B7] text-sm leading-relaxed mb-6">
                    Crisp, sunny days (15-20°C) give way to dramatic temperature drops at night, often approaching freezing (0-5°C). Our tents are equipped with excellent heating to keep you cozy.
                  </p>
                  <div className="bg-[#0F0F1E] rounded-xl p-4 border border-[#C4A35A]/5">
                    <strong className="text-[#C4A35A] block mb-1 text-sm">What to pack:</strong>
                    <span className="text-[#D4C4A8]/80 text-sm">T-shirts for midday sun, but heavily prioritize warm winter clothing: thermal layers, a thick jacket, warm socks, and a beanie for the night.</span>
                  </div>
                </div>

                {/* Summer */}
                <div className="bg-[#1A1A2E]/30 rounded-2xl p-8 border border-[#C4A35A]/10 hover:border-[#C4A35A]/30 transition-all md:col-span-2 lg:col-span-1 lg:col-start-1 lg:col-end-3 max-w-3xl mx-auto w-full">
                  <h4 className="text-[#C4A35A] text-lg mb-2 font-medium tracking-wide text-center">Summer</h4>
                  <p className="text-[#D4C4A8]/50 text-sm mb-4 uppercase tracking-widest text-center">Jun - Aug</p>
                  <p className="text-[#E8D5B7] text-sm leading-relaxed mb-6 text-center">
                    The true desert heat. Days are intensely hot (40°C+), and nights remain very warm. Activities like camel trekking are shifted to the early morning or late evening. Our tents feature powerful air conditioning for your comfort.
                  </p>
                  <div className="bg-[#0F0F1E] rounded-xl p-4 border border-[#C4A35A]/5 text-center">
                    <strong className="text-[#C4A35A] block mb-1 text-sm">What to pack:</strong>
                    <span className="text-[#D4C4A8]/80 text-sm">Highly breathable linen or cotton clothing, a wide-brimmed sun hat, premium sunglasses, and high-SPF sunscreen.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
