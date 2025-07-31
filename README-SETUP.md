# 🚀 Design Agency Pro - Setup Instructions

This project includes a fully functional contact form system with email notifications and database storage.

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier available)
- Resend account (free tier available)

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database (Supabase)

1. **Create Account:** Sign up at [https://supabase.com](https://supabase.com)
2. **Create Project:** Create a new project and wait for setup to complete
3. **Get API Keys:** Go to Project Settings > API and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

4. **Set Up Database:** Run the SQL from `database/setup.sql` in your Supabase SQL Editor

### 3. Set Up Email Service (Resend)

1. **Create Account:** Sign up at [https://resend.com](https://resend.com)
2. **Get API Key:** Copy your API key from the dashboard
3. **Domain Setup:** 
   - For testing: Use `onboarding@resend.dev` (free)
   - For production: Verify your own domain

### 4. Environment Configuration

Create `.env.local` in project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Email Configuration  
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_TO_EMAIL=agency@yourcompany.com
```

### 5. Start Development Server

```bash
npm run dev
```

Visit **http://localhost:3000** and scroll to the contact form at the bottom!

## 🧪 Testing the Contact Form

1. **Fill out the form** with valid information
2. **Submit** and watch for success/error feedback
3. **Check your email** for the notification
4. **Verify in Supabase** that the submission was stored

## ✅ Features Included

- ✅ **Real-time form validation** with visual feedback
- ✅ **Rate limiting** (3 submissions per hour per IP)
- ✅ **Email notifications** via Resend
- ✅ **Database storage** in Supabase with RLS security
- ✅ **Responsive design** works on all devices
- ✅ **Accessibility features** with proper ARIA labels
- ✅ **Dark/Light theme** toggle support

## 🔧 Development Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Check code quality
npm run type-check # Check TypeScript types
```

## 🚀 Deployment

This project is optimized for [Vercel](https://vercel.com):

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

## 💡 Need Help?

- Check browser console for errors
- Verify environment variables are set correctly
- Test Supabase connection in the dashboard
- Confirm Resend API key is valid

**The contact form is production-ready!** 🎉