import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema } from '@/lib/validations'
import { createServerSupabaseClient } from '@/lib/supabase'
import { CONFIG, validateEnvironment } from '@/lib/config'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limiting (replace with Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(ip: string): string {
  return `rate_limit:${ip}`
}

function isRateLimited(ip: string): boolean {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + CONFIG.RATE_LIMIT.WINDOW_MS
    })
    return false
  }

  if (record.count >= CONFIG.RATE_LIMIT.MAX_SUBMISSIONS_PER_HOUR) {
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
    // Validate environment variables
    validateEnvironment()

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

    // Parse and validate request body
    const body = await request.json()
    const validationResult = contactFormSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    const { name, email, company, message } = validationResult.data

    // Get user agent for logging
    const userAgent = request.headers.get('user-agent') || ''

    // Store in Supabase
    const supabase = createServerSupabaseClient()
    const { data: contact, error: dbError } = await supabase
      .from('contacts')
      .insert({
        name,
        email,
        company,
        message,
        ip_address: clientIP,
        user_agent: userAgent
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to save contact information' 
        },
        { status: 500 }
      )
    }

    // Send email notification via Resend
    try {
      const emailResult = await resend.emails.send({
        from: CONFIG.EMAIL.FROM,
        to: CONFIG.EMAIL.TO,
        subject: CONFIG.EMAIL.SUBJECT,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #555; margin-bottom: 15px;">Contact Details:</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px 0; font-weight: bold; color: #666;">Name:</td>
                  <td style="padding: 10px 0;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px 0; font-weight: bold; color: #666;">Email:</td>
                  <td style="padding: 10px 0;">
                    <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                ${company ? `
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px 0; font-weight: bold; color: #666;">Company:</td>
                  <td style="padding: 10px 0;">${company}</td>
                </tr>
                ` : ''}
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px 0; font-weight: bold; color: #666;">Submitted:</td>
                  <td style="padding: 10px 0;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #555; margin-bottom: 15px;">Message:</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>

            <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 5px; font-size: 12px; color: #666;">
              <p style="margin: 0;"><strong>Submission ID:</strong> ${contact.id}</p>
              <p style="margin: 5px 0 0 0;"><strong>IP Address:</strong> ${clientIP}</p>
            </div>

            <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #999;">
              <p>This email was sent from your Design Agency Pro contact form.</p>
            </div>
          </div>
        `,
        replyTo: email
      })

      if (emailResult.error) {
        console.error('Email error:', emailResult.error)
        // Don't fail the request if email fails, but log it
      }
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Continue with success response even if email fails
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      id: contact.id
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