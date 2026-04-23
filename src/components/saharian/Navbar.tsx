'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'The Camp', href: '/' },
  { label: 'Sanctuaries', href: '/tents' },
  { label: 'Experiences', href: '/activities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Booking', href: '/booking' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0F0F1E]/90 backdrop-blur-xl border-b border-[#C4A35A]/10'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            data-cursor-hover
          >
            <Image src="/images/logo.png" alt="Logo" width={150} height={150} />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 relative group ${
                  pathname === link.href ? 'text-[#C4A35A]' : 'text-[#D4C4A8]/70 hover:text-[#C4A35A]'
                }`}
                style={{ fontFamily: "'Amiri', serif" }}
                data-cursor-hover
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-[#C4A35A] transition-all duration-300 ${
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Book CTA */}
          <Link
            href="/booking"
            className="hidden lg:block magnetic-btn px-6 py-2 border border-[#C4A35A]/40 text-[#C4A35A] text-xs tracking-[0.2em] uppercase rounded-full hover:bg-[#C4A35A]/10 transition-all text-center"
            style={{ fontFamily: "'Amiri', serif" }}
            data-cursor-hover
          >
            Reserve
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-[#C4A35A] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-cursor-hover
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0A0A1A]/98 backdrop-blur-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`text-2xl tracking-[0.2em] uppercase transition-colors ${
                      pathname === link.href ? 'text-[#C4A35A]' : 'text-[#D4C4A8] hover:text-[#C4A35A]'
                    }`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  href="/booking"
                  className="mt-4 px-8 py-3 border border-[#C4A35A]/40 text-[#C4A35A] text-sm tracking-[0.2em] uppercase rounded-full inline-block"
                  style={{ fontFamily: "'Amiri', serif" }}
                >
                  Reserve Your Journey
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
