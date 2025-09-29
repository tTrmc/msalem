"use client"

import { motion } from "framer-motion"
import { Code, Computer, Globe, Smartphone } from "lucide-react"

export function AboutSection() {
  const skills = [
    {
      icon: Code,
      title: "CLI Tools",
      description: "Building efficient and user-friendly command-line applications with Python and Rust",
    },
    {
      icon: Computer,
      title: "Creative Coding",
      description: "Game development with Unity and Godot",
    },
    {
      icon: Globe,
      title: "Web Technologies",
      description: "Creating responsive, accessible, and performant web experiences",
    },
    {
      icon: Smartphone,
      title: "Android Development",
      description: "Building native Android apps with Kotlin and Jetpack Compose",
    },
  ]

  return (
      <section id="about" className="py-24" style={{ backgroundColor: "var(--background)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
          >
            <h2 className="text-3xl font-display tracking-tight text-[var(--primary)] sm:text-4xl text-shadow">
              About Me
            </h2>
            <p className="mt-4 text-lg text-[var(--foreground)] font-body">
              Developer, musician, and creative technologist
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
            >
              <h3 className="text-2xl font-display text-[var(--primary)] mb-6">
                Hello and Welcome!
              </h3>
              <div className="space-y-4 text-xl text-[var(--foreground)] font-body">
                <p>
                  I&apos;m a passionate developer, musician and gamer. I love to create applications and
                    software that solve real-world issues I face, and I&apos;m always eager to learn new technologies
                    and improve my skills. I&apos;m a Computer Science student at Queen&apos;s University,
                    where I&apos;m currently studying Operating Systems, Algorithms, Software QA and Functional Programming.
                </p>
                <p>
                  Beyond high-level application development, I have a deep fascination with systems-level programming
                  in C and Rust. I enjoy diving into the low-level details of how software interacts with hardware,
                  and I spend considerable time tinkering with Linux, customizing everything from window managers
                  to kernel modules.
                </p>
                <p>
                    I&apos;m a multi-instrumentalist who plays guitar, bass, and keyboard,
                    with a deep love for synthesizers and sound design. Music and technology
                    are equally important to me – I spend my time creating, whether that&apos;s
                    composing, coding, or both.
                </p>
                <p>
                    Currently I&apos;m building my own VST plugin using JUCE and C++, and learning
                    shader programming for a game I&apos;m developing in Godot. I enjoy the challenge
                    of making games from scratch and composing their soundtracks myself.
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
                        className="p-6 rounded-lg hover:shadow-lg transition-shadow"
                        style={{
                          backgroundColor: "var(--primary)",
                          border: "1px solid var(--warm)",
                          opacity: 0.9
                        }}
                    >
                      <Icon className="h-8 w-8 mb-4" style={{ color: "var(--background)" }} />
                      <h4 className="text-lg font-semibold font-body mb-2" style={{ color: "var(--background)" }}>
                        {skill.title}
                      </h4>
                      <p className="text-sm font-body" style={{ color: "var(--background)" }}>
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