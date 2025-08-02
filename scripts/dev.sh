#!/bin/bash

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