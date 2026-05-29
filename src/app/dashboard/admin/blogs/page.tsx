"use client"

import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, Search } from "lucide-react"
import { useState, useEffect } from "react"

export default function AdminBlogs() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setBlogPosts(res.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Blogs</h1>
          <p className="text-sm text-white/40">Manage your skin journal articles</p>
        </div>
        <button className="gold-gradient text-black px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Title</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Category</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Status</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Views</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Date</th>
              <th className="text-right p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-white/40 mt-2">Loading blogs...</p>
                </td>
              </tr>
            ) : blogPosts.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-sm text-white/40">No blog posts found.</td>
              </tr>
            ) : (
              blogPosts.map((post: any, i: number) => (
                <motion.tr
                  key={post.id || post._id || i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4 text-sm text-white">{post.title || "N/A"}</td>
                  <td className="p-4 text-sm text-white/50">{post.category || "N/A"}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      post.status === "Published" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                    }`}>
                      {post.status || "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-white/50">{post.views ?? 0}</td>
                  <td className="p-4 text-sm text-white/40">{post.date ? new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}</td>
                  <td className="p-4 text-right">
                    <button className="text-white/30 hover:text-primary transition-colors mr-3">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-white/30 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
