"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, MessageCircle, Check } from "lucide-react"
import { getWhatsAppUrl } from "@/lib/utils"

const ID_TO_CATEGORY: Record<string, { value: string; label: string }> = {
  medical: { value: "MEDICAL_DERMATOLOGY", label: "Medical Dermatology" },
  cosmetic: { value: "COSMETIC_DERMATOLOGY", label: "Cosmetic Dermatology" },
  laser: { value: "LASER_TREATMENTS", label: "Laser Treatments" },
  hair: { value: "HAIR_TREATMENTS", label: "Hair Treatments" },
  bridal: { value: "BRIDAL_GROOM", label: "Bridal & Groom" },
  aesthetic: { value: "AESTHETIC_TREATMENTS", label: "Aesthetic Treatments" },
}

export default function TreatmentCategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const category = ID_TO_CATEGORY[slug]

  const [treatmentNames, setTreatmentNames] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!category) {
      setLoading(false)
      return
    }
    fetch("/api/treatments")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          const filtered = json.data
            .filter((t: { category: string }) => t.category === category.value)
            .map((t: { name: string }) => t.name)
          setTreatmentNames(filtered)
        }
      })
      .finally(() => setLoading(false))
  }, [category])

  if (!category) {
    return (
      <div className="pt-32 min-h-screen container-custom px-6">
        <p className="text-white/50">Category not found.</p>
      </div>
    )
  }

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
          className="max-w-3xl"
        >
          <Link
            href="/treatments"
            className="text-xs text-primary/60 hover:text-primary transition-colors"
          >
            ← Back to Treatments
          </Link>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mt-4">
            <span className="text-gradient">{category.label}</span>
          </h1>
          <p className="text-white/50 mt-4 text-lg leading-relaxed">
            Advanced treatments in {category.label.toLowerCase()} delivered with
            precision care and luxury comfort.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {treatmentNames.map((treatment, i) => (
            <motion.div
              key={treatment}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 group hover:border-primary/20 transition-all duration-500"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white group-hover:text-gradient transition-all">
                    {treatment}
                  </h3>
                  <a
                    href={getWhatsAppUrl(
                      `Hi Prashali Skin Sciences, I would like to know more about ${treatment}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary/40 hover:text-primary transition-colors mt-2 inline-flex items-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 gold-gradient text-black px-8 py-4 rounded-full text-sm font-semibold hover:opacity-90 transition-all"
          >
            Book Appointment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
