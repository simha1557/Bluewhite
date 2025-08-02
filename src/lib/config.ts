// Configuration constants for the contact form system

export const CONFIG = {
  // Rate limiting
  RATE_LIMIT: {
    MAX_SUBMISSIONS_PER_HOUR: 5,
    WINDOW_MS: 60 * 60 * 1000, // 1 hour in milliseconds
  },
  
  // Form configuration
  FORM: {
    MAX_MESSAGE_LENGTH: 2000,
    MIN_MESSAGE_LENGTH: 10,
    MAX_NAME_LENGTH: 100,
    MIN_NAME_LENGTH: 2,
  },
} as const

// Environment validation (simplified - no external dependencies)
export const validateEnvironment = () => {
  // No external dependencies required for basic contact form
  console.log('✅ Environment validation passed - no external dependencies required')
  return true
}