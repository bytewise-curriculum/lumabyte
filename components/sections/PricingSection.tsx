'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { pricingTiers } from '@/lib/pricing'
import { FadeUp } from '@/components/ui/FadeUp'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function PricingSection() {
  return (
    <section
      className="py-24 relative"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 95% 0%, rgba(99,102,241,0.08) 0%, transparent 70%), #ffffff',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <span className="inline-block text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            Pricing
          </span>
          <h2 className="font-geist text-3xl md:text-4xl font-bold text-foreground">
            Flexible Engagement Models
          </h2>
          <p className="text-muted mt-3 max-w-xl mx-auto">
            Whether you need a one-time build or a long-term technical partner, we have a model that fits.
          </p>
        </FadeUp>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={item}
              className={[
                'relative rounded-2xl p-8 border transition-all duration-300',
                tier.featured
                  ? 'border-accent bg-background shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:shadow-[0_0_60px_rgba(99,102,241,0.25)]'
                  : 'border-border bg-background hover:-translate-y-1 hover:border-accent hover:shadow-lg',
              ].join(' ')}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="relative inline-flex items-center gap-1.5 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                    <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-geist text-xl font-bold text-foreground mb-1">{tier.name}</h3>
                <p className="text-2xl font-bold text-accent">{tier.price}</p>
                <p className="text-sm text-muted mt-2">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                    <CheckCircle size={15} className="text-success mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={[
                  'block text-center px-6 py-3 rounded-md text-sm font-medium transition-all duration-200',
                  tier.featured
                    ? 'bg-accent text-white hover:bg-accent/90 hover:scale-[1.02]'
                    : 'border border-border text-foreground hover:border-accent hover:bg-muted-bg',
                ].join(' ')}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
