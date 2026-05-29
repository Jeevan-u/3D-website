"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, User, Phone, Search } from "lucide-react"
import { useState, useEffect } from "react"

export default function AdminAppointments() {
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
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Appointments</h1>
          <p className="text-sm text-white/40">Manage all patient appointments</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/40 transition-all"
          />
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Patient</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Treatment</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Date</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Time</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Status</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-white/40 mt-2">Loading appointments...</p>
                </td>
              </tr>
            ) : appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-sm text-white/40">No appointments found.</td>
              </tr>
            ) : (
              appointments.map((apt: any, i: number) => (
                <motion.tr
                  key={apt.id || apt._id || i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4">
                    <div>
                      <p className="text-sm text-white font-medium">{apt.name || apt.patientName || "N/A"}</p>
                      <p className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" />
                        {apt.phone || "N/A"}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-white/50">{apt.treatment || "N/A"}</td>
                  <td className="p-4 text-sm text-white/50">{apt.date ? new Date(apt.date).toLocaleDateString("en-CA") : "N/A"}</td>
                  <td className="p-4 text-sm text-white/50">{apt.time || "N/A"}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      apt.status === "Confirmed" ? "bg-green-500/10 text-green-400" :
                      apt.status === "Pending" ? "bg-yellow-500/10 text-yellow-400" :
                      apt.status === "Completed" ? "bg-blue-500/10 text-blue-400" :
                      apt.status === "Cancelled" ? "bg-red-500/10 text-red-400" :
                      "bg-orange-500/10 text-orange-400"
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <select className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white/50 focus:outline-none focus:border-primary/40">
                      <option className="bg-[#0a0a0a]">Update Status</option>
                      <option className="bg-[#0a0a0a]">Confirm</option>
                      <option className="bg-[#0a0a0a]">Complete</option>
                      <option className="bg-[#0a0a0a]">Cancel</option>
                    </select>
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
