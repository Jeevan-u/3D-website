"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { useState } from "react"
import { getWhatsAppUrl } from "@/lib/utils"

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)

  const quickReplies = [
    "Book an appointment",
    "Treatment enquiry",
    "Bridal package info",
    "Price consultation",
  ]

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gold-gradient shadow-lg shadow-primary/20 flex items-center justify-center text-black"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[320px]"
          >
            <div className="glass rounded-2xl overflow-hidden">
              <div className="gold-gradient p-4">
                <p className="text-black font-semibold text-sm">
                  Chat with us
                </p>
                <p className="text-black/70 text-xs mt-1">
                  We usually reply within minutes
                </p>
              </div>
              <div className="p-4 space-y-2">
                {quickReplies.map((reply) => (
                  <a
                    key={reply}
                    href={getWhatsAppUrl(
                      `Hi Prashali Skin Sciences, I would like to ${reply.toLowerCase()}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-4 py-3 rounded-xl text-sm text-white/70 hover:text-primary hover:bg-white/5 transition-all border border-white/5"
                  >
                    {reply}
                  </a>
                ))}
              </div>
              <div className="px-4 pb-4">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center gold-gradient text-black py-3 rounded-xl text-sm font-medium"
                >
                  Start Chat
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
