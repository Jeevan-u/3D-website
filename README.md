# Prashali Skin Sciences

Advanced dermatology & luxury skin science website — a full-stack Next.js application with cinematic 3D WebGL interactions, WhatsApp booking, AI skin analyzer, and enterprise admin dashboard.

## Tech Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, Three.js / React Three Fiber, GSAP, Lenis
- **Backend:** Next.js API Routes, Prisma ORM, MongoDB
- **Auth:** JWT (bcryptjs + jsonwebtoken)
- **UI:** Lucide Icons, Glassmorphism design system, Dark luxury theme

## Getting Started

```bash
npm install
cp .env.example .env.local   # Configure MongoDB URI and secrets
npx prisma db push            # Push schema to MongoDB
npm run dev                   # Start at http://localhost:3000
```

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build (runs prisma generate) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run prisma:studio` | Open Prisma Studio |
| `npm run prisma:push` | Push schema to MongoDB |

## Project Structure

```
src/
├── app/                      # App Router pages + API routes
│   ├── page.tsx             # Homepage (3D hero, treatments, bridal, testimonials, CTA, FAQ)
│   ├── about/               # About the clinic
│   ├── booking/             # 3-step WhatsApp booking flow
│   ├── bridal/              # Bridal Skin Lounge
│   ├── contact/             # Contact form + enquiry
│   ├── gallery/             # Before/after gallery with lightbox
│   ├── skin-journal/        # Blog listing + individual posts
│   ├── treatments/          # Treatment categories + dynamic [slug]
│   ├── ai-analyzer/         # AI Skin Analyzer
│   ├── login/               # Client login
│   ├── register/            # Account registration
│   ├── dashboard/           # Admin + Client dashboards
│   └── api/                 # All API routes (auth, appointments, leads, blogs, etc.)
├── components/
│   ├── 3d/                  # Three.js scenes (particles, DNA, serum sphere, lasers)
│   ├── layout/              # Navigation, Footer, WhatsApp button, SmoothScroll
│   ├── sections/            # Hero, Treatments, Bridal, Testimonials, FAQ, CTA
│   └── ui/                  # AnimatedCounter, CursorGlow
├── hooks/                   # useScrollReveal, useCountUp, useMousePosition, etc.
├── lib/                     # utils, prisma client, auth helpers
└── types/                   # TypeScript interfaces
```

## Features

- **3D WebGL Hero** — Floating particles, DNA helix, serum sphere, laser beams
- **WhatsApp Booking** — 3-step flow → generates message → redirects to WhatsApp
- **AI Skin Analyzer** — Upload selfie → simulated AI analysis with recommendations
- **Admin Dashboard** — Appointments, Leads, Treatments, Blogs, Gallery, Testimonials, Analytics, Settings
- **Client Portal** — Appointments, treatment history, progress photos, prescriptions, recommendations
- **Bridal Lounge** — Wedding packages with 90-day transformation guide
- **Full API** — Auth (JWT), CRUD for all models, auth middleware, rate-limiting ready
- **Responsive** — Mobile-optimized, touch-friendly, adaptive rendering
- **Dark Luxury Theme** — Gold/cream accent palette, glassmorphism, cursor glow

## Environment Variables

See `.env.example` for all required variables.

## Deployment

Ready for Vercel, AWS, or DigitalOcean:

```bash
npm run build
npm start
```
# 3D-website
