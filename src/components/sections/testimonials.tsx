"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  treatment: string
  content: string
  rating: number
  image: string | null
  videoUrl: string | null
  beforeImg: string | null
  afterImg: string | null
  featured: boolean
  active: boolean
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials")
        const json = await res.json()
        if (json.success) setTestimonials(json.data)
      } catch (err) {
        console.error("Failed to load testimonials", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

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
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-4">
            <span className="text-gradient">What Our Patients Say</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Real results from real people. Discover why our patients trust us
            with their skin.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-3xl p-8 group hover:border-primary/20 transition-all duration-500"
              >
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-white/70 leading-relaxed text-sm">
                  {testimonial.content}
                </p>

                <div className="mt-6 flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-black font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-white/40">
                      {testimonial.treatment}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="glass inline-flex items-center gap-8 px-8 py-4 rounded-2xl">
            {[
              { label: "Rating", value: "4.9/5" },
              { label: "Reviews", value: "500+" },
              { label: "Success Rate", value: "98%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-xs text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
