import { NextRequest } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { signToken } from "@/lib/auth"
import { registerSchema } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"
import { success, error, handleZodError } from "@/lib/api-response"

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const { allowed } = rateLimit(`register:${ip}`, 5, 60000)
    if (!allowed) return error("Too many attempts. Try again later.", 429)

    const body = await request.json()
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) return handleZodError(parsed.error)

    const { email, password, name } = parsed.data
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return error("User already exists", 400)

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name: name || email.split("@")[0] },
    })

    const token = signToken({ id: user.id, email: user.email, role: user.role })
    return success({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } }, 201)
  } catch {
    return error("Registration failed", 500)
  }
}
