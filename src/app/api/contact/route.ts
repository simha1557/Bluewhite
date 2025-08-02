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

    // Send notification email to agency via Resend (only if environment is properly configured)
    if (process.env.RESEND_API_KEY) {
      try {
        // Log email configuration for debugging
        console.log('📧 Email Configuration:', {
          hasApiKey: !!process.env.RESEND_API_KEY,
          fromEmail: CONFIG.EMAIL.FROM,
          bccEmails: CONFIG.EMAIL.BCC,
          replyTo: email
        })

        const emailResult = await resend.emails.send({
          from: `BlueWhiteMedia <${CONFIG.EMAIL.FROM}>`,
          to: CONFIG.EMAIL.BCC, // Send to multiple agency emails
          subject: `New Contact Form Submission from ${name}`,
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #3b82f6, #1e40af); padding: 20px; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; text-align: center;">BlueWhiteMedia</h1>
              <p style="color: #e0e7ff; margin: 5px 0 0 0; text-align: center;">🚨 New Contact Form Submission</p>
            </div>
            <div style="background: white; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <div style="margin: 20px 0;">
              <h3 style="color: #555; margin-bottom: 15px;">New inquiry received!</h3>
              
              <table style="width: 100%; border-collapse: collapse; background: #f8f9fa; border-radius: 8px; overflow: hidden;">
                <tr style="background: #3b82f6;">
                  <td style="padding: 15px; color: white; font-weight: bold;" colspan="2">Contact Details</td>
                </tr>
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 12px 15px; font-weight: bold; color: #666; width: 30%;">Name:</td>
                  <td style="padding: 12px 15px; color: #333;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 12px 15px; font-weight: bold; color: #666;">Email:</td>
                  <td style="padding: 12px 15px;">
                    <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-weight: 500;">${email}</a>
                  </td>
                </tr>
                ${company ? `
                <tr style="border-bottom: 1px solid #e0e0e0;">
                  <td style="padding: 12px 15px; font-weight: bold; color: #666;">Company:</td>
                  <td style="padding: 12px 15px; color: #333;">${company}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 15px; font-weight: bold; color: #666;">Submitted:</td>
                  <td style="padding: 12px 15px; color: #333;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>

            <div style="margin: 25px 0;">
              <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <h4 style="color: #1976d2; margin: 0 0 10px 0;">💬 Message:</h4>
                <p style="color: #555; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>

            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #856404; margin: 0 0 10px 0;">⚡ Quick Actions:</h4>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="mailto:${email}?subject=Re: Your inquiry to BlueWhiteMedia" style="background: #3b82f6; color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; font-size: 14px; display: inline-block;">Reply to Customer</a>
              </div>
            </div>

            <div style="margin-top: 30px; padding: 15px; background: #f1f5f9; border-radius: 8px; font-size: 12px; color: #666;">
              <p style="margin: 0;"><strong>Submission ID:</strong> ${contact.id}</p>
              <p style="margin: 5px 0 0 0;"><strong>IP Address:</strong> ${clientIP}</p>
            </div>

            </div>
            <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #999; background: #f8fafc; padding: 15px; border-radius: 8px;">
              <p style="margin: 0;"><strong>BlueWhiteMedia</strong> - Contact Form Notification</p>
              <p style="margin: 5px 0 0 0;">Reply to this customer within 24 hours for best results</p>
            </div>
          </div>
        `,
        text: `
BLUEWHITEMEDIA - NEW CONTACT FORM SUBMISSION
===============================================

🚨 New inquiry received!

CONTACT DETAILS:
===============
Name: ${name}
Email: ${email}${company ? `\nCompany: ${company}` : ''}
Submitted: ${new Date().toLocaleString()}

MESSAGE:
========
${message}

QUICK ACTIONS:
=============
Reply to customer: ${email}

TECHNICAL INFO:
==============
Submission ID: ${contact.id}
IP Address: ${clientIP}

---
BlueWhiteMedia - Contact Form Notification
Reply to this customer within 24 hours for best results
        `,
        replyTo: email
      })

        // Log detailed email response
        console.log('📧 Email Send Result:', {
          success: !emailResult.error,
          error: emailResult.error,
          emailId: emailResult.data?.id,
          from: CONFIG.EMAIL.FROM,
          to: CONFIG.EMAIL.BCC,
          replyTo: email,
          submittedAt: new Date().toISOString()
        })

        if (emailResult.error) {
          console.error('❌ Email send error:', emailResult.error)
          // Log additional error details
          console.error('Email error details:', {
            message: emailResult.error.message,
            error: emailResult.error
          })
        } else {
          console.log('✅ Email sent successfully!')
          console.log('Email ID:', emailResult.data?.id)
        }
      } catch (emailError) {
        console.error('❌ Failed to send email:', emailError)
        console.error('Email error stack:', emailError instanceof Error ? emailError.stack : 'No stack trace')
        // Continue with success response even if email fails
      }
    } else {
      console.log('⚠️ Resend not configured - skipping email notification')
      console.log('Missing environment variable: RESEND_API_KEY')
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