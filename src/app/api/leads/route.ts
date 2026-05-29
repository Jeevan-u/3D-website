import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { leadSchema } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"
import { success, error, handleZodError } from "@/lib/api-response"

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } })
    return success(leads)
  } catch {
    return error("Failed to fetch leads", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const { allowed } = rateLimit(`lead:${ip}`, 5, 60000)
    if (!allowed) return error("Too many requests. Try again later.", 429)

    const body = await request.json()
    const parsed = leadSchema.safeParse(body)
    if (!parsed.success) return handleZodError(parsed.error)

    const lead = await prisma.lead.create({
      data: { ...parsed.data, source: parsed.data.source || "WEBSITE" },
    })

    await prisma.whatsAppLog.create({
      data: {
        phone: lead.phone,
        message: `New lead: ${lead.name} interested in ${lead.treatment || "treatment"}`,
        treatment: lead.treatment,
        status: "NEW",
      },
    })

    return success(lead, 201)
  } catch {
    return error("Failed to create lead", 500)
  }
}
