"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, UserPlus } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!data.success) {
        toast.error(data.error || "Registration failed")
        return
      }
      const secure = window.location.protocol === "https:" ? "; Secure" : ""
      document.cookie = `token=${data.data.token}; path=/; max-age=604800; SameSite=Strict${secure}`
      toast.success("Account created!")
      router.push(data.data.user.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/client")
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="container-custom px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-10">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-heading text-gradient font-bold">Prashali</span>
              <p className="text-[8px] tracking-[0.3em] text-primary/60 uppercase">Skin Sciences</p>
            </Link>
          </div>

          <div className="glass rounded-3xl p-8">
            <h1 className="text-2xl font-heading font-bold text-white mb-2">Create Account</h1>
            <p className="text-sm text-white/50 mb-8">Join Prashali Skin Sciences</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full gold-gradient text-black py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
              >
                <UserPlus className="w-4 h-4" />
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-white/30">
                Already have an account?{" "}
                <Link href="/login" className="text-primary/60 hover:text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
