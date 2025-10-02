export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>
  title: string
  value: string
  href: string
}

export interface SocialLink {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}

export interface Skill {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export interface Project {
  title: string
  description: string
  image: string
  techStack: string[]
  githubUrl?: string
  demoUrl?: string
  featured: boolean
}

export interface NavItem {
  href: string
  label: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export interface FormValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface MotionVariants {
  initial: Record<string, unknown>
  animate: Record<string, unknown>
  transition?: Record<string, unknown>
}

export interface Experience {
  title: string
  organization: string
  location: string
  period: string
  description: string[]
  technologies?: string[]
  type: 'work' | 'education'
  current?: boolean
}