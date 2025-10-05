"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react"
import { Experience } from "@/types/common"
import { cardHover, smoothSpring } from "@/lib/animations"

export function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion()

  const experiences: Experience[] = [
    {
      title: "Computer Science Student",
      organization: "Queen's University",
      location: "Kingston, ON",
      period: "2024 - Present",
      description: [
        "Studying Operating Systems, Algorithms, Software QA, and Functional Programming",
        "Building projects with modern technologies including Next.js, React, TypeScript, and Python",
        "Developing systems-level programming skills in C and Rust",
      ],
      technologies: ["C", "Rust", "Python", "TypeScript", "Linux"],
      type: "education",
      current: true,
    },
    {
      title: "Undergraduate Teaching Assistant",
      organization: "Queen's University",
      location: "Kingston, ON",
      period: "2025 - Present",
      description: [
        "Support 150+ students through weekly office hours covering assembly programming, CPU design, and memory hierarchy",
        "Grade assignments and exams with detailed feedback on x86 assembly implementations",
        "Collaborate with instructors to identify student challenges and improve course materials",
      ],
      technologies: ["x86 Assembly", "Computer Architecture", "C", "CPU Design"],
      type: "work",
      current: true,
    },
  ]

  return (
    <section id="experience" className="py-24" style={{ backgroundColor: "var(--background)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center"
          viewport={{ once: true }}
          {...(!prefersReducedMotion
            ? { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: smoothSpring }
            : {})}
        >
          <h2 className="text-3xl font-display tracking-tight sm:text-4xl text-shadow" style={{ color: "var(--primary)" }}>
            Experience
          </h2>
          <p className="mt-4 text-lg font-body" style={{ color: "var(--foreground)" }}>
            My journey in software development and education
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mt-16 relative">
          {/* Vertical Line - Hidden on mobile */}
          <div
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5"
            style={{ backgroundColor: "var(--warm)" }}
          />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const Icon = exp.type === 'work' ? Briefcase : GraduationCap
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={`${exp.organization}-${index}`}
                  className="relative"
                  viewport={{ once: true }}
                  {...(!prefersReducedMotion
                    ? { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { ...smoothSpring, delay: index * 0.2 } }
                    : {})}
                >
                  {/* Desktop Layout - Alternating */}
                  <div className={`hidden md:grid md:grid-cols-2 gap-8 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                    {/* Left Side Content (or empty) */}
                    <div className={isEven ? 'text-right pr-8' : ''}>
                      {isEven && (
                        <ExperienceCard experience={exp} align="right" />
                      )}
                    </div>

                    {/* Right Side Content (or empty) */}
                    <div className={!isEven ? 'pl-8' : ''}>
                      {!isEven && (
                        <ExperienceCard experience={exp} align="left" />
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout - Stacked */}
                  <div className="md:hidden pl-12">
                    <ExperienceCard experience={exp} align="left" />
                  </div>

                  {/* Timeline Dot - Desktop (centered) */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={smoothSpring}
                      style={{
                        backgroundColor: "var(--primary)",
                        border: "3px solid var(--background)",
                        boxShadow: "0 0 0 4px var(--warm)",
                      }}
                    >
                      <Icon className="h-6 w-6" style={{ color: "var(--background)" }} />
                    </motion.div>
                  </div>

                  {/* Timeline Dot - Mobile (left side) */}
                  <div className="md:hidden absolute left-0 top-6">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--primary)",
                        border: "2px solid var(--background)",
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "var(--background)" }} />
                    </div>
                  </div>

                  {/* Connecting Line for Mobile */}
                  {index < experiences.length - 1 && (
                    <div
                      className="md:hidden absolute left-5 top-16 w-0.5 h-12"
                      style={{ backgroundColor: "var(--warm)" }}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// Experience Card Component
function ExperienceCard({ experience, align }: { experience: Experience; align: 'left' | 'right' }) {
  return (
    <motion.div
      className={`rounded-xl p-6 ${align === 'right' ? 'text-right' : ''}`}
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      style={{
        backgroundColor: "var(--accent)",
        border: "1px solid var(--warm)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold font-display mb-2" style={{ color: "var(--primary)" }}>
          {experience.title}
          {experience.current && (
            <span
              className="ml-2 text-xs px-2 py-1 rounded-full font-body"
              style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
            >
              Current
            </span>
          )}
        </h3>
        <p className="text-lg font-semibold font-body mb-2" style={{ color: "var(--foreground)" }}>
          {experience.organization}
        </p>
        <div className="flex items-center gap-4 text-sm font-body" style={{ color: "var(--warm)" }}>
          <div className={`flex items-center gap-1 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
            <MapPin className="h-4 w-4" />
            <span>{experience.location}</span>
          </div>
          <div className={`flex items-center gap-1 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
            <Calendar className="h-4 w-4" />
            <span>{experience.period}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <ul className={`space-y-2 mb-4 ${align === 'right' ? 'text-right' : ''}`}>
        {experience.description.map((item, idx) => (
          <li key={idx} className="text-sm font-body leading-relaxed" style={{ color: "var(--foreground)" }}>
            <span className={align === 'right' ? 'inline-block' : ''}>
              {align === 'left' && '• '}
              {item}
              {align === 'right' && ' •'}
            </span>
          </li>
        ))}
      </ul>

      {/* Technologies */}
      {experience.technologies && experience.technologies.length > 0 && (
        <div className={`flex flex-wrap gap-2 ${align === 'right' ? 'justify-end' : ''}`}>
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full font-body font-medium"
              style={{
                backgroundColor: "var(--warm)",
                color: "var(--foreground)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}
