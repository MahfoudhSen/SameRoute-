#!/bin/bash

# GreenRoute Quick Start Script
# This script starts the GreenRoute backend server and opens the frontend

echo "🚗 Starting GreenRoute..."
echo ""

# Check if we're in the right directory
if [ ! -d "Server" ]; then
    echo "❌ Error: Server directory not found!"
    echo "Please run this script from the GreenRoute root directory"
    exit 1
fi

# Start the backend server
echo "📡 Starting backend server..."
cd Server

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start server in background
node server.js &
SERVER_PID=$!

echo "✅ Server started on http://localhost:3000 (PID: $SERVER_PID)"
echo ""

# Wait a moment for server to start
sleep 2

# Open frontend in default browser
echo "🌐 Opening frontend..."
cd ../Frontend

# Try to open in browser (macOS)
if command -v open &> /dev/null; then
    open landing.html
    echo "✅ Frontend opened in browser!"
else
    echo "ℹ️  Please open this file in your browser:"
    echo "   file://$(pwd)/landing.html"
fi

echo ""
echo "────────────────────────────────────────"
echo "🎉 GreenRoute is running!"
echo "────────────────────────────────────────"
echo ""
echo "Backend:  http://localhost:3000"
echo "Frontend: file://$(pwd)/landing.html"
echo ""
echo "To stop the server: kill $SERVER_PID"
echo "────────────────────────────────────────"
echo ""
echo "Happy ride sharing! 🚗💚"
