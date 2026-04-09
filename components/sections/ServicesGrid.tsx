'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles } from '@/components/ui/Sparkles'
import { getAllServices } from '@/lib/services'
import { serviceIcons } from '@/lib/serviceIcons'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export function ServicesGrid() {
  const services = getAllServices()

  return (
    <section id="services" className="relative py-24 overflow-hidden bg-background">
      {/* Sparkles background */}
      <Sparkles
        color="#6366f1"
        opacity={0.4}
        density={400}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeUpHeader />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service) => {
            const Icon = serviceIcons[service.slug]
            return (
              <motion.div key={service.slug} variants={item}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full border border-border rounded-xl p-6 bg-background transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-accent">
                    {Icon && (
                      <Icon
                        size={20}
                        className="text-accent transition-colors duration-300 group-hover:text-white"
                      />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-geist text-base font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted line-clamp-2 mb-4">
                    {service.description}
                  </p>

                  {/* Learn more */}
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                    Learn more
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function FadeUpHeader() {
  return (
    <div className="text-center mb-16">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-block text-xs uppercase tracking-widest text-accent font-semibold mb-3"
      >
        What We Do
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="font-geist text-3xl md:text-4xl font-bold text-foreground"
      >
        End-to-End Tech Services
      </motion.h2>
    </div>
  )
}
