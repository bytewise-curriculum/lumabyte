import { OrbitingAvatars } from '@/components/ui/OrbitingAvatars'
import { FadeUp } from '@/components/ui/FadeUp'

const avatars = [
  { src: 'https://ui-avatars.com/api/?name=Alex+Chen&background=6366f1&color=fff', alt: 'Alex Chen' },
  { src: 'https://ui-avatars.com/api/?name=Maria+Santos&background=6366f1&color=fff', alt: 'Maria Santos' },
  { src: 'https://ui-avatars.com/api/?name=James+Walker&background=6366f1&color=fff', alt: 'James Walker' },
  { src: 'https://ui-avatars.com/api/?name=Priya+Nair&background=6366f1&color=fff', alt: 'Priya Nair' },
  { src: 'https://ui-avatars.com/api/?name=Omar+Diallo&background=6366f1&color=fff', alt: 'Omar Diallo' },
  { src: 'https://ui-avatars.com/api/?name=Sofia+Reyes&background=6366f1&color=fff', alt: 'Sofia Reyes' },
  { src: 'https://ui-avatars.com/api/?name=Ryan+Park&background=6366f1&color=fff', alt: 'Ryan Park' },
  { src: 'https://ui-avatars.com/api/?name=Fatima+Hassan&background=6366f1&color=fff', alt: 'Fatima Hassan' },
]

export function SocialProof() {
  return (
    <section className="py-24" style={{ background: '#0f172a' }}>
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp className="text-center mb-8">
          <span className="inline-block text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">
            Trusted Partners
          </span>
          <h2 className="font-geist text-3xl md:text-4xl font-bold text-white">
            Trusted by Teams That Ship
          </h2>
        </FadeUp>

        <OrbitingAvatars
          title="Trusted by Teams That Ship"
          description="From early-stage startups to growing businesses — LumaByte is the technical partner behind the build."
          buttonText="Work With Us"
          buttonHref="/contact"
          orbitDuration={30}
          avatars={avatars}
        />
      </div>
    </section>
  )
}
