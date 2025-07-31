// Direct API test to check if the contact form endpoint works
const fs = require('fs')

// Load environment variables
try {
  const envFile = fs.readFileSync('.env.local', 'utf8')
  const lines = envFile.split('\n')
  
  lines.forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, value] = line.split('=')
      if (key && value) {
        process.env[key.trim()] = value.trim()
      }
    }
  })
} catch (err) {
  console.log('❌ Could not read .env.local file')
  process.exit(1)
}

async function testContactAPI() {
  console.log('🧪 Testing Contact API Directly...')
  console.log('==================================\n')

  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    message: 'This is a test message from the debug script to verify the contact form is working properly.'
  }

  console.log('📤 Sending test data:')
  console.log(JSON.stringify(testData, null, 2))
  console.log('\n🔄 Making request to API...')

  try {
    const response = await fetch('http://localhost:3006/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    })

    console.log(`📊 Response Status: ${response.status} ${response.statusText}`)
    
    const responseData = await response.json()
    console.log('📋 Response Data:')
    console.log(JSON.stringify(responseData, null, 2))

    if (response.ok) {
      console.log('\n✅ API call successful!')
      console.log('📧 Check your email: pavansimha911@gmail.com')
      console.log('🗄️  Check your Supabase database for the contact entry')
    } else {
      console.log('\n❌ API call failed!')
      console.log('🔍 Error details above - check API route code')
    }

  } catch (error) {
    console.log('\n❌ Request failed:')
    console.log('Error:', error.message)
    console.log('\n💡 Possible issues:')
    console.log('   • Dev server not running on port 3006')
    console.log('   • API route has compilation errors')
    console.log('   • Network connectivity issues')
  }
}

// Check if fetch is available (Node 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ fetch not available. Installing node-fetch...')
  try {
    global.fetch = require('node-fetch')
  } catch (err) {
    console.log('Please run: npm install node-fetch')
    process.exit(1)
  }
}

testContactAPI()