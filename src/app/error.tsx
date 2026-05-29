"use client"

import { AlertTriangle } from "lucide-react"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="flex flex-col items-center gap-4 max-w-md text-center">
        <AlertTriangle className="w-12 h-12 text-red-400" />
        <h2 className="text-xl font-heading font-bold text-white">Something went wrong</h2>
        <p className="text-sm text-white/40">{error.message || "An unexpected error occurred"}</p>
        <button
          onClick={reset}
          className="px-6 py-2 gold-gradient text-black rounded-xl font-semibold text-sm hover:opacity-90 transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
