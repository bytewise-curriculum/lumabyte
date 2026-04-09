# LumaByte Frontend Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the LumaByte homepage from a static basic layout to an animated, visually rich experience using Framer Motion, Three.js particles, tsparticles sparkles, and orbiting avatars.

**Architecture:** All changes are isolated to `components/sections/`, `components/ui/`, and `lib/`. The homepage `app/page.tsx` is the only page-level file modified (plus `app/pricing/page.tsx` to use shared pricing data). Three new 21st.dev-inspired components are written manually to avoid package compatibility issues. Framer Motion handles scroll-triggered orchestration; CSS keyframes handle micro-interactions.

**Tech Stack:** Next.js 16 (App Router), Framer Motion, Three.js, @tsparticles/react + @tsparticles/slim, Tailwind CSS v4, Lucide React, Vitest

---

## Task 1: Install New Dependencies

**Files:**
- Modify: `package.json` (via pnpm)

- [ ] **Step 1: Install runtime dependencies**

```bash
cd C:/Users/estev/lumabyte
pnpm add framer-motion three @tsparticles/react @tsparticles/slim
```

- [ ] **Step 2: Install Three.js types**

```bash
pnpm add -D @types/three
```

- [ ] **Step 3: Verify install**

```bash
pnpm build 2>&1 | tail -5
```

Expected: Build succeeds (no new errors from deps).

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: install framer-motion, three, tsparticles dependencies"
```

---

## Task 2: Add Animation Keyframes to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add orbit, counter-orbit, shimmer, ping, and blob keyframes**

Append to the end of `app/globals.css`:

```css
/* Orbiting avatars */
@keyframes orbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes counter-orbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

/* Gradient shimmer for hero accent text */
@keyframes shimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.shimmer-text {
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa, #6366f1);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s ease infinite;
}

/* Blob drift for ContactCTA */
@keyframes blob-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.05); }
  66% { transform: translate(-20px, 15px) scale(0.95); }
}
```

- [ ] **Step 2: Verify build still passes**

```bash
pnpm build 2>&1 | tail -5
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add animation keyframes for orbit, shimmer, blob-drift"
```

---

## Task 3: Create lib/pricing.ts (shared pricing data)

**Files:**
- Create: `lib/pricing.ts`
- Create: `__tests__/pricing.test.ts`

- [ ] **Step 1: Write failing tests**

Create `__tests__/pricing.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { pricingTiers } from '@/lib/pricing'

