# Single Port Configuration Specification

## Problem Statement
The Next.js development server is currently trying multiple ports (3000, 3001, 3002, 3003) due to port conflicts, making it difficult to maintain a consistent development environment. The project needs to be configured to run on a single, dedicated port without conflicts.

## Current Issue Analysis

### Port Conflict Symptoms
- Next.js automatically tries ports 3000, 3001, 3002, 3003
- Inconsistent localhost URLs across development sessions
- Potential conflicts with other services using these ports
- Difficulty in bookmarking or sharing development URLs

### Root Causes
1. **Other services using port 3000** (most common)
2. **Multiple Next.js instances** running simultaneously
3. **Other development servers** (React, Vue, etc.) using standard ports
4. **Background processes** not properly terminated

## Investigation Tasks

### 1. Port Usage Analysis
**Priority**: Critical
**Status**: Pending

**Tasks**:
- [ ] Identify what's using port 3000
- [ ] Check for other Next.js instances
- [ ] Scan for conflicting development servers
- [ ] List all active processes on common development ports

**Implementation**:
```bash
# Check what's using port 3000
lsof -i :3000
lsof -i :3001
lsof -i :3002
lsof -i :3003

# Check for Node.js processes
ps aux | grep node
ps aux | grep next

# Check for all processes on common dev ports
netstat -tulpn | grep :300
```

### 2. Process Cleanup
**Priority**: High
**Status**: Pending

**Tasks**:
- [ ] Kill conflicting processes
- [ ] Terminate orphaned Node.js processes
- [ ] Clear port bindings
- [ ] Restart development environment cleanly

### 3. Port Configuration
**Priority**: High
**Status**: Pending

**Tasks**:
- [ ] Configure Next.js to use specific port
- [ ] Set up environment variable for port
- [ ] Create port reservation strategy
- [ ] Implement port conflict detection

## Fix Implementation Plan

### Phase 1: Immediate Port Resolution

#### 1.1 Kill Conflicting Processes
```bash
# Find and kill processes using port 3000
sudo lsof -ti:3000 | xargs kill -9

# Kill all Node.js processes (be careful!)
pkill -f node

# Kill specific Next.js processes
pkill -f "next dev"
```

#### 1.2 Configure Next.js for Specific Port

**Option A: Environment Variable**
```bash
# Add to .env.local
PORT=3000
```

**Option B: Package.json Script**
```json
{
  "scripts": {
    "dev": "next dev -p 3000",
    "dev:alt": "next dev -p 3001"
  }
}
```

**Option C: Next.js Config**
```javascript
// next.config.js
module.exports = {
  env: {
    PORT: 3000
  }
}
```

### Phase 2: Port Management Strategy

#### 2.1 Create Port Management Script
```bash
#!/bin/bash
# scripts/start-dev.sh

PORT=${PORT:-3000}
echo "Starting development server on port $PORT"

# Check if port is available
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "Port $PORT is in use. Attempting to free it..."
    sudo lsof -ti:$PORT | xargs kill -9
    sleep 2
fi

# Start Next.js
next dev -p $PORT
```

#### 2.2 Environment Configuration
```env
# .env.local
PORT=3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Phase 3: Development Workflow

#### 3.1 Package.json Updates
```json
{
  "scripts": {
    "dev": "bash scripts/start-dev.sh",
    "dev:clean": "pkill -f 'next dev' && npm run dev",
    "dev:port": "next dev -p $PORT",
    "kill:dev": "pkill -f 'next dev'",
    "ports:check": "lsof -i :3000-3010"
  }
}
```

#### 3.2 Development Commands
```bash
# Start development server
npm run dev

# Clean start (kill existing processes)
npm run dev:clean

# Check port usage
npm run ports:check

# Kill development server
npm run kill:dev
```

## Code Changes Required

### 1. Update Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev -p 3000",
    "dev:clean": "pkill -f 'next dev' 2>/dev/null || true && next dev -p 3000",
    "dev:kill": "pkill -f 'next dev' 2>/dev/null || true",
    "ports:status": "echo 'Port 3000:' && lsof -i :3000 2>/dev/null || echo 'Available'"
  }
}
```

