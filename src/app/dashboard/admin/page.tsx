"use client"

import { motion } from "framer-motion"
import { Calendar, Users, MessageCircle, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

export default function AdminDashboard() {
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

  const stats = [
    { label: "Total Appointments", value: loading ? "..." : String(appointments.length), icon: Calendar, change: "+12%", color: "from-blue-500 to-blue-600" },
    { label: "New Leads", value: "48", icon: MessageCircle, change: "+8%", color: "from-green-500 to-green-600" },
    { label: "Total Patients", value: "10,482", icon: Users, change: "+15%", color: "from-purple-500 to-purple-600" },
    { label: "Conversion Rate", value: "94%", icon: TrendingUp, change: "+3%", color: "from-primary to-amber-600" },
  ]

  const recentAppointments = loading
    ? []
    : appointments.slice(0, 4).map((a: any) => ({
        name: a.name || a.patientName || "N/A",
        treatment: a.treatment || "N/A",
        date: a.date ? new Date(a.date).toLocaleDateString("en-CA") : "N/A",
        status: a.status || "Pending",
      }))

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-heading font-bold text-white">Dashboard</h1>
        <p className="text-sm text-white/40">Welcome back, Admin</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xs font-medium ${stat.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/40 mt-1">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-6"
      >
        <h2 className="text-lg font-heading font-semibold text-white mb-4">Recent Appointments</h2>
        {loading ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-white/40 mt-2">Loading appointments...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentAppointments.map((apt, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm text-white font-medium">{apt.name}</p>
                  <p className="text-xs text-white/40">{apt.treatment}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/40">{apt.date}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    apt.status === "Confirmed" ? "bg-green-500/10 text-green-400" :
                    apt.status === "Pending" ? "bg-yellow-500/10 text-yellow-400" :
                    "bg-blue-500/10 text-blue-400"
                  }`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
