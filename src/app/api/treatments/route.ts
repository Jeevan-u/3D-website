import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { treatmentSchema } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"
import { success, error, handleZodError } from "@/lib/api-response"

export async function GET() {
  try {
    const treatments = await prisma.treatment.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    })
    return success(treatments)
  } catch {
    return error("Failed to fetch treatments", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const { allowed } = rateLimit(`treatment:${ip}`, 10, 60000)
    if (!allowed) return error("Too many requests. Try again later.", 429)

    const body = await request.json()
    const parsed = treatmentSchema.safeParse(body)
    if (!parsed.success) return handleZodError(parsed.error)

    const treatment = await prisma.treatment.create({
      data: {
        ...parsed.data,
        description: parsed.data.description || "",
        benefits: parsed.data.benefits || [],
        images: parsed.data.images || [],
      },
    })
    return success(treatment, 201)
  } catch {
    return error("Failed to create treatment", 500)
  }
}
