import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date, locale = "en-IN") {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function generateWhatsAppMessage(data: {
  treatment?: string
  date?: string
  time?: string
  name?: string
}) {
  let message = `Hello Prashali Skin Sciences, I would like to book an appointment`
  if (data.treatment) message += ` for ${data.treatment}`
  if (data.date) message += ` on ${data.date}`
  if (data.time) message += ` at ${data.time}`
  if (data.name) message += `. Name: ${data.name}`
  message += `.`
  return encodeURIComponent(message)
}

export const WHATSAPP_NUMBER = "919606042223"

export function getWhatsAppUrl(message?: string) {
  const text = message || generateWhatsAppMessage({})
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

export const treatmentCategories = [
  { id: "medical", value: "MEDICAL_DERMATOLOGY", label: "Medical Dermatology", icon: "stethoscope" },
  { id: "cosmetic", value: "COSMETIC_DERMATOLOGY", label: "Cosmetic Dermatology", icon: "sparkles" },
  { id: "laser", value: "LASER_TREATMENTS", label: "Laser Treatments", icon: "zap" },
  { id: "hair", value: "HAIR_TREATMENTS", label: "Hair Treatments", icon: "activity" },
  { id: "bridal", value: "BRIDAL_GROOM", label: "Bridal & Groom", icon: "heart" },
  { id: "aesthetic", value: "AESTHETIC_TREATMENTS", label: "Aesthetic Treatments", icon: "gem" },
] as const

export const treatments = {
  MEDICAL_DERMATOLOGY: [
    "Acne Treatment", "Acne Scar Reduction", "Pigmentation Treatment",
    "Melasma Treatment", "Psoriasis Care", "Eczema Management",
    "Skin Allergy Treatment", "Vitiligo Consultation", "Fungal Infection Care",
    "Anti-aging Dermatology"
  ],
  COSMETIC_DERMATOLOGY: [
    "Hydra Facial", "Chemical Peels", "Medi Facials",
    "Carbon Laser Facial", "Glass Skin Treatment", "Korean Skin Therapy",
    "Under Eye Treatment", "Skin Brightening", "Open Pore Reduction",
    "Skin Rejuvenation"
  ],
  LASER_TREATMENTS: [
    "Laser Hair Reduction", "CO2 Laser Resurfacing", "Tattoo Removal",
    "Acne Scar Laser", "Pigmentation Laser", "Stretch Mark Reduction",
    "Skin Tightening"
  ],
  HAIR_TREATMENTS: [
    "PRP Therapy", "GFC Hair Therapy", "Hair Fall Treatment",
    "Dandruff Care", "Hair Regrowth", "Scalp Analysis",
    "Hair Transplant Consultation"
  ],
  BRIDAL_GROOM: [
    "Bride-to-Be Glow Program", "Grooming For Grooms", "Bridal Skin Planning",
    "Wedding Glow Therapy", "Bridal Acne Solutions", "Bridal Laser Packages",
    "Skin Polishing", "90-Day Transformation Plans"
  ],
  AESTHETIC_TREATMENTS: [
    "Botox", "Fillers", "Lip Enhancement",
    "Jawline Sculpting", "Double Chin Reduction", "HIFU Tightening",
    "RF Microneedling", "Non-Surgical Face Lift"
  ],
} as const

export const trustMetrics = [
  { label: "Satisfaction Rate", value: 95, suffix: "%", icon: "star" },
  { label: "Safe Treatments", value: 100, suffix: "%", icon: "shield" },
  { label: "Happy Clients", value: 10000, suffix: "+", icon: "users" },
  { label: "FDA Approved", value: 100, suffix: "%", icon: "certificate" },
] as const
