"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
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

  return (
      <>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <nav
          suppressHydrationWarning
          style={{ backgroundColor: "var(--background)" }}
          className="w-full crt-scanlines"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex h-16 items-center justify-between">
            <Link
                href="#hero"
                className="flex items-center space-x-3"
            >
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
              <span className="text-xl font-body font-bold" style={{ color: "var(--foreground)" }}>
                Salem
              </span>
            </Link>

            {/* Desktop Navigation - Absolutely centered */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-4">
                {navItems.map((item) => (
                    <motion.div key={item.href}>
                      <Link
                          href={item.href}
                          className="rounded-md px-8 py-2 text-xl font-medium font-body block"
                      >
                        <motion.span
                          whileHover={{ y: -2, scale: 1.02 }}
                          transition={smoothSpring}
                          className="block transition-colors duration-150 hover:text-[var(--primary)]"
                          style={{ color: "var(--foreground)" }}
                        >
                          {item.label}
                        </motion.span>
                      </Link>
                    </motion.div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden inline-flex items-center justify-center rounded-md p-2 transition-transform duration-150 hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={smoothSpring}
                  style={{ color: "var(--stone)" }}
                  aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mounted && (
          <AnimatePresence>
            {isOpen && (
                <motion.div
                  className="md:hidden"
                  style={{
                    backgroundColor: "var(--background)",
                    borderTop: "1px solid var(--stone)"
                  }}
                  variants={fadeInDown}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={smoothSpring}
                >
                  <motion.div
                    className="space-y-1 px-2 pb-3 pt-2"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {navItems.map((item) => (
                        <motion.div key={item.href} variants={staggerItem}>
                          <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block rounded-md px-3 py-2 text-base font-medium font-body"
                          >
                            <motion.span
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              transition={smoothSpring}
                              className="block rounded-md px-3 py-2 transition-colors duration-150 hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
                              style={{ color: "var(--stone)" }}
                            >
                              {item.label}
                            </motion.span>
                          </Link>
                        </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
            )}
          </AnimatePresence>
        )}
        </nav>
      </>
  )
}
