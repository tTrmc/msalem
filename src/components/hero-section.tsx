"use client"

import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import { motion } from "framer-motion"
import { ASCIIBackground } from "./ascii-background"

export function HeroSection() {
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
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <ASCIIBackground
            lightModeColors={['#000000', '#b7a07e']}
            darkModeColors={['#ffffff', '#b7a07e']}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-display font-bold tracking-tight text-[var(--foreground)] sm:text-6xl text-shadow">
                Hi, I&apos;m{" "}
                <span className="font-bold text-[var(--primary)]">
                Moustafa Salem
              </span>
              </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="mt-6 text-lg leading-8 text-[var(--stone)] sm:text-xl font-body">
                Computer Science Student & Aspiring Software Engineer
              </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="mt-4 text-base text-[var(--stone)] max-w-2xl mx-auto font-body opacity-100">
                Passionate about learning new technologies and building meaningful projects.
                Currently studying Computer Science while gaining hands-on experience in full-stack development.
              </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-10 flex items-center justify-center gap-x-6"
            >
              <a
                  href="#projects"
                  className="rounded-md px-6 py-3 text-sm font-semibold shadow-sm transition-colors font-body"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--background)"
                  }}
              >
                View My Projects
              </a>
              <a
                  href="#contact"
                  className="text-sm font-semibold leading-6 transition-colors font-body text-[var(--foreground)] hover:text-[var(--primary)]"
              >
                Get In Touch <span aria-hidden="true">→</span>
              </a>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 flex justify-center space-x-6"
            >
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                    <a
                        key={link.label}
                        href={link.href}
                        className="transition-colors"
                        style={{
                          color: "var(--stone)"
                        }}
                        aria-label={link.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "var(--stone)"}
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                )
              })}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-16"
            >
              <a
                  href="#about"
                  className="inline-flex items-center transition-colors"
                  style={{
                    color: "var(--stone)"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--stone)"}
                  aria-label="Scroll to about section"
              >
                <ArrowDown className="h-5 w-5 animate-bounce" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
  )
}