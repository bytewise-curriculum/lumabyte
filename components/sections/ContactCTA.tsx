import Link from 'next/link'

export function ContactCTA() {
  return (
    <section className="py-24 px-6 bg-accent">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-geist text-4xl font-bold text-white">Ready to Build Something?</h2>
        <p className="text-white/80 mt-4 leading-relaxed">
          Let&apos;s talk about your project. Free consultation, no commitment.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block bg-white text-accent px-8 py-3 rounded-md text-sm font-medium hover:bg-white/90 transition-colors"
        >
          Get a Free Consultation
        </Link>
      </div>
    </section>
  )
}
