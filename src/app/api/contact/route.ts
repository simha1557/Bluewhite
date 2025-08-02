import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiting (for demo purposes)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(ip: string): string {
  return `rate_limit:${ip}`
}

function isRateLimited(ip: string): boolean {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetTime) {
    // Reset or create new record (1 hour window)
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + (60 * 60 * 1000) // 1 hour
    })
    return false
  }

  if (record.count >= 5) { // Max 5 submissions per hour
    return true
  }

  // Increment count
  record.count++
  return false
}

function getClientIP(request: NextRequest): string {
  // Try different headers for IP address
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const remoteAddress = request.headers.get('x-vercel-forwarded-for')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  return realIP || remoteAddress || '127.0.0.1'
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request)

    // Check rate limiting
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many submissions. Please try again later.' 
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { name, email, company, message } = body

    // Simple validation
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, email, and message are required'
        },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format'
        },
        { status: 400 }
      )
    }

    // Log the submission (for debugging)
    console.log('📧 Contact Form Submission:', {
      name,
      email,
      company: company || 'Not provided',
      message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
      ip: clientIP,
      timestamp: new Date().toISOString()
    })

    // For now, just return success (no email sending or database storage)
    // In production, you can add email service or database integration here
    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      submittedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}