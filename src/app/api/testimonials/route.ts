import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { testimonialSchema } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"
import { success, error, handleZodError } from "@/lib/api-response"

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    })
    return success(testimonials)
  } catch {
    return error("Failed to fetch testimonials", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const { allowed } = rateLimit(`testimonial:${ip}`, 5, 60000)
    if (!allowed) return error("Too many requests. Try again later.", 429)

    const body = await request.json()
    const parsed = testimonialSchema.safeParse(body)
    if (!parsed.success) return handleZodError(parsed.error)

    const testimonial = await prisma.testimonial.create({
      data: { ...parsed.data, rating: parsed.data.rating || 5, featured: parsed.data.featured || false },
    })
    return success(testimonial, 201)
  } catch {
    return error("Failed to create testimonial", 500)
  }
}
