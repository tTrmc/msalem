"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"
import React, { useState } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Form submitted:", formData)
    alert("Thank you for your message! I'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "salemmoustafa442@gmail.com",
      href: "mailto:salemmoustafa442@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (437) 606-5735",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Kingston, ON",
      href: "#",
    },
  ]

  return (
      <section id="contact" className="py-24" style={{ backgroundColor: "var(--background)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
          >
            <h2 className="text-3xl font-display font-bold tracking-tight sm:text-4xl text-shadow" style={{ color: "var(--stone)" }}>
              Get In Touch
            </h2>
            <p className="mt-4 text-lg font-body" style={{ color: "var(--stone)" }}>
              Have a project in mind? Let&apos;s work together to bring your ideas to life.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
            >
              <h3 className="text-2xl font-display font-bold mb-6" style={{ color: "var(--foreground)" }}>
                Let&apos;s talk about your project
              </h3>
              <p className="mb-8 font-body" style={{ color: "var(--stone)" }}>
                I&apos;m always interested in hearing about new opportunities and exciting projects.
                Whether you have a question or just want to say hello, I&apos;ll get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                      <motion.div
                          key={info.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                          viewport={{ once: true }}
                          className="flex items-center"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: "var(--primary)" }}>
                          <Icon className="h-5 w-5" style={{ color: "var(--background)" }} />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium font-body" style={{ color: "var(--foreground)" }}>
                            {info.title}
                          </p>
                          {info.href !== "#" ? (
                              <a
                                  href={info.href}
                                  className="text-sm font-body transition-colors"
                                  style={{ color: "var(--stone)" }}
                                  onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"}
                                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--stone)"}
                              >
                                {info.value}
                              </a>
                          ) : (
                              <p className="text-sm font-body" style={{ color: "var(--stone)" }}>
                                {info.value}
                              </p>
                          )}
                        </div>
                      </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium font-body" style={{ color: "var(--stone)" }}>
                      Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md shadow-sm font-body"
                        style={{
                          backgroundColor: "var(--accent)",
                          color: "var(--foreground)",
                          border: "1px solid var(--stone)"
                        }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium font-body" style={{ color: "var(--stone)" }}>
                      Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md shadow-sm font-body"
                        style={{
                          backgroundColor: "var(--accent)",
                          color: "var(--foreground)",
                          border: "1px solid var(--stone)"
                        }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium font-body" style={{ color: "var(--stone)" }}>
                    Subject
                  </label>
                  <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md shadow-sm font-body"
                      style={{
                        backgroundColor: "var(--accent)",
                        color: "var(--foreground)",
                        border: "1px solid var(--stone)"
                      }}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium font-body" style={{ color: "var(--stone)" }}>
                    Message
                  </label>
                  <textarea
                      name="message"
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md shadow-sm font-body"
                      style={{
                        backgroundColor: "var(--accent)",
                        color: "var(--foreground)",
                        border: "1px solid var(--stone)"
                      }}
                  />
                </div>

                <div>
                  <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium font-body transition-colors"
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "var(--background)"
                      }}
                      onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
  )
}