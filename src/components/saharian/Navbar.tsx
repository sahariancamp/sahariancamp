'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'The Camp', href: '#camp' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Sanctuaries', href: '#accommodations' },
  { label: 'Voices', href: '#testimonials' },
  { label: 'Journey', href: '#journey' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Find Us', href: '#location' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
            data-cursor-hover
          >
            <div className="w-8 h-8 rounded-full border border-[#C4A35A]/50 flex items-center justify-center group-hover:border-[#C4A35A] transition-colors">
              <div className="w-2 h-2 rounded-full bg-[#C4A35A]" />
            </div>
            <div>
              <span
                className="text-[#C4A35A] text-lg tracking-[0.2em] font-light"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                SAHARIAN
              </span>
              <span
                className="text-[#8A8A9E] text-[10px] tracking-[0.3em] ml-2 uppercase"
                style={{ fontFamily: "'Amiri', serif" }}
              >
                Camp
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-[#D4C4A8]/70 hover:text-[#C4A35A] text-xs tracking-[0.2em] uppercase transition-colors duration-300 relative group"
                style={{ fontFamily: "'Amiri', serif" }}
                data-cursor-hover
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C4A35A] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Book CTA */}
          <motion.button
            className="hidden lg:block magnetic-btn px-6 py-2 border border-[#C4A35A]/40 text-[#C4A35A] text-xs tracking-[0.2em] uppercase rounded-full hover:bg-[#C4A35A]/10 transition-all"
            style={{ fontFamily: "'Amiri', serif" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('#journey')}
            data-cursor-hover
          >
            Reserve
          </motion.button>

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
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-[#D4C4A8] text-2xl tracking-[0.2em] uppercase hover:text-[#C4A35A] transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                className="mt-4 px-8 py-3 border border-[#C4A35A]/40 text-[#C4A35A] text-sm tracking-[0.2em] uppercase rounded-full"
                style={{ fontFamily: "'Amiri', serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => handleNavClick('#journey')}
              >
                Reserve Your Journey
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
