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
    // Validate environment variables (non-blocking for development)
    const envValid = validateEnvironment()
    if (!envValid) {
      console.warn('Some environment variables missing - form will work but email notifications may not')
    }

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

    // Send confirmation email to customer via Resend (only if environment is properly configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const emailResult = await resend.emails.send({
          from: `BlueWhiteMedia <${CONFIG.EMAIL.FROM}>`,
          to: email, // Send to the customer who submitted the form
          bcc: CONFIG.EMAIL.BCC, // BCC to agency email
          subject: 'Thank you for contacting BlueWhiteMedia',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #3b82f6, #1e40af); padding: 20px; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; text-align: center;">BlueWhiteMedia</h1>
              <p style="color: #e0e7ff; margin: 5px 0 0 0; text-align: center;">Thank you for contacting us!</p>
            </div>
            <div style="background: white; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <div style="margin: 20px 0;">
              <h3 style="color: #555; margin-bottom: 15px;">Hi ${name},</h3>
              <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
                Thank you for reaching out to BlueWhiteMedia! We've received your message and our team will get back to you within 24 hours.
              </p>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                <h4 style="color: #3b82f6; margin: 0 0 10px 0;">Your Message:</h4>
                <p style="color: #555; margin: 0; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              
              ${company ? `<p style="color: #666; font-size: 14px;"><strong>Company:</strong> ${company}</p>` : ''}
              
              <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h4 style="color: #1976d2; margin: 0 0 10px 0;">What happens next?</h4>
                <ul style="color: #555; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li>Our team will review your request</li>
                  <li>We'll prepare a personalized response</li>
                  <li>You'll hear back from us within 24 hours</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="color: #666; margin: 0;">Need immediate assistance?</p>
                <p style="color: #3b82f6; font-weight: bold; margin: 5px 0;">
                  📧 Email: info@bluewhitemedia.online<br>
                  🌐 Website: bluewhitemedia.online
                </p>
              </div>
            </div>

            </div>
            <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #999; background: #f8fafc; padding: 15px; border-radius: 8px;">
              <p style="margin: 0;"><strong>BlueWhiteMedia</strong> - Professional Design Services</p>
              <p style="margin: 5px 0 0 0;">Transforming ideas into stunning digital experiences</p>
            </div>
          </div>
        `,
        replyTo: 'info@bluewhitemedia.online'
      })

        if (emailResult.error) {
          console.error('Email error:', emailResult.error)
          // Don't fail the request if email fails, but log it
        }
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
        // Continue with success response even if email fails
      }
    } else {
      console.log('Resend not configured - skipping email notification')
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