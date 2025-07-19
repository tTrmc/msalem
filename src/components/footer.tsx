"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"

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
        backgroundColor: "var(--background)"
        // Border properties removed
      }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            <div className="flex space-x-6">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                    <a
                        key={link.label}
                        href={link.href}
                        style={{ color: "var(--stone)" }}
                        onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "var(--stone)"}
                        aria-label={link.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                )
              })}
            </div>

            <div className="flex items-center space-x-1 text-sm font-body" style={{ color: "var(--stone)" }}>
              <span>Built with</span>
              <Heart className="h-4 w-4" style={{ color: "var(--primary)" }} />
              <span>using Next.js & Tailwind CSS</span>
            </div>

            <p className="text-sm font-body" style={{ color: "var(--stone)" }}>
              © {new Date().getFullYear()} Moustafa Salem. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  )
}