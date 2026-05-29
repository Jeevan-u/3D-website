"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, Phone, MapPin } from "lucide-react"
import { useState, useEffect } from "react"

export default function ClientAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setAppointments(res.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="pt-32 min-h-screen">
      <div className="container-custom px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-white">My Appointments</h1>
          <p className="text-sm text-white/40">View and manage your appointments</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <p className="text-sm text-white/40 text-center py-8">No appointments found.</p>
            ) : (
              appointments.map((apt: any, i: number) => (
                <motion.div
                  key={apt.id || apt._id || i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <h3 className="text-lg font-heading font-semibold text-white">{apt.treatment || "N/A"}</h3>
                      <div className="space-y-1">
                        <p className="text-sm text-white/50 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary/60" />
                          {apt.date ? new Date(apt.date).toLocaleDateString("en-CA") : "N/A"}
                        </p>
                        <p className="text-sm text-white/50 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary/60" />
                          {apt.time || "N/A"}
                        </p>
                        <p className="text-sm text-white/50 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary/60" />
                          {apt.location || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        apt.status === "Confirmed" ? "bg-green-500/10 text-green-400" :
                        apt.status === "Completed" ? "bg-blue-500/10 text-blue-400" :
                        "bg-yellow-500/10 text-yellow-400"
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
