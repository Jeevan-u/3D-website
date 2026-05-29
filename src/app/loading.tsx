import { Activity } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="flex flex-col items-center gap-4">
        <Activity className="w-8 h-8 text-primary animate-spin" />
        <p className="text-sm text-white/40">Loading...</p>
      </div>
    </div>
  )
}
