"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const CATEGORY_MAP: Record<string, { id: string; label: string }> = {
  MEDICAL_DERMATOLOGY: { id: "medical", label: "Medical Dermatology" },
  COSMETIC_DERMATOLOGY: { id: "cosmetic", label: "Cosmetic Dermatology" },
  LASER_TREATMENTS: { id: "laser", label: "Laser Treatments" },
  HAIR_TREATMENTS: { id: "hair", label: "Hair Treatments" },
  BRIDAL_GROOM: { id: "bridal", label: "Bridal & Groom" },
  AESTHETIC_TREATMENTS: { id: "aesthetic", label: "Aesthetic Treatments" },
}

export default function TreatmentsPage() {
  const [categories, setCategories] = useState<{ id: string; label: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/treatments")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const unique = Array.from(new Set(json.data.map((t: { category: string }) => t.category)))
          const derived = unique
            .map((cat) => CATEGORY_MAP[cat as string])
            .filter(Boolean)
          setCategories(derived as { id: string; label: string }[])
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="pt-32 min-h-screen">
        <div className="container-custom px-6 flex items-center justify-center min-h-[40vh]">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 min-h-screen">
      <div className="container-custom px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-primary/60">
            Our Treatments
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mt-4">
            <span className="text-gradient">Comprehensive Dermatology</span>
            <br />
            <span>Solutions</span>
          </h1>
          <p className="text-white/50 mt-4">
            From medical dermatology to luxury aesthetic treatments, we offer a
            complete range of skin care solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/treatments/${cat.id}`}>
                <div className="glass rounded-3xl p-8 h-full group hover:border-primary/30 transition-all duration-500">
                  <h3 className="text-xl font-heading font-semibold text-white group-hover:text-gradient transition-all">
                    {cat.label}
                  </h3>
                  <div className="mt-6 flex items-center gap-2 text-sm text-primary/60 group-hover:text-primary transition-colors">
                    <span>View treatments</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
