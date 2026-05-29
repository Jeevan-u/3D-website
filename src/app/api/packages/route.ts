import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { packageSchema } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"
import { success, error, handleZodError } from "@/lib/api-response"

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    })
    return success(packages)
  } catch {
    return error("Failed to fetch packages", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const { allowed } = rateLimit(`package:${ip}`, 10, 60000)
    if (!allowed) return error("Too many requests. Try again later.", 429)

    const body = await request.json()
    const parsed = packageSchema.safeParse(body)
    if (!parsed.success) return handleZodError(parsed.error)

    const pkg = await prisma.package.create({
      data: { ...parsed.data, treatments: parsed.data.treatments || [] },
    })
    return success(pkg, 201)
  } catch {
    return error("Failed to create package", 500)
  }
}
