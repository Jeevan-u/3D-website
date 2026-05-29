import { NextRequest } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { rateLimit } from "@/lib/rate-limit"
import { success, error } from "@/lib/api-response"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const { allowed } = rateLimit(`upload:${ip}`, 10, 60000)
    if (!allowed) return error("Too many uploads. Try again later.", 429)

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    if (!file) return error("No file provided", 400)

    if (file.size > 10 * 1024 * 1024) return error("File too large. Max 10MB.", 400)

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) return error("Invalid file type. JPEG, PNG, WebP, or GIF only.", 400)

    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = buffer.toString("base64")
    const dataUri = `data:${file.type};base64,${base64}`

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "prashali-skin-sciences",
      resource_type: "auto",
    })

    return success({ url: result.secure_url, publicId: result.public_id })
  } catch {
    return error("Upload failed", 500)
  }
}
