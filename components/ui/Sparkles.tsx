'use client'

import { useEffect, useId, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

type SparklesProps = {
  color?: string
  opacity?: number
  density?: number
  className?: string
}

export function Sparkles({
  color = '#6366f1',
  opacity = 0.4,
  density = 400,
  className,
}: SparklesProps) {
  const id = useId()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  if (!ready) return null

  return (
    <Particles
      id={id}
      className={className}
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          color: { value: color },
          move: { enable: true, speed: 0.3 },
          number: { value: density },
          opacity: { value: opacity },
          size: { value: { min: 0.5, max: 2 } },
          shape: { type: 'circle' },
        },
        detectRetina: true,
      }}
    />
  )
}
