# Prashali Skin Sciences — Development Guide

## Tech Stack
- **Frontend:** Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, Three.js/R3F, GSAP, Lenis
- **Backend:** Next.js API Routes, Prisma ORM, MongoDB
- **Auth:** JWT (bcryptjs + jsonwebtoken)
- **UI:** Lucide Icons, Glassmorphism design system

## Getting Started
```bash
npm install
cp .env.example .env.local  # Configure your MongoDB URI and secrets
npx prisma db push           # Push schema to MongoDB
npm run dev                  # Start dev server at http://localhost:3000
```

## Build Commands
```bash
npm run build          # Production build (runs prisma generate first)
npm run prisma:studio  # Open Prisma Studio for DB management
npm run prisma:push    # Push schema changes to MongoDB
```

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── about/             # About Us
│   ├── booking/           # WhatsApp booking flow
│   ├── bridal/            # Bridal Skin Lounge
│   ├── contact/           # Contact + enquiry form
│   ├── gallery/           # Before/After gallery
│   ├── skin-journal/      # Blog
│   ├── treatments/        # Treatment categories + [slug]
│   ├── ai-analyzer/       # AI Skin Analyzer
│   ├── login/             # Client login
│   ├── dashboard/         # Admin & Client dashboards
│   └── api/               # API routes (auth, appointments, leads, etc.)
├── components/
│   ├── 3d/                # Three.js/WebGL components
│   ├── layout/            # Navigation, Footer, WhatsApp button, SmoothScroll
│   ├── sections/          # Hero, Treatments, Bridal, Testimonials, FAQ, CTA
│   └── ui/                # AnimatedCounter, CursorGlow
├── hooks/                 # useScrollReveal, useCountUp, useMousePosition, etc.
├── lib/                   # utils, prisma client, auth helpers
└── types/                 # TypeScript interfaces
```

## Key Features
1. **3D Hero Section** — WebGL particle field, DNA helix, floating serum sphere, laser beams
2. **WhatsApp Booking** — 3-step flow → generates message → redirects to WhatsApp
3. **AI Skin Analyzer** — Upload selfie → simulated AI analysis with recommendations
4. **Admin Dashboard** — Appointments, Leads, Treatments management
5. **Client Portal** — Appointment tracking, treatment history, skin score
6. **Bridal Lounge** — Wedding packages with countdown planner
7. **Dark Luxury Theme** — Gold/cream accent palette, glassmorphism, cursor glow

## Environment Variables
See `.env.example` for all required variables.

## Deployment
The project is deploy-ready for Vercel, AWS, or DigitalOcean:
```bash
npm run build
npm start
```
