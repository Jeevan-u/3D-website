import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { contactSchema } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"
import { success, error, handleZodError } from "@/lib/api-response"

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const { allowed } = rateLimit(`contact:${ip}`, 3, 60000)
    if (!allowed) return error("Too many messages. Try again later.", 429)

    const body = await request.json()
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) return handleZodError(parsed.error)

    const lead = await prisma.lead.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || "",
        treatment: parsed.data.treatment || "",
        message: parsed.data.message,
        source: "CONTACT_FORM",
      },
    })

    return success(lead, 201)
  } catch {
    return error("Failed to send message", 500)
  }
}
