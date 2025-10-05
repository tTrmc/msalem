"use client"

import { useEffect, useRef, useMemo } from "react"
import { useReducedMotion } from "framer-motion"

interface ASCIIBackgroundProps {
  /** Color palette for the ASCII background */
  colors?: string[]
  /** Height of a character row (px). Adjust to taste / performance */
  fontSize?: number
  /** Width of a character column (px). Adjust to taste / performance */
  charWidth?: number
}

/**
 * Animated ASCII background with throttled rendering and visibility guards.
 *
 * Optimisations vs. baseline implementation:
 *  • Respects reduced-motion preferences by disabling animation entirely.
 *  • Pauses drawing when the hero section is off-screen (IntersectionObserver).
 *  • Caps animation at ~30 FPS and increases draw step to lower per-frame cost.
 *  • Palette, mouse tracking, and listeners remain memoised + cleaned up.
 */
export function ASCIIBackground({
  colors = ["#0f0f1b", "#242633", "#565a75", "#c6b7be", "#fafbf6"],
  fontSize = 24,
  charWidth = 16,
}: ASCIIBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const isVisibleRef = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  /** Normalised colour palette (always #RRGGBB) */
  const palette = useMemo(() => colors.map((c) => (c.startsWith("#") ? c : `#${c}`)), [colors])

  // Track visibility to pause expensive drawing work when section is off-screen.
  useEffect(() => {
    if (prefersReducedMotion) return
    if (typeof IntersectionObserver === "undefined") {
      isVisibleRef.current = true
      return
    }

    const target = containerRef.current
    if (!target) return

    const rect = target.getBoundingClientRect()
    isVisibleRef.current = rect.bottom >= 0 && rect.top <= window.innerHeight

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        isVisibleRef.current = entry?.isIntersecting ?? false
      },
      { threshold: 0.1 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  // Main animation loop
  useEffect(() => {
    if (prefersReducedMotion) {
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
      }
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const chars = " .:-=+*#%@"
    const FRAME_INTERVAL = 1000 / 30 // ~30 FPS cap
    const rowStep = Math.max(fontSize * 1.5, fontSize)
    const colStep = Math.max(charWidth * 1.5, charWidth)

    const hexToRgb = (hex?: string) => {
      if (!hex) return { r: 0, g: 0, b: 0 }
      const h = hex.replace("#", "")
      const full = h.length === 3 ? h.split("").map((x) => x + x).join("") : h
      const num = parseInt(full, 16)
      return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.font = `${fontSize}px monospace`
      ctx.textBaseline = "top"
    }

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const target = containerRef.current
        if (target) {
          const rect = target.getBoundingClientRect()
          isVisibleRef.current = rect.bottom >= 0 && rect.top <= window.innerHeight
        }
      } else {
        isVisibleRef.current = false
      }
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouse)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    let frameId = 0
    let lastFrameTime = 0

    const step = (time: number) => {
      if (!isVisibleRef.current) {
        lastFrameTime = time
        frameId = requestAnimationFrame(step)
        return
      }

      if (time - lastFrameTime < FRAME_INTERVAL) {
        frameId = requestAnimationFrame(step)
        return
      }

      lastFrameTime = time
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x: mx, y: my } = mouseRef.current
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      for (let y = 0; y < canvas.height; y += rowStep) {
        for (let x = 0; x < canvas.width; x += colStep) {
          const dx = x - mx
          const dy = y - my
          const dist = Math.hypot(dx, dy)

          const centerDist = Math.hypot(x - centerX, y - centerY)
          const centerFade = Math.min(1, centerDist / 800)

          const mouseAmp = Math.exp(-dist / 150) * 2
          const mouseWave = Math.sin(dist * 0.02 - time * 0.005) * mouseAmp

          const w1 = Math.sin(x * 0.005 + time * 0.001)
          const w2 = Math.cos(y * 0.008 + time * 0.0008)
          const w3 = Math.sin((x + y) * 0.003 + time * 0.0012)

          const h = (w1 + w2 + w3 + mouseWave) / 4
          const norm = Math.min(1, Math.max(0, (h + 1) / 2))
          const adjustedNorm = norm * centerFade

          const charIdx = Math.floor(adjustedNorm * (chars.length - 1))
          const colourIdx = Math.floor(adjustedNorm * (palette.length - 1))

          const char = chars[charIdx]
          const { r, g, b } = hexToRgb(palette[colourIdx])
          ctx.fillStyle = `rgb(${r},${g},${b})`
          ctx.fillText(char, x, y)
        }
      }

      frameId = requestAnimationFrame(step)
    }

    frameId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouse)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [palette, fontSize, charWidth, prefersReducedMotion])

  const shouldRenderCanvas = !prefersReducedMotion

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {shouldRenderCanvas && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      )}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(to bottom, var(--background) 0%, transparent 20%, transparent 60%, var(--background) 100%)`,
        }}
      />
    </div>
  )
}

export default ASCIIBackground
