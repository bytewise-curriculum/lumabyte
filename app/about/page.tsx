import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — LumaByte',
  description: 'Learn about LumaByte — who we are, what we do, and why we do it.',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <span className="text-xs uppercase tracking-widest text-accent font-semibold">About Us</span>
      <h1 className="font-geist text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
        We Build the Tech Behind Growing Businesses
      </h1>

      <div className="space-y-6 text-muted leading-relaxed">
        <p>
          LumaByte is a full-service technology company that partners with businesses at every stage — from early-stage startups building their first product to established companies modernizing legacy infrastructure.
        </p>
        <p>
          We cover the full stack: web application development, cloud infrastructure, database architecture, AI integration, e-commerce, marketing technology, and more. Our team brings deep expertise across twelve service areas so you get one partner instead of five vendors.
        </p>
        <p>
          Our approach is straightforward: understand your business first, then build systems that solve real problems. We don&apos;t oversell complexity. We design for scale, ship on schedule, and stick around after launch.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {[
          { stat: '12+', label: 'Service Areas' },
          { stat: '100%', label: 'In-House Team' },
          { stat: '∞', label: 'Post-Launch Support' },
        ].map((item) => (
          <div key={item.label}>
            <p className="font-geist text-4xl font-bold text-accent">{item.stat}</p>
            <p className="text-sm text-muted mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/contact"
          className="bg-accent text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          Work With Us
        </Link>
      </div>
    </div>
  )
}
