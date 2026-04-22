'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  CalendarDays, 
  Tent, 
  Sparkles, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Reservations', href: '/admin/reservations', icon: CalendarDays },
  { name: 'Sanctuaries', href: '/admin/tents', icon: Tent },
  { name: 'Activities', href: '/admin/activities', icon: Sparkles },
  { name: 'Guests', href: '/admin/guests', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#0A0A1A] text-[#E8D5B7] flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0F0F1E] border-r border-[#C4A35A]/10 transition-transform duration-300 lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-8 border-b border-[#C4A35A]/10">
            <Link href="/" className="flex flex-col items-center group">
              <span className="text-2xl tracking-[0.2em] font-light text-[#E8D5B7] group-hover:text-[#C4A35A] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                SAHARIAN
              </span>
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#C4A35A]">Admin Panel</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-xl transition-all group
                    ${isActive 
                      ? 'bg-[#C4A35A] text-[#0F0F1E]' 
                      : 'hover:bg-[#C4A35A]/10 text-[#8A8A9E] hover:text-[#E8D5B7]'}
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#0F0F1E]' : 'text-[#C4A35A] group-hover:scale-110 transition-transform'}`} />
                  <span className="text-sm font-medium tracking-wide">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-6 border-t border-[#C4A35A]/10">
            <button className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-[#8A8A9E] hover:bg-red-500/10 hover:text-red-400 transition-all group">
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Header */}
        <header className="h-20 bg-[#0F0F1E] border-b border-[#C4A35A]/10 flex items-center justify-between px-8">
          <button 
            className="lg:hidden p-2 text-[#C4A35A]"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 px-8 hidden md:block">
            <h2 className="text-[#C4A35A] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Amiri', serif" }}>
              Welcome back, Administrator
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-[#8A8A9E] hover:text-[#C4A35A] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C4A35A] rounded-full border-2 border-[#0F0F1E]" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-[#C4A35A]/10">
              <div className="text-right">
                <p className="text-xs font-medium text-[#E8D5B7]">Super Admin</p>
                <p className="text-[10px] text-[#8A8A9E]">admin@saharian.com</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#C4A35A]/20 border border-[#C4A35A]/30 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#C4A35A]" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

import { AnimatePresence, motion } from 'framer-motion'
