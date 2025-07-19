"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
      <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border transition-all duration-300
        bg-[var(--background)] text-[var(--foreground)] border-[var(--stone)]
        hover:bg-[var(--accent)] focus:outline-none focus:ring-2
        focus:ring-[var(--primary)] focus:ring-offset-2"
          aria-label="Toggle theme"
      >
        <div className="relative h-5 w-5">
          <Sun className={`absolute h-full w-full transition-all duration-300 ${
              theme === "light"
                  ? "rotate-0 opacity-100"
                  : "rotate-90 opacity-0"
          }`} />
          <Moon className={`absolute h-full w-full transition-all duration-300 ${
              theme === "dark"
                  ? "rotate-0 opacity-100"
                  : "-rotate-90 opacity-0"
          }`} />
        </div>
      </button>
  )
}