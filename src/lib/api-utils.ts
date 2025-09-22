import { ApiResponse, ContactFormData } from "@/types/common"

export async function handleApiRequest<T>(
  url: string,
  options: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        data
      }
    } else {
      return {
        success: false,
        error: data.error || 'An error occurred'
      }
    }
  } catch {
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.'
    }
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateContactForm(data: ContactFormData): string | null {
  if (!data.name.trim()) return 'Name is required'
  if (!data.email.trim()) return 'Email is required'
  if (!validateEmail(data.email)) return 'Please enter a valid email address'
  if (!data.subject.trim()) return 'Subject is required'
  if (!data.message.trim()) return 'Message is required'
  
  if (data.name.length < 2) return 'Name must be at least 2 characters'
  if (data.subject.length < 5) return 'Subject must be at least 5 characters'
  if (data.message.length < 10) return 'Message must be at least 10 characters'
  
  return null
}
