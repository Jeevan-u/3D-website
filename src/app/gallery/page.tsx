"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Image } from "lucide-react"

interface GalleryItem {
  id: number
  title: string
  description: string | null
  imageUrl: string | null
  category: string
  beforeImg: string | null
  afterImg: string | null
  type: string
  featured: boolean
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("All")
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery")
        const json = await res.json()
        if (json.success) setItems(json.data)
      } catch (err) {
        console.error("Failed to load gallery", err)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))]

  const filtered = activeCategory === "All"
    ? items
    : items.filter((item) => item.category === activeCategory)

  const selectedItem = selected !== null ? items.find((item) => item.id === selected) : null

  const handlePrev = () => {
    if (selected === null) return
    const currentIndex = filtered.findIndex((item) => item.id === selected)
    if (currentIndex > 0) setSelected(filtered[currentIndex - 1].id)
  }

  const handleNext = () => {
    if (selected === null) return
    const currentIndex = filtered.findIndex((item) => item.id === selected)
    if (currentIndex < filtered.length - 1) setSelected(filtered[currentIndex + 1].id)
  }

  return (
    <div className="pt-32 min-h-screen">
      <div className="container-custom px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-primary/60">Our Work</span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mt-4">
            <span className="text-gradient">Real Results. Real Transformations.</span>
          </h1>
          <p className="text-white/50 mt-4">
            See the difference expert dermatological care makes.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-sm transition-all ${
                    activeCategory === cat
                      ? "gold-gradient text-black font-medium"
                      : "glass text-white/50 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setSelected(item.id)}
                  className="group relative glass rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
                >
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
                      <div className="text-center">
                        <Image className="w-10 h-10 text-white/10 mx-auto mb-3" />
                        <p className="text-xs text-white/20">{item.title}</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-5 flex flex-col justify-end">
                    <p className="text-sm text-white font-medium">{item.title}</p>
                    <p className="text-xs text-primary/60 mt-1">{item.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handlePrev() }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors disabled:opacity-10"
              disabled={!selectedItem || filtered.findIndex((item) => item.id === selected) === 0}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleNext() }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors disabled:opacity-10"
              disabled={!selectedItem || filtered.findIndex((item) => item.id === selected) === filtered.length - 1}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {selectedItem && (
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-3xl w-full"
              >
                <div className="glass rounded-3xl overflow-hidden">
                  <div className="aspect-[16/9] bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
                    {selectedItem.beforeImg || selectedItem.afterImg ? (
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-3">
                            <img
                              src={selectedItem.beforeImg || selectedItem.imageUrl || ""}
                              alt="Before"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-white/30">Before</p>
                        </div>
                        <div className="text-primary/40 font-heading text-2xl">→</div>
                        <div className="text-center">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-3">
                            <img
                              src={selectedItem.afterImg || selectedItem.imageUrl || ""}
                              alt="After"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-white/30">After</p>
                        </div>
                      </div>
                    ) : selectedItem.imageUrl ? (
                      <img
                        src={selectedItem.imageUrl}
                        alt={selectedItem.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                          <Image className="w-8 h-8 text-white/20" />
                        </div>
                        <p className="text-xs text-white/30">No image available</p>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-white">{selectedItem.title}</h3>
                    <p className="text-sm text-white/40 mt-1">{selectedItem.category}</p>
                    {selectedItem.description && (
                      <p className="text-xs text-white/40 mt-2">{selectedItem.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
