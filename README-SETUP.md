# Contact Form System Setup Instructions

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Resend Email Configuration
RESEND_API_KEY=your_resend_api_key_here

# Contact Form Configuration
CONTACT_EMAIL_TO=agency@yourcompany.com
CONTACT_EMAIL_FROM=noreply@yourcompany.com
```

## Supabase Setup

1. **Create a Supabase Project**: Go to [supabase.com](https://supabase.com) and create a new project
2. **Get your API keys**: 
   - Go to Settings > API
   - Copy the Project URL and anon/public key
   - Copy the service_role key (keep this secret!)
3. **Run the database setup**:
   - Go to your Supabase dashboard > SQL Editor
   - Copy and paste the contents of `database/setup.sql`
   - Run the SQL commands to create the contacts table and policies

## Resend Setup

1. **Create a Resend Account**: Go to [resend.com](https://resend.com) and sign up
2. **Get your API key**:
   - Go to API Keys in your Resend dashboard
   - Create a new API key
   - Copy the key and add it to your `.env.local` file
3. **Configure your domain** (optional but recommended):
   - Add and verify your domain in Resend
   - Update the `CONTACT_EMAIL_FROM` to use your domain

## Testing the Setup

Once you've configured the environment variables and database:

1. Start the development server: `npm run dev`
2. The contact form will be functional on the homepage
3. Test submissions will be stored in your Supabase contacts table
4. Email notifications will be sent via Resend

## Troubleshooting

- **Database errors**: Check that your Supabase URL and keys are correct
- **Email errors**: Verify your Resend API key and email addresses
- **Environment variables**: Make sure `.env.local` is in your project root and not committed to git