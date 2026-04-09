import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { pricingTiers } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Pricing — LumaByte',
  description: 'Transparent pricing for web development, infrastructure, AI integration, and more.',
}

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">Pricing</span>
        <h1 className="font-geist text-4xl font-bold text-foreground mt-3">Simple, Transparent Pricing</h1>
        <p className="text-muted mt-4 max-w-xl mx-auto">
          Every project starts with a free consultation. We&apos;ll recommend the right engagement model for your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-xl border p-8 flex flex-col gap-6 ${
              tier.featured
                ? 'border-accent bg-accent/5 shadow-md'
                : 'border-border bg-background'
            }`}
          >
            {tier.featured && (
              <span className="text-xs uppercase tracking-widest text-accent font-semibold">Most Popular</span>
            )}
            <div>
              <h2 className="font-geist text-xl font-bold text-foreground">{tier.name}</h2>
              <p className="text-2xl font-bold text-foreground mt-2">{tier.price}</p>
              <p className="text-sm text-muted mt-2">{tier.description}</p>
            </div>
            <ul className="flex flex-col gap-3 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-success mt-0.5 shrink-0" />
                  <span className="text-sm text-muted">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className={`text-center px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                tier.featured
                  ? 'bg-accent text-white hover:bg-accent/90'
                  : 'border border-border text-foreground hover:bg-muted-bg'
              }`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted mt-12">
        Not sure which model fits? <Link href="/contact" className="text-accent hover:underline">Let&apos;s talk</Link>.
      </p>
    </div>
  )
}
