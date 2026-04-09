import { describe, it, expect } from 'vitest'
import { pricingTiers } from '@/lib/pricing'

describe('pricingTiers', () => {
  it('exports exactly 3 tiers', () => {
    expect(pricingTiers).toHaveLength(3)
  })

  it('each tier has required fields', () => {
    pricingTiers.forEach((tier) => {
      expect(tier.name).toBeTruthy()
      expect(tier.price).toBeTruthy()
      expect(tier.description).toBeTruthy()
      expect(Array.isArray(tier.features)).toBe(true)
      expect(tier.features.length).toBeGreaterThan(0)
      expect(tier.cta).toBeTruthy()
      expect(typeof tier.featured).toBe('boolean')
    })
  })

  it('exactly one tier is featured', () => {
    const featured = pricingTiers.filter((t) => t.featured)
    expect(featured).toHaveLength(1)
    expect(featured[0].name).toBe('Retainer')
  })
})
