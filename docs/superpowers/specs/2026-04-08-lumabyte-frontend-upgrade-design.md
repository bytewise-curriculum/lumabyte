# LumaByte Frontend Upgrade — Design Spec
**Date:** 2026-04-08
**Status:** Approved

---

## Overview

A full visual upgrade of the LumaByte homepage. The current site is functional but static and basic. This upgrade introduces:
- Three 21st.dev community components (Dotted Surface, Orbiting Avatars, Sparkles)
- Framer Motion for scroll-triggered reveals and stagger animations
- CSS micro-interactions for hover states and button effects
- Redesigned service cards with icons
- Expanded pricing section (full tiers on homepage)
- Animated testimonials
- Animated dark CTA footer section

All changes are confined to homepage sections and shared data (`lib/pricing.ts`). No routing changes, no new pages.

---

## New Dependencies

| Package | Purpose |
|---|---|
| `framer-motion` | Scroll-triggered reveals, stagger animations, hero entrance |
| `three` | Required by Dotted Surface component |
| `@tsparticles/react` | Required by Sparkles component |
| `@tsparticles/slim` | Required by Sparkles component |
| `next-themes` | Already installed — used by Dotted Surface |

---

## Global Animation Primitives

### `components/ui/FadeUp.tsx`
A shared wrapper component used across all sections:

```tsx
'use client'
import { motion } from 'framer-motion'

export function FadeUp({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}
```

### Stagger Container Pattern
Used for grids (service cards, testimonials, pricing tiers):
```tsx
const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
```

### Hover Pattern
Cards use Tailwind `group` + CSS transitions:
- `translateY(-4px)` on hover
- Border color shift to accent
- Soft `box-shadow` increase

Buttons use CSS:
- `scale(1.02)` on hover
- Indigo glow shadow on primary button

---

## Section-by-Section Design

### Section 1: Hero

**File:** `components/sections/Hero.tsx` (full rewrite)

**Background:**
- `DottedSurface` component as absolute-positioned full-screen layer (z-0)
- Semi-transparent radial gradient overlay for text readability

**Entrance animation (Framer Motion, staggered on mount):**
1. Label ("Full-Service Tech Company") — fades up, delay 0s
2. Headline line 1 ("We Build the Systems") — fades up, delay 0.15s
3. Headline line 2 ("That Power Your Business") — fades up, delay 0.3s
4. Subtext — fades up, delay 0.45s
5. CTA buttons — fade up + scale 0.95→1, delay 0.6s

**Headline accent:**
`span` with CSS animated gradient shimmer — indigo cycling through violet/purple.

**CTA buttons:**
- Primary: indigo bg, hover scale(1.02) + `box-shadow: 0 0 20px rgba(99,102,241,0.4)`
- Secondary: outlined, hover fills with `muted-bg`

**No Sparkles on hero** — Dotted Surface provides all motion here.

---

### Section 2: Services Grid

**File:** `components/sections/ServicesGrid.tsx` (full rewrite)

**Background:**
- `Sparkles` component as absolute-positioned layer (z-0)
- Config: color `#6366f1`, opacity 0.4, density 400, background transparent
- Grid content at `relative z-10`

**Service card icons (Lucide):**

| Service | Icon |
|---|---|
| Full-Stack Web Development | `Code2` |
| System Architecture | `Cloud` |
| Database Architecture | `Database` |
| Data Migration | `ArrowLeftRight` |
| Custom Website Design | `Paintbrush` |
| E-Commerce Solutions | `ShoppingCart` |
| AI Integration | `Bot` |
| Marketing Technology | `BarChart3` |
| Code Audits | `Search` |
| Technical Documentation | `FileText` |
| Staff Training | `GraduationCap` |
| Business Process Automation | `Workflow` |

**Card design:**
- Icon in `w-10 h-10` rounded square with `bg-accent/10`, deepens to `bg-accent` on hover
- Title, description (`line-clamp-2`), "Learn more →" with arrow that slides right on hover
- Hover: `translateY(-4px)`, border → accent, shadow appears

**Stagger animation:**
`staggerChildren: 0.06s`, `y: 20 → 0`, triggered on scroll with `viewport={{ once: true }}`.

**Service icon map** exported from `lib/serviceIcons.ts` — maps slug → Lucide icon component. Keeps ServicesGrid clean.

---

### Section 3: Orbiting Avatars (replaces Why LumaByte)

**File:** `components/sections/SocialProof.tsx` (new, replaces WhyLumaByte.tsx)

**Component:** `OrbitingAvatars` from 21st.dev (ravikatiyar)

