import { Hero } from '@/components/sections/Hero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { SocialProof } from '@/components/sections/SocialProof'
import { PricingSection } from '@/components/sections/PricingSection'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactCTA } from '@/components/sections/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <SocialProof />
      <PricingSection />
      <Testimonials />
      <ContactCTA />
    </>
  )
}
