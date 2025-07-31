import { z } from 'zod'

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, apostrophes, and hyphens'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
})

// Type inference from schema
export type ContactFormData = z.infer<typeof contactFormSchema>

// API response types
export interface ContactSubmissionResponse {
  success: boolean
  message: string
  id?: string
  error?: string
  details?: Record<string, string[]>
}