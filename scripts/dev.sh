#!/bin/bash

# Development start script
# Starts both frontend and backend in parallel

set -e

echo "🦁 Starting NordLion Development Servers"
echo "========================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "   Run 'npm run setup' first or copy .env.example to .env"
    exit 1
fi

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill 0
}

trap cleanup EXIT

# Start backend
echo "🚀 Starting backend API on port 3001..."
npm run server:dev &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "🚀 Starting frontend on port 3000..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers started!"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
