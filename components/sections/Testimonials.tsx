const testimonials = [
  {
    quote: "LumaByte transformed our entire tech stack in under 60 days. The result was a faster, more secure platform that scaled with our growth.",
    name: 'Client Name',
    role: 'CEO, Company',
  },
  {
    quote: "Their team handled our data migration flawlessly — zero downtime, zero data loss. I wish we'd hired them sooner.",
    name: 'Client Name',
    role: 'CTO, Company',
  },
  {
    quote: "We went from a broken Wix site to a custom web app in 8 weeks. LumaByte delivered exactly what they promised.",
    name: 'Client Name',
    role: 'Founder, Company',
  },
]

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold">Social Proof</span>
          <h2 className="font-geist text-4xl font-bold text-foreground mt-3">What Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-muted-bg border border-border rounded-xl p-6">
              <p className="text-sm text-muted leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
