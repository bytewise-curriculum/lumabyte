import Link from 'next/link'
import { getAllServices } from '@/lib/services'
import { ArrowRight } from 'lucide-react'

export function ServicesGrid() {
  const services = getAllServices()

  return (
    <section id="services" className="py-24 px-6 bg-muted-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">What We Do</span>
          <h2 className="font-geist text-4xl font-bold text-foreground mt-3">Our Services</h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Twelve service areas covering the full technology stack — from idea to infrastructure to growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group bg-background border border-border rounded-xl p-6 hover:border-accent hover:shadow-sm transition-all"
            >
              <h3 className="font-geist font-semibold text-foreground text-base mb-2 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4">
                {service.description}
              </p>
              <span className="flex items-center gap-1 text-xs text-accent font-medium">
                Learn more <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
