import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limiting (for demo purposes)
// Updated for Vercel deployment - no external dependencies
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

    // Send email notification if Resend is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const emailResult = await resend.emails.send({
          from: 'BlueWhiteMedia <onboarding@resend.dev>',
          to: [process.env.RESEND_TO_EMAIL || 'pavansimha911@gmail.com'],
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
                  <p style="margin: 0;"><strong>IP Address:</strong> ${clientIP}</p>
                  <p style="margin: 5px 0 0 0;"><strong>Submission Time:</strong> ${new Date().toISOString()}</p>
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
IP Address: ${clientIP}
Submission Time: ${new Date().toISOString()}

---
BlueWhiteMedia - Contact Form Notification
Reply to this customer within 24 hours for best results
          `,
          replyTo: email
        })

        console.log('✅ Email sent successfully!')
        console.log('Email ID:', emailResult.data?.id)
      } catch (emailError) {
        console.error('❌ Failed to send email:', emailError)
        // Continue with success response even if email fails
      }
    } else {
      console.log('⚠️ Resend not configured - skipping email notification')
    }

    // Return success response
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