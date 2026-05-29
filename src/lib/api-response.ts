import { NextResponse } from "next/server"
import { ZodError } from "zod"

export function success(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function error(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export function handleZodError(err: unknown) {
  if (err instanceof ZodError) {
    return error(err.issues.map((e) => e.message).join(", "))
  }
  return error("Internal server error", 500)
}
