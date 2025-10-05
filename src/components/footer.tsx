"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { smoothSpring } from "@/lib/animations"
import { NierPanel } from "@/components/ui/nier-panel"

export function Footer() {
  const socialLinks = [
    {
      href: "https://github.com/tTrmc",
      icon: Github,
      label: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/moustafasalem/",
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
      <footer
        className="crt-scanlines"
        style={{
          backgroundColor: "var(--background)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <NierPanel
            heading="System :: Footer"
            subtitle="LOG 06 // LINKS & CREDITS"
            variant="muted"
            compact
            className="nier-panel--no-axis"
          >
            <div className="flex flex-col items-center justify-between gap-8 text-center text-sm font-body text-[var(--stone)] md:flex-row md:text-left">
              <div className="flex space-x-6">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      className="text-[var(--stone)] transition-transform duration-150 hover:text-[var(--primary)]"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      transition={smoothSpring}
                      aria-label={link.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  )
                })}
              </div>

              <div className="flex items-center justify-center gap-2 uppercase tracking-[0.25em] text-[var(--stone)]">
                <span>Built with</span>
                <Heart className="h-4 w-4 text-[var(--primary)]" />
                <span>Next.js & Tailwind CSS</span>
              </div>

              <p className="uppercase tracking-[0.25em] text-[var(--stone)]">
                © {new Date().getFullYear()} Moustafa Salem. All rights reserved.
              </p>
            </div>
          </NierPanel>
        </div>
      </footer>
  )
}
