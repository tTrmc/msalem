"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { smoothSpring, fadeInDown, staggerContainer, staggerItem } from "@/lib/animations"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ]

  const { theme, setTheme } = useTheme()
  const isLightTheme = mounted && theme === "light"
  const themeButtonLabel = isLightTheme ? "Dark Theme" : "Light Theme"
  const themeButtonAria = isLightTheme ? "Switch to dark theme" : "Switch to light theme"
  const handleThemeToggle = () => setTheme(isLightTheme ? "dark" : "light")

  const ThemeToggleButton = ({ fullWidth = false, variant = "default" }: { fullWidth?: boolean; variant?: "default" | "icon" }) => {
    if (!mounted) return null

    if (variant === "icon") {
      return (
        <motion.button
          onClick={handleThemeToggle}
          type="button"
          className="inline-flex items-center justify-center rounded-sm border p-2 transition-transform duration-150"
          style={{
            borderColor: "color-mix(in srgb, var(--accent) 55%, transparent)",
            backgroundColor: "color-mix(in srgb, var(--background) 85%, transparent)",
            color: "var(--foreground)",
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={smoothSpring}
          aria-pressed={isLightTheme}
          aria-label={themeButtonAria}
          title={themeButtonAria}
        >
          {isLightTheme ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </motion.button>
      )
    }

    return (
      <motion.button
        onClick={handleThemeToggle}
        type="button"
        className={[
          "inline-flex items-center gap-2 rounded-sm border font-body uppercase tracking-[0.2em] text-xs transition-colors",
          fullWidth ? "w-full justify-center px-4 py-2" : "px-3 py-2",
        ].join(' ')}
        style={{
          borderColor: "color-mix(in srgb, var(--accent) 55%, transparent)",
          backgroundColor: "color-mix(in srgb, var(--background) 88%, transparent)",
          color: "var(--foreground)",
        }}
        whileHover={{ y: -1, scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        transition={smoothSpring}
        aria-pressed={isLightTheme}
        aria-label={themeButtonAria}
        title={themeButtonAria}
      >
        {isLightTheme ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        <span>{themeButtonLabel}</span>
      </motion.button>
    )
  }

  return (
      <>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <nav
          suppressHydrationWarning
          style={{ backgroundColor: "var(--background)" }}
          className="w-full"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className="flex h-14 items-center justify-between rounded-sm border px-4 backdrop-blur-sm"
              style={{
                borderColor: "color-mix(in srgb, var(--accent) 55%, transparent)",
                backgroundColor: "color-mix(in srgb, var(--background) 82%, transparent)",
              }}
            >
              <Link href="#hero" className="flex items-center space-x-3">
                <Image
                  src="/images/logo.png"
                  alt="Salem Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                  style={{ imageRendering: "pixelated" }}
                  unoptimized
                  priority
                />
                <span className="text-xl font-body font-bold text-[var(--foreground)]">
                  Salem
                </span>
              </Link>

              <div className="hidden md:block">
                <div className="flex items-center space-x-6">
                  {navItems.map((item) => (
                    <motion.div key={item.href}>
                      <Link
                        href={item.href}
                        className="px-3 py-2 text-sm font-semibold font-body tracking-[0.2em] text-[var(--foreground)] hover:text-[var(--primary)]"
                      >
                        <motion.span
                          whileHover={{ y: -1, scale: 1.01 }}
                          transition={smoothSpring}
                          className="block"
                        >
                          {item.label}
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:block">
                  <ThemeToggleButton />
                </div>
                <div className="md:hidden">
                  <ThemeToggleButton variant="icon" />
                </div>
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden inline-flex items-center justify-center rounded-sm p-2 transition-transform duration-150 hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={smoothSpring}
                  style={{ color: "var(--stone)" }}
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.button>
              </div>
            </div>
          </div>

        {/* Mobile Navigation Menu */}
        {mounted && (
          <AnimatePresence>
            {isOpen && (
                <motion.div
                  className="md:hidden mt-2 px-4 sm:px-6 lg:px-8"
                  variants={fadeInDown}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={smoothSpring}
                >
                  <motion.div
                    className="space-y-1 rounded-sm border px-3 py-3"
                    style={{
                      borderColor: "color-mix(in srgb, var(--accent) 55%, transparent)",
                      backgroundColor: "color-mix(in srgb, var(--background) 90%, transparent)",
                    }}
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {navItems.map((item) => (
                      <motion.div key={item.href} variants={staggerItem}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-sm px-3 py-2 text-base font-semibold font-body tracking-[0.2em] text-[var(--stone)] hover:text-[var(--primary)]"
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div variants={staggerItem} className="pt-3 border-t border-[color-mix(in srgb,var(--accent) 45%,transparent)]">
                      <ThemeToggleButton fullWidth />
                    </motion.div>
                  </motion.div>
                </motion.div>
            )}
          </AnimatePresence>
        )}
        </nav>
      </>
  )
}
