"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Upload, Sparkles, Loader2 } from "lucide-react"

const analysisResults = {
  acne: { score: 25, label: "Mild Acne", severity: "Low" },
  pigmentation: { score: 35, label: "Moderate Pigmentation", severity: "Medium" },
  wrinkles: { score: 15, label: "Fine Lines", severity: "Low" },
  darkCircles: { score: 45, label: "Moderate Dark Circles", severity: "Medium" },
  skinAge: { score: 28, label: "Skin Age: 28", severity: "Good" },
}

export default function AISkinAnalyzer() {
  const [image, setImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<typeof analysisResults | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImage(ev.target?.result as string)
        analyzeSkin()
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeSkin = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setResults(analysisResults)
      setAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="pt-32 min-h-screen">
      <div className="container-custom px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-primary/60">AI Technology</span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mt-4">
            <span className="text-gradient">AI Skin Analyzer</span>
          </h1>
          <p className="text-white/50 mt-4">
            Upload a selfie and let our AI analyze your skin concerns.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-8 text-center"
          >
            {!image ? (
              <label className="cursor-pointer block">
                <div className="w-32 h-32 mx-auto rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center hover:border-primary/60 transition-all">
                  <Camera className="w-8 h-8 text-primary/60" />
                </div>
                <p className="text-sm text-white/50 mt-4">Upload your selfie</p>
                <p className="text-xs text-white/30 mt-1">JPG, PNG (max 5MB)</p>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            ) : (
              <div className="space-y-6">
                <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden">
                  <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
                  {analyzing && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {results && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {Object.entries(results).map(([key, result]) => (
                        <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                          <span className="text-sm capitalize text-white/70">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full gold-gradient rounded-full"
                                style={{ width: `${result.score}%` }}
                              />
                            </div>
                            <span className="text-xs text-white/50">{result.score}%</span>
                          </div>
                        </div>
                      ))}

                      <div className="mt-6 p-4 rounded-xl gold-gradient/10 border border-primary/20">
                        <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Recommendations
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-white/60">
                          <li>• Schedule a consultation for pigmentation treatment</li>
                          <li>• Consider our Glass Skin therapy for brightness</li>
                          <li>• Use SPF 50+ daily for protection</li>
                        </ul>
                      </div>

                      <button
                        onClick={() => {
                          setImage(null)
                          setResults(null)
                        }}
                        className="text-sm text-primary/60 hover:text-primary transition-colors"
                      >
                        Analyze another photo
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
