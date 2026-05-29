"use client"

import { motion } from "framer-motion"
import { FileText, Download, Calendar } from "lucide-react"

const prescriptions = [
  { id: 1, title: "Acne Treatment Plan", doctor: "Dr. Prashali", date: "2024-01-10", type: "PDF" },
  { id: 2, title: "Post-Peel Care Instructions", doctor: "Dr. Prashali", date: "2024-01-03", type: "PDF" },
  { id: 3, title: "Skincare Routine Prescription", doctor: "Dr. Prashali", date: "2023-12-20", type: "PDF" },
]

export default function ClientPrescriptions() {
  return (
    <div className="pt-32 min-h-screen">
      <div className="container-custom px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-white">Prescriptions</h1>
          <p className="text-sm text-white/40">Download your prescriptions and treatment plans</p>
        </motion.div>

        <div className="space-y-4">
          {prescriptions.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
                  <FileText className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-sm text-white font-medium">{p.title}</p>
                  <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                    {p.doctor} · {p.date}
                  </p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30 hover:text-primary hover:bg-white/10 transition-all">
                <Download className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
