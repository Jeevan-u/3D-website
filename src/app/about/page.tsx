"use client"

import { motion } from "framer-motion"
import { Shield, Award, Microscope, Users, Heart, Target } from "lucide-react"

const milestones = [
  { year: "2018", title: "Founded", description: "Prashali Skin Sciences was established with a vision to revolutionize dermatology care." },
  { year: "2019", title: "First 1000 Patients", description: "Reached the milestone of 1000 happy patients within the first year." },
  { year: "2020", title: "FDA Approved Tech", description: "Introduced FDA-approved laser and aesthetic technologies." },
  { year: "2021", title: "Bridal Lounge Launch", description: "Launched India's first luxury bridal skin transformation program." },
  { year: "2022", title: "10K+ Happy Clients", description: "Crossed 10,000 successful treatments and consultations." },
  { year: "2023", title: "Advanced AI Integration", description: "Integrated AI-powered skin analysis for precision dermatology." },
]

const values = [
  { icon: Shield, title: "Safety First", desc: "Every treatment follows strict clinical protocols." },
  { icon: Award, title: "Clinical Excellence", desc: "Dermatologist-supervised procedures at every step." },
  { icon: Microscope, title: "Science-Backed", desc: "Evidence-based treatments with proven results." },
  { icon: Users, title: "Patient-Centric", desc: "Personalized care plans tailored to your unique needs." },
  { icon: Heart, title: "Compassionate Care", desc: "We treat you like family with empathy and respect." },
  { icon: Target, title: "Results-Driven", desc: "Focused on delivering measurable, lasting transformations." },
]

export default function AboutPage() {
  return (
    <div className="pt-32">
      <div className="container-custom px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-primary/60">About Us</span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mt-4">
            <span className="text-gradient">Where Skin Science</span>
            <br />
            <span>Meets Luxury Care</span>
          </h1>
          <p className="text-white/50 mt-6 text-lg leading-relaxed">
            At Prashali Skin Sciences, we believe that great skin is a science. Founded
            with a vision to bridge advanced dermatology with luxury wellness, we have
            grown into one of Mumbai's most trusted skin care destinations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {values.map((value, i) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-8"
              >
                <Icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-heading font-semibold text-white">{value.title}</h3>
                <p className="text-sm text-white/50 mt-2">{value.desc}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-primary/60">Our Journey</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mt-4">
              <span className="text-gradient">Milestones</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`}>
                  <div className="glass rounded-2xl p-6 inline-block">
                    <h3 className="text-lg font-heading font-semibold text-white">{m.title}</h3>
                    <p className="text-sm text-white/50 mt-1">{m.description}</p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full gold-gradient z-10" />
                <div className="flex-1 md:hidden ml-12">
                  <span className="text-xs text-primary/60">{m.year}</span>
                  <div className="glass rounded-2xl p-4 mt-2">
                    <h3 className="text-sm font-heading font-semibold text-white">{m.title}</h3>
                    <p className="text-xs text-white/50 mt-1">{m.description}</p>
                  </div>
                </div>
                <div className="hidden md:block flex-1">
                  <span className="text-sm text-primary/60">{m.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
