import { Hero } from '@/components/sections/Hero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { WhyLumaByte } from '@/components/sections/WhyLumaByte'
import { PricingPreview } from '@/components/sections/PricingPreview'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactCTA } from '@/components/sections/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <WhyLumaByte />
      <PricingPreview />
      <Testimonials />
      <ContactCTA />
    </>
  )
}
