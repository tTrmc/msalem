"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      image: "/api/placeholder/600/400",
      techStack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.example.com",
      featured: true,
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team collaboration features.",
      image: "/api/placeholder/600/400",
      techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.example.com",
      featured: true,
    },
    {
      title: "Weather Dashboard",
      description: "A beautiful weather dashboard with location-based forecasts and interactive maps.",
      image: "/api/placeholder/600/400",
      techStack: ["Vue.js", "OpenWeather API", "Chart.js", "CSS3"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.example.com",
      featured: false,
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website built with modern web technologies and optimized for performance.",
      image: "/api/placeholder/600/400",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com",
      demoUrl: "https://demo.example.com",
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
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl text-shadow" style={{ color: "var(--foreground)" }}>
              Featured Projects
            </h2>
            <p className="mt-4 text-lg font-body" style={{ color: "var(--stone)" }}>
              A showcase of my recent work and side projects
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
                      backgroundColor: "var(--accent)",
                      border: "1px solid var(--stone)",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center" style={{
                      backgroundImage: "linear-gradient(to bottom right, var(--primary), var(--accent))"
                    }}>
                      <span className="text-white font-semibold text-lg font-body">Project Image</span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold mb-2" style={{ color: "var(--foreground)" }}>
                      {project.title}
                    </h3>
                    <p className="mb-4 font-body" style={{ color: "var(--stone)" }}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech) => (
                          <span
                              key={tech}
                              className="px-3 py-1 text-xs font-medium font-body rounded-full"
                              style={{
                                backgroundColor: "var(--primary)",
                                color: "var(--background)",
                                opacity: 0.9
                              }}
                          >
                      {tech}
                    </span>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium font-body rounded-md transition-colors"
                          style={{
                            backgroundColor: "var(--stone)",
                            color: "var(--background)"
                          }}
                          onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                      <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium font-body rounded-md transition-colors"
                          style={{
                            backgroundColor: "var(--primary)",
                            color: "var(--background)"
                          }}
                          onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </div>
                  </div>
                </motion.div>
            ))}
          </div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-12"
          >
            <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 text-sm font-medium font-body rounded-md transition-colors"
                style={{
                  backgroundColor: "var(--background)",
                  color: "var(--stone)",
                  border: "1px solid var(--stone)"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--accent)";
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--background)";
                  e.currentTarget.style.opacity = "1";
                }}
            >
              <Github className="w-4 h-4 mr-2" />
              View More on GitHub
            </a>
          </motion.div>
        </div>
      </section>
  )
}