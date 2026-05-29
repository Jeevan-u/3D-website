"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, User, Phone } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function ClientDashboard() {
  const [appointments, setAppointments] = useState([])
  const [clientInfo, setClientInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/appointments").then((r) => r.json()),
      fetch("/api/auth/me").then((r) => r.json()),
    ]).then(([aptRes, meRes]) => {
      if (aptRes.success) setAppointments(aptRes.data)
      if (meRes.success) setClientInfo(meRes.data)
    }).finally(() => setLoading(false))
  }, [])

  const upcomingAppointments = loading
    ? []
    : appointments.filter((a: any) => a.status === "Confirmed" || a.status === "Pending").slice(0, 1)

  const treatmentHistory = loading
    ? []
    : appointments.filter((a: any) => a.status === "Completed")

  return (
    <div className="pt-32 min-h-screen">
      <div className="container-custom px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            <span className="text-gradient">My Dashboard</span>
          </h1>
          <p className="text-white/50 mt-2">Track your skin journey and appointments.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Upcoming Appointment
              </h2>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : upcomingAppointments.length === 0 ? (
                <p className="text-sm text-white/40 text-center py-4">No upcoming appointments.</p>
              ) : (
                upcomingAppointments.map((apt: any) => (
                  <div key={apt.id || apt._id} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                      <p className="text-sm font-medium text-white">{apt.treatment || "N/A"}</p>
                      <p className="text-xs text-white/40">{apt.doctor || "N/A"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white">{apt.date ? new Date(apt.date).toLocaleDateString("en-CA") : "N/A"}</p>
                      <p className="text-xs text-primary">{apt.time || "N/A"}</p>
                    </div>
                  </div>
                ))
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-lg font-heading font-semibold text-white mb-4">Treatment History</h2>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : treatmentHistory.length === 0 ? (
                <p className="text-sm text-white/40 text-center py-4">No completed treatments yet.</p>
              ) : (
                <div className="space-y-3">
                  {treatmentHistory.map((t: any) => (
                    <div key={t.id || t._id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div>
                        <p className="text-sm text-white">{t.treatment || "N/A"}</p>
                        <p className="text-xs text-white/40">{t.doctor || "N/A"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/40">{t.date ? new Date(t.date).toLocaleDateString("en-CA") : "N/A"}</p>
                        <span className="text-xs text-green-400">{t.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-sm font-heading font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/booking" className="block w-full gold-gradient text-black text-center py-3 rounded-xl text-sm font-medium">
                  Book New Appointment
                </Link>
                <button className="block w-full glass text-white/70 text-center py-3 rounded-xl text-sm hover:text-white transition-all">
                  Upload Progress Photo
                </button>
                <button className="block w-full glass text-white/70 text-center py-3 rounded-xl text-sm hover:text-white transition-all">
                  Download Prescription
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6"
            >
              <h2 className="text-sm font-heading font-semibold text-white mb-4">Skin Score</h2>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient">{clientInfo?.skinScore ?? 85}</div>
                <p className="text-xs text-white/40 mt-1">out of 100</p>
                <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] gold-gradient rounded-full" />
                </div>
                <p className="text-xs text-white/40 mt-2">Improving. Keep it up!</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
