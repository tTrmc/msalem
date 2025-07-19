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
      <section id="hero" className="min-h-screen flex items-center justify-center bg-warm-gradient dark:bg-dark-warm-gradient relative overflow-hidden">
        <ASCIIBackground />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-display font-bold tracking-tight text-foreground sm:text-6xl text-shadow">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 font-bold bg-clip-text">
                Moustafa Salem
              </span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="mt-6 text-lg leading-8 text-stone-600 dark:text-stone-300 sm:text-xl font-body">
              Full Stack Developer & Software Engineer
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="mt-4 text-base text-stone-500 dark:text-stone-400 max-w-2xl mx-auto font-body">
              I create exceptional digital experiences through clean code and innovative solutions.
              Passionate about modern web technologies and building products that make a difference.
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
              className="rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors font-body"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-body"
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
                  className="text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
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
              className="inline-flex items-center text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
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
