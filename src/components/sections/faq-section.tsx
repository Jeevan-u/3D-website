"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "What makes Prashali Skin Sciences different?",
    a: "We combine advanced dermatological science with luxury care. Our treatments are FDA-approved, dermatologist-supervised, and personalized to your unique skin needs.",
  },
  {
    q: "Are the treatments safe?",
    a: "Absolutely. All our procedures are performed by experienced dermatologists using FDA-approved technologies. We prioritize safety and follow strict clinical protocols.",
  },
  {
    q: "How do I book an appointment?",
    a: "You can book directly through our website, call us, or send a WhatsApp message. We'll help you choose the right treatment and schedule a convenient time.",
  },
  {
    q: "What is the bridal glow program?",
    a: "Our 90-day bridal transformation program is a comprehensive skin journey designed to give you radiant, glowing skin for your wedding day. It includes customized treatments, skincare regimen, and expert guidance.",
  },
  {
    q: "Do you offer male grooming services?",
    a: "Yes! Our 'Grooming For Grooms' package is specifically designed for men. We also offer all our treatments for male clients.",
  },
  {
    q: "What payment options are available?",
    a: "We accept payments at the clinic via cash, UPI, and card. Treatment packages are available at special rates.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
            FAQs
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-4">
            <span className="text-gradient">Frequently Asked Questions</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-white/80">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-primary/60 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-white/50 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
