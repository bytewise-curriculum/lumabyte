import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { FadeUp } from '@/components/ui/FadeUp'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode; className?: string }) =>
      <div className={className}>{children}</div>,
  },
}))

describe('FadeUp', () => {
  it('renders children text correctly', () => {
    const { getByText } = render(<FadeUp>hello</FadeUp>)
    expect(getByText('hello')).toBeInTheDocument()
  })

  it('applies custom className to the div', () => {
    const { container } = render(<FadeUp className="test-class">hello</FadeUp>)
    const div = container.querySelector('div')
    expect(div).toHaveClass('test-class')
  })
})