describe('pricingTiers', () => {
  it('exports exactly 3 tiers', () => {
    expect(pricingTiers).toHaveLength(3)
  })

  it('each tier has required fields', () => {
    pricingTiers.forEach((tier) => {
      expect(tier.name).toBeTruthy()
      expect(tier.price).toBeTruthy()
      expect(tier.description).toBeTruthy()
      expect(Array.isArray(tier.features)).toBe(true)
      expect(tier.features.length).toBeGreaterThan(0)
      expect(tier.cta).toBeTruthy()
      expect(typeof tier.featured).toBe('boolean')
    })
  })

  it('exactly one tier is featured', () => {
    const featured = pricingTiers.filter((t) => t.featured)
    expect(featured).toHaveLength(1)
    expect(featured[0].name).toBe('Retainer')
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
pnpm test 2>&1 | grep -E "FAIL|Cannot find"
```

Expected: FAIL — `Cannot find module '@/lib/pricing'`

- [ ] **Step 3: Create `lib/pricing.ts`**

```ts
export type PricingTier = {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  featured: boolean
}

export const pricingTiers: PricingTier[] = [
  {
    name: 'Project-Based',
    price: 'Custom Quote',
    description: 'Best for defined projects with clear scope.',
    features: [
      'Fixed scope & deliverables',
      'Milestone-based payment',
      'Full project documentation',
      'Post-launch support (30 days)',
    ],
    cta: 'Get a Quote',
    featured: false,
  },
  {
    name: 'Retainer',
    price: 'Starting at $2,500/mo',
    description: 'Ongoing technical partnership for growing businesses.',
    features: [
      'Dedicated hours each month',
      'Priority response time',
      'Continuous development & support',
      'Monthly reporting & strategy calls',
    ],
    cta: 'Start a Retainer',
    featured: true,
  },
  {
    name: 'Hourly',
    price: 'Contact for Rate',
    description: 'Flexible engagement for audits, consulting, and small tasks.',
    features: [
      'Code audits & reviews',
      'Technical consulting',
      'Short-term engagements',
      'Flexible scheduling',
    ],
    cta: 'Book a Session',
    featured: false,
  },
]
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
pnpm test
```

Expected: All tests pass (previous 6 + 3 new = 9 total).

- [ ] **Step 5: Commit**

```bash
git add lib/pricing.ts __tests__/pricing.test.ts
git commit -m "feat: add shared pricing data with tests"
```

---

## Task 4: Create lib/serviceIcons.ts (icon map)

**Files:**
- Create: `lib/serviceIcons.ts`
- Create: `__tests__/serviceIcons.test.ts`

- [ ] **Step 1: Write failing tests**

Create `__tests__/serviceIcons.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { getAllServices } from '@/lib/services'
import { serviceIcons } from '@/lib/serviceIcons'

describe('serviceIcons', () => {
  it('has an icon for every service slug', () => {
    const slugs = getAllServices().map((s) => s.slug)
    slugs.forEach((slug) => {
      expect(serviceIcons[slug], `Missing icon for slug: ${slug}`).toBeDefined()
    })
  })

  it('exports exactly 12 icons', () => {
    expect(Object.keys(serviceIcons)).toHaveLength(12)
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
pnpm test 2>&1 | grep -E "FAIL|Cannot find"
```

Expected: FAIL — `Cannot find module '@/lib/serviceIcons'`

- [ ] **Step 3: Create `lib/serviceIcons.ts`**

```ts
import {
  Code2,
  Cloud,
  Database,
  ArrowLeftRight,
  Paintbrush,
  ShoppingCart,
  Bot,
  BarChart3,
  Search,
  FileText,
  GraduationCap,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const serviceIcons: Record<string, LucideIcon> = {
  'full-stack-web-development': Code2,
  'system-architecture': Cloud,
  'database-architecture': Database,
  'data-migration': ArrowLeftRight,
  'custom-website-design': Paintbrush,
  'ecommerce-solutions': ShoppingCart,
  'ai-integration': Bot,
  'marketing-technology': BarChart3,
  'code-audits': Search,
  'technical-documentation': FileText,
  'staff-training': GraduationCap,
  'business-process-automation': Workflow,
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
pnpm test
```

Expected: All 11 tests pass.

- [ ] **Step 5: Commit**

```bash
git add lib/serviceIcons.ts __tests__/serviceIcons.test.ts
git commit -m "feat: add service icon map with tests"
```

---

## Task 5: Create components/ui/FadeUp.tsx

**Files:**
- Create: `components/ui/FadeUp.tsx`

- [ ] **Step 1: Create the FadeUp component**

```tsx
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
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build 2>&1 | tail -5
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/ui/FadeUp.tsx
git commit -m "feat: add FadeUp scroll animation primitive"
```

---

## Task 6: Create components/ui/DottedSurface.tsx

**Files:**
- Create: `components/ui/DottedSurface.tsx`

- [ ] **Step 1: Create the DottedSurface component**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

type DottedSurfaceProps = React.HTMLAttributes<HTMLDivElement>

export function DottedSurface({ className, style, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    const isDark = resolvedTheme === 'dark'
    const dotColor = isDark ? 0xd1d5db : 0x94a3b8

    const cols = 60
    const rows = 40
    const spacing = 1.2
    const positions = new Float32Array(cols * rows * 3)

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const idx = (i * rows + j) * 3
        positions[idx] = (i - cols / 2) * spacing
        positions[idx + 1] = (j - rows / 2) * spacing
        positions[idx + 2] = 0
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: dotColor,
      size: 0.15,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let frame = 0
    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      frame += 0.015

      const pos = geometry.attributes.position.array as Float32Array
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const idx = (i * rows + j) * 3
          const x = (i - cols / 2) * spacing
          const y = (j - rows / 2) * spacing
          pos[idx + 2] = Math.sin(x * 0.3 + frame) * Math.cos(y * 0.3 + frame) * 2
        }
      }
      geometry.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      const canvas = renderer.domElement
      if (containerRef.current?.contains(canvas)) {
        containerRef.current.removeChild(canvas)
      }
    }
  }, [resolvedTheme])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}
      {...props}
    />
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build 2>&1 | tail -5
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/ui/DottedSurface.tsx
git commit -m "feat: add DottedSurface Three.js animated background"
```

---

## Task 7: Create components/ui/Sparkles.tsx

**Files:**
- Create: `components/ui/Sparkles.tsx`

- [ ] **Step 1: Create the Sparkles component**

```tsx
'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { cn } from '@/lib/utils'

type SparklesProps = {
  density?: number
  size?: number
  speed?: number
  opacity?: number
  color?: string
  background?: string
  className?: string
}

export function Sparkles({
  density = 400,
  size = 1,
  speed = 0.8,
  opacity = 0.4,
  color = '#6366f1',
  background = 'transparent',
  className,
}: SparklesProps) {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  if (!init) return null

  return (
    <Particles
      className={cn('absolute inset-0 pointer-events-none', className)}
      options={{
        background: { color: { value: background } },
        fpsLimit: 60,
        particles: {
          number: { value: density },
          color: { value: color },
          opacity: { value: { min: 0.1, max: opacity } },
          size: { value: { min: 0.5, max: size } },
          move: {
            enable: true,
            speed: { min: 0.1, max: speed },
            direction: 'none',
            random: true,
            outModes: { default: 'out' },
          },
        },
        detectRetina: true,
      }}
    />
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build 2>&1 | tail -5
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Sparkles.tsx
git commit -m "feat: add Sparkles tsparticles component"
```

---

## Task 8: Create components/ui/OrbitingAvatars.tsx

**Files:**
- Create: `components/ui/OrbitingAvatars.tsx`

The orbit animation uses CSS keyframes defined in `app/globals.css` (Task 2). Dynamic values (radius, duration) are passed as inline CSS custom properties.

- [ ] **Step 1: Create the OrbitingAvatars component**

```tsx
import Link from 'next/link'

type Avatar = {
  src: string
  alt: string
}

type OrbitingAvatarsProps = {
  title: string
  description: string
  buttonText: string
  buttonHref: string
  avatars: Avatar[]
  orbitRadius?: string
  orbitDuration?: number
}

export function OrbitingAvatars({
  title,
  description,
  buttonText,
  buttonHref,
  avatars,
  orbitRadius = '18rem',
  orbitDuration = 30,
}: OrbitingAvatarsProps) {
  return (
    <section className="relative overflow-hidden bg-foreground py-32">
      {/* Orbit rings */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="rounded-full border border-dashed border-accent/20"
          style={{ width: `calc(${orbitRadius} * 2)`, height: `calc(${orbitRadius} * 2)` }}
        />
        <div
          className="absolute rounded-full border border-dashed border-accent/10"
          style={{
            width: `calc(${orbitRadius} * 1.4)`,
            height: `calc(${orbitRadius} * 1.4)`,
          }}
        />
      </div>

      {/* Avatars */}
      {avatars.map((avatar, i) => {
        const angle = (360 / avatars.length) * i
        const duration = orbitDuration
        const delay = -((duration / avatars.length) * i)
        return (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
            style={{
              animation: `orbit ${duration}s linear ${delay}s infinite`,
            }}
          >
            <img
              src={avatar.src}
              alt={avatar.alt}
              width={48}
              height={48}
              className="absolute w-12 h-12 rounded-full border-2 border-accent/40 object-cover"
              style={{
                transform: `rotate(${angle}deg) translateX(${orbitRadius}) rotate(-${angle}deg)`,
                animation: `counter-orbit ${duration}s linear ${delay}s infinite`,
              }}
            />
          </div>
        )
      })}

      {/* Central content */}
      <div className="relative z-10 max-w-xl mx-auto text-center px-6">
        <h2 className="font-geist text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-white/70 text-lg leading-relaxed mb-8">{description}</p>
        <Link
          href={buttonHref}
          className="inline-block bg-accent text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-accent/90 hover:scale-105 transition-all"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build 2>&1 | tail -5
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/ui/OrbitingAvatars.tsx
git commit -m "feat: add OrbitingAvatars CTA component"
```

---

## Task 9: Rewrite Hero.tsx

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Rewrite Hero.tsx**

Replace the entire file:

```tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { DottedSurface } from '@/components/ui/DottedSurface'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
      {/* Animated dot background */}
      <DottedSurface className="absolute inset-0 z-0" />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/60 via-background/40 to-background/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-[2] max-w-5xl mx-auto">
        <motion.span
          {...fadeUp(0)}
          className="inline-block text-xs uppercase tracking-widest text-accent font-semibold mb-6"
        >
          Full-Service Tech Company
        </motion.span>

        <motion.h1
          className="font-geist text-5xl md:text-7xl font-bold text-foreground leading-tight"
        >
          <motion.span {...fadeUp(0.15)} className="block">
            We Build the Systems
          </motion.span>
          <motion.span {...fadeUp(0.3)} className="block shimmer-text">
            That Power Your Business
          </motion.span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.45)}
          className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed"
        >
          From scalable web apps and cloud infrastructure to AI automation and marketing
          technology — LumaByte delivers end-to-end solutions that grow with you.
        </motion.p>

        <motion.div
          {...fadeUp(0.6)}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="bg-accent text-white px-8 py-3 rounded-md text-sm font-medium transition-all hover:scale-105 hover:shadow-[0_0_24px_rgba(99,102,241,0.4)]"
          >
            Get a Free Consultation
          </Link>
          <Link
            href="/#services"
            className="border border-border text-foreground px-8 py-3 rounded-md text-sm font-medium hover:bg-muted-bg hover:border-accent transition-all"
          >
            View Services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build 2>&1 | tail -5
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: upgrade Hero with DottedSurface background and Framer Motion entrance"
```

---

## Task 10: Rewrite ServicesGrid.tsx

**Files:**
- Modify: `components/sections/ServicesGrid.tsx`

- [ ] **Step 1: Rewrite ServicesGrid.tsx**

Replace the entire file:

```tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getAllServices } from '@/lib/services'
import { serviceIcons } from '@/lib/serviceIcons'
import { FadeUp } from '@/components/ui/FadeUp'
import { Sparkles } from '@/components/ui/Sparkles'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export function ServicesGrid() {
  const services = getAllServices()

  return (
    <section id="services" className="relative py-24 px-6 bg-muted-bg overflow-hidden">
      {/* Sparkles background */}
      <Sparkles
        density={400}
        opacity={0.35}
        color="#6366f1"
        size={1.2}
        speed={0.6}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeUp className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">
            What We Do
          </span>
          <h2 className="font-geist text-4xl font-bold text-foreground mt-3">Our Services</h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Twelve service areas covering the full technology stack — from idea to
            infrastructure to growth.
          </p>
        </FadeUp>

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
                  className="group flex flex-col bg-background border border-border rounded-xl p-6 hover:-translate-y-1 hover:border-accent hover:shadow-md transition-all duration-200"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-200">
                    {Icon && (
                      <Icon
                        size={20}
                        className="text-accent group-hover:text-white transition-colors duration-200"
                      />
                    )}
                  </div>

                  <h3 className="font-geist font-semibold text-foreground text-base mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4 flex-1">
                    {service.description}
                  </p>
                  <span className="flex items-center gap-1 text-xs text-accent font-medium">
                    Learn more
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
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
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build 2>&1 | tail -5
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/sections/ServicesGrid.tsx
git commit -m "feat: upgrade ServicesGrid with Sparkles background, icons, and stagger animation"
```

---

## Task 11: Create SocialProof.tsx (replaces WhyLumaByte)

**Files:**
- Create: `components/sections/SocialProof.tsx`
- Delete: `components/sections/WhyLumaByte.tsx`

- [ ] **Step 1: Create SocialProof.tsx**

```tsx
import { OrbitingAvatars } from '@/components/ui/OrbitingAvatars'

const avatars = [
  {
    src: 'https://ui-avatars.com/api/?name=Alex+Kim&background=6366f1&color=fff&size=96',
    alt: 'Alex Kim',
  },
  {
    src: 'https://ui-avatars.com/api/?name=Jordan+Lee&background=8b5cf6&color=fff&size=96',
    alt: 'Jordan Lee',
  },
  {
    src: 'https://ui-avatars.com/api/?name=Maria+Santos&background=6366f1&color=fff&size=96',
    alt: 'Maria Santos',
  },
  {
    src: 'https://ui-avatars.com/api/?name=David+Park&background=a78bfa&color=fff&size=96',
    alt: 'David Park',
  },
  {
    src: 'https://ui-avatars.com/api/?name=Priya+Nair&background=6366f1&color=fff&size=96',
    alt: 'Priya Nair',
  },
  {
    src: 'https://ui-avatars.com/api/?name=Omar+Hassan&background=7c3aed&color=fff&size=96',
    alt: 'Omar Hassan',
  },
]

export function SocialProof() {
  return (
    <OrbitingAvatars
      title="Trusted by Teams That Ship"
      description="From early-stage startups to growing businesses — LumaByte is the technical partner behind the build."
      buttonText="Work With Us"
      buttonHref="/contact"
      avatars={avatars}
      orbitRadius="18rem"
      orbitDuration={30}
    />
  )
}
```

- [ ] **Step 2: Delete WhyLumaByte.tsx**

```bash
rm C:/Users/estev/lumabyte/components/sections/WhyLumaByte.tsx
```

- [ ] **Step 3: Verify build passes**

```bash
pnpm build 2>&1 | tail -5
```

Expected: Build succeeds (WhyLumaByte is imported in page.tsx — will break until Task 14 updates imports).

> **Note:** If the build fails because `app/page.tsx` still imports `WhyLumaByte`, temporarily comment out or remove that import in `app/page.tsx` before committing, then restore in Task 14.

- [ ] **Step 4: Commit**

```bash
git add components/sections/SocialProof.tsx
git rm components/sections/WhyLumaByte.tsx
git commit -m "feat: add SocialProof with OrbitingAvatars, remove WhyLumaByte"
```

---

## Task 12: Create PricingSection.tsx (replaces PricingPreview)

**Files:**
- Create: `components/sections/PricingSection.tsx`
- Delete: `components/sections/PricingPreview.tsx`

- [ ] **Step 1: Create PricingSection.tsx**

```tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { pricingTiers } from '@/lib/pricing'
import { FadeUp } from '@/components/ui/FadeUp'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function PricingSection() {
  return (
    <section
      className="py-24 px-6 bg-background relative overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 90% 10%, rgba(99,102,241,0.08) 0%, transparent 60%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">
            Pricing
          </span>
          <h2 className="font-geist text-4xl font-bold text-foreground mt-3">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            Every project starts with a free consultation. We&apos;ll recommend the right
            engagement model for your needs.
          </p>
        </FadeUp>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={item}
              className={`rounded-xl border p-8 flex flex-col gap-6 transition-all duration-200 hover:-translate-y-1 ${
                tier.featured
                  ? 'border-accent bg-accent/5 shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:shadow-[0_0_60px_rgba(99,102,241,0.25)]'
                  : 'border-border bg-background hover:border-accent hover:shadow-md'
              }`}
            >
              {tier.featured && (
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-geist text-xl font-bold text-foreground">{tier.name}</h3>
                <p className="text-2xl font-bold text-foreground mt-2">{tier.price}</p>
                <p className="text-sm text-muted mt-2">{tier.description}</p>
              </div>
              <ul className="flex flex-col gap-3 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-muted">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`text-center px-6 py-3 rounded-md text-sm font-medium transition-all hover:scale-105 ${
                  tier.featured
                    ? 'bg-accent text-white hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                    : 'border border-border text-foreground hover:bg-muted-bg hover:border-accent'
                }`}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <FadeUp delay={0.3} className="text-center mt-12">
          <p className="text-sm text-muted">
            Not sure which model fits?{' '}
            <Link href="/contact" className="text-accent hover:underline">
              Let&apos;s talk
            </Link>
            .
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Delete PricingPreview.tsx**

```bash
rm C:/Users/estev/lumabyte/components/sections/PricingPreview.tsx
```

- [ ] **Step 3: Verify build (may fail until page.tsx updated)**

Same note as Task 11 — if `app/page.tsx` imports `PricingPreview`, temporarily comment it out.

- [ ] **Step 4: Commit**

```bash
git add components/sections/PricingSection.tsx
git rm components/sections/PricingPreview.tsx
git commit -m "feat: add full PricingSection with stagger animation and glow effects, remove PricingPreview"
```

---

## Task 13: Rewrite Testimonials.tsx

**Files:**
- Modify: `components/sections/Testimonials.tsx`

- [ ] **Step 1: Rewrite Testimonials.tsx**

Replace the entire file:

```tsx
'use client'

import { motion } from 'framer-motion'
import { FadeUp } from '@/components/ui/FadeUp'

const testimonials = [
  {
    quote:
      'LumaByte rebuilt our entire ops platform in 6 weeks. Zero downtime migration, clean handoff documentation, and they stayed on call through launch.',
    name: 'Client Name',
    role: 'CEO · Operations Co.',
  },
  {
    quote:
      'We brought them in for a code audit before our Series A. They found 3 critical security gaps our own team missed. Worth every dollar.',
    name: 'Client Name',
    role: 'CTO · SaaS Startup',
  },
  {
    quote:
      'Handed them a Figma file on Monday. Had a live Shopify store by Friday. Their ecommerce team is exceptional.',
    name: 'Client Name',
    role: 'Founder · DTC Brand',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-muted-bg">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">
            Social Proof
          </span>
          <h2 className="font-geist text-4xl font-bold text-foreground mt-3">
            What Clients Say
          </h2>
        </FadeUp>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group relative bg-background border border-border rounded-xl p-6 hover:border-t-2 hover:border-t-accent transition-all duration-200"
            >
              {/* Decorative quote mark */}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.25 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i + 0.2, duration: 0.4 }}
                className="absolute top-4 left-5 font-serif text-6xl text-accent leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </motion.span>

              <p className="text-base text-muted leading-relaxed mb-6 pt-6">{t.quote}</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build 2>&1 | tail -5
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Testimonials.tsx
git commit -m "feat: upgrade Testimonials with stagger animation and decorative quote marks"
```

---

## Task 14: Rewrite ContactCTA.tsx

**Files:**
- Modify: `components/sections/ContactCTA.tsx`

- [ ] **Step 1: Rewrite ContactCTA.tsx**

Replace the entire file:

```tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FadeUp } from '@/components/ui/FadeUp'

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-foreground py-24 px-6">
      {/* Animated blobs */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-violet-500/20 blur-3xl pointer-events-none"
        animate={{ x: [0, -20, 0], y: [0, 15, 0], scale: [1, 0.95, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <FadeUp>
          <h2 className="font-geist text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Build Something?
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className="text-white/70 text-lg leading-relaxed mb-10">
            Free consultation. No commitment. Let&apos;s talk about what you&apos;re building.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-accent px-8 py-3 rounded-md text-sm font-medium transition-all hover:scale-105 hover:shadow-[0_0_24px_rgba(255,255,255,0.3)]"
            >
              Get a Free Consultation
            </Link>
            <Link
              href="/#services"
              className="border border-white/30 text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-white/10 transition-all"
            >
              View Our Services
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
pnpm build 2>&1 | tail -5
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/sections/ContactCTA.tsx
git commit -m "feat: upgrade ContactCTA with animated blob background and dual CTAs"
```

---

## Task 15: Update app/page.tsx and app/pricing/page.tsx

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/pricing/page.tsx`

- [ ] **Step 1: Update app/page.tsx**

Replace the entire file:

```tsx
import { Hero } from '@/components/sections/Hero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { SocialProof } from '@/components/sections/SocialProof'
import { PricingSection } from '@/components/sections/PricingSection'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactCTA } from '@/components/sections/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <SocialProof />
      <PricingSection />
      <Testimonials />
      <ContactCTA />
    </>
  )
}
```

- [ ] **Step 2: Update app/pricing/page.tsx to use shared pricingTiers**

Replace the entire file:

```tsx
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { pricingTiers } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Pricing — LumaByte',
  description: 'Transparent pricing for web development, infrastructure, AI integration, and more.',
}

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-accent font-semibold">Pricing</span>
        <h1 className="font-geist text-4xl font-bold text-foreground mt-3">
          Simple, Transparent Pricing
        </h1>
        <p className="text-muted mt-4 max-w-xl mx-auto">
          Every project starts with a free consultation. We&apos;ll recommend the right engagement
          model for your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-xl border p-8 flex flex-col gap-6 ${
              tier.featured
                ? 'border-accent bg-accent/5 shadow-[0_0_40px_rgba(99,102,241,0.15)]'
                : 'border-border bg-background'
            }`}
          >
            {tier.featured && (
              <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                Most Popular
              </span>
            )}
            <div>
              <h2 className="font-geist text-xl font-bold text-foreground">{tier.name}</h2>
              <p className="text-2xl font-bold text-foreground mt-2">{tier.price}</p>
              <p className="text-sm text-muted mt-2">{tier.description}</p>
            </div>
            <ul className="flex flex-col gap-3 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-success mt-0.5 shrink-0" />
                  <span className="text-sm text-muted">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className={`text-center px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                tier.featured
                  ? 'bg-accent text-white hover:bg-accent/90'
                  : 'border border-border text-foreground hover:bg-muted-bg'
              }`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-muted mt-12">
        Not sure which model fits?{' '}
        <Link href="/contact" className="text-accent hover:underline">
          Let&apos;s talk
        </Link>
        .
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Run full test suite**

```bash
pnpm test
```

Expected: All 11 tests pass.

- [ ] **Step 4: Run production build**

```bash
pnpm build
```

Expected: Build succeeds. Route list should show:
```
○ /
○ /about
○ /contact
○ /pricing
● /services/[slug] (12 paths)
```

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/pricing/page.tsx
git commit -m "feat: wire upgraded homepage sections, use shared pricingTiers on /pricing"
```

- [ ] **Step 6: Push to GitHub**

```bash
git push
```

Expected: Push succeeds. Vercel auto-deploys from `master`.

---

## Self-Review

**Spec coverage:**
- ✅ Framer Motion installed + FadeUp primitive — Task 1, 5
- ✅ Three.js installed + DottedSurface — Task 1, 6
- ✅ tsparticles installed + Sparkles — Task 1, 7
- ✅ OrbitingAvatars — Task 8
- ✅ Keyframes (orbit, shimmer, blob-drift) — Task 2
- ✅ lib/pricing.ts shared data — Task 3
- ✅ lib/serviceIcons.ts icon map — Task 4
- ✅ Hero rewritten with DottedSurface + stagger entrance — Task 9
- ✅ ServicesGrid rewritten with Sparkles + icons + stagger — Task 10
- ✅ SocialProof (replaces WhyLumaByte) — Task 11
- ✅ PricingSection (replaces PricingPreview) with full tiers + glow — Task 12
- ✅ Testimonials rewritten with stagger + quote marks — Task 13
- ✅ ContactCTA rewritten with animated blobs + dual CTAs — Task 14
- ✅ page.tsx + pricing/page.tsx updated — Task 15

**Placeholder scan:** No TBDs. All component code complete. Avatar URLs use UI Avatars API with no auth.

**Type consistency:** `pricingTiers` (type `PricingTier[]`) defined in Task 3, used in Tasks 12 and 15 — consistent. `serviceIcons` (type `Record<string, LucideIcon>`) defined in Task 4, used in Task 10 — consistent. `OrbitingAvatars` props defined in Task 8 and consumed in Task 11 — consistent.
