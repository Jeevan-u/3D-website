"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, ArrowLeft, Share2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const found = data.data.find((p: any) => p.slug === slug)
          setPost(found || null)
        }
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="pt-32 min-h-screen pb-20">
        <div className="container-custom px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-white/50">Loading article...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    notFound()
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    toast.success("Link copied to clipboard!")
  }

  return (
    <div className="pt-32 min-h-screen pb-20">
      <div className="container-custom px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary/80">
              {post.category}
            </span>
            <span className="text-xs text-white/30 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.createdAt)}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-base md:text-lg text-white/50 mb-10">
            {post.excerpt}
          </p>

          <div className="prose prose-invert max-w-none">
            {post.content.split("\n").map((line: string, i: number) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-xl md:text-2xl font-heading font-semibold text-white mt-10 mb-4">
                    {line.replace("## ", "")}
                  </h2>
                )
              }
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-lg md:text-xl font-heading font-semibold text-white mt-8 mb-3">
                    {line.replace("### ", "")}
                  </h3>
                )
              }
              if (line.startsWith("**") && line.endsWith("**")) {
                return (
                  <p key={i} className="text-white/80 font-semibold mt-4 mb-2">
                    {line.replace(/\*\*/g, "")}
                  </p>
                )
              }
              if (line.startsWith("- **")) {
                const match = line.match(/- \*\*(.+?)\*\*(.*)/)
                if (match) {
                  return (
                    <li key={i} className="text-white/60 ml-4 mb-1 list-disc">
                      <span className="text-white/80 font-semibold">{match[1]}</span>
                      {match[2]}
                    </li>
                  )
                }
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={i} className="text-white/60 ml-4 mb-1 list-disc">
                    {line.replace("- ", "")}
                  </li>
                )
              }
              if (line.match(/^\d+\.\s/)) {
                const content = line.replace(/^\d+\.\s/, "")
                return (
                  <li key={i} className="text-white/60 ml-4 mb-1 list-decimal">
                    {content}
                  </li>
                )
              }
              if (line.trim() === "") {
                return <div key={i} className="h-2" />
              }
              return (
                <p key={i} className="text-white/60 leading-relaxed mb-3">
                  {line}
                </p>
              )
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => router.push("/skin-journal")}
              className="flex items-center gap-2 text-sm text-primary/60 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Articles
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm text-white/40 hover:text-primary transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
