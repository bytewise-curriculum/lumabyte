'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function DottedSurface() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(0, 0, 30)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Create dot grid
    const cols = 40
    const rows = 25
    const spacing = 2
    const geometry = new THREE.BufferGeometry()
    const positions: number[] = []

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i - cols / 2) * spacing
        const y = (j - rows / 2) * spacing
        positions.push(x, y, 0)
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    const material = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.15,
      transparent: true,
      opacity: 0.5,
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Animate wave
    let animId: number
    const posAttr = geometry.getAttribute('position')! as THREE.BufferAttribute
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = Date.now() * 0.001
      const arr = posAttr.array as Float32Array
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const idx = (i * rows + j) * 3
          arr[idx + 2] = Math.sin(i * 0.5 + t) * Math.cos(j * 0.5 + t) * 1.5
        }
      }
      posAttr.needsUpdate = true
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
