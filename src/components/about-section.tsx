"use client"

import { motion } from "framer-motion"
import { Code, Database, Globe, Smartphone } from "lucide-react"

export function AboutSection() {
  const skills = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "React, Next.js, TypeScript, Tailwind CSS",
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Node.js, Python, PostgreSQL, MongoDB",
    },
    {
      icon: Globe,
      title: "Web Technologies",
      description: "REST APIs, GraphQL, WebSockets, Docker",
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "React Native, Flutter, Progressive Web Apps",
    },
  ]

  return (
    <section id="about" className="py-24 bg-stone-gradient dark:bg-dark-warm-gradient">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-display font-bold tracking-tight text-foreground sm:text-4xl text-shadow">
            About Me
          </h2>
          <p className="mt-4 text-lg text-stone-600 dark:text-stone-300 font-body">
            Passionate developer with a love for creating innovative solutions
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-bold text-foreground mb-6">
              My Journey
            </h3>
            <div className="space-y-4 text-stone-600 dark:text-stone-300 font-body">
              <p>
                I&apos;m a passionate full-stack developer with over 5 years of experience 
                creating web applications and digital solutions. My journey began with 
                a curiosity about how websites work, which evolved into a deep love for 
                coding and problem-solving.
              </p>
              <p>
                I specialize in modern JavaScript frameworks, particularly React and 
                Next.js, and I&apos;m always exploring new technologies to stay current with 
                industry trends. I believe in writing clean, maintainable code and 
                creating user experiences that are both beautiful and functional.
              </p>
              <p>
                When I&apos;m not coding, you can find me contributing to open-source projects, 
                writing technical articles, or exploring the latest developments in 
                artificial intelligence and machine learning.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="p-6 bg-warm-50 dark:bg-stone-800 rounded-lg hover:shadow-lg transition-shadow border border-stone-200/50 dark:border-stone-700/50"
                >
                  <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-4" />
                  <h4 className="text-lg font-semibold font-body text-foreground mb-2">
                    {skill.title}
                  </h4>
                  <p className="text-sm text-stone-600 dark:text-stone-300 font-body">
                    {skill.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
