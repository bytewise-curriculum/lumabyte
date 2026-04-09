'use client'

import Image from 'next/image'

type Avatar = {
  src: string
  alt: string
}

type OrbitingAvatarsProps = {
  title: string
  description: string
  buttonText: string
  buttonHref: string
  orbitDuration?: number
  avatars: Avatar[]
}

export function OrbitingAvatars({
  title,
  description,
  buttonText,
  buttonHref,
  orbitDuration = 30,
  avatars,
}: OrbitingAvatarsProps) {
  const half = Math.ceil(avatars.length / 2)
  const ring1 = avatars.slice(0, half)
  const ring2 = avatars.slice(half)

  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: '500px' }}>
      {/* Inner orbit ring */}
      <div
        className="absolute rounded-full border border-indigo-500/20"
        style={{
          width: '280px',
          height: '280px',
          animation: `orbit ${orbitDuration}s linear infinite`,
        }}
      >
        {ring1.map((avatar, i) => {
          const angle = (360 / ring1.length) * i
          const rad = (angle * Math.PI) / 180
          const x = 50 + 50 * Math.cos(rad)
          const y = 50 + 50 * Math.sin(rad)
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                animation: `counter-orbit ${orbitDuration}s linear infinite`,
              }}
            >
              <Image
                src={avatar.src}
                alt={avatar.alt}
                width={44}
                height={44}
                className="rounded-full border-2 border-indigo-500/40"
              />
            </div>
          )
        })}
      </div>

      {/* Outer orbit ring */}
      <div
        className="absolute rounded-full border border-indigo-500/10"
        style={{
          width: '420px',
          height: '420px',
          animation: `counter-orbit ${orbitDuration * 1.5}s linear infinite`,
        }}
      >
        {ring2.map((avatar, i) => {
          const angle = (360 / ring2.length) * i
          const rad = (angle * Math.PI) / 180
          const x = 50 + 50 * Math.cos(rad)
          const y = 50 + 50 * Math.sin(rad)
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                animation: `orbit ${orbitDuration * 1.5}s linear infinite`,
              }}
            >
              <Image
                src={avatar.src}
                alt={avatar.alt}
                width={44}
                height={44}
                className="rounded-full border-2 border-indigo-500/30"
              />
            </div>
          )
        })}
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center max-w-xs px-4">
        <h2 className="font-geist text-2xl font-bold text-white mb-3">{title}</h2>
        <p className="text-white/70 text-sm mb-6">{description}</p>
        <a
          href={buttonHref}
          className="inline-block bg-accent text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          {buttonText}
        </a>
      </div>
    </div>
  )
}
