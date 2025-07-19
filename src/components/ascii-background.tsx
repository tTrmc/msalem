"use client"

import { useEffect, useRef } from 'react'

export function ASCIIBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: 0, y: 0 })

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

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX
            mouseRef.current.y = e.clientY
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)
        window.addEventListener('mousemove', handleMouseMove)

        const animate = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.font = '12px monospace'

            const mouseX = mouseRef.current.x
            const mouseY = mouseRef.current.y

            for (let y = 0; y < canvas.height; y += 16) {
                for (let x = 0; x < canvas.width; x += 10) {
                    // Calculate distance from mouse
                    const dx = x - mouseX
                    const dy = y - mouseY
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    // Mouse influence (stronger when closer, fades with distance)
                    const mouseInfluence = Math.exp(-distance / 150) * 2
                    const mouseWave = Math.sin(distance * 0.02 - time * 0.005) * mouseInfluence

                    // Original waves
                    const wave1 = Math.sin((x * 0.005) + (time * 0.001))
                    const wave2 = Math.cos((y * 0.008) + (time * 0.0008))
                    const wave3 = Math.sin(((x + y) * 0.003) + (time * 0.0012))

                    // Combine with mouse disruption
                    const brightness = (wave1 + wave2 + wave3 + mouseWave) / 4
                    const charIndex = Math.floor(((brightness + 1) / 2) * (chars.length - 1))
                    const char = chars[Math.max(0, Math.min(chars.length - 1, charIndex))]

                    const hue = 35 + Math.sin((x + y + time * 0.05) * 0.01) * 15
                    const alpha = Math.max(0.1, (brightness + 1) / 4)

                    ctx.fillStyle = `hsla(${hue}, 40%, 80%, ${alpha})`
                    ctx.fillText(char, x, y)
                }
            }

            animationId = requestAnimationFrame(animate)
        }

        animate(0)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resizeCanvas)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-75 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    )
}