"use client"

import { useEffect, useRef, useMemo, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { useTheme } from "next-themes"

interface ASCIIBackgroundProps {
  /** Color palette for the ASCII background */
  colors?: string[]
  /** Height of a character row (px). Adjust to taste / performance */
  fontSize?: number
  /** Width of a character column (px). Adjust to taste / performance */
  charWidth?: number
}

const BASE_FONT_SIZE = 24
const BASE_CHAR_WIDTH = 16
const BASE_ROW_STEP = BASE_FONT_SIZE * 1.5
const BASE_COL_STEP = BASE_CHAR_WIDTH * 1.5
const BASE_CELL_AREA = BASE_ROW_STEP * BASE_COL_STEP
// Soft cap on characters rendered per frame to protect frame budget on large screens.
const MAX_ASCII_CELLS = 6000
const WAVE_FREQ_X = 0.005
const WAVE_FREQ_Y = 0.008
const WAVE_FREQ_XY = 0.003
const WAVE_SPEED_X = 0.001
const WAVE_SPEED_Y = 0.0008
const WAVE_SPEED_XY = 0.0012
const CENTER_FADE_RADIUS = 800

type GridCell = {
  x: number
  y: number
  centerFade: number
  phaseX: number
  phaseY: number
  phaseXY: number
}

const normaliseHex = (value: string) => (value.startsWith("#") ? value : `#${value}`)

const hexToRgb = (hex: string) => {
  const h = hex.replace("#", "")
  const full = h.length === 3 ? h.split("").map((x) => x + x).join("") : h
  const num = parseInt(full, 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

const hexToRgbString = (hex: string) => {
  const { r, g, b } = hexToRgb(hex)
  return `rgb(${r},${g},${b})`
}

/**
 * Animated ASCII background with throttled rendering and visibility guards.
 *
 * Optimisations vs. baseline implementation:
 *  • Respects reduced-motion preferences by disabling animation entirely.
 *  • Pauses drawing when the hero section is off-screen (IntersectionObserver).
 *  • Caps animation at ~30 FPS and increases draw step to lower per-frame cost.
 *  • Palette, grid metadata, and listeners remain memoised + cleaned up.
 */
export function ASCIIBackground({
  colors,
  fontSize = 18,
  charWidth = 12,
}: ASCIIBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<GridCell[]>([])
  const isVisibleRef = useRef(false)
  const prefersReducedMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const lightThemeColors = useMemo(() => [
    '#f2ecdb',
    '#e4dcc3',
    '#d2c7a6',
    '#bcae8f',
    '#a39075',
    '#6a5d48',
  ], [])

  const darkThemeColors = useMemo(() => [
    '#1f1a15',
    '#2a251c',
    '#4f4739',
    '#7f715a',
    '#b77b5b',
    '#d2c7a6',
  ], [])

  const paletteSource = useMemo(() => {
    if (colors && colors.length) {
      return colors
    }

    const themeKey = mounted ? resolvedTheme : undefined
    if (themeKey === 'light') {
      return lightThemeColors
    }

    return darkThemeColors
  }, [colors, darkThemeColors, lightThemeColors, mounted, resolvedTheme])

  /** Normalised colour palette (always #RRGGBB) */
  const palette = useMemo(() => paletteSource.map(normaliseHex), [paletteSource])
  const fillStyles = useMemo(() => palette.map(hexToRgbString), [palette])

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
    const charMaxIndex = Math.max(0, chars.length - 1)
    const colourMaxIndex = Math.max(0, fillStyles.length - 1)
    const fallbackHex = paletteSource[paletteSource.length - 1] ?? '#ece1c9'
    const backgroundHex = paletteSource[0] ?? '#2a251c'
    const fallbackFill = fillStyles[colourMaxIndex] ?? hexToRgbString(fallbackHex)
    const backgroundFill = fillStyles[0] ?? hexToRgbString(backgroundHex)
    const FRAME_INTERVAL = 1000 / 30 // ~30 FPS cap

    const matchDensity = (width: number, height: number) => {
      let row = fontSize * 1.2
      let col = charWidth * 1.2

      const area = row * col
      if (area > BASE_CELL_AREA) {
        const shrink = Math.sqrt(area / BASE_CELL_AREA)
        row /= shrink
        col /= shrink
      }

      const columns = width / col
      const rows = height / row
      const totalCells = columns * rows

      if (totalCells > MAX_ASCII_CELLS) {
        const expand = Math.sqrt(totalCells / MAX_ASCII_CELLS)
        row *= expand
        col *= expand
      }

      return { row, col }
    }

    const buildGrid = () => {
      const width = canvas.width
      const height = canvas.height
      const { row, col } = matchDensity(width, height)
      const cells: GridCell[] = []
      const centerX = width / 2
      const centerY = height / 2

      for (let y = 0; y <= height; y += row) {
        for (let x = 0; x <= width; x += col) {
          const centerDist = Math.hypot(x - centerX, y - centerY)
          const centerFade = Math.min(1, centerDist / CENTER_FADE_RADIUS)

          cells.push({
            x,
            y,
            centerFade,
            phaseX: x * WAVE_FREQ_X,
            phaseY: y * WAVE_FREQ_Y,
            phaseXY: (x + y) * WAVE_FREQ_XY,
          })
        }
      }

      gridRef.current = cells
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.font = `${fontSize}px monospace`
      ctx.textBaseline = "top"

      buildGrid()
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
      ctx.fillStyle = backgroundFill
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const grid = gridRef.current
      if (!grid.length || !fillStyles.length) {
        frameId = requestAnimationFrame(step)
        return
      }

      const timeX = time * WAVE_SPEED_X
      const timeY = time * WAVE_SPEED_Y
      const timeXY = time * WAVE_SPEED_XY

      let lastFillStyle: string | null = null

      for (const cell of grid) {
        const w1 = Math.sin(cell.phaseX + timeX)
        const w2 = Math.cos(cell.phaseY + timeY)
        const w3 = Math.sin(cell.phaseXY + timeXY)

        const intensity = (w1 + w2 + w3) / 3
        const norm = Math.min(1, Math.max(0, (intensity + 1) / 2))
        const adjusted = norm * cell.centerFade

        if (adjusted <= 0.02) continue

        const charIdx = Math.min(charMaxIndex, Math.floor(adjusted * charMaxIndex))
        const colourIdx = Math.min(colourMaxIndex, Math.floor(adjusted * colourMaxIndex))

        const fill = fillStyles[colourIdx] ?? fallbackFill
        if (fill !== lastFillStyle) {
          ctx.fillStyle = fill
          lastFillStyle = fill
        }

        const char = chars.charAt(charIdx)
        ctx.fillText(char, cell.x, cell.y)
      }

      frameId = requestAnimationFrame(step)
    }

    frameId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [fillStyles, fontSize, charWidth, prefersReducedMotion, paletteSource])

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
    </div>
  )
}

export default ASCIIBackground
