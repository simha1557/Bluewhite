import { createClient } from '@supabase/supabase-js'

// Environment validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseServiceKey)
}

// Client-side Supabase client (for public operations)
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)

// Server-side Supabase client with service role (for admin operations)
export const createServerSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured - database operations will be skipped')
    return null
  }

  return createClient(
    supabaseUrl!,
    supabaseServiceKey!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

// Safe database operations with error handling
export const safeSupabaseOperation = async <T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<T> => {
  try {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - skipping database operation')
      return fallback
    }
    
    return await operation()
  } catch (error) {
    console.error('Supabase operation failed:', error)
    return fallback
  }
}

// Contact form specific operations
export const insertContact = async (contactData: {
  name: string
  email: string
  company?: string
  message: string
  ip_address?: string
  user_agent?: string
}) => {
  const supabase = createServerSupabaseClient()
  
  if (!supabase) {
    console.warn('Supabase not available - contact not saved to database')
    return { data: null, error: null }
  }

  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert(contactData)
      .select()
      .single()

    if (error) {
      console.error('Database insert error:', error)
      return { data: null, error }
    }

    console.log('✅ Contact saved to database:', data?.id)
    return { data, error: null }
  } catch (error) {
    console.error('Database operation failed:', error)
    return { data: null, error }
  }
}

// Get contacts (for admin dashboard - future use)
export const getContacts = async () => {
  const supabase = createServerSupabaseClient()
  
  if (!supabase) {
    console.warn('Supabase not available - cannot fetch contacts')
    return { data: null, error: null }
  }

  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database fetch error:', error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error) {
    console.error('Database operation failed:', error)
    return { data: null, error }
  }
} 