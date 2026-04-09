import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { DottedSurface } from '@/components/ui/DottedSurface'

// Mock Three.js — we just verify the component mounts without crashing
vi.mock('three', () => {
  const mockCanvas = document.createElement('canvas')

  function Scene(this: any) { this.add = vi.fn() }
  function PerspectiveCamera(this: any) {
    this.position = { set: vi.fn() }
    this.aspect = 1
    this.updateProjectionMatrix = vi.fn()
  }
  function WebGLRenderer(this: any) {
    this.setSize = vi.fn()
    this.setPixelRatio = vi.fn()
    this.render = vi.fn()
    this.dispose = vi.fn()
    this.domElement = mockCanvas
  }
  function BufferGeometry(this: any) {
    this.setAttribute = vi.fn()
    this.getAttribute = vi.fn(() => ({ array: new Float32Array(3000), needsUpdate: false }))
    this.dispose = vi.fn()
  }
  function Float32BufferAttribute(this: any) {}
  function PointsMaterial(this: any) { this.dispose = vi.fn() }
  function Points(this: any) {}
  function BufferAttribute(this: any) {}

  return {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BufferGeometry,
    Float32BufferAttribute,
    PointsMaterial,
    Points,
    BufferAttribute,
  }
})

describe('DottedSurface', () => {
  it('renders a container div with aria-hidden', () => {
    const { container } = render(<DottedSurface />)
    const div = container.firstChild as HTMLElement
    expect(div).toBeTruthy()
    expect(div.getAttribute('aria-hidden')).toBe('true')
  })
})
