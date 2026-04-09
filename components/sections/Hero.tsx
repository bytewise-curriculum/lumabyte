import Link from 'next/link'

export function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-24 bg-background">
      <span className="inline-block text-xs uppercase tracking-widest text-accent font-semibold mb-4">
        Full-Service Tech Company
      </span>
      <h1 className="font-geist text-5xl md:text-7xl font-bold text-foreground leading-tight max-w-4xl">
        We Build the Systems<br />
        <span className="text-accent">That Power Your Business</span>
      </h1>
      <p className="mt-6 text-lg text-muted max-w-2xl leading-relaxed">
        From scalable web apps and cloud infrastructure to AI automation and marketing technology — LumaByte delivers end-to-end solutions that grow with you.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/contact"
          className="bg-accent text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          Get a Free Consultation
        </Link>
        <Link
          href="/#services"
          className="border border-border text-foreground px-8 py-3 rounded-md text-sm font-medium hover:bg-muted-bg transition-colors"
        >
          View Services
        </Link>
      </div>
    </section>
  )
}
