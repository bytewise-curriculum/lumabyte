import Link from 'next/link'

const serviceLinks = [
  { label: 'Web Development', href: '/services/full-stack-web-development' },
  { label: 'System Architecture', href: '/services/system-architecture' },
  { label: 'AI Integration', href: '/services/ai-integration' },
  { label: 'E-Commerce', href: '/services/ecommerce-solutions' },
  { label: 'Marketing Tech', href: '/services/marketing-technology' },
  { label: 'All Services', href: '/#services' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted-bg">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="font-geist font-bold text-lg text-foreground mb-2">LumaByte</p>
          <p className="text-sm text-muted leading-relaxed">
            Full-service tech company building scalable web apps, infrastructure, AI systems, and marketing technology.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted font-semibold mb-4">Services</p>
          <ul className="space-y-2">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted font-semibold mb-4">Company</p>
          <ul className="space-y-2">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-6 py-4 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-xs text-muted">© {new Date().getFullYear()} LumaByte. All rights reserved.</p>
        <p className="text-xs text-muted">Built by LumaByte</p>
      </div>
    </footer>
  )
}
