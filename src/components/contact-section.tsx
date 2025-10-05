"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"
import React, { useState } from "react"
import { handleApiRequest, validateContactForm } from "@/lib/api-utils"
import toast from "react-hot-toast"
import { buttonHover, smoothSpring } from "@/lib/animations"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const prefersReducedMotion = useReducedMotion()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Client-side validation
    const validationError = validateContactForm(formData)
    if (validationError) {
      toast.error(validationError)
      setIsSubmitting(false)
      return
    }

    const loadingToast = toast.loading("Sending message...")

    try {
      const result = await handleApiRequest('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      toast.dismiss(loadingToast)

      if (result.success) {
        setFormData({ name: "", email: "", subject: "", message: "" })
        toast.success("Thank you for your message! I'll get back to you soon.")
      } else {
        toast.error(result.error || "Something went wrong. Please try again.")
      }
    } catch {
      toast.dismiss(loadingToast)
      toast.error("Failed to send message. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
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
      href: "tel:+14376065735",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Kingston, ON",
      href: "#",
    },
  ]

  return (
      <section
        id="contact"
        className="py-24 crt-scanlines"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
              className="text-center"
              viewport={{ once: true }}
              {...(!prefersReducedMotion
                ? { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: smoothSpring }
                : {})}
          >
            <h2 className="text-3xl font-display tracking-tight sm:text-4xl text-shadow" style={{ color: "var(--primary)" }}>
              Get In Touch
            </h2>
            <p className="mt-4 text-lg font-body" style={{ color: "var(--foreground)" }}>
              Have a project in mind? Let&apos;s work together.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
                viewport={{ once: true }}
                {...(!prefersReducedMotion
                  ? { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, transition: { ...smoothSpring, delay: 0.1 } }
                  : {})}
            >
              <h3 className="text-2xl font-display mb-6" style={{ color: "var(--primary)" }}>
                Let&apos;s talk about your project
              </h3>
              <p className="mb-8 font-body" style={{ color: "var(--foreground)" }}>
                I&apos;m always interested in hearing about new opportunities and exciting projects.
                Whether you have a question or just want to say hello, I&apos;ll get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                      <motion.div
                          key={info.title}
                          className="flex items-center"
                          viewport={{ once: true }}
                          {...(!prefersReducedMotion
                            ? { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { ...smoothSpring, delay: 0.1 * index } }
                            : {})}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: "var(--primary)" }}>
                          <Icon className="h-5 w-5" style={{ color: "var(--background)" }} />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium font-body" style={{ color: "var(--primary)" }}>
                            {info.title}
                          </p>
                          {info.href !== "#" ? (
                              <motion.a
                                  href={info.href}
                                  className="text-sm font-body"
                                  whileHover={{ color: "var(--primary)" }}
                                  transition={smoothSpring}
                                  style={{ color: "var(--stone)" }}
                              >
                                {info.value}
                              </motion.a>
                          ) : (
                              <p className="text-sm font-body" style={{ color: "var(--foreground)" }}>
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
                viewport={{ once: true }}
                {...(!prefersReducedMotion
                  ? { initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 }, transition: { ...smoothSpring, delay: 0.2 } }
                  : {})}
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
                        className="mt-1 block w-full rounded-md shadow-sm font-body focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        style={{
                          backgroundColor: "var(--warm)",
                          color: "var(--foreground)",
                          border: "1px solid var(--stone)",
                          padding: "0.5rem 0.75rem"
                        }}
                        aria-describedby="name-help"
                    />
                    <p id="name-help" className="sr-only">Name is required and must be at least 2 characters.</p>
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
                        className="mt-1 block w-full rounded-md shadow-sm font-body focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        style={{
                          backgroundColor: "var(--warm)",
                          color: "var(--foreground)",
                          border: "1px solid var(--stone)",
                          padding: "0.5rem 0.75rem"
                        }}
                        aria-describedby="email-help"
                    />
                    <p id="email-help" className="sr-only">Use a valid email address so I can respond.</p>
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
                      className="mt-1 block w-full rounded-md shadow-sm font-body focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      style={{
                        backgroundColor: "var(--warm)",
                        color: "var(--foreground)",
                        border: "1px solid var(--stone)",
                        padding: "0.5rem 0.75rem"
                      }}
                      aria-describedby="subject-help"
                  />
                  <p id="subject-help" className="sr-only">Include a brief subject (minimum 5 characters).</p>
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
                      className="mt-1 block w-full rounded-md shadow-sm font-body focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      style={{
                        backgroundColor: "var(--warm)",
                        color: "var(--foreground)",
                        border: "1px solid var(--stone)",
                        padding: "0.5rem 0.75rem"
                      }}
                      aria-describedby="message-help"
                  />
                  <p id="message-help" className="sr-only">Share at least 10 characters so I understand your request.</p>
                </div>

                <div>
                  <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      variants={buttonHover}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium font-body disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "var(--background)"
                      }}
                      aria-describedby="submit-help"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <motion.svg
                          animate={{
                            rotate: 360,
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="-ml-1 mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </motion.svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                  <p id="submit-help" className="sr-only">Submit the form once all required fields are complete.</p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
  )
}
