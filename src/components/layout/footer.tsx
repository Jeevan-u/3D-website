"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Clock, Camera, Globe, Video } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#0a0a0a]">
      <div className="container-custom px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <span className="text-2xl font-heading text-gradient font-bold">
              Prashali
            </span>
            <p className="text-[8px] tracking-[0.3em] text-primary/60 uppercase mt-1 mb-6">
              Skin Sciences
            </p>
            <p className="text-sm text-white/50 leading-relaxed">
              Advanced Skin Science Meets Luxury Care. Trusted dermatology and
              aesthetic treatments in Mumbai & Navi Mumbai.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary transition-all"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary transition-all"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary transition-all"
              >
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-6">Treatments</h3>
            <ul className="space-y-3">
              {[
                "Medical Dermatology",
                "Cosmetic Dermatology",
                "Laser Treatments",
                "Hair Treatments",
                "Bridal & Groom",
                "Aesthetic Treatments",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/treatments/${item.toLowerCase().replace(/[\s&]+/g, "-")}`}
                    className="text-sm text-white/40 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Bridal Lounge", href: "/bridal" },
                { label: "Gallery", href: "/gallery" },
                { label: "Skin Journal", href: "/skin-journal" },
                { label: "Contact", href: "/contact" },
                { label: "Book Appointment", href: "/booking" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/40 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <a
                  href="tel:+919606042223"
                  className="text-sm text-white/40 hover:text-primary transition-colors"
                >
                  +91 96060 42223
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <a
                  href="mailto:hello@prashaliskinsciences.com"
                  className="text-sm text-white/40 hover:text-primary transition-colors"
                >
                  hello@prashaliskinsciences.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-white/40">
                  Mumbai / Navi Mumbai
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div className="text-sm text-white/40">
                  <p>Mon–Sat: 10AM–8PM</p>
                  <p>Sunday: By Appointment</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Prashali Skin Sciences. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-xs text-white/30 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-white/30 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs text-white/30 hover:text-primary transition-colors"
            >
              Medical Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
