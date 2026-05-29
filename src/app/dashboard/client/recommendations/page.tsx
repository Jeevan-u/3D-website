"use client"

import { motion } from "framer-motion"
import { Lightbulb, ArrowRight } from "lucide-react"
import Link from "next/link"

const recommendations = [
  {
    category: "Skincare Routine",
    items: [
      "Use salicylic acid cleanser twice daily",
      "Apply vitamin C serum every morning",
      "Use broad spectrum SPF 50+ sunscreen",
      "Moisturize with ceramide-rich cream at night",
    ],
  },
  {
    category: "Professional Treatments",
    items: [
      "Hydra Facial every 3-4 weeks",
      "Chemical peel series (4 sessions)",
      "Carbon laser facial for pore refinement",
    ],
  },
  {
    category: "Lifestyle Tips",
    items: [
      "Drink 8-10 glasses of water daily",
      "Include omega-3 rich foods in diet",
      "Avoid touching face throughout the day",
      "Change pillowcases twice a week",
      "Aim for 7-8 hours of quality sleep",
    ],
  },
]

export default function ClientRecommendations() {
  return (
    <div className="pt-32 min-h-screen">
      <div className="container-custom px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-white">Recommendations</h1>
          <p className="text-sm text-white/40">Personalized skincare recommendations for you</p>
        </motion.div>

        <div className="space-y-8">
          {recommendations.map((section, i) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-lg font-heading font-semibold text-white mb-4">{section.category}</h2>
              <div className="space-y-3">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full gold-gradient flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] text-black font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 gold-gradient text-black px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all"
          >
            Book a Follow-up
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
