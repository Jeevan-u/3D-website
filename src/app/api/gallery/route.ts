import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { gallerySchema } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"
import { success, error, handleZodError } from "@/lib/api-response"

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } })
    return success(images)
  } catch {
    return error("Failed to fetch gallery", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const { allowed } = rateLimit(`gallery:${ip}`, 10, 60000)
    if (!allowed) return error("Too many requests. Try again later.", 429)

    const body = await request.json()
    const parsed = gallerySchema.safeParse(body)
    if (!parsed.success) return handleZodError(parsed.error)

    const image = await prisma.galleryImage.create({
      data: { ...parsed.data, type: parsed.data.type || "IMAGE", featured: parsed.data.featured || false },
    })
    return success(image, 201)
  } catch {
    return error("Failed to add image", 500)
  }
}
