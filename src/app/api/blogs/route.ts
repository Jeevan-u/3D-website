import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/utils"
import { blogSchema } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"
import { success, error, handleZodError } from "@/lib/api-response"

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } })
    return success(blogs)
  } catch {
    return error("Failed to fetch blogs", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const { allowed } = rateLimit(`blog:${ip}`, 10, 60000)
    if (!allowed) return error("Too many requests. Try again later.", 429)

    const body = await request.json()
    const parsed = blogSchema.safeParse(body)
    if (!parsed.success) return handleZodError(parsed.error)

    const blog = await prisma.blog.create({
      data: {
        ...parsed.data,
        slug: parsed.data.slug || slugify(parsed.data.title),
        tags: parsed.data.tags || [],
        published: parsed.data.published || false,
        featured: parsed.data.featured || false,
      },
    })
    return success(blog, 201)
  } catch {
    return error("Failed to create blog", 500)
  }
}
