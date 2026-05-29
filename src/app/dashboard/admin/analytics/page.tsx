"use client"

import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Users, Calendar, DollarSign, Activity } from "lucide-react"

const stats = [
  { label: "Monthly Appointments", value: "42", change: "+18%", icon: Calendar, color: "from-blue-500 to-blue-600" },
  { label: "Conversion Rate", value: "68%", change: "+5%", icon: TrendingUp, color: "from-green-500 to-green-600" },
  { label: "New Patients", value: "28", change: "+12%", icon: Users, color: "from-purple-500 to-purple-600" },
  { label: "Monthly Revenue", value: "₹1,85,000", change: "+22%", icon: DollarSign, color: "from-primary to-amber-600" },
]

export default function AdminAnalytics() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-white">Analytics</h1>
        <p className="text-sm text-white/40">Performance metrics and insights</p>
      </div>

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
                <span className="text-xs font-medium text-green-400">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/40 mt-1">{stat.label}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Weekly Overview
          </h2>
          <div className="space-y-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => {
              const heights = [65, 80, 45, 90, 70, 55]
              const height = heights[i]
              return (
                <div key={day} className="flex items-center gap-4">
                  <span className="text-xs text-white/40 w-8">{day}</span>
                  <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full gold-gradient rounded-full" style={{ width: `${height}%` }} />
                  </div>
                  <span className="text-xs text-white/50">{Math.round(height)}</span>
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-heading font-semibold text-white mb-4">Top Treatments</h2>
          <div className="space-y-3">
            {[
              { name: "Hydra Facial", count: 28, revenue: "₹70,000" },
              { name: "Acne Treatment", count: 22, revenue: "₹33,000" },
              { name: "Laser Hair Reduction", count: 18, revenue: "₹54,000" },
              { name: "Bridal Glow Program", count: 12, revenue: "₹60,000" },
              { name: "PRP Therapy", count: 10, revenue: "₹50,000" },
            ].map((t, i) => (
              <div key={t.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <p className="text-sm text-white">{t.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/50">{t.count} sessions</p>
                  <p className="text-xs text-primary/60">{t.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
