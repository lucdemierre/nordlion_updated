#!/bin/bash

# NordLion Quick Setup Script
# This script automates the initial setup process

set -e

echo "🦁 Welcome to NordLion Setup!"
echo "================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed or not in PATH."
    echo "   Please install PostgreSQL 14+ and try again."
    echo "   Download from: https://www.postgresql.org/download/"
    exit 1
fi

echo "✅ PostgreSQL detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env file
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ .env file created from .env.example"
        echo "⚠️  Please update .env with your configuration"
    else
        echo "⚠️  .env.example not found. Please create .env manually."
    fi
else
    echo "✅ .env file already exists"
fi

# Generate secrets
echo ""
echo "🔐 Generating secure secrets..."
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
REFRESH_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
NEXTAUTH_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

echo ""
echo "Generated secrets (save these to your .env file):"
echo "JWT_SECRET=$JWT_SECRET"
echo "REFRESH_TOKEN_SECRET=$REFRESH_SECRET"
echo "NEXTAUTH_SECRET=$NEXTAUTH_SECRET"

# Database setup prompt
echo ""
echo "🗄️  Database Setup"
echo "=================="
read -p "Would you like to create the database now? (y/n): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter PostgreSQL username [postgres]: " DB_USER
    DB_USER=${DB_USER:-postgres}
    
    read -p "Enter database name [nordlion_db]: " DB_NAME
    DB_NAME=${DB_NAME:-nordlion_db}
    
    echo "Creating database: $DB_NAME"
    psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;" 2>/dev/null || echo "Database may already exist"
    
    if [ $? -eq 0 ]; then
        echo "✅ Database created successfully"
    else
        echo "⚠️  Could not create database. It may already exist or you may need to enter password."
    fi
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your configuration"
echo "2. Run 'npm run server:dev' to start the backend"
echo "3. In another terminal, run 'npm run dev' to start the frontend"
echo ""
echo "For detailed instructions, see SETUP.md"
echo ""
echo "Happy coding! 🦁"
