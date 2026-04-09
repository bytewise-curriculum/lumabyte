import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Sparkles } from '@/components/ui/Sparkles'

vi.mock('@tsparticles/react', () => ({
  default: ({ id, className }: { id: string; className?: string }) => (
    <div data-testid="particles" id={id} className={className} />
  ),
  initParticlesEngine: vi.fn(() => Promise.resolve()),
}))

vi.mock('@tsparticles/slim', () => ({
  loadSlim: vi.fn(() => Promise.resolve()),
}))

describe('Sparkles', () => {
  it('renders nothing before engine is ready', () => {
    const { container } = render(<Sparkles />)
    // Before promise resolves, should render null
    expect(container.firstChild).toBeNull()
  })
})
