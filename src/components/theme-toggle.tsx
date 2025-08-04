"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // For animation tracking
    const [isAnimating, setIsAnimating] = React.useState(false)

    const toggleTheme = () => {
        if (isAnimating) return
        setIsAnimating(true)
        
        // Cycle through light -> dark -> system -> light
        let nextTheme: string
        switch(theme) {
            case "light":
                nextTheme = "dark"
                break
            case "dark":
                nextTheme = "system"
                break
            case "system":
            default:
                nextTheme = "light"
                break
        }
        
        setTheme(nextTheme)
        setTimeout(() => setIsAnimating(false), 500)
    }

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border overflow-hidden
        bg-[var(--background)] border-[var(--stone)]
        hover:bg-[var(--accent)] focus:outline-none focus:ring-2
        focus:ring-[var(--primary)] focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-5 w-5 flex items-center justify-center"
                >
                    {theme === "light" ? (
                        <Sun className="h-5 w-5" />
                    ) : theme === "dark" ? (
                        <Moon className="h-5 w-5" />
                    ) : (
                        <Monitor className="h-5 w-5" />
                    )}
                </motion.div>
            </AnimatePresence>

            <motion.div
                className="absolute inset-0 rounded-md"
                animate={{
                    scale: isAnimating ? 1.5 : 0,
                    opacity: isAnimating ? 0.4 : 0
                }}
                transition={{ duration: 0.5 }}
                style={{
                    background: `radial-gradient(circle at center, var(--primary) 0%, transparent 70%)`,
                }}
            />
        </motion.button>
    )
}