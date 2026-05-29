import { NextRequest } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { signToken } from "@/lib/auth"
import { loginSchema } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"
import { success, error, handleZodError } from "@/lib/api-response"

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const { allowed } = rateLimit(`login:${ip}`, 10, 60000)
    if (!allowed) return error("Too many attempts. Try again later.", 429)

    const body = await request.json()
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) return handleZodError(parsed.error)

    const { email, password } = parsed.data
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return error("Invalid credentials", 401)

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return error("Invalid credentials", 401)

    const token = signToken({ id: user.id, email: user.email, role: user.role })
    return success({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
  } catch {
    return error("Login failed", 500)
  }
}
