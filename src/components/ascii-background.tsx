"use client"

import { useEffect, useRef } from 'react'

export function ASCIIBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const chars = ' .:-=+*#%@'
        let animationId: number

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        const animate = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.font = '12px monospace'

            for (let y = 0; y < canvas.height; y += 16) {
                for (let x = 0; x < canvas.width; x += 10) {
                    const wave1 = Math.sin((x * 0.005) + (time * 0.001))
                    const wave2 = Math.cos((y * 0.008) + (time * 0.0008))
                    const wave3 = Math.sin(((x + y) * 0.003) + (time * 0.0012))

                    const brightness = (wave1 + wave2 + wave3) / 3
                    const charIndex = Math.floor(((brightness + 1) / 2) * (chars.length - 1))
                    const char = chars[Math.max(0, Math.min(chars.length - 1, charIndex))]

                    const hue = (x + y + time * 0.1) % 360
                    const alpha = Math.max(0.1, (brightness + 1) / 4)

                    ctx.fillStyle = `hsla(${hue}, 60%, 70%, ${alpha})`
                    ctx.fillText(char, x, y)
                }
            }

            animationId = requestAnimationFrame(animate)
        }

        animate(0)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    )
}