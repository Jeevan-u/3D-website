"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function SkinJournalPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.data.filter((p: any) => p.published === true))
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="pt-32 min-h-screen">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-primary/60">Skin Journal</span>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mt-4">
              <span className="text-gradient">Science & Beauty</span>
            </h1>
            <p className="text-white/50 mt-4">Loading articles...</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 min-h-screen">
      <div className="container-custom px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-primary/60">Skin Journal</span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mt-4">
            <span className="text-gradient">Science & Beauty</span>
          </h1>
          <p className="text-white/50 mt-4">
            Expert insights, skincare tips, and the latest in dermatological science.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <Link href={`/skin-journal/${post.slug}`}>
                <div className="glass rounded-2xl p-6 h-full group-hover:border-primary/20 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary/80">
                      {post.category}
                    </span>
                    <span className="text-xs text-white/30 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <h2 className="text-lg font-heading font-semibold text-white group-hover:text-gradient transition-all leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-white/50 mt-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-xs text-primary/60 group-hover:text-primary transition-colors">
                    <span>Read more</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
