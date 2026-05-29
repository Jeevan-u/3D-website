"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles, Heart, Calendar, Clock, Star } from "lucide-react"

const packages = [
  {
    name: "Bride-to-Be Glow Program",
    duration: "90 Days",
    sessions: "8 Sessions",
    price: "Custom",
    features: [
      "Comprehensive skin analysis",
      "Customized treatment plan",
      "8 professional treatments",
      "Home care regimen",
      "Pre-wedding glow boost",
      "Post-event recovery",
    ],
  },
  {
    name: "Wedding Glow Therapy",
    duration: "30 Days",
    sessions: "4 Sessions",
    price: "Custom",
    features: [
      "Deep cleansing & detox",
      "Hydra facial sessions",
      "Skin brightening treatments",
      "Glass skin therapy",
      "LED light therapy",
      "Professional makeup tips",
    ],
  },
  {
    name: "Bridal Laser Package",
    duration: "6 Months",
    sessions: "6+ Sessions",
    price: "Custom",
    features: [
      "Full body laser hair reduction",
      "Face laser resurfacing",
      "Underarm whitening",
      "Skin tightening",
      "Scar reduction",
      "Unlimited touch-ups",
    ],
  },
  {
    name: "Grooming For Grooms",
    duration: "45 Days",
    sessions: "5 Sessions",
    price: "Custom",
    features: [
      "Deep facial cleansing",
      "Acne & spot treatment",
      "Beard grooming",
      "Under eye treatment",
      "Hair styling consultation",
      "Skin brightening",
    ],
  },
]

export default function BridalPage() {
  return (
    <div className="pt-32 min-h-screen">
      <div className="container-custom px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-primary/60 flex items-center justify-center gap-2">
            <Heart className="w-3 h-3" /> Bridal Lounge
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mt-4">
            <span className="text-gradient">Groomed To Glow</span>
          </h1>
          <p className="text-white/50 mt-4 text-lg leading-relaxed">
            Exclusive bridal and groom packages crafted for your most beautiful
            day. Start your transformation journey today.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl p-8 group hover:border-primary/20 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div className="flex gap-3 text-xs text-white/40">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {pkg.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {pkg.sessions}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-heading font-semibold text-white group-hover:text-gradient transition-all">
                {pkg.name}
              </h3>

              <ul className="mt-6 space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                    <Star className="w-3 h-3 text-primary fill-primary/30" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={`/booking?treatment=${encodeURIComponent(pkg.name)}`}
                className="mt-8 gold-gradient text-black px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-all"
              >
                Book This Package
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
