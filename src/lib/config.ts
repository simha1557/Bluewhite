// Configuration constants for the contact form system

export const CONFIG = {
  // Rate limiting
  RATE_LIMIT: {
    MAX_SUBMISSIONS_PER_HOUR: 3,
    WINDOW_MS: 60 * 60 * 1000, // 1 hour in milliseconds
  },
  
  // Email configuration
  EMAIL: {
    TO: process.env.CONTACT_EMAIL_TO || 'agency@yourcompany.com',
    FROM: process.env.CONTACT_EMAIL_FROM || 'noreply@yourcompany.com',
    SUBJECT: 'New Contact Form Submission',
  },
  
  // Form configuration
  FORM: {
    MAX_MESSAGE_LENGTH: 2000,
    MIN_MESSAGE_LENGTH: 10,
    MAX_NAME_LENGTH: 100,
    MIN_NAME_LENGTH: 2,
  },
} as const

// Environment validation
export const validateEnvironment = () => {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'RESEND_API_KEY',
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}