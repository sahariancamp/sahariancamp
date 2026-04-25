"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "The Camp", href: "/" },
  { label: "Sanctuaries", href: "/tents" },
  { label: "Experiences", href: "/activities" },
  { label: "Gallery", href: "/gallery" },
  {
    label: "Explore",
    href: "#",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Location", href: "/location" },
      { label: "FAQ", href: "/faq" },
      { label: "Weather", href: "/weather" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-primary/10"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
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
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <button
                    className={`flex items-center h-8 gap-1 text-xs tracking-[0.2em] uppercase transition-colors duration-300 relative group ${
                      activeDropdown === link.label
                        ? "text-primary"
                        : "text-muted-foreground/70 hover:text-primary"
                    }`}
                    style={{ fontFamily: "'Amiri', serif" }}
                    data-cursor-hover
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-300 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`flex items-center h-8 text-xs tracking-[0.2em] uppercase transition-colors duration-300 relative group ${
                      pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground/70 hover:text-primary"
                    }`}
                    style={{ fontFamily: "'Amiri', serif" }}
                    data-cursor-hover
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-300 ${
                        pathname === link.href
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.children && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-4 w-48 bg-background/95 backdrop-blur-xl border border-primary/10 rounded-2xl shadow-2xl overflow-hidden p-2"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                            style={{ fontFamily: "'Amiri', serif" }}
                            data-cursor-hover
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {/* Book CTA */}
            <Link
              href="/booking"
              className="magnetic-btn px-6 py-2 border border-primary/40 text-primary text-xs tracking-[0.2em] uppercase rounded-full hover:bg-primary/10 transition-all text-center"
              style={{ fontFamily: "'Amiri', serif" }}
              data-cursor-hover
            >
              Reserve
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-primary p-2"
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
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center"
                >
                  {link.children ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === link.label ? null : link.label
                          )
                        }
                        className="flex items-center gap-2 text-2xl tracking-[0.2em] uppercase text-muted-foreground"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            mobileExpanded === link.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col items-center gap-4 mt-4"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="text-lg tracking-[0.1em] uppercase text-muted-foreground/60 hover:text-primary"
                                style={{ fontFamily: "'Amiri', serif" }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`text-2xl tracking-[0.2em] uppercase transition-colors ${
                        pathname === link.href
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  href="/booking"
                  className="mt-4 px-8 py-3 border border-primary/40 text-primary text-sm tracking-[0.2em] uppercase rounded-full inline-block"
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
  );
}
