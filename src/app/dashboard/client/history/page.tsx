"use client"

import { motion } from "framer-motion"
import { Clock, CheckCircle, ChevronRight } from "lucide-react"
import Link from "next/link"

const history = [
  { date: "2024-01-10", treatment: "Hydra Facial", doctor: "Dr. Prashali", notes: "Skin hydration improved significantly. Recommended monthly maintenance." },
  { date: "2024-01-03", treatment: "Chemical Peel", doctor: "Dr. Prashali", notes: "First chemical peel session. Mild peeling for 3 days post-treatment." },
  { date: "2023-12-20", treatment: "Acne Treatment Consultation", doctor: "Dr. Prashali", notes: "Initial consultation. Prescribed topical regimen." },
]

export default function ClientHistory() {
  return (
    <div className="pt-32 min-h-screen">
      <div className="container-custom px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-white">Treatment History</h1>
          <p className="text-sm text-white/40">Your complete treatment timeline</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/5" />
          <div className="space-y-8">
            {history.map((item, i) => (
              <motion.div
                key={item.date}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative pl-16"
              >
                <div className="absolute left-4 top-1 w-5 h-5 rounded-full gold-gradient flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-black" />
                </div>
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-base font-heading font-semibold text-white">{item.treatment}</h3>
                      <p className="text-xs text-white/40">{item.doctor}</p>
                    </div>
                    <p className="text-xs text-white/30">{item.date}</p>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">{item.notes}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
