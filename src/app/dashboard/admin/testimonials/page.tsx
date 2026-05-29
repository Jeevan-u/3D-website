"use client"

import { motion } from "framer-motion"
import { Star, Quote, Plus, Edit2, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setTestimonials(res.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Testimonials</h1>
          <p className="text-sm text-white/40">Manage client reviews and testimonials</p>
        </div>
        <button className="gold-gradient text-black px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-16">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-white/40 mt-2">Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-full text-center py-16 text-sm text-white/40">No testimonials found.</div>
        ) : (
          testimonials.map((t: any, i: number) => (
            <motion.div
              key={t.id || t._id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-black font-bold text-sm">
                    {(t.name || "?").charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{t.name || "N/A"}</p>
                    <p className="text-xs text-white/40">{t.treatment || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className={`w-3 h-3 ${idx < (t.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-white/10"}`} />
                  ))}
                </div>
              </div>
              <Quote className="w-4 h-4 text-primary/30 mb-2" />
              <p className="text-sm text-white/50 leading-relaxed mb-4">&ldquo;{t.content || t.review || ""}&rdquo;</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  t.status === "Featured" ? "bg-primary/10 text-primary" : "bg-green-500/10 text-green-400"
                }`}>
                  {t.status || "Active"}
                </span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-white/30 hover:text-primary transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-white/30 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
