"use client"

import { useEffect, useRef, useState } from 'react'

interface ASCIIBackgroundProps {
    lightModeColors?: string[];
    darkModeColors?: string[];
}

export function ASCIIBackground({
                                    lightModeColors = ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5'],
                                    darkModeColors = ['#0C0032', '#190061', '#240090', '#3500D3', '#42047E']
                                }: ASCIIBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const [isDarkMode, setIsDarkMode] = useState(false)

    // Detect color scheme
    useEffect(() => {
        // Check initial mode
        if (typeof window !== 'undefined') {
            setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)

            // Listen for changes
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)

            mediaQuery.addEventListener('change', handleChange)
            return () => mediaQuery.removeEventListener('change', handleChange)
        }
    }, [])

    // Use appropriate color palette based on mode
    const colors = isDarkMode ? darkModeColors : lightModeColors

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const chars = ' .:-=+*#%@'
        let animationId: number

        // Helper to convert hex to RGB
        const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };

        // Color interpolation function
        const getColorFromGradient = (value: number, alpha: number) => {
            const normalizedValue = Math.max(0, Math.min(1, value));
            const segment = normalizedValue * (colors.length - 1);
            const index = Math.floor(segment);
            const fraction = segment - index;

            if (index >= colors.length - 1) {
                const color = hexToRgb(colors[colors.length - 1]);
                return color ? `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})` : `rgba(0, 0, 0, ${alpha})`;
            }

            const color1 = hexToRgb(colors[index]);
            const color2 = hexToRgb(colors[index + 1]);

            if (!color1 || !color2) return `rgba(0, 0, 0, ${alpha})`;

            const r = Math.round(color1.r + fraction * (color2.r - color1.r));
            const g = Math.round(color1.g + fraction * (color2.g - color1.g));
            const b = Math.round(color1.b + fraction * (color2.b - color1.b));

            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

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
            ctx.font = '14px monospace'

            const mouseX = mouseRef.current.x
            const mouseY = mouseRef.current.y

            for (let y = 0; y < canvas.height; y += 16) {
                for (let x = 0; x < canvas.width; x += 10) {
                    const dx = x - mouseX
                    const dy = y - mouseY
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    const mouseInfluence = Math.exp(-distance / 150) * 2
                    const mouseWave = Math.sin(distance * 0.02 - time * 0.005) * mouseInfluence

                    const wave1 = Math.sin((x * 0.005) + (time * 0.001))
                    const wave2 = Math.cos((y * 0.008) + (time * 0.0008))
                    const wave3 = Math.sin(((x + y) * 0.003) + (time * 0.0012))

                    const brightness = (wave1 + wave2 + wave3 + mouseWave) / 4
                    const charIndex = Math.floor(((brightness + 1) / 2) * (chars.length - 1))
                    const char = chars[Math.max(0, Math.min(chars.length - 1, charIndex))]

                    const alpha = Math.max(0.1, (brightness + 1) / 4)
                    const normalizedBrightness = (brightness + 1) / 2 // Convert from -1,1 to 0,1

                    ctx.fillStyle = getColorFromGradient(normalizedBrightness, alpha)
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
    }, [colors])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-100 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    )
}