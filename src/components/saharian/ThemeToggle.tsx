'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed bottom-8 left-8 z-[100] w-10 h-10 flex items-center justify-center rounded-full border border-primary/40 bg-background/80 backdrop-blur-md shadow-2xl hover:border-primary hover:scale-110 transition-all duration-300 group overflow-hidden"
      aria-label="Toggle theme"
      data-cursor-hover
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.3, ease: 'backOut' }}
          >
            <Moon className="w-4 h-4 text-[#C4A35A] group-hover:scale-110 transition-transform" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.3, ease: 'backOut' }}
          >
            <Sun className="w-4 h-4 text-[#D4763C] group-hover:scale-110 transition-transform group-hover:rotate-90" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative rays/glow for Sun in light mode */}
      {theme === 'light' && (
        <motion.div
          layoutId="glow"
          className="absolute inset-0 bg-[#D4763C]/10 blur-xl -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </button>
  )
}
