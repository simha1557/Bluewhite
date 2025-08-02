'use client'

import { useState } from 'react'

interface TestResult {
  success: boolean
  data?: any
  error?: string
  message?: string
}

export default function EmailTestPage() {
  const [testRecipient, setTestRecipient] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])

  const runTest = async (action: string) => {
    setIsLoading(true)
    setResults([])

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          testRecipient: action === 'send-test' || action === 'run-system-test' ? testRecipient : undefined
        }),
      })

      const result = await response.json()
      setResults([result])
    } catch (error) {
      setResults([{
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Removed unused getActionDescription function

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            🧪 Email System Test Dashboard
          </h1>
          <p className="text-muted-foreground">
            Test and diagnose email delivery issues for the BlueWhiteMedia contact form.
          </p>
        </div>

        {/* Test Recipient Input */}
        <div className="bg-card border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Configuration</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="testRecipient" className="block text-sm font-medium mb-2">
                Test Recipient Email
              </label>
              <input
                type="email"
                id="testRecipient"
                value={testRecipient}
                onChange={(e) => setTestRecipient(e.target.value)}
                placeholder="Enter email address for testing"
                className="w-full px-4 py-2 border rounded-lg bg-background text-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Required for send-test and run-system-test actions
              </p>
            </div>
          </div>
        </div>

        {/* Test Actions */}
        <div className="bg-card border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { action: 'validate-config', label: '🔍 Validate Config', color: 'bg-blue-500' },
              { action: 'send-test', label: '📧 Send Test Email', color: 'bg-green-500' },
              { action: 'run-system-test', label: '🧪 Run System Test', color: 'bg-purple-500' },
              { action: 'test-providers', label: '🌐 Test Providers', color: 'bg-orange-500' }
            ].map(({ action, label, color }) => (
              <button
                key={action}
                onClick={() => runTest(action)}
                disabled={isLoading || (action === 'send-test' || action === 'run-system-test') && !testRecipient}
                className={`
                  ${color} hover:opacity-90 text-white font-medium py-3 px-4 rounded-lg
                  transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                `}
              >
                {isLoading ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : null}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    result.success 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`text-xl ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                      {result.success ? '✅' : '❌'}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${result.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                        {result.success ? 'Test Passed' : 'Test Failed'}
                      </h3>
                      {result.message && (
                        <p className="text-sm text-muted-foreground mt-1">{result.message}</p>
                      )}
                      {result.error && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{result.error}</p>
                      )}
                      {result.data && (
                        <div className="mt-3">
                          <details className="text-sm">
                            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                              View Details
                            </summary>
                            <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto">
                              {JSON.stringify(result.data, null, 2)}
                            </pre>
                          </details>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-card border rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">📋 Testing Instructions</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h3 className="font-medium text-foreground mb-2">1. Validate Configuration</h3>
              <p>Start by validating your email configuration. This will check API keys, domain verification, and environment variables.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">2. Send Test Email</h3>
              <p>Send a test email to verify delivery. Make sure to check both your inbox and spam folder.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">3. Run System Test</h3>
              <p>Run a comprehensive test that validates configuration, sends a test email, and tracks delivery status.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">4. Test Multiple Providers</h3>
              <p>Test email delivery to different email providers (Gmail, Outlook, Yahoo, iCloud).</p>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Important Notes</h3>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>• Check your spam/junk folder if emails don't appear in your inbox</li>
                <li>• Verify your domain is properly configured in Resend dashboard</li>
                <li>• Ensure DNS records (SPF, DKIM, DMARC) are correctly set</li>
                <li>• Monitor the browser console for detailed logs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 