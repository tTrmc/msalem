"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ExternalLink, Github, Star } from "lucide-react"
import Image from "next/image"
import { Project } from "@/types/common"
import { projectCardHover, smoothSpring } from "@/lib/animations"
import { NierPanel } from "@/components/ui/nier-panel"

const blurPlaceholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion()

  const projects: Project[] = [
    {
      title: "Octavia",
      description: "Offline-first Android music player engineered for high-fidelity audio playback.",
      image: "/images/projects/player.webp",
      techStack: ["Kotlin", "Jetpack Compose", "Media3 Exoplayer", "Room"],
      githubUrl: "https://github.com/tTrmc/Octavia",
      demoUrl: "",
      featured: true,
    },
    {
      title: "VRSN CTRL",
      description: "Puzzle platformer for the 2025 GMTK Game Jam",
      image: "/images/projects/vrsnctrl.png",
      techStack: ["Unity 6", "C#", "Unity Input System", "ScriptableObjects"],
      githubUrl: "",
      demoUrl: "https://doomaa.itch.io/version-control",
      featured: true,
    },
    {
      title: "dotz",
      description: "A fully featured dotfiles manager for Linux, backed by Git.",
      image: "",
      techStack: ["Python", "Typer", "PySide6", "Poetry", "pytest"],
      githubUrl: "https://github.com/tTrmc/dotz",
      featured: false,
    },
    {
      title: "Personal Website",
      description: "A modern, responsive portfolio website showcasing my projects and skills.",
      image: "",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/tTrmc/msalem",
      demoUrl: "",
      featured: false,
    },
  ]

  return (
    <section
      id="projects"
      className="py-24 crt-scanlines"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <NierPanel
          heading="Archive :: Projects"
          subtitle="LOG 04 // BUILD REGISTER"
          className="nier-panel--no-axis"
        >
          <motion.div
            className="text-center"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            {...(!prefersReducedMotion
              ? { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: smoothSpring }
              : {})}
          >
            <h2 className="text-3xl font-display tracking-tight sm:text-4xl text-shadow" style={{ color: "var(--primary)" }}>
              Featured Projects
            </h2>
            <p className="mt-4 text-lg font-body" style={{ color: "var(--foreground)" }}>
              A selection of my recent work and side projects
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {projects.map((project, index) => {
              const revealMotion = prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 20 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: { ...smoothSpring, delay: index * 0.08 },
                    viewport: { once: true, margin: "0px 0px -80px 0px" },
                  }

              const headerSubtitle = project.techStack.length
                ? `STACK // ${project.techStack.slice(0, 3).join(" • ")}`
                : undefined

              return (
                <motion.div
                  key={project.title}
                  variants={projectCardHover}
                  initial="rest"
                  whileHover="hover"
                  className="h-full"
                  {...revealMotion}
                >
                  <NierPanel
                    heading={project.title.toUpperCase()}
                    subtitle={headerSubtitle}
                    actions={
                      project.featured ? (
                        <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] text-[var(--primary)]">
                          <Star className="h-4 w-4 fill-current" />
                          PRIORITY
                        </span>
                      ) : (
                        <span className="text-xs tracking-[0.3em] text-[var(--stone)]">ARCHIVE</span>
                      )
                    }
                    variant="muted"
                    compact
                    className="group relative h-full overflow-hidden"
                  >
                    <ProjectMedia project={project} />

                    <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                      <div>
                        <p className="text-sm font-body leading-relaxed text-[var(--foreground)]">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-[var(--stone)]">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 border border-[var(--panel-border)] bg-[var(--panel-surface)]/70 font-body"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-body tracking-[0.18em] text-[var(--primary)]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={smoothSpring}
                            aria-label={`View ${project.title} on GitHub`}
                          >
                            <Github className="h-4 w-4" />
                            GITHUB
                          </motion.a>
                        )}
                        {project.demoUrl && (
                          <motion.a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-body tracking-[0.18em] text-[var(--stone)] hover:text-[var(--primary)]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={smoothSpring}
                            aria-label={`Open ${project.title} demo`}
                          >
                            <ExternalLink className="h-4 w-4" />
                            DEMO
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </NierPanel>
                </motion.div>
              )
            })}
          </div>
        </NierPanel>
      </div>
    </section>
  )
}

function ProjectMedia({ project }: { project: Project }) {
  if (!project.image) {
    return (
      <div className="relative mb-8 h-48 overflow-hidden rounded-md border border-[var(--panel-border)] bg-[var(--panel-surface-muted)]">
        <div className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(207,196,149,0.3) 0%, rgba(132,122,89,0.1) 45%, rgba(64,54,41,0.25) 100%)",
          }}
        />
        <div className="absolute inset-0 mix-blend-multiply"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(0,0,0,0.08) 6px, rgba(0,0,0,0.08) 8px)",
          }}
        />
      </div>
    )
  }

  return (
    <div className="relative mb-8 h-48 overflow-hidden rounded-md border border-[var(--panel-border)] bg-black/40">
      <Image
        src={project.image}
        alt={`${project.title} project screenshot`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-center opacity-80 transition-transform duration-300 group-hover:scale-105"
        placeholder="blur"
        blurDataURL={blurPlaceholder}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
    </div>
  )
}
