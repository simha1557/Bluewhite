// Configuration constants for the contact form system

export const CONFIG = {
  // Rate limiting
  RATE_LIMIT: {
    MAX_SUBMISSIONS_PER_HOUR: 3,
    WINDOW_MS: 60 * 60 * 1000, // 1 hour in milliseconds
  },
  
  // Email configuration
  EMAIL: {
    FROM: process.env.RESEND_FROM_EMAIL || 'hellobackdesk@gmail.com',
    BCC: process.env.RESEND_BCC_EMAIL || 'pavansimha911@gmail.com',
    SUBJECT: 'Thank you for contacting BlueWhiteMedia',
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
    console.warn(`Missing environment variables: ${missing.join(', ')}. Contact form may not function properly.`)
    return false
  }
  return true
}