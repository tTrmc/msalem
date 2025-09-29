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
      image: "/images/projects/taskmanager.jpg", // You'll need to add these images
      techStack: ["Unity 6", "C#", "Unity Input System", "ScriptableObjects"],
      githubUrl: "",
      demoUrl: "https://doomaa.itch.io/version-control",
      featured: true,
    },
    {
      title: "Octavia",
      description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/images/projects/weather.jpg", // You'll need to add these images
      techStack: ["Vue.js", "OpenWeather API", "Chart.js", "CSS3"],
      githubUrl: "https://github.com/tTrmc/weather-dashboard",
      demoUrl: "",
      featured: false,
    },
    {
      title: "Personal Website",
      description: "Adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.",
      image: "/images/projects/portfolio.jpg", // You'll need to add these images
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/tTrmc/msalem",
      demoUrl: "",
      featured: false,
    },
  ]

  return (
    <section id="projects" className="py-24" style={{ backgroundColor: "var(--background)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            Lorem ipsum dolor sit amet consectetur adipiscing
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className={`group relative rounded-xl overflow-hidden hover:shadow-xl transition-shadow ${
                project.featured ? "lg:col-span-1" : ""
              }`}
              style={{
                backgroundColor: "var(--primary)",
                border: "1px solid var(--warm)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    if (target && target.parentElement) {
                      target.parentElement.style.backgroundImage =
                        'linear-gradient(to bottom right, var(--primary), var(--accent))';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 font-display" style={{ color: "var(--background)" }}>
                  {project.title}
                </h3>
                <p className="text-sm mb-4 font-body" style={{ color: "var(--background)" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded-full font-body"
                      style={{
                        backgroundColor: "var(--warm)",
                        color: "var(--foreground)"
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-sm font-medium transition-colors font-body"
                      style={{ color: "var(--foreground)" }}
                      onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "var(--foreground)"}
                    >
                      <Github className="h-4 w-4" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-sm font-medium transition-colors font-body"
                      style={{ color: "var(--foreground)" }}
                      onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "var(--foreground)"}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}