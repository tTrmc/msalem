"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ExternalLink, Github, Star } from "lucide-react"
import Image from "next/image"
import { Project } from "@/types/common"
import { projectCardHover, smoothSpring } from "@/lib/animations"

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion()
  const blurPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='

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
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
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

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-fr">
          {projects.map((project, index) => {
            const revealMotion = prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { ...smoothSpring, delay: index * 0.1 },
                }
            // Define grid spans for bento layout
            let gridClass = ""
            if (index === 0) {
              gridClass = "md:col-span-2 md:row-span-2" // Large featured
            } else if (index === 1) {
              gridClass = "md:col-span-2 lg:col-span-2 md:row-span-1" // Wide
            } else if (index === 2) {
              gridClass = "md:col-span-1 md:row-span-1" // Regular
            } else {
              gridClass = "md:col-span-1 md:row-span-1" // Regular
            }

            return (
              <motion.article
                key={project.title}
                variants={projectCardHover}
                whileHover="hover"
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                className={`group relative rounded-2xl overflow-hidden ${gridClass} min-h-[300px] lg:min-h-[400px]`}
                style={{
                  backgroundColor: "var(--accent)",
                  willChange: "transform",
                  transform: "translateZ(0)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                }}
                {...revealMotion}
              >
                {/* Background Image or Gradient */}
                <div className="absolute inset-0">
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={`${project.title} project screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL={blurPlaceholder}
                        loading="lazy"
                      />
                      {/* Dark overlay for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/80 group-hover:via-black/40 group-hover:to-black/20 transition-opacity duration-300" />
                    </>
                  ) : (
                    /* Gradient background for projects without images */
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, var(--primary) 0%, var(--warm) 50%, var(--accent) 100%)`,
                      }}
                    />
                  )}
                </div>

                {/* Content Overlay */}
                <div className="relative h-full flex flex-col justify-between p-6 lg:p-8">
                  {/* Top Section - Featured Badge */}
                  <div className="flex items-start justify-between">
                    {project.featured && (
                      <div
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold font-body"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "var(--background)",
                        }}
                      >
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </div>
                    )}

                    {/* Action Icons */}
                    <div className="flex gap-2 ml-auto">
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full transition-transform duration-200"
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          transition={smoothSpring}
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            color: "var(--foreground)",
                          }}
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <Github className="h-5 w-5" />
                        </motion.a>
                      )}
                      {project.demoUrl && (
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full transition-transform duration-200"
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          transition={smoothSpring}
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            color: "var(--foreground)",
                          }}
                          aria-label={`View ${project.title} live demo`}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Bottom Section - Title, Description, Tech Stack */}
                  <div className="space-y-4">
                    {/* Title */}
                    <h3
                      className={`font-display font-bold text-white ${
                        index === 0 ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'
                      }`}
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`font-body text-gray-200 leading-relaxed ${
                        index === 0 ? 'text-base lg:text-lg' : 'text-sm lg:text-base'
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, index === 0 ? 5 : 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 rounded-full font-body font-medium"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            color: "white",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > (index === 0 ? 5 : 3) && (
                        <span
                          className="text-xs px-3 py-1 rounded-full font-body font-medium"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            color: "white",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                          }}
                        >
                          +{project.techStack.length - (index === 0 ? 5 : 3)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Accent Border on Hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    border: "2px solid var(--primary)",
                  }}
                />
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
