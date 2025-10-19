#!/bin/bash

echo "🚗 Starting GreenRoute Application..."
echo ""

# Start backend server
echo "📡 Starting backend server on port 3000..."
cd Server
node server.js &
BACKEND_PID=$!
cd ..

echo "✅ Backend running (PID: $BACKEND_PID)"
echo ""

# Start frontend server
echo "🌐 Starting frontend server on port 8080..."
python3 -m http.server 8080 > /dev/null 2>&1 &
FRONTEND_PID=$!

echo "✅ Frontend running (PID: $FRONTEND_PID)"
echo ""

# Wait for servers to start
sleep 2

# Open browser
echo "🚀 Opening GreenRoute in browser..."
open http://localhost:8080/landing.html

echo ""
echo "────────────────────────────────────────"
echo "✅ GreenRoute is running!"
echo "────────────────────────────────────────"
echo ""
echo "Backend:  http://localhost:3000"
echo "Frontend: http://localhost:8080/landing.html"
echo ""
echo "To stop the servers:"
echo "  kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Or run: pkill -f 'node server.js' && pkill -f 'python3 -m http.server'"
echo "────────────────────────────────────────"
