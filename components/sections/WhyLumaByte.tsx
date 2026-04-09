import { Zap, Shield, Users, Layers } from 'lucide-react'

const values = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'We move quickly without cutting corners. Agile delivery with clear milestones and no surprises.',
  },
  {
    icon: Layers,
    title: 'Full-Stack Expertise',
    description: 'One team handles everything — frontend, backend, infrastructure, and automation. No hand-off friction.',
  },
  {
    icon: Shield,
    title: 'Built to Scale',
    description: 'Every system we build is architected for growth. Performance and security are built in from day one.',
  },
  {
    icon: Users,
    title: 'Long-Term Partnership',
    description: "We don't disappear after launch. We're your ongoing technical partner as your business evolves.",
  },
]

export function WhyLumaByte() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Why Us</span>
          <h2 className="font-geist text-4xl font-bold text-foreground mt-3">Why LumaByte</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <v.icon size={20} className="text-accent" />
              </div>
              <h3 className="font-geist font-semibold text-foreground">{v.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
