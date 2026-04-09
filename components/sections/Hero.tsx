'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { DottedSurface } from '@/components/ui/DottedSurface'

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Dotted background */}
      <DottedSurface />

      {/* Radial gradient overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 60%, transparent 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.span
          variants={item}
          className="inline-block text-xs uppercase tracking-widest text-accent font-semibold mb-6"
        >
          Full-Service Tech Company
        </motion.span>

        <motion.h1
          variants={item}
          className="font-geist text-5xl md:text-7xl font-bold text-foreground leading-tight mb-2"
        >
          We Build the Systems
        </motion.h1>

        <motion.h1
          variants={item}
          className="font-geist text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          That Power{' '}
          <span className="shimmer-text">Your Business</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10"
        >
          From custom software to cloud infrastructure — LumaByte delivers end-to-end
          technical solutions for companies that need to move fast and scale confidently.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="bg-accent text-white px-8 py-4 rounded-md text-sm font-medium transition-all hover:scale-[1.02]"
            style={{ '--hover-shadow': '0 0 20px rgba(99,102,241,0.4)' } as React.CSSProperties}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(99,102,241,0.4)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = ''
            }}
          >
            Get a Free Consultation
          </Link>
          <Link
            href="/#services"
            className="border border-border text-foreground px-8 py-4 rounded-md text-sm font-medium transition-colors hover:bg-muted-bg"
          >
            View Our Services
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
