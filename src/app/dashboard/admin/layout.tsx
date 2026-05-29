"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Image,
  Users,
  Settings,
  BarChart3,
  MessageCircle,
  Menu,
  X,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Appointments", href: "/dashboard/admin/appointments", icon: Calendar },
  { label: "Treatments", href: "/dashboard/admin/treatments", icon: FileText },
  { label: "Blogs", href: "/dashboard/admin/blogs", icon: FileText },
  { label: "Testimonials", href: "/dashboard/admin/testimonials", icon: Users },
  { label: "Gallery", href: "/dashboard/admin/gallery", icon: Image },
  { label: "Leads", href: "/dashboard/admin/leads", icon: MessageCircle },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">
      <div className="flex">
        <aside
          className={cn(
            "fixed left-0 top-16 bottom-0 w-64 bg-[#0a0a0a] border-r border-white/5 z-40 transition-transform duration-300",
            "lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all",
                    isActive
                      ? "gold-gradient text-black font-medium"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
            <div className="pt-4 mt-4 border-t border-white/5">
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 w-full transition-all">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </nav>
        </aside>

        <div className="lg:ml-64 flex-1 min-h-screen">
          <header className="h-16 border-b border-white/5 flex items-center px-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white/50 mr-4"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <p className="text-sm text-white font-medium">Admin Dashboard</p>
              <p className="text-xs text-white/40">Prashali Skin Sciences</p>
            </div>
          </header>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
