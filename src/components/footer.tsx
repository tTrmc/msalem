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
    <footer className="bg-stone-900 dark:bg-stone-950 border-t border-stone-200/20 dark:border-stone-700/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="flex space-x-6">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-stone-400 hover:text-warm-400 transition-colors"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-stone-400 font-body">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-warm-500" />
            <span>using Next.js & Tailwind CSS</span>
          </div>
          
          <p className="text-sm text-stone-400 font-body">
            © {new Date().getFullYear()} Moustafa Salem. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
