"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { HeroScene } from "@/components/3d/hero-scene"
import { useDeviceCapability } from "@/hooks/use-animations"
import { getWhatsAppUrl, trustMetrics } from "@/lib/utils"
import { AnimatedCounter } from "@/components/ui/animated-counter"

function FloatingMetric({
  label,
  value,
  suffix,
  delay,
}: {
  label: string
  value: number
  suffix: string
  delay: number
}) {
  const [start, setStart] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStart(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000 }}
      className="text-center"
    >
      <div className="text-2xl md:text-3xl font-bold text-gradient">
        {start && <AnimatedCounter end={value} duration={2000} />}
        {suffix}
      </div>
      <div className="text-xs text-white/50 mt-1">{label}</div>
    </motion.div>
  )
}

export function HeroSection() {
  const { reducedMotion } = useDeviceCapability()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {!reducedMotion && <HeroScene />}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/20 to-[#0a0a0a]" />

      <div className="relative z-10 container-custom px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 rounded-full text-xs tracking-wider uppercase border border-primary/20 text-primary/80 bg-primary/5 mb-6">
              Advanced Skin Science Meets Luxury Care
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-[1.1] tracking-tight"
          >
            <span className="text-gradient glow-text">
              Advanced Dermatology
            </span>
            <br />
            <span className="text-white">& Luxury Skin Science</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
          >
            Trusted skin, hair and aesthetic treatments designed for confidence,
            glow and transformation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/booking"
              className="group gold-gradient text-black px-8 py-4 rounded-full text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-all"
            >
              Book Appointment
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="glass text-white px-8 py-4 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-primary" />
              WhatsApp Consultation
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {trustMetrics.map((metric, i) => (
              <FloatingMetric
                key={metric.label}
                label={metric.label}
                value={metric.value}
                suffix={metric.suffix}
                delay={1400 + i * 200}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  )
}
