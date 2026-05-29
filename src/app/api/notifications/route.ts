import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { notificationSchema } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"
import { success, error, handleZodError } from "@/lib/api-response"

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id")
    const role = request.headers.get("x-user-role")

    let where = {}
    if (role !== "ADMIN") where = { userId }

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    return success(notifications)
  } catch {
    return error("Failed to fetch notifications", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const { allowed } = rateLimit(`notification:${ip}`, 10, 60000)
    if (!allowed) return error("Too many requests. Try again later.", 429)

    const body = await request.json()
    const parsed = notificationSchema.safeParse(body)
    if (!parsed.success) return handleZodError(parsed.error)

    const notification = await prisma.notification.create({
      data: { ...parsed.data, type: parsed.data.type || "INFO" },
    })
    return success(notification, 201)
  } catch {
    return error("Failed to create notification", 500)
  }
}
