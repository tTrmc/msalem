"use client"

import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import { motion } from "framer-motion"
import { ASCIIBackground } from "./ascii-background"
import { smoothSpring, iconHover, buttonHover } from "@/lib/animations"

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
        <ASCIIBackground/>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={smoothSpring}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-tight text-[var(--foreground)] text-shadow">
                Moustafa Salem
              </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smoothSpring, delay: 0.1 }}
            >
              <p className="mt-8 text-2xl md:text-3xl leading-8 text-[var(--foreground)] font-body">
                Computer Science Student @ Queen&apos;s University
              </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smoothSpring, delay: 0.3 }}
                className="mt-10 flex items-center justify-center gap-x-6"
            >
              <motion.a
                  href="#projects"
                  variants={buttonHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="rounded-md px-6 py-3 text-sm font-semibold shadow-sm font-body"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--background)"
                  }}
              >
                View My Projects
              </motion.a>
              <motion.a
                  href="#contact"
                  whileHover={{ color: "var(--primary)", x: 4 }}
                  transition={smoothSpring}
                  className="text-sm font-semibold leading-6 font-body"
                  style={{ color: "var(--foreground)" }}
              >
                Get In Touch <span aria-hidden="true">→</span>
              </motion.a>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smoothSpring, delay: 0.4 }}
                className="mt-10 flex justify-center space-x-6"
            >
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                    <motion.a
                        key={link.label}
                        href={link.href}
                        variants={iconHover}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        style={{
                          color: "var(--warm)"
                        }}
                        aria-label={link.label}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                      <motion.div whileHover={{ color: "var(--primary)" }} transition={smoothSpring}>
                        <Icon className="h-6 w-6" />
                      </motion.div>
                    </motion.a>
                )
              })}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...smoothSpring, delay: 0.8 }}
                className="mt-16"
            >
              <motion.a
                  href="#about"
                  className="inline-flex items-center"
                  whileHover={{ color: "var(--primary)" }}
                  transition={smoothSpring}
                  style={{
                    color: "var(--foreground)"
                  }}
                  aria-label="Scroll to about section"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowDown className="h-5 w-5" />
                </motion.div>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
  )
}