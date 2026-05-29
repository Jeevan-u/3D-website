"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react"
import { getWhatsAppUrl } from "@/lib/utils"
import toast from "react-hot-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    treatment: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!data.success) {
        toast.error(data.error || "Failed to send message")
        return
      }
      toast.success("Message sent! We'll get back to you shortly.")
      setFormData({ name: "", phone: "", email: "", treatment: "", message: "" })
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
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
            Get in Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mt-4">
            <span className="text-gradient">Let&apos;s Start Your Journey</span>
          </h1>
          <p className="text-white/50 mt-4">
            Reach out to us for consultations, enquiries, or any questions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {[
              { icon: Phone, label: "Phone", value: "+91 96060 42223", href: "tel:+919606042223" },
              { icon: Mail, label: "Email", value: "hello@prashaliskinsciences.com", href: "mailto:hello@prashaliskinsciences.com" },
              { icon: MapPin, label: "Location", value: "Mumbai / Navi Mumbai", href: null },
              { icon: Clock, label: "Hours", value: "Mon–Sat: 10AM–8PM\nSunday: By Appointment", href: null },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="glass rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-white hover:text-primary transition-colors mt-1 block">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-white mt-1 whitespace-pre-line">{item.value}</p>
                    )}
                  </div>
                </div>
              )
            })}

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 gold-gradient text-black py-4 rounded-2xl font-semibold hover:opacity-90 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-3xl p-8"
          >
            <h2 className="text-xl font-heading font-semibold text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (optional)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all"
              />
              <select
                name="treatment"
                value={formData.treatment}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all"
              >
                <option value="" className="bg-[#0a0a0a]">Select Treatment</option>
                <option className="bg-[#0a0a0a]">Acne Treatment</option>
                <option className="bg-[#0a0a0a]">Laser Hair Reduction</option>
                <option className="bg-[#0a0a0a]">Bridal Package</option>
                <option className="bg-[#0a0a0a]">General Enquiry</option>
              </select>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all resize-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full gold-gradient text-black py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
