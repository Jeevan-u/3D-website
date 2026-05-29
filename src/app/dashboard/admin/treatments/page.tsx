"use client"

import { motion } from "framer-motion"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"

export default function AdminTreatments() {
  const [treatments, setTreatments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/treatments")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setTreatments(res.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Treatments</h1>
          <p className="text-sm text-white/40">Manage your treatment offerings</p>
        </div>
        <button className="gold-gradient text-black px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Treatment
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Name</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Category</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Price</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Status</th>
              <th className="text-right p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-white/40 mt-2">Loading treatments...</p>
                </td>
              </tr>
            ) : treatments.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-sm text-white/40">No treatments found.</td>
              </tr>
            ) : (
              treatments.map((t: any, i: number) => (
                <motion.tr
                  key={t.id || t._id || i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="p-4 text-sm text-white">{t.name || "N/A"}</td>
                  <td className="p-4 text-sm text-white/50">{t.category || "N/A"}</td>
                  <td className="p-4 text-sm text-white/50">{t.price || "N/A"}</td>
                  <td className="p-4">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
                      {t.status || "Active"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-white/30 hover:text-primary transition-colors mr-3">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-white/30 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
