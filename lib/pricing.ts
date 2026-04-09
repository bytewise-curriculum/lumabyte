export type PricingTier = {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  featured: boolean
}

export const pricingTiers: PricingTier[] = [
  {
    name: 'Project-Based',
    price: 'Custom Quote',
    description: 'Best for defined projects with clear scope.',
    features: [
      'Fixed scope & deliverables',
      'Milestone-based payment',
      'Full project documentation',
      'Post-launch support (30 days)',
    ],
    cta: 'Get a Quote',
    featured: false,
  },
  {
    name: 'Retainer',
    price: 'Starting at $2,500/mo',
    description: 'Ongoing technical partnership for growing businesses.',
    features: [
      'Dedicated hours each month',
      'Priority response time',
      'Continuous development & support',
      'Monthly reporting & strategy calls',
    ],
    cta: 'Start a Retainer',
    featured: true,
  },
  {
    name: 'Hourly',
    price: 'Contact for Rate',
    description: 'Flexible engagement for audits, consulting, and small tasks.',
    features: [
      'Code audits & reviews',
      'Technical consulting',
      'Short-term engagements',
      'Flexible scheduling',
    ],
    cta: 'Book a Session',
    featured: false,
  },
]
