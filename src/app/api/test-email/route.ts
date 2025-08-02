import { NextRequest, NextResponse } from 'next/server'
import { 
  validateEmailConfig, 
  sendTestEmail, 
  runEmailSystemTest,
  testMultipleProviders 
} from '@/lib/email-test'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, testRecipient } = body

    // Validate required fields
    if (!action) {
      return NextResponse.json(
        { success: false, error: 'Action is required' },
        { status: 400 }
      )
    }

    switch (action) {
      case 'validate-config':
        console.log('🔍 Validating email configuration...')
        const configStatus = await validateEmailConfig()
        
        return NextResponse.json({
          success: true,
          data: configStatus
        })

      case 'send-test':
        if (!testRecipient) {
          return NextResponse.json(
            { success: false, error: 'Test recipient email is required' },
            { status: 400 }
          )
        }
        
        console.log('📧 Sending test email...')
        const testResult = await sendTestEmail(testRecipient)
        
        return NextResponse.json({
          success: testResult.success,
          data: testResult
        })

      case 'run-system-test':
        if (!testRecipient) {
          return NextResponse.json(
            { success: false, error: 'Test recipient email is required' },
            { status: 400 }
          )
        }
        
        console.log('🧪 Running comprehensive email system test...')
        await runEmailSystemTest(testRecipient)
        
        return NextResponse.json({
          success: true,
          message: 'Email system test completed. Check console logs for details.'
        })

      case 'test-providers':
        console.log('🌐 Testing multiple email providers...')
        await testMultipleProviders()
        
        return NextResponse.json({
          success: true,
          message: 'Multi-provider test completed. Check console logs for details.'
        })

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action. Use: validate-config, send-test, run-system-test, or test-providers' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Email test API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { 
      success: false,
      error: 'Method not allowed. Use POST with action parameter.',
      availableActions: [
        'validate-config',
        'send-test',
        'run-system-test', 
        'test-providers'
      ]
    },
    { status: 405 }
  )
} 