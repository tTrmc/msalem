"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ]

  return (
      <nav style={{ backgroundColor: "var(--background)" }} className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex h-16 items-center justify-between">
            <Link
                href="#hero"
                className="text-xl font-body font-bold"
                style={{ color: "var(--foreground)" }}
            >
              Home
            </Link>

            {/* Desktop Navigation - Absolutely centered */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-4">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-md px-8 py-2 text-xl font-medium font-body transition-colors"
                        style={{ color: "var(--foreground)" }}
                        onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "var(--foreground)"}
                    >
                      {item.label}
                    </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />

              {/* Mobile menu button */}
              <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden inline-flex items-center justify-center rounded-md p-2 transition-colors"
                  style={{ color: "var(--stone)" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--foreground)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--stone)";
                  }}
                  aria-label="Toggle menu"
              >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
            <div className="md:hidden" style={{
              backgroundColor: "var(--background)",
              borderTop: "1px solid var(--stone)"
            }}>
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-md px-3 py-2 text-base font-medium font-body transition-colors"
                        style={{ color: "var(--stone)" }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "var(--accent)";
                          e.currentTarget.style.color = "var(--foreground)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "var(--stone)";
                        }}
                    >
                      {item.label}
                    </Link>
                ))}
              </div>
            </div>
        )}
      </nav>
  )
}