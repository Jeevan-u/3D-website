import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { SmoothScroll } from "@/components/layout/smooth-scroll"
import { CursorGlow } from "@/components/ui/cursor-glow"

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Prashali Skin Sciences — Advanced Dermatology & Luxury Skin Science",
    template: "%s | Prashali Skin Sciences",
  },
  description:
    "Trusted skin, hair and aesthetic treatments designed for confidence, glow and transformation. Book your consultation today.",
  keywords: [
    "dermatologist Mumbai",
    "skin clinic Navi Mumbai",
    "acne treatment",
    "bridal skin clinic",
    "laser hair reduction",
    "skin specialist",
  ],
  authors: [{ name: "Prashali Skin Sciences" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Prashali Skin Sciences",
    title: "Prashali Skin Sciences — Advanced Dermatology & Luxury Skin Science",
    description:
      "Trusted skin, hair and aesthetic treatments designed for confidence, glow and transformation.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sans.variable} ${heading.variable}`}>
      <body className="antialiased">
         <Toaster
           position="top-right"
           toastOptions={{
             style: {
               background: "rgba(20,20,31,0.95)",
               border: "1px solid rgba(212,165,116,0.2)",
               color: "#fafafa",
               backdropFilter: "blur(20px)",
             },
             success: { iconTheme: { primary: "#d4a574", secondary: "#0a0a0a" } },
             error: { iconTheme: { primary: "#ef4444", secondary: "#0a0a0a" } },
           }}
         />
         <SmoothScroll>
           <CursorGlow />
           <Navigation />
           <main className="relative z-10">{children}</main>
           <Footer />
           <WhatsAppButton />
         </SmoothScroll>
      </body>
    </html>
  )
}
