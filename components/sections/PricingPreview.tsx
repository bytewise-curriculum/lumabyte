import Link from 'next/link'

export function PricingPreview() {
  return (
    <section className="py-24 px-6 bg-muted-bg">
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">Pricing</span>
        <h2 className="font-geist text-4xl font-bold text-foreground mt-3">Transparent Pricing</h2>
        <p className="text-muted mt-4 leading-relaxed">
          We offer project-based, retainer, and hourly engagements depending on your needs. Every engagement starts with a free consultation.
        </p>
        <Link
          href="/pricing"
          className="mt-8 inline-block bg-accent text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          View Pricing
        </Link>
      </div>
    </section>
  )
}
