import { describe, it, expect } from 'vitest'
import { getAllServices } from '@/lib/services'
import { serviceIcons } from '@/lib/serviceIcons'

describe('serviceIcons', () => {
  it('has an icon for every service slug', () => {
    const slugs = getAllServices().map((s) => s.slug)
    slugs.forEach((slug) => {
      expect(serviceIcons[slug], `Missing icon for slug: ${slug}`).toBeDefined()
    })
  })

  it('exports exactly 12 icons', () => {
    expect(Object.keys(serviceIcons)).toHaveLength(12)
  })
})
