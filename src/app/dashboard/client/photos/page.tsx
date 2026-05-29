"use client"

import { motion } from "framer-motion"
import { Upload, Camera, Image } from "lucide-react"

const progressPhotos = [
  { date: "2024-01-10", type: "Front", note: "After first peel session" },
  { date: "2024-01-03", type: "Front", note: "Baseline" },
]

export default function ClientPhotos() {
  return (
    <div className="pt-32 min-h-screen">
      <div className="container-custom px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Progress Photos</h1>
            <p className="text-sm text-white/40">Track your skin transformation journey</p>
          </div>
          <button className="gold-gradient text-black px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Photo
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {progressPhotos.map((photo, i) => (
            <motion.div
              key={photo.date + photo.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative glass rounded-2xl overflow-hidden aspect-[3/4]"
            >
              <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
                <Camera className="w-12 h-12 text-white/10" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                <p className="text-sm text-white font-medium">{photo.type} View</p>
                <p className="text-xs text-white/50">{photo.date}</p>
                <p className="text-xs text-white/30 mt-1">{photo.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
