export interface TreatmentType {
  id: string
  name: string
  slug: string
  category: string
  description: string
  overview?: string
  benefits: string[]
  procedure?: string
  duration?: string
  recovery?: string
  faqs: FAQType[]
  price?: number
  image?: string
  images: string[]
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface FAQType {
  id: string
  question: string
  answer: string
}

export interface AppointmentType {
  id: string
  userId?: string
  treatmentId?: string
  treatment?: TreatmentType
  doctorId?: string
  name: string
  email?: string
  phone: string
  date: string
  time: string
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED"
  notes?: string
  source: string
  createdAt: string
  updatedAt: string
}

export interface TestimonialType {
  id: string
  name: string
  treatment?: string
  content: string
  rating: number
  image?: string
  videoUrl?: string
  beforeImg?: string
  afterImg?: string
  featured: boolean
  active: boolean
  createdAt: string
}

export interface BlogType {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  category?: string
  tags: string[]
  image?: string
  author?: string
  published: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface LeadType {
  id: string
  name: string
  phone: string
  email?: string
  treatment?: string
  message?: string
  source: string
  status: string
  createdAt: string
}

export interface GalleryType {
  id: string
  title?: string
  description?: string
  imageUrl: string
  category?: string
  beforeImg?: string
  afterImg?: string
  type: string
  featured: boolean
  createdAt: string
}

export interface DoctorType {
  id: string
  name: string
  slug: string
  specialty: string
  bio?: string
  image?: string
  experience?: number
  education?: string
  active: boolean
  createdAt: string
}

export interface UserType {
  id: string
  email: string
  name: string
  phone?: string
  role: "CLIENT" | "ADMIN" | "SUPER_ADMIN"
  image?: string
  createdAt: string
}

export interface PackageType {
  id: string
  name: string
  slug: string
  description?: string
  treatments: string[]
  price?: number
  duration?: string
  category?: string
  active: boolean
}

export interface NotificationType {
  id: string
  userId: string
  title: string
  message: string
  type: string
  read: boolean
  createdAt: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  limit: number
}