### 2. Create Port Management Script
```bash
#!/bin/bash
# scripts/dev.sh

set -e

PORT=${PORT:-3000}
PROJECT_NAME="bluewhite"

echo "🚀 Starting $PROJECT_NAME development server..."

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to kill process on port
kill_port() {
    local port=$1
    echo "🔫 Killing process on port $port..."
    sudo lsof -ti:$port 2>/dev/null | xargs kill -9 2>/dev/null || true
    sleep 1
}

# Check if port is available
if check_port $PORT; then
    echo "⚠️  Port $PORT is in use."
    echo "📋 Current processes on port $PORT:"
    lsof -i :$PORT
    
    read -p "🤔 Kill existing process and continue? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kill_port $PORT
    else
        echo "❌ Aborted. Please free port $PORT manually."
        exit 1
    fi
fi

# Start the development server
echo "✅ Starting Next.js on port $PORT..."
next dev -p $PORT
```

### 3. Update Next.js Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PORT: process.env.PORT || 3000
  },
  // Ensure consistent port usage
  experimental: {
    // Add any experimental features if needed
  }
}

module.exports = nextConfig
```

### 4. Create Development Environment Script
```bash
#!/bin/bash
# scripts/setup-dev.sh

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
fi

# Make scripts executable
chmod +x scripts/dev.sh
chmod +x scripts/setup-dev.sh

echo "✅ Development environment setup complete!"
echo "🚀 Run 'npm run dev' to start the development server"
```

## Testing Strategy

### 1. Port Availability Testing
```bash
# Test port availability
npm run ports:status

# Test port conflict resolution
npm run dev:clean
```

### 2. Development Workflow Testing
```bash
# Test clean start
npm run dev:clean

# Test port conflict handling
# Start another process on port 3000, then run npm run dev
```

### 3. Environment Testing
```bash
# Test with different ports
PORT=3001 npm run dev
PORT=3002 npm run dev
```

## Success Criteria

### Primary Goals
- [ ] Project starts consistently on port 3000
- [ ] No port conflicts during development
- [ ] Single command to start development server
- [ ] Automatic port conflict resolution

### Secondary Goals
- [ ] Easy port switching capability
- [ ] Clear error messages for port conflicts
- [ ] Development environment documentation
- [ ] Automated setup process

## Risk Mitigation

### High-Risk Scenarios
1. **Killing wrong processes**
   - Mitigation: Use specific process names and confirm before killing

2. **Port conflicts with system services**
   - Mitigation: Use higher port numbers (3000-3010 range)

3. **Environment variable conflicts**
   - Mitigation: Use project-specific variable names

### Medium-Risk Scenarios
1. **Multiple development environments**
   - Mitigation: Use different port ranges for different projects

2. **Firewall blocking ports**
   - Mitigation: Provide alternative port options

## Implementation Timeline

### Day 1: Immediate Fix
- Kill conflicting processes
- Update package.json scripts
- Test basic port configuration

### Day 2: Enhanced Setup
- Create port management scripts
- Update Next.js configuration
- Test port conflict resolution

### Day 3: Documentation & Testing
- Create setup documentation
- Test all scenarios
- Document troubleshooting steps

## Resources Required

### Technical Resources
- Terminal access with sudo privileges
- Process management tools (lsof, ps, kill)
- Shell scripting knowledge

### Access Requirements
- Project directory access
- Environment variable configuration
- Package.json modification permissions

## Documentation Updates

### Required Documentation
- Development setup guide
- Port management procedures
- Troubleshooting guide
- Environment configuration guide

### Maintenance Procedures
- Regular port cleanup
- Process monitoring
- Environment variable management
- Development workflow documentation

## Quick Commands Reference

### Start Development
```bash
# Standard start
npm run dev

# Clean start (kill existing processes)
npm run dev:clean

# Custom port
PORT=3001 npm run dev
```

### Port Management
```bash
# Check port status
npm run ports:status

# Kill development server
npm run dev:kill

# Kill all Node processes (use with caution)
pkill -f node
```

### Troubleshooting
```bash
# Find what's using port 3000
lsof -i :3000

# Kill process on specific port
sudo lsof -ti:3000 | xargs kill -9

# Check all Node processes
ps aux | grep node
```

## Conclusion

This specification provides a comprehensive approach to resolving port conflicts and ensuring consistent development environment setup. The implementation focuses on automatic conflict resolution, clear error messages, and easy port management.

The solution includes both immediate fixes and long-term strategies for maintaining a stable development environment with a single, consistent port configuration. 