# Port Management Guide

## ✅ **Problem Solved!**

Your Next.js development server is now configured to run consistently on **port 3000** without conflicts.

## 🚀 **How to Start Development**

### **Standard Start**
```bash
npm run dev
```
- Automatically checks if port 3000 is available
- Prompts to kill conflicting processes if needed
- Starts server on http://localhost:3000

### **Clean Start (Kill Existing Processes)**
```bash
npm run dev:clean
```
- Kills any existing Next.js processes
- Starts fresh development server

### **Custom Port**
```bash
PORT=3001 npm run dev
```
- Use any port you prefer
- Useful for running multiple projects

## 🛠 **Available Commands**

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (with port checking) |
| `npm run dev:clean` | Kill existing processes and start fresh |
| `npm run dev:kill` | Kill all Next.js development processes |
| `npm run dev:port` | Start with custom port (use PORT env var) |
| `npm run ports:status` | Check if port 3000 is available |
| `npm run ports:check` | Check all ports 3000-3010 |

## 🔧 **Port Management Scripts**

### **Main Script: `scripts/dev.sh`**
- Checks port availability
- Prompts to kill conflicting processes
- Starts Next.js with specified port
- Interactive confirmation for process killing

### **Setup Script: `scripts/setup-dev.sh`**
- Creates `.env.local` with default configuration
- Sets up environment variables
- Makes scripts executable

## 📋 **Environment Variables**

Add these to your `.env.local` file:

```env
# Development Configuration
PORT=3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Email Configuration
RESEND_API_KEY=your_actual_api_key
RESEND_FROM_EMAIL=hello@mail.bluewhitemedia.online
RESEND_BCC_EMAIL=pavansimha911@gmail.com

# Database Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 🔍 **Troubleshooting**

### **Port Still in Use**
```bash
# Check what's using port 3000
lsof -i :3000

# Kill process on port 3000
sudo lsof -ti:3000 | xargs kill -9

# Or use the built-in command
npm run dev:clean
```

### **Multiple Node Processes**
```bash
# Check all Node processes
ps aux | grep node

# Kill all Node processes (use with caution)
pkill -f node
```

### **Permission Issues**
```bash
# Make scripts executable
chmod +x scripts/dev.sh
chmod +x scripts/setup-dev.sh
```

## 🎯 **Quick Start Workflow**

1. **First Time Setup**
   ```bash
   bash scripts/setup-dev.sh
   ```

2. **Daily Development**
   ```bash
   npm run dev
   ```

3. **If Port Conflicts**
   ```bash
   npm run dev:clean
   ```

4. **Check Port Status**
   ```bash
   npm run ports:status
   ```

## 📱 **Access Your Application**

- **Main Site**: http://localhost:3000
- **Email Test Dashboard**: http://localhost:3000/test-email
- **Contact Form**: Available on the main page

## 🔄 **Development Workflow**

1. **Start Development**
   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit your code
   - Save files
   - Hot reload will update automatically

3. **Stop Development**
   ```bash
   # Press Ctrl+C in terminal
   # Or run:
   npm run dev:kill
   ```

## ✅ **Success Indicators**

- ✅ Server starts on port 3000 consistently
- ✅ No "port in use" errors
- ✅ Single command to start development
- ✅ Automatic port conflict resolution
- ✅ Clear error messages and prompts

## 🎉 **You're All Set!**

Your development environment is now configured for consistent, single-port operation. No more port conflicts or multiple port attempts!

**Happy coding! 🚀** 