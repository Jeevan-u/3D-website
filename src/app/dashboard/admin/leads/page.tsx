"use client"

import { motion } from "framer-motion"
import { MessageCircle, Filter } from "lucide-react"
import { useState, useEffect } from "react"

export default function AdminLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setLeads(res.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Leads</h1>
          <p className="text-sm text-white/40">Track and manage your inbound leads</p>
        </div>
        <button className="glass text-white/70 px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:text-white transition-all">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Name</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Phone</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Treatment</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Source</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Status</th>
              <th className="text-left p-4 text-xs text-white/40 font-medium uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-white/40 mt-2">Loading leads...</p>
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-sm text-white/40">No leads found.</td>
              </tr>
            ) : (
              leads.map((lead: any, i: number) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="p-4 text-sm text-white">{lead.name || "N/A"}</td>
                  <td className="p-4 text-sm text-white/50">{lead.phone || "N/A"}</td>
                  <td className="p-4 text-sm text-white/50">{lead.treatment || "N/A"}</td>
                  <td className="p-4">
                    <span className="text-xs flex items-center gap-1 text-white/50">
                      <MessageCircle className="w-3 h-3" />
                      {lead.source || "N/A"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      lead.status === "New" ? "bg-blue-500/10 text-blue-400" :
                      lead.status === "Contacted" ? "bg-yellow-500/10 text-yellow-400" :
                      "bg-green-500/10 text-green-400"
                    }`}>
                      {lead.status || "New"}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-white/40">{lead.date ? new Date(lead.date).toLocaleDateString("en-CA") : "N/A"}</td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
