"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react"
import { Experience } from "@/types/common"
import { cardHover, smoothSpring } from "@/lib/animations"
import { NierPanel } from "@/components/ui/nier-panel"

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
    <section
      id="experience"
      className="py-24"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <NierPanel
          heading="Archive :: Deployments"
          subtitle="LOG 03 // EXPERIENCE FEED"
          className="nier-panel--no-axis"
        >
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

          <div className="mt-16 relative">
            <div className="hidden md:block absolute left-1/2 h-full w-px -translate-x-1/2 bg-[var(--panel-line)]" aria-hidden />

            <div className="space-y-12">
              {experiences.map((exp, index) => {
                const Icon = exp.type === "work" ? Briefcase : GraduationCap
                const isEven = index % 2 === 0

                return (
                  <motion.div
                    key={`${exp.organization}-${index}`}
                    className="relative"
                    viewport={{ once: true }}
                    {...(!prefersReducedMotion
                      ? {
                          initial: { opacity: 0, y: 20 },
                          whileInView: { opacity: 1, y: 0 },
                          transition: { ...smoothSpring, delay: index * 0.1 },
                        }
                      : {})}
                  >
                    <div className={`hidden md:grid md:grid-cols-2 gap-10 ${isEven ? "" : "md:flex-row-reverse"}`}>
                      <div className={isEven ? "pr-8" : ""}>
                        {isEven && <ExperienceCard experience={exp} align="right" />}
                      </div>
                      <div className={!isEven ? "pl-8" : ""}>
                        {!isEven && <ExperienceCard experience={exp} align="left" />}
                      </div>
                    </div>

                    <div className="md:hidden pl-12">
                      <ExperienceCard experience={exp} align="left" />
                    </div>

                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--panel-border)] bg-[var(--panel-surface-muted)] shadow-lg"
                        whileHover={{ scale: 1.06 }}
                        transition={smoothSpring}
                      >
                        <Icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                      </motion.div>
                    </div>

                    <div className="md:hidden absolute left-0 top-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--panel-border)] bg-[var(--panel-surface-muted)]">
                        <Icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                      </div>
                    </div>

                    {index < experiences.length - 1 && (
                      <div className="md:hidden absolute left-5 top-16 h-12 w-px bg-[var(--panel-line)]" aria-hidden />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </NierPanel>
      </div>
    </section>
  )
}

function ExperienceCard({ experience, align }: { experience: Experience; align: "left" | "right" }) {
  return (
    <motion.div variants={cardHover} initial="rest" whileHover="hover" className="h-full">
      <NierPanel
        heading={experience.organization.toUpperCase()}
        subtitle={experience.period}
        actions={
          <span className="text-xs tracking-[0.25em] text-[var(--stone)]">
            {experience.current ? "STATUS :: ACTIVE" : "STATUS :: ARCHIVED"}
          </span>
        }
        variant="muted"
        compact
        className={`h-full ${align === "right" ? "text-right" : "text-left"}`}
      >
        <div className={`mb-4 ${align === "right" ? "md:text-right" : ""}`}>
          <h3 className="text-lg font-display uppercase tracking-[0.25em] text-[var(--primary)]">
            {experience.title}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm font-body" style={{ color: "var(--warm)" }}>
            <div className={`flex items-center gap-1 ${align === "right" ? "flex-row-reverse" : ""}`}>
              <MapPin className="h-4 w-4" />
              <span>{experience.location}</span>
            </div>
            <div className={`flex items-center gap-1 ${align === "right" ? "flex-row-reverse" : ""}`}>
              <Calendar className="h-4 w-4" />
              <span>{experience.period}</span>
            </div>
          </div>
        </div>

        <ul className={`space-y-2 mb-6 text-sm font-body leading-relaxed ${align === "right" ? "text-right" : ""}`}>
          {experience.description.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              {align === "left" && <span aria-hidden className="mt-2 block h-px w-6 bg-[var(--panel-line)]" />}
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {experience.technologies?.length ? (
          <div className={`flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] ${align === "right" ? "justify-end" : ""}`}>
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 border border-[var(--panel-border)] bg-[var(--panel-surface)]/70 font-body"
                style={{ color: "var(--stone)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        ) : null}
      </NierPanel>
    </motion.div>
  )
}
