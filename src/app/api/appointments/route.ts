import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { appointmentSchema } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"
import { success, error, handleZodError } from "@/lib/api-response"

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: { treatment: true, user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    })
    return success(appointments)
  } catch {
    return error("Failed to fetch appointments", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const { allowed } = rateLimit(`appointment:${ip}`, 5, 60000)
    if (!allowed) return error("Too many requests. Try again later.", 429)

    const body = await request.json()
    const parsed = appointmentSchema.safeParse(body)
    if (!parsed.success) return handleZodError(parsed.error)

    const { date, ...rest } = parsed.data
    const appointment = await prisma.appointment.create({
      data: { ...rest, date: new Date(date), source: rest.source || "WEBSITE" },
    })
    return success(appointment, 201)
  } catch {
    return error("Failed to create appointment", 500)
  }
}
