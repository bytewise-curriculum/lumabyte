import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OrbitingAvatars } from '@/components/ui/OrbitingAvatars'

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, className }: { src: string; alt: string; width: number; height: number; className?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} className={className} />
  ),
}))

const mockAvatars = [
  { src: 'https://example.com/a1.jpg', alt: 'Alice' },
  { src: 'https://example.com/a2.jpg', alt: 'Bob' },
  { src: 'https://example.com/a3.jpg', alt: 'Carol' },
  { src: 'https://example.com/a4.jpg', alt: 'Dave' },
]

describe('OrbitingAvatars', () => {
  it('renders title and description', () => {
    render(
      <OrbitingAvatars
        title="Trusted by Teams"
        description="LumaByte powers the build."
        buttonText="Work With Us"
        buttonHref="/contact"
        avatars={mockAvatars}
      />
    )
    expect(screen.getByText('Trusted by Teams')).toBeTruthy()
    expect(screen.getByText('LumaByte powers the build.')).toBeTruthy()
  })

  it('renders button with correct href', () => {
    render(
      <OrbitingAvatars
        title="Test"
        description="Test desc"
        buttonText="Click Me"
        buttonHref="/contact"
        avatars={mockAvatars}
      />
    )
    const link = screen.getByRole('link', { name: 'Click Me' })
    expect(link.getAttribute('href')).toBe('/contact')
  })

  it('renders all avatar images', () => {
    render(
      <OrbitingAvatars
        title="T"
        description="D"
        buttonText="B"
        buttonHref="/contact"
        avatars={mockAvatars}
      />
    )
    const imgs = document.querySelectorAll('img')
    expect(imgs.length).toBe(mockAvatars.length)
  })
})
