import { NextRequest } from "next/server"
import { getUserFromRequest } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { success, error } from "@/lib/api-response"

export async function GET(request: NextRequest) {
  try {
    const payload = getUserFromRequest(request)
    if (!payload) return error("Unauthorized", 401)

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true, name: true, phone: true, role: true, image: true, createdAt: true },
    })
    if (!user) return error("User not found", 404)

    return success(user)
  } catch {
    return error("Failed to fetch user", 500)
  }
}
