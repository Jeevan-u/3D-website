import { NextRequest } from "next/server"
import { whatsappSchema } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"
import { success, error, handleZodError } from "@/lib/api-response"

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const { allowed } = rateLimit(`whatsapp:${ip}`, 10, 60000)
    if (!allowed) return error("Too many requests. Try again later.", 429)

    const body = await request.json()
    const parsed = whatsappSchema.safeParse(body)
    if (!parsed.success) return handleZodError(parsed.error)

    const whatsappUrl = `https://wa.me/${process.env.WHATSAPP_NUMBER}?text=${encodeURIComponent(parsed.data.message || "")}`

    return success({ url: whatsappUrl, phone: parsed.data.phone, message: parsed.data.message })
  } catch {
    return error("Failed to generate WhatsApp link", 500)
  }
}
