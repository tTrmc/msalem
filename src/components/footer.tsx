"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { smoothSpring } from "@/lib/animations"

export function Footer() {
  const socialLinks = [
    {
      href: "https://github.com/tTrmc",
      icon: Github,
      label: "GitHub",
    },
    {
      href: "https://linkedin.com",
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: "mailto:salemmoustafa442@gmail.com",
      icon: Mail,
      label: "Email",
    },
  ]

  return (
      <footer style={{
        backgroundColor: "var(--foreground)",
        // Border properties removed
      }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            <div className="flex space-x-6">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                    <motion.a
                        key={link.label}
                        href={link.href}
                        whileHover={{ color: "var(--warm)", scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={smoothSpring}
                        style={{ color: "var(--background)" }}
                        aria-label={link.label}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                )
              })}
            </div>

            <div className="flex items-center space-x-1 text-sm font-body" style={{ color: "var(--background)" }}>
              <span>Built with</span>
              <Heart className="h-4 w-4" style={{ color: "var(--warm)" }} />
              <span>using Next.js & Tailwind CSS</span>
            </div>

            <p className="text-sm font-body" style={{ color: "var(--background)" }}>
              © {new Date().getFullYear()} Moustafa Salem. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  )
}