"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, User, Phone, MessageCircle, ChevronRight } from "lucide-react"
import { generateWhatsAppMessage, WHATSAPP_NUMBER } from "@/lib/utils"

const CATEGORY_MAP: Record<string, { id: string; label: string }> = {
  MEDICAL_DERMATOLOGY: { id: "medical", label: "Medical Dermatology" },
  COSMETIC_DERMATOLOGY: { id: "cosmetic", label: "Cosmetic Dermatology" },
  LASER_TREATMENTS: { id: "laser", label: "Laser Treatments" },
  HAIR_TREATMENTS: { id: "hair", label: "Hair Treatments" },
  BRIDAL_GROOM: { id: "bridal", label: "Bridal & Groom" },
  AESTHETIC_TREATMENTS: { id: "aesthetic", label: "Aesthetic Treatments" },
}

const LABEL_TO_CATEGORY_VALUE: Record<string, string> = {
  "Medical Dermatology": "MEDICAL_DERMATOLOGY",
  "Cosmetic Dermatology": "COSMETIC_DERMATOLOGY",
  "Laser Treatments": "LASER_TREATMENTS",
  "Hair Treatments": "HAIR_TREATMENTS",
  "Bridal & Groom": "BRIDAL_GROOM",
  "Aesthetic Treatments": "AESTHETIC_TREATMENTS",
}

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    category: "",
    treatment: "",
    doctor: "Dr. Prashali",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
  })

  const [categories, setCategories] = useState<{ id: string; label: string }[]>([])
  const [treatmentsList, setTreatmentsList] = useState<{ id: string; name: string; category: string }[]>([])
  const [doctorsList, setDoctorsList] = useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [treatmentsRes, doctorsRes] = await Promise.all([
          fetch("/api/treatments"),
          fetch("/api/doctors"),
        ])
        const treatmentsJson = await treatmentsRes.json()
        const doctorsJson = await doctorsRes.json()

        if (treatmentsJson.success) {
          setTreatmentsList(treatmentsJson.data)
          const unique = Array.from(new Set(treatmentsJson.data.map((t: { category: string }) => t.category)))
          const derived = unique
            .map((cat) => CATEGORY_MAP[cat as string])
            .filter(Boolean)
          setCategories(derived as { id: string; label: string }[])
        }
        if (doctorsJson.success) {
          setDoctorsList(doctorsJson.data)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const selectedCategoryValue = LABEL_TO_CATEGORY_VALUE[formData.category] || ""
  const filteredTreatments = treatmentsList
    .filter((t) => t.category === selectedCategoryValue)
    .map((t) => t.name)

  const handleSubmit = async () => {
    const treatment = treatmentsList.find((t) => t.name === formData.treatment)
    const doctor = doctorsList.find((d) => d.name === formData.doctor)

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      treatmentId: treatment?.id || "",
      doctorId: doctor?.id || "",
      source: "WEBSITE",
    }

    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } catch {
      // Proceed to WhatsApp redirect even if API call fails
    }

    const message = generateWhatsAppMessage({
      treatment: formData.treatment || formData.category,
      date: formData.date,
      time: formData.time,
      name: formData.name,
    })
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank")
  }

  if (loading) {
    return (
      <div className="pt-32 min-h-screen">
        <div className="container-custom px-6 flex items-center justify-center min-h-[40vh]">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 min-h-screen">
      <div className="container-custom px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.2em] uppercase text-primary/60">
              Book Appointment
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mt-4">
              <span className="text-gradient">Begin Your Transformation</span>
            </h1>
            <p className="text-white/50 mt-4">
              Book your consultation in 3 simple steps.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                    step >= s
                      ? "gold-gradient text-black"
                      : "glass text-white/40"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <ChevronRight className="w-4 h-4 text-white/20" />
                )}
              </div>
            ))}
          </div>

          <div className="glass rounded-3xl p-8 md:p-12">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-xl font-heading font-semibold text-white mb-6">
                  Select Treatment Category
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        updateField("category", cat.label)
                        setStep(2)
                      }}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        formData.category === cat.label
                          ? "border-primary bg-primary/10"
                          : "border-white/5 hover:border-white/20"
                      }`}
                    >
                      <span className="text-sm font-medium text-white">
                        {cat.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold text-white">
                    Choose Treatment
                  </h2>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-primary/60 hover:text-primary"
                  >
                    Change Category
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-2">
                  {filteredTreatments.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        updateField("treatment", t)
                        setStep(3)
                      }}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        formData.treatment === t
                          ? "border-primary bg-primary/10"
                          : "border-white/5 hover:border-white/20"
                      }`}
                    >
                      <span className="text-sm text-white">{t}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold text-white">
                    Your Details
                  </h2>
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs text-primary/60 hover:text-primary"
                  >
                    Change Treatment
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      <User className="w-3 h-3 inline mr-1" /> Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      <Phone className="w-3 h-3 inline mr-1" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+91 96060 42223"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      <Calendar className="w-3 h-3 inline mr-1" /> Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/40 transition-all [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">
                      <Clock className="w-3 h-3 inline mr-1" /> Preferred Time
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => updateField("time", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/40 transition-all"
                    >
                      <option value="" className="bg-[#0a0a0a]">Select time</option>
                      <option value="10:00 AM" className="bg-[#0a0a0a]">10:00 AM</option>
                      <option value="11:00 AM" className="bg-[#0a0a0a]">11:00 AM</option>
                      <option value="12:00 PM" className="bg-[#0a0a0a]">12:00 PM</option>
                      <option value="2:00 PM" className="bg-[#0a0a0a]">2:00 PM</option>
                      <option value="3:00 PM" className="bg-[#0a0a0a]">3:00 PM</option>
                      <option value="4:00 PM" className="bg-[#0a0a0a]">4:00 PM</option>
                      <option value="5:00 PM" className="bg-[#0a0a0a]">5:00 PM</option>
                      <option value="6:00 PM" className="bg-[#0a0a0a]">6:00 PM</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone}
                  className="mt-8 w-full gold-gradient text-black py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageCircle className="w-5 h-5" />
                  Book via WhatsApp
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
