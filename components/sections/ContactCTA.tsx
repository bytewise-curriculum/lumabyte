'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function ContactCTA() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: '#0f172a' }}
    >
      {/* Animated color blobs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(99,102,241,0.15)' }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(139,92,246,0.12)' }}
        animate={{
          x: [0, -25, 20, 0],
          y: [0, 20, -15, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(167,139,250,0.08)' }}
        animate={{
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-geist text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Ready to Build Something?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-white/70 text-lg mb-10"
        >
          Free consultation. No commitment. Let&apos;s talk about what you&apos;re building.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="bg-white text-accent px-8 py-4 rounded-md text-sm font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
          >
            Start a Conversation
          </Link>
          <Link
            href="/#services"
            className="border border-white/30 text-white px-8 py-4 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white hover:text-accent"
          >
            See Our Services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
