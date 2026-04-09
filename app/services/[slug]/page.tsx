import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { getAllServices, getServiceBySlug, getRelatedServices } from '@/lib/services'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: `${service.title} — LumaByte`,
    description: service.description,
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const related = getRelatedServices(slug)

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href="/#services"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-10"
      >
        <ArrowLeft size={14} />
        All Services
      </Link>

      <h1 className="font-geist text-4xl md:text-5xl font-bold text-foreground mb-4">
        {service.title}
      </h1>
      <p className="text-lg text-muted leading-relaxed max-w-2xl mb-12">
        {service.description}
      </p>

      <div className="mb-16">
        <h2 className="font-geist text-xl font-semibold text-foreground mb-6">What&apos;s Included</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {service.capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-3">
              <CheckCircle size={16} className="text-success mt-0.5 shrink-0" />
              <span className="text-sm text-muted">{cap}</span>
            </li>
          ))}
        </ul>
      </div>

      {related.length > 0 && (
        <div className="mb-16">
          <h2 className="font-geist text-xl font-semibold text-foreground mb-6">Related Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/services/${r.slug}`}
                className="border border-border rounded-lg p-4 hover:border-accent transition-colors"
              >
                <p className="text-sm font-semibold text-foreground">{r.title}</p>
                <p className="text-xs text-muted mt-1 line-clamp-2">{r.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="bg-accent rounded-xl p-8 text-center">
        <h2 className="font-geist text-2xl font-bold text-white mb-2">Ready to Get Started?</h2>
        <p className="text-white/80 text-sm mb-6">Free consultation, no commitment required.</p>
        <Link
          href="/contact"
          className="inline-block bg-white text-accent px-6 py-3 rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}
