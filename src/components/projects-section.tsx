"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      image: "/images/projects/ecommerce.jpg", // You'll need to add these images
      techStack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com/tTrmc/ecommerce-platform",
      demoUrl: "https://ecommerce.msalem.dev",
      featured: true,
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team collaboration features.",
      image: "/images/projects/taskmanager.jpg", // You'll need to add these images
      techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
      githubUrl: "https://github.com/tTrmc/task-manager",
      demoUrl: "https://tasks.msalem.dev",
      featured: true,
    },
    {
      title: "Weather Dashboard",
      description: "A beautiful weather dashboard with location-based forecasts and interactive maps.",
      image: "/images/projects/weather.jpg", // You'll need to add these images
      techStack: ["Vue.js", "OpenWeather API", "Chart.js", "CSS3"],
      githubUrl: "https://github.com/tTrmc/weather-dashboard",
      demoUrl: "https://weather.msalem.dev",
      featured: false,
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website built with modern web technologies and optimized for performance.",
      image: "/images/projects/portfolio.jpg", // You'll need to add these images
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/tTrmc/msalem",
      demoUrl: "https://msalem.dev",
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
                <div 
                  className="w-full h-full flex items-center justify-center bg-cover bg-center" 
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, var(--primary), var(--accent))`
                  }}
                >
                  <span className="text-white font-semibold text-lg font-body">
                    {project.title}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 font-display" style={{ color: "var(--foreground)" }}>
                  {project.title}
                </h3>
                <p className="text-sm mb-4 font-body" style={{ color: "var(--stone)" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded-full font-body"
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "var(--background)"
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
                    className="flex items-center space-x-1 text-sm font-medium transition-colors font-body"
                    style={{ color: "var(--foreground)" }}
                    onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--foreground)"}
                  >
                    <Github className="h-4 w-4" />
                    <span>Code</span>
                  </a>
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}