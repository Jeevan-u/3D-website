"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Treatments",
    href: "/treatments",
    children: [
      { label: "Medical Dermatology", href: "/treatments/medical" },
      { label: "Cosmetic Dermatology", href: "/treatments/cosmetic" },
      { label: "Laser Treatments", href: "/treatments/laser" },
      { label: "Hair Treatments", href: "/treatments/hair" },
      { label: "Bridal & Groom", href: "/treatments/bridal" },
      { label: "Aesthetic Treatments", href: "/treatments/aesthetic" },
    ],
  },
  {
    label: "Bridal Lounge",
    href: "/bridal",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Skin Journal",
    href: "/skin-journal",
  },
  {
    label: "Contact",
    href: "/contact",
  },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container-custom px-6 flex items-center justify-between">
        <Link href="/" className="relative z-10">
          <span className="text-xl font-heading text-gradient font-bold tracking-wide">
            Prashali
          </span>
          <span className="block text-[8px] tracking-[0.3em] text-primary/60 uppercase">
            Skin Sciences
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="text-sm text-white/70 hover:text-primary transition-colors flex items-center gap-1"
              >
                {item.label}
                {item.children && <ChevronDown className="w-3 h-3" />}
              </Link>
              {item.children && activeDropdown === item.label && (
                <div className="absolute top-full left-0 pt-4">
                  <div className="glass rounded-2xl p-2 min-w-[220px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-white/70 hover:text-primary hover:bg-white/5 rounded-xl transition-all"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/booking"
            className="gold-gradient text-black px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Book Appointment
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative z-10 text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-2xl lg:hidden pt-24"
          >
            <div className="container-custom px-6 flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-4 text-xl text-white/80 hover:text-primary border-b border-white/5 transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 pl-4 text-sm text-white/50 hover:text-primary transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="gold-gradient text-black px-8 py-4 rounded-full text-lg font-medium text-center block"
                >
                  Book Appointment
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
