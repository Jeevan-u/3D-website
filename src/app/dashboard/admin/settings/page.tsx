"use client"

import { motion } from "framer-motion"
import { Settings, Save, Bell, Shield, Palette } from "lucide-react"

export default function AdminSettings() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-white">Settings</h1>
        <p className="text-sm text-white/40">Manage application settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" />
              Clinic Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/40 mb-1">Clinic Name</label>
                  <input
                    type="text"
                    defaultValue="Prashali Skin Sciences"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/40 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1">Phone</label>
                  <input
                    type="text"
                    defaultValue="+91 96060 42223"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/40 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Address</label>
                <input
                  type="text"
                  defaultValue="Mumbai / Navi Mumbai"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1">Working Hours</label>
                <input
                  type="text"
                  defaultValue="Mon–Sat: 10AM–8PM, Sunday: By Appointment"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/40 transition-all"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Security
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/40 mb-1">Current Password</label>
                <input
                  type="password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/40 transition-all"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/40 mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/40 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/40 transition-all"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <button className="gold-gradient text-black px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-all">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              Notifications
            </h2>
            <div className="space-y-4">
              {["New Appointment", "New Lead", "Cancellations", "Reviews"].map((item) => (
                <label key={item} className="flex items-center justify-between">
                  <span className="text-sm text-white/60">{item}</span>
                  <input type="checkbox" defaultChecked className="accent-primary" />
                </label>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
