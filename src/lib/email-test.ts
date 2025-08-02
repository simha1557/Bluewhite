import { Resend } from 'resend'
import { CONFIG } from './config'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailTestResult {
  success: boolean
  error?: string
  emailId?: string
  details?: any
}

export interface EmailConfigStatus {
  hasApiKey: boolean
  fromEmail: string
  bccEmails: string[]
  domainVerified: boolean
  issues: string[]
}

/**
 * Validate email configuration and environment
 */
export const validateEmailConfig = async (): Promise<EmailConfigStatus> => {
  const issues: string[] = []
  
  // Check API key
  const hasApiKey = !!process.env.RESEND_API_KEY
  if (!hasApiKey) {
    issues.push('RESEND_API_KEY not configured')
  }
  
  // Get email configuration
  const fromEmail = process.env.RESEND_FROM_EMAIL || CONFIG.EMAIL.FROM
  const bccEmails = process.env.RESEND_BCC_EMAIL ? 
    process.env.RESEND_BCC_EMAIL.split(',').map(email => email.trim()) : 
    CONFIG.EMAIL.BCC
  
  let domainVerified = false
  
  // Test API key and domain verification
  if (hasApiKey) {
    try {
      const domains = await resend.domains.list()
      console.log('Available domains:', domains.data)
      
      // Check if our domain is verified
      const ourDomain = fromEmail.split('@')[1]
      domainVerified = Array.isArray(domains.data) && domains.data.some(domain => 
        domain.name === ourDomain && domain.status === 'valid'
      )
      
      if (!domainVerified) {
        issues.push(`Domain ${ourDomain} not verified in Resend`)
      }
    } catch (error) {
      issues.push(`API key validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
  
  return {
    hasApiKey,
    fromEmail,
    bccEmails,
    domainVerified,
    issues
  }
}

/**
 * Send a test email to verify delivery
 */
export const sendTestEmail = async (
  testRecipient: string,
  testName: string = 'Test User'
): Promise<EmailTestResult> => {
  try {
    console.log('Sending test email...')
    console.log('From:', CONFIG.EMAIL.FROM)
    console.log('To:', testRecipient)
    
    const emailResult = await resend.emails.send({
      from: `BlueWhiteMedia <${CONFIG.EMAIL.FROM}>`,
      to: [testRecipient],
      subject: `🧪 Test Email - BlueWhiteMedia Contact Form`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6, #1e40af); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; text-align: center;">BlueWhiteMedia</h1>
            <p style="color: #e0e7ff; margin: 5px 0 0 0; text-align: center;">🧪 Test Email</p>
          </div>
          <div style="background: white; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h3 style="color: #555; margin-bottom: 15px;">Test Email Received!</h3>
            <p style="color: #666; line-height: 1.6;">
              Hello ${testName},<br><br>
              This is a test email to verify that the BlueWhiteMedia contact form is working correctly.
              If you received this email, the email delivery system is functioning properly.
            </p>
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #1976d2; margin: 0 0 10px 0;">📧 Email Details:</h4>
              <ul style="color: #555; margin: 0; padding-left: 20px;">
                <li><strong>From:</strong> ${CONFIG.EMAIL.FROM}</li>
                <li><strong>To:</strong> ${testRecipient}</li>
                <li><strong>Sent:</strong> ${new Date().toLocaleString()}</li>
                <li><strong>Test ID:</strong> ${Date.now()}</li>
              </ul>
            </div>
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #856404; margin: 0 0 10px 0;">✅ Next Steps:</h4>
              <p style="color: #856404; margin: 0;">
                If you received this email in your inbox (not spam), the contact form is working correctly!
                Please reply to confirm receipt.
              </p>
            </div>
          </div>
          <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #999; background: #f8fafc; padding: 15px; border-radius: 8px;">
            <p style="margin: 0;"><strong>BlueWhiteMedia</strong> - Email Delivery Test</p>
            <p style="margin: 5px 0 0 0;">This email was sent to verify contact form functionality</p>
          </div>
        </div>
      `,
      text: `
BLUEWHITEMEDIA - TEST EMAIL
============================

Hello ${testName},

This is a test email to verify that the BlueWhiteMedia contact form is working correctly.
If you received this email, the email delivery system is functioning properly.

EMAIL DETAILS:
=============
From: ${CONFIG.EMAIL.FROM}
To: ${testRecipient}
Sent: ${new Date().toLocaleString()}
Test ID: ${Date.now()}

NEXT STEPS:
===========
If you received this email in your inbox (not spam), the contact form is working correctly!
Please reply to confirm receipt.

---
BlueWhiteMedia - Email Delivery Test
This email was sent to verify contact form functionality
      `,
      replyTo: testRecipient
    })

    if (emailResult.error) {
      console.error('Email send error:', emailResult.error)
      return {
        success: false,
        error: emailResult.error.message || 'Failed to send email'
      }
    }

    console.log('Email sent successfully!')
    console.log('Email ID:', emailResult.data?.id)
    
    return {
      success: true,
      emailId: emailResult.data?.id,
      details: {
        from: CONFIG.EMAIL.FROM,
        to: testRecipient,
        subject: '🧪 Test Email - BlueWhiteMedia Contact Form',
        sentAt: new Date().toISOString()
      }
    }
  } catch (error) {
    console.error('Test email error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

/**
 * Track email delivery status
 */
export const trackEmailDelivery = async (emailId: string): Promise<any> => {
  try {
    const email = await resend.emails.get(emailId)
    
    console.log('Email delivery status:', {
      id: email.data?.id,
      status: email.data?.last_event,
      createdAt: email.data?.created_at
    })
    
    return {
      id: email.data?.id,
      status: email.data?.last_event,
      createdAt: email.data?.created_at
    }
  } catch (error) {
    console.error('Failed to track email delivery:', error)
    return {
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Comprehensive email system test
 */
export const runEmailSystemTest = async (testRecipient: string): Promise<void> => {
  console.log('🧪 Starting Email System Test...\n')
  
  // Step 1: Validate configuration
  console.log('1. Validating email configuration...')
  const configStatus = await validateEmailConfig()
  
  console.log('Configuration Status:')
  console.log('- API Key configured:', configStatus.hasApiKey)
  console.log('- From Email:', configStatus.fromEmail)
  console.log('- BCC Emails:', configStatus.bccEmails)
  console.log('- Domain verified:', configStatus.domainVerified)
  
  if (configStatus.issues.length > 0) {
    console.log('\n❌ Configuration Issues:')
    configStatus.issues.forEach(issue => console.log(`  - ${issue}`))
    console.log('\nPlease fix these issues before proceeding with email testing.')
    return
  }
  
  console.log('\n✅ Configuration validation passed!\n')
  
  // Step 2: Send test email
  console.log('2. Sending test email...')
  const testResult = await sendTestEmail(testRecipient)
  
  if (!testResult.success) {
    console.log(`❌ Test email failed: ${testResult.error}`)
    return
  }
  
  console.log('✅ Test email sent successfully!')
  console.log('Email ID:', testResult.emailId)
  
  // Step 3: Track delivery (wait a bit first)
  if (testResult.emailId) {
    console.log('\n3. Waiting 10 seconds before checking delivery status...')
    await new Promise(resolve => setTimeout(resolve, 10000))
    
    console.log('Checking delivery status...')
    const deliveryStatus = await trackEmailDelivery(testResult.emailId)
    
    if (deliveryStatus.status === 'delivered') {
      console.log('✅ Email delivered successfully!')
    } else if (deliveryStatus.status === 'sent') {
      console.log('📤 Email sent, checking delivery...')
    } else {
      console.log(`⚠️ Email status: ${deliveryStatus.status}`)
    }
  }
  
  console.log('\n🎉 Email system test completed!')
  console.log('\nNext steps:')
  console.log('1. Check your email inbox (and spam folder)')
  console.log('2. Reply to the test email to confirm receipt')
  console.log('3. Check Resend dashboard for delivery status')
  console.log('4. If email not received, check DNS configuration')
}

/**
 * Test email with different providers
 */
export const testMultipleProviders = async (): Promise<void> => {
  const testEmails = [
    'test@gmail.com',      // Gmail
    'test@outlook.com',    // Outlook
    'test@yahoo.com',      // Yahoo
    'test@icloud.com'      // iCloud
  ]
  
  console.log('🧪 Testing email delivery to multiple providers...\n')
  
  for (const email of testEmails) {
    console.log(`Testing delivery to: ${email}`)
    const result = await sendTestEmail(email, 'Test User')
    
    if (result.success) {
      console.log(`✅ Email sent to ${email}`)
    } else {
      console.log(`❌ Failed to send to ${email}: ${result.error}`)
    }
    
    // Wait between sends to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  
  console.log('\n🎉 Multi-provider test completed!')
  console.log('Check each email provider for delivery status.')
} 