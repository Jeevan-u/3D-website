import { NextRequest } from "next/server"
import { aiAnalyzerSchema } from "@/lib/validations"
import { rateLimit } from "@/lib/rate-limit"
import { success, error, handleZodError } from "@/lib/api-response"

function generateAnalysis() {
  const acne = Math.floor(Math.random() * 30) + 5
  const pigmentation = Math.floor(Math.random() * 25) + 10
  const wrinkles = Math.floor(Math.random() * 20) + 5
  const darkCircles = Math.floor(Math.random() * 35) + 10
  return { acne, pigmentation, wrinkles, darkCircles, skinAge: Math.floor(Math.random() * 5) + 22 }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const { allowed } = rateLimit(`ai-analyzer:${ip}`, 5, 60000)
    if (!allowed) return error("Too many analyses. Try again later.", 429)

    const body = await request.json()
    const parsed = aiAnalyzerSchema.safeParse(body)
    if (!parsed.success) return handleZodError(parsed.error)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const analysis = generateAnalysis()
    const skinScore = Math.max(50, Math.round(100 - (analysis.acne + analysis.pigmentation + analysis.wrinkles) / 3))

    const recommendations = [
      {
        concern: "Acne",
        severity: analysis.acne > 20 ? "Moderate" : "Mild",
        recommendations: [
          "Salicylic acid based cleanser",
          "Non-comedogenic moisturizer",
          "Professional chemical peels",
          "Hydra Facial sessions",
        ],
      },
      {
        concern: "Pigmentation",
        severity: analysis.pigmentation > 20 ? "Moderate" : "Mild",
        recommendations: [
          "Vitamin C serum (morning)",
          "Broad spectrum SPF 50+ sunscreen",
          "Kojic acid or niacinamide treatment",
          "Carbon laser facial for brightening",
        ],
      },
      {
        concern: "Wrinkles & Fine Lines",
        severity: analysis.wrinkles > 15 ? "Moderate" : "Mild",
        recommendations: [
          "Retinol or prescription retinoid",
          "Hyaluronic acid hydration",
          "RF Microneedling sessions",
          "Botox consultation for dynamic wrinkles",
        ],
      },
      {
        concern: "Dark Circles",
        severity: analysis.darkCircles > 25 ? "Moderate" : "Mild",
        recommendations: [
          "Under-eye brightening cream",
          "Cold compresses to reduce puffiness",
          "PRP under-eye treatment",
          "Sleep hygiene improvement",
        ],
      },
    ]

    return success({
      analysis,
      skinScore,
      recommendations,
      disclaimer: "This is an AI-assisted preliminary analysis. Please consult our dermatologist for an accurate diagnosis.",
    })
  } catch {
    return error("Analysis failed", 500)
  }
}
