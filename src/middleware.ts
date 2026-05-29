import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"

const protectedAPIPaths = ["/api/appointments", "/api/leads", "/api/blogs", "/api/gallery", "/api/testimonials", "/api/treatments", "/api/notifications", "/api/packages", "/api/upload"]
const adminAPIPaths = ["/api/blogs", "/api/gallery", "/api/testimonials", "/api/notifications", "/api/packages", "/api/upload"]

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api/")) {
    if (pathname === "/api/auth/login" || pathname === "/api/auth/register" || pathname === "/api/contact") {
      return NextResponse.next()
    }

    const isProtected = protectedAPIPaths.some((path) => pathname.startsWith(path))
    if (!isProtected) {
      return NextResponse.next()
    }

    const authHeader = request.headers.get("authorization")
    let token: string | null = null
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.slice(7)
    } else {
      token = request.cookies.get("token")?.value || null
    }

    if (!token) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 401 })
    }

    const isAdminPath = adminAPIPaths.some((path) => pathname.startsWith(path))
    if (isAdminPath && payload.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Admin access required" }, { status: 403 })
    }

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-user-id", payload.id)
    requestHeaders.set("x-user-role", payload.role)

    return NextResponse.next({
      request: { headers: requestHeaders },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/:path*",
}
