import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="flex flex-col items-center gap-4 max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
          <span className="text-2xl">404</span>
        </div>
        <h2 className="text-xl font-heading font-bold text-white">Page not found</h2>
        <p className="text-sm text-white/40">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2 gold-gradient text-black rounded-xl font-semibold text-sm hover:opacity-90 transition-all"
        >
          <Home className="w-4 h-4" />
          Go home
        </Link>
      </div>
    </div>
  )
}
