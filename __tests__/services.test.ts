import { describe, it, expect } from 'vitest'
import { getAllServices, getServiceBySlug, getRelatedServices } from '@/lib/services'

describe('getAllServices', () => {
  it('returns 12 services', () => {
    expect(getAllServices()).toHaveLength(12)
  })

  it('each service has required fields', () => {
    getAllServices().forEach((s) => {
      expect(s.slug).toBeTruthy()
      expect(s.title).toBeTruthy()
      expect(s.description).toBeTruthy()
      expect(Array.isArray(s.capabilities)).toBe(true)
      expect(s.capabilities.length).toBeGreaterThan(0)
      expect(Array.isArray(s.relatedSlugs)).toBe(true)
    })
  })
})

describe('getServiceBySlug', () => {
  it('returns the correct service', () => {
    const service = getServiceBySlug('full-stack-web-development')
    expect(service?.title).toBe('Full-Stack Web Application Development')
  })

  it('returns undefined for unknown slug', () => {
    expect(getServiceBySlug('not-a-service')).toBeUndefined()
  })
})

describe('getRelatedServices', () => {
  it('returns related services without the current service', () => {
    const related = getRelatedServices('full-stack-web-development')
    const slugs = related.map((s) => s.slug)
    expect(slugs).not.toContain('full-stack-web-development')
  })

  it('returns empty array when no related slugs', () => {
    const related = getRelatedServices('not-a-service')
    expect(related).toHaveLength(0)
  })
})
