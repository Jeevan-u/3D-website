import { HeroSection } from "@/components/sections/hero-section"
import { TreatmentCards } from "@/components/sections/treatment-cards"
import { BridalLounge } from "@/components/sections/bridal-lounge"
import { Testimonials } from "@/components/sections/testimonials"
import { CTASection } from "@/components/sections/cta-section"
import { FAQSection } from "@/components/sections/faq-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <TreatmentCards />
      <BridalLounge />
      <Testimonials />
      <CTASection />
      <FAQSection />
    </>
  )
}
