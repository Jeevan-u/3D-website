"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Sparkles,
  Stethoscope,
  Zap,
  Activity,
  Heart,
  Gem,
  ArrowRight,
} from "lucide-react"
import { treatmentCategories } from "@/lib/utils"

const iconMap: Record<string, React.ReactNode> = {
  stethoscope: <Stethoscope className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  activity: <Activity className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  gem: <Gem className="w-6 h-6" />,
}

export function TreatmentCards() {
  return (
    <section className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-primary/60">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-4">
            <span className="text-gradient">Signature Treatments</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Comprehensive dermatology solutions backed by science and delivered
            with luxury care.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatmentCategories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <Link href={`/treatments/${category.id}`}>
                <div className="glass rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/5">
                  <div className="w-14 h-14 rounded-2xl gold-gradient/20 bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                    {iconMap[category.icon]}
                  </div>

                  <h3 className="text-xl font-heading font-semibold text-white group-hover:text-gradient transition-all">
                    {category.label}
                  </h3>

                  <div className="mt-6 space-y-2">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-2 text-sm text-white/40"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary/40" />
                        Treatment option {j + 1}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-sm text-primary/60 group-hover:text-primary transition-colors">
                    <span>Explore treatments</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
