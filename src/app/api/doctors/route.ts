import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { doctorSchema } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"
import { success, error, handleZodError } from "@/lib/api-response"

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    })
    return success(doctors)
  } catch {
    return error("Failed to fetch doctors", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const { allowed } = rateLimit(`doctor:${ip}`, 10, 60000)
    if (!allowed) return error("Too many requests. Try again later.", 429)

    const body = await request.json()
    const parsed = doctorSchema.safeParse(body)
    if (!parsed.success) return handleZodError(parsed.error)

    const doctor = await prisma.doctor.create({
      data: { ...parsed.data, specialty: parsed.data.specialty || "" },
    })
    return success(doctor, 201)
  } catch {
    return error("Failed to create doctor", 500)
  }
}
