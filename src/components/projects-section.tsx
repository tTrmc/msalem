"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { Project } from "@/types/common"

export function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "dotz",
      description: "A fully featured dotfiles manager for Linux, backed by Git.",
      image: "/images/projects/dotz.png",
      techStack: ["Python", "Typer", "PySide6", "Poetry", "pytest"],
      githubUrl: "https://github.com/tTrmc/dotz",
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
      title: "Octavia",
      description: "Offline-first Android music player engineered for high-fidelity audio playback.",
      image: "/images/projects/weather.jpg",
      techStack: ["Kotlin", "Jetpack Compose", "Media3 Exoplayer", "Room"],
      githubUrl: "https://github.com/tTrmc/Octavia",
      demoUrl: "",
      featured: false,
    },
    {
      title: "Personal Website",
      description: "A modern, responsive portfolio website showcasing my projects and skills.",
      image: "/images/projects/portfolio.jpg",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/tTrmc/msalem",
      demoUrl: "",
      featured: false,
    },
  ]

  return (
    <section id="projects" className="py-24" style={{ backgroundColor: "var(--background)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-display tracking-tight sm:text-4xl text-shadow" style={{ color: "var(--primary)" }}>
            Featured Projects
          </h2>
          <p className="mt-4 text-lg font-body" style={{ color: "var(--foreground)" }}>
            A selection of my recent work and side projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-xl overflow-hidden transition-[transform,box-shadow] duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01]"
              style={{
                backgroundColor: "var(--accent)",
                border: "1px solid var(--warm)",
              }}
            >
              {/* Project Image */}
              <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--warm)]">
                <Image
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority={index < 2}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              </div>

              {/* Project Content */}
              <div className="p-6" style={{ backgroundColor: "var(--primary)" }}>
                {/* Title */}
                <h3 className="text-2xl font-bold font-display mb-3" style={{ color: "var(--background)" }}>
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm mb-4 font-body leading-relaxed" style={{ color: "var(--background)" }}>
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.techStack.map((tech) => (
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

                {/* Links */}
                <div className="flex items-center gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold font-body transition-colors"
                      style={{ color: "var(--background)" }}
                      onMouseOver={(e) => e.currentTarget.style.color = "var(--warm)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "var(--background)"}
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github className="h-5 w-5" />
                      <span>View Code</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold font-body transition-colors"
                      style={{ color: "var(--background)" }}
                      onMouseOver={(e) => e.currentTarget.style.color = "var(--warm)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "var(--background)"}
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