**Props:**
```tsx
title="Trusted by Teams That Ship"
description="From early-stage startups to growing businesses — LumaByte is the technical partner behind the build."
buttonText="Work With Us"
buttonProps={{ href: '/contact' }}
orbitRadius="18rem"
orbitDuration={30}
avatars={[6-8 avatar images from UI Avatars API]}
```

**Background:** Dark (`#0f172a`), white text. Concentric orbit rings in indigo at low opacity.

**Avatar sources:** `https://ui-avatars.com/api/?name=...&background=6366f1&color=fff` — no auth, no accounts needed. 6–8 varied names for diversity.

**Entrance:** `FadeUp` wrapper on the section title before orbit renders.

---

### Section 4: Pricing (expanded)

**File:** `components/sections/PricingSection.tsx` (new, replaces PricingPreview.tsx)

**Data:** Extracted to `lib/pricing.ts` — shared between homepage and `/pricing` page.

```ts
export const pricingTiers = [
  { name: 'Project-Based', price: 'Custom Quote', ... },
  { name: 'Retainer', price: 'Starting at $2,500/mo', featured: true, ... },
  { name: 'Hourly', price: 'Contact for Rate', ... },
]
```

**Card animations:**
- Stagger in on scroll (`staggerChildren: 0.1s`)
- Featured card: indigo border + `box-shadow: 0 0 40px rgba(99,102,241,0.15)`, glow intensifies on hover
- Non-featured: hover lifts 4px, border → accent

**"Most Popular" badge:**
CSS `animate-ping` pseudo-ring behind it — subtle pulse.

**Section background:** White with subtle indigo radial gradient (top-right corner) via `background: radial-gradient(...)`.

---

### Section 5: Testimonials

**File:** `components/sections/Testimonials.tsx` (rewrite)

**Card design:**
- Large decorative `"` in indigo (`text-6xl font-serif opacity-30`) top-left
- Quote text `text-base` (larger than before)
- Author: `Name · Role` with indigo dot separator
- Hover: 2px indigo top border appears

**Improved placeholder copy:**
1. "LumaByte rebuilt our entire ops platform in 6 weeks. Zero downtime migration, clean handoff documentation, and they stayed on call through launch." — CEO, Operations Co.
2. "We brought them in for a code audit before our Series A. They found 3 critical security gaps our own team missed. Worth every dollar." — CTO, SaaS Startup
3. "Handed them a Figma file on Monday. Had a live Shopify store by Friday. Their ecommerce team is exceptional." — Founder, DTC Brand

**Entrance animation:**
`staggerChildren: 0.12s`, `y: 30 → 0`. Quote mark fades in 0.1s after its card.

**Background:** `bg-muted-bg` to alternate from white pricing section above.

---

### Section 6: Contact CTA

**File:** `components/sections/ContactCTA.tsx` (rewrite)

**Background:** Dark (`#0f172a`) with animated CSS gradient mesh:
- 2–3 blurred color blobs (`blur-3xl`, `rounded-full`, `opacity-10–20`) in indigo/violet
- Drift slowly using Framer Motion `animate` with infinite `repeat`
- Creates a "living" dark background without heavy JS

**Content:**
- Headline: "Ready to Build Something?"
- Subtext: "Free consultation. No commitment. Let's talk about what you're building."
- Two buttons:
  - Primary: white bg, indigo text, hover scale + shadow
  - Secondary: outlined white, hover white fill + indigo text

**Entrance animation:**
Headline and subtext stagger up. Buttons fade in after with `scale: 0.95 → 1`.

---

## File Changes Summary

| Action | File |
|---|---|
| New | `components/ui/FadeUp.tsx` |
| New | `lib/pricing.ts` |
| New | `lib/serviceIcons.ts` |
| New | `components/sections/SocialProof.tsx` |
| New | `components/sections/PricingSection.tsx` |
| New | `components/ui/DottedSurface.tsx` (21st.dev install) |
| New | `components/ui/OrbitingAvatars.tsx` (21st.dev install) |
| New | `components/ui/Sparkles.tsx` (21st.dev install) |
| Rewrite | `components/sections/Hero.tsx` |
| Rewrite | `components/sections/ServicesGrid.tsx` |
| Rewrite | `components/sections/Testimonials.tsx` |
| Rewrite | `components/sections/ContactCTA.tsx` |
| Delete | `components/sections/WhyLumaByte.tsx` |
| Delete | `components/sections/PricingPreview.tsx` |
| Modify | `app/page.tsx` (swap section imports) |
| Modify | `app/pricing/page.tsx` (use shared `lib/pricing.ts`) |

---

## Out of Scope

- Dark mode toggle (site is light-mode only for now)
- Service detail page animations
- About / Contact page animations
- Mobile-specific gesture animations
