'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  CalendarCheck, 
  TrendingUp, 
  Euro,
  ArrowUpRight,
  Clock
} from 'lucide-react'

const stats = [
  { name: 'Total Bookings', value: '124', icon: CalendarCheck, change: '+12%', color: '#C4A35A' },
  { name: 'Active Guests', value: '18', icon: Users, change: '+5%', color: '#2D5A4A' },
  { name: 'Monthly Revenue', value: '€24,500', icon: Euro, change: '+18%', color: '#D4763C' },
  { name: 'Growth Rate', value: '24%', icon: TrendingUp, change: '+2%', color: '#8A8A9E' },
]

const recentBookings = [
  { id: '#BK-8842', guest: 'Amine El Amrani', date: '2024-04-25', status: 'Confirmed', amount: '€640' },
  { id: '#BK-8843', guest: 'Sarah Johnson', date: '2024-04-26', status: 'Pending', amount: '€1,220' },
  { id: '#BK-8844', guest: 'Marc Dubois', date: '2024-04-28', status: 'Confirmed', amount: '€440' },
  { id: '#BK-8845', guest: 'Fatima Zahra', date: '2024-05-02', status: 'Cancelled', amount: '€0' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-light text-[#E8D5B7] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Dashboard <span className="text-[#C4A35A]">Overview</span>
          </h1>
          <p className="text-[#8A8A9E] text-sm tracking-wide">Tracking the pulse of Saharian Camp</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 rounded-xl bg-[#1A1A2E] border border-[#C4A35A]/10 text-xs text-[#C4A35A] hover:bg-[#C4A35A]/10 transition-all uppercase tracking-widest">
            Export Report
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-[#C4A35A] text-[#0F0F1E] text-xs font-medium hover:bg-[#E8D5A0] transition-all uppercase tracking-widest">
            New Booking
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-[#C4A35A]/10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className="w-12 h-12" style={{ color: stat.color }} />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-[#0A0A1A] border border-[#C4A35A]/20">
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <span className="text-[#8A8A9E] text-xs uppercase tracking-widest">{stat.name}</span>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-light text-[#E8D5B7]">{stat.value}</h3>
                <span className="flex items-center gap-1 text-[10px] text-[#2D5A4A] font-medium bg-[#2D5A4A]/10 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 glass-card rounded-2xl border border-[#C4A35A]/10 overflow-hidden">
          <div className="p-6 border-b border-[#C4A35A]/10 flex justify-between items-center">
            <h3 className="text-lg font-light text-[#E8D5B7]" style={{ fontFamily: "'Playfair Display', serif" }}>Recent Reservations</h3>
            <button className="text-[#C4A35A] text-xs hover:underline uppercase tracking-wider">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#0A0A1A] text-[#8A8A9E] text-[10px] uppercase tracking-widest">
                  <th className="px-6 py-4 font-medium">Booking ID</th>
                  <th className="px-6 py-4 font-medium">Guest</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C4A35A]/5">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-[#C4A35A]/5 transition-colors group">
                    <td className="px-6 py-4 text-xs text-[#C4A35A] font-mono">{booking.id}</td>
                    <td className="px-6 py-4 text-sm text-[#E8D5B7]">{booking.guest}</td>
                    <td className="px-6 py-4 text-xs text-[#8A8A9E]">{booking.date}</td>
                    <td className="px-6 py-4 text-sm text-[#E8D5B7]">{booking.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`
                        px-3 py-1 rounded-full text-[10px] font-medium
                        ${booking.status === 'Confirmed' ? 'bg-[#2D5A4A]/20 text-[#2D5A4A]' : 
                          booking.status === 'Pending' ? 'bg-[#C4A35A]/20 text-[#C4A35A]' : 
                          'bg-red-500/20 text-red-400'}
                      `}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-card rounded-2xl border border-[#C4A35A]/10 overflow-hidden">
          <div className="p-6 border-b border-[#C4A35A]/10">
            <h3 className="text-lg font-light text-[#E8D5B7]" style={{ fontFamily: "'Playfair Display', serif" }}>Activity Feed</h3>
          </div>
          <div className="p-6 space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-none pt-1">
                  <div className="w-8 h-8 rounded-full bg-[#1A1A2E] border border-[#C4A35A]/20 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-[#C4A35A]" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#E8D5B7]">
                    <span className="font-medium">Admin</span> modified booking #BK-2201
                  </p>
                  <p className="text-[10px] text-[#8A8A9E] mt-1">2 hours ago • Merzouga HQ</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-xs text-[#C4A35A] border-t border-[#C4A35A]/10 hover:bg-[#C4A35A]/5 transition-colors uppercase tracking-widest">
            Load More Activity
          </button>
        </div>
      </div>
    </div>
  )
}
