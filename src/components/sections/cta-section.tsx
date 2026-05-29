"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { getWhatsAppUrl } from "@/lib/utils"

export function CTASection() {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12 md:p-20 text-center max-w-4xl mx-auto border border-primary/10"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-primary/60">
            Begin Your Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-4">
            <span className="text-gradient">Ready to Transform Your Skin?</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto">
            Take the first step towards healthier, more radiant skin. Book your
            consultation today.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="group gold-gradient text-black px-10 py-4 rounded-full text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-all"
            >
              Book Your Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="glass text-white px-10 py-4 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-primary" />
              Chat on WhatsApp
            </a>
          </div>

          <p className="text-xs text-white/30 mt-6">
            Free consultation • No commitment • Expert dermatologists
          </p>
        </motion.div>
      </div>
    </section>
  )
}
