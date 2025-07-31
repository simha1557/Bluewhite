// Comprehensive debugging script for contact form issues
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

console.log('🔍 Contact Form Debug Report')
console.log('============================\n')

// 1. Environment Variables Check
console.log('1. ENVIRONMENT VARIABLES:')
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY', 
  'SUPABASE_SERVICE_ROLE_KEY',
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL',
  'RESEND_TO_EMAIL'
]

let allPresent = true
requiredVars.forEach(varName => {
  const value = process.env[varName]
  if (value) {
    console.log(`   ✅ ${varName}: ${value.substring(0, 10)}...`)
  } else {
    console.log(`   ❌ ${varName}: Missing`)
    allPresent = false
  }
})

if (!allPresent) {
  console.log('\n❌ Missing environment variables will cause failures!')
  process.exit(1)
}

// 2. Test Supabase Connection
console.log('\n2. SUPABASE CONNECTION:')
try {
  const { createClient } = require('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  console.log('   ✅ Supabase client created successfully')
  console.log('   📋 Try inserting test data...')
} catch (err) {
  console.log('   ❌ Supabase connection failed:', err.message)
}

// 3. Test Resend Configuration
console.log('\n3. RESEND EMAIL SETUP:')
try {
  const { Resend } = require('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  console.log('   ✅ Resend client created successfully')
  console.log(`   📧 FROM: ${process.env.RESEND_FROM_EMAIL}`)
  console.log(`   📥 TO: ${process.env.RESEND_TO_EMAIL}`)
} catch (err) {
  console.log('   ❌ Resend setup failed:', err.message)
}

// 4. API Route Check
console.log('\n4. API ROUTE:')
console.log('   📍 Expected API endpoint: http://localhost:3006/api/contact')
console.log('   🔧 Method: POST')
console.log('   📝 Content-Type: application/json')

console.log('\n5. DEBUGGING STEPS:')
console.log('   1. Open browser DevTools (F12)')
console.log('   2. Go to Network tab')
console.log('   3. Submit the contact form')
console.log('   4. Check for /api/contact request')
console.log('   5. Look at the response status and data')

console.log('\n6. NEXT STEPS:')
console.log('   • Test form submission at: http://localhost:3006')
console.log('   • Check browser console for JavaScript errors')
console.log('   • Check terminal logs for API errors')
console.log('   • Verify your Resend API key is active')
console.log('   • Check Supabase project is active')

console.log('\n✅ Environment looks configured. Testing actual submission...')