'use client'

import { motion, type Variants } from 'framer-motion'
import { FadeUp } from '@/components/ui/FadeUp'

const testimonials = [
  {
    quote:
      "LumaByte rebuilt our entire ops platform in 6 weeks. Zero downtime migration, clean handoff documentation, and they stayed on call through launch.",
    name: 'Sarah Mitchell',
    role: 'CEO, Operations Co.',
  },
  {
    quote:
      "We brought them in for a code audit before our Series A. They found 3 critical security gaps our own team missed. Worth every dollar.",
    name: 'Daniel Torres',
    role: 'CTO, SaaS Startup',
  },
  {
    quote:
      "Handed them a Figma file on Monday. Had a live Shopify store by Friday. Their ecommerce team is exceptional.",
    name: 'Aisha Okafor',
    role: 'Founder, DTC Brand',
  },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Testimonials() {
  return (
    <section className="py-24 bg-muted-bg">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <span className="inline-block text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            What Clients Say
          </span>
          <h2 className="font-geist text-3xl md:text-4xl font-bold text-foreground">
            Results That Speak for Themselves
          </h2>
        </FadeUp>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={item}
              className="group relative bg-background border border-border rounded-2xl p-8 transition-all duration-300 hover:border-t-2 hover:border-t-accent overflow-hidden"
            >
              {/* Decorative quote mark */}
              <span className="absolute top-4 left-6 font-serif text-6xl text-accent/20 leading-none select-none pointer-events-none">
                &ldquo;
              </span>

              <p className="relative text-base text-foreground leading-relaxed mb-6 pt-6">
                {t.quote}
              </p>

              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <span className="text-muted text-sm">·</span>
                <p className="text-sm text-muted">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
