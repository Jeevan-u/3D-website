"use client"

import { motion } from "framer-motion"
import { Image, Upload, Trash2, Filter } from "lucide-react"
import { useState, useEffect } from "react"

export default function AdminGallery() {
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setGalleryImages(res.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Gallery</h1>
          <p className="text-sm text-white/40">Manage before/after photos and media</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="glass text-white/70 px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:text-white transition-all">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="gold-gradient text-black px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-16">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-white/40 mt-2">Loading gallery...</p>
          </div>
        ) : galleryImages.length === 0 ? (
          <div className="col-span-full text-center py-16 text-sm text-white/40">No gallery images found.</div>
        ) : (
          galleryImages.map((img: any, i: number) => (
            <motion.div
              key={img.id || img._id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative glass rounded-2xl overflow-hidden aspect-square"
            >
              <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
                <Image className="w-12 h-12 text-white/10" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <p className="text-sm text-white font-medium">{img.title || "N/A"}</p>
                <p className="text-xs text-white/50">{img.category || "N/A"}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    img.status === "Featured" ? "bg-primary/10 text-primary" :
                    img.status === "Active" ? "bg-green-500/10 text-green-400" :
                    "bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {img.status || "Active"}
                  </span>
                  <span className="text-xs text-white/40">{img.type || "IMAGE"}</span>
                </div>
              </div>
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
