import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
})

export const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
})

export const appointmentSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone required"),
  date: z.string().min(1, "Date required"),
  time: z.string().min(1, "Time required"),
  treatmentId: z.string().min(1, "Treatment required"),
  doctorId: z.string().min(1, "Doctor required"),
  notes: z.string().optional(),
  source: z.string().optional(),
})

export const leadSchema = z.object({
  name: z.string().min(1, "Name required"),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email().optional().or(z.literal("")),
  treatment: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
})

export const contactSchema = z.object({
  name: z.string().min(1, "Name required"),
  phone: z.string().min(10, "Valid phone required"),
  message: z.string().min(1, "Message required"),
  email: z.string().email().optional().or(z.literal("")),
  treatment: z.string().optional(),
})

export const testimonialSchema = z.object({
  name: z.string().min(1, "Name required"),
  content: z.string().min(1, "Content required"),
  treatment: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  image: z.string().optional(),
  videoUrl: z.string().optional(),
  beforeImg: z.string().optional(),
  afterImg: z.string().optional(),
  featured: z.boolean().optional(),
})

export const gallerySchema = z.object({
  imageUrl: z.string().min(1, "Image URL required"),
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  beforeImg: z.string().optional(),
  afterImg: z.string().optional(),
  type: z.enum(["IMAGE", "VIDEO", "BEFORE_AFTER"]).optional(),
  featured: z.boolean().optional(),
})

export const treatmentSchema = z.object({
  name: z.string().min(1, "Name required"),
  slug: z.string().min(1, "Slug required"),
  category: z.enum(["MEDICAL_DERMATOLOGY", "COSMETIC_DERMATOLOGY", "LASER_TREATMENTS", "HAIR_TREATMENTS", "BRIDAL_GROOM", "AESTHETIC_TREATMENTS"]),
  description: z.string().optional(),
  overview: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  procedure: z.string().optional(),
  duration: z.string().optional(),
  recovery: z.string().optional(),
  faqs: z.any().optional(),
  price: z.number().optional(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
})

export const doctorSchema = z.object({
  name: z.string().min(1, "Name required"),
  slug: z.string().min(1, "Slug required"),
  specialty: z.string().optional(),
  bio: z.string().optional(),
  image: z.string().optional(),
  experience: z.number().int().optional(),
  education: z.string().optional(),
})

export const packageSchema = z.object({
  name: z.string().min(1, "Name required"),
  slug: z.string().min(1, "Slug required"),
  description: z.string().optional(),
  treatments: z.array(z.string()).optional(),
  price: z.number().optional(),
  duration: z.string().optional(),
  category: z.string().optional(),
})

export const notificationSchema = z.object({
  userId: z.string().min(1, "User ID required"),
  title: z.string().min(1, "Title required"),
  message: z.string().min(1, "Message required"),
  type: z.string().optional(),
})

export const blogSchema = z.object({
  title: z.string().min(1, "Title required"),
  content: z.string().min(1, "Content required"),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  author: z.string().optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
})

export const whatsappSchema = z.object({
  phone: z.string().min(1, "Phone required"),
  message: z.string().optional(),
})

export const aiAnalyzerSchema = z.object({
  image: z.string().min(1, "Image required"),
})
