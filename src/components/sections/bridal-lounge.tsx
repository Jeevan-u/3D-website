"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles, Calendar, Clock, Heart } from "lucide-react"

interface Package {
  id: number
  name: string
  slug: string
  description: string
  treatments: string
  price: string | null
  duration: string
  category: string
  active: boolean
}

export function BridalLounge() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("/api/packages")
        const json = await res.json()
        if (json.success) setPackages(json.data)
      } catch (err) {
        console.error("Failed to load packages", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f0a] via-transparent to-[#0a0a1a]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-primary/60 flex items-center justify-center gap-2">
            <Heart className="w-3 h-3" /> Bridal Lounge
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-4">
            <span className="text-gradient">Groomed To Glow</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Exclusive bridal and groom packages designed for your most
            beautiful day.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="glass rounded-3xl p-8 border border-white/5 group-hover:border-primary/20 transition-all duration-500">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {pkg.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {pkg.treatments}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-semibold text-white group-hover:text-gradient transition-all">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-white/50 mt-2 leading-relaxed">
                    {pkg.description}
                  </p>

                  <Link
                    href={`/booking?treatment=${encodeURIComponent(pkg.name)}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm text-primary/60 group-hover:text-primary transition-colors"
                  >
                    Book Now
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/bridal"
            className="inline-flex items-center gap-2 gold-gradient text-black px-8 py-4 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
          >
            Explore All Bridal Packages
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
