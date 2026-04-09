'use client'
import { motion } from 'framer-motion'

type FadeUpProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' as const }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
