#!/bin/bash

echo "🔧 Setting up development environment..."

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local..."
    cat > .env.local << EOF
# Development Configuration
PORT=3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Email Configuration
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=hello@mail.bluewhitemedia.online
RESEND_BCC_EMAIL=pavansimha911@gmail.com

# Database Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
EOF
    echo "✅ .env.local created with default values"
    echo "⚠️  Please update with your actual API keys"
else
    echo "✅ .env.local already exists"
fi

# Make scripts executable
chmod +x scripts/dev.sh
chmod +x scripts/setup-dev.sh

echo "✅ Development environment setup complete!"
echo "🚀 Run 'npm run dev' to start the development server" 