# NordLion Setup Guide

## 🚀 Complete Installation & Deployment Guide

This guide will walk you through setting up the NordLion enterprise automotive platform from scratch.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Database Configuration](#database-configuration)
4. [Environment Variables](#environment-variables)
5. [Running the Application](#running-the-application)
6. [Production Deployment](#production-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js** 18.17.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.6.7 or higher (comes with Node.js)
- **PostgreSQL** 14 or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))

### Recommended Tools

- **VS Code** with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features
- **Postman** or **Insomnia** for API testing
- **pgAdmin** or **TablePlus** for database management

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/lucdemierre/nordlion_updated.git
cd nordlion_updated
```

### 2. Install Dependencies

```bash
npm install
```

This will install all frontend and backend dependencies listed in `package.json`.

### 3. Verify Installation

```bash
node --version  # Should show v18.17.0 or higher
npm --version   # Should show 9.6.7 or higher
psql --version  # Should show PostgreSQL 14 or higher
```

---

## Database Configuration

### 1. Install PostgreSQL

If you haven't installed PostgreSQL:

**macOS (using Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Windows:**
- Download installer from [postgresql.org](https://www.postgresql.org/download/windows/)
- Run installer and follow the setup wizard
- Remember the password you set for the `postgres` user

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

**Option A: Using psql command line**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE nordlion_db;

# Create user (optional, for better security)
CREATE USER nordlion_user WITH PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE nordlion_db TO nordlion_user;

# Exit psql
\q
```

**Option B: Using pgAdmin**

1. Open pgAdmin
2. Right-click "Databases" → "Create" → "Database"
3. Name: `nordlion_db`
4. Owner: `postgres` (or create a new user)
5. Click "Save"

### 3. Test Database Connection

```bash
psql -U postgres -d nordlion_db -c "SELECT version();"
```

You should see PostgreSQL version information.

---

## Environment Variables

### 1. Create .env File

```bash
cp .env.example .env
```

### 2. Configure Environment Variables

Open `.env` and update with your values:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/nordlion_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nordlion_db
DB_USER=postgres
DB_PASSWORD=your_secure_password

# API Configuration
API_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001

# JWT Secrets (CHANGE THESE IN PRODUCTION!)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your-refresh-secret-key-min-32-characters
REFRESH_TOKEN_EXPIRES_IN=30d

# Next.js Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-min-32-characters

# Email Configuration (Optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
EMAIL_FROM=noreply@nordlionauto.com

# Stripe (Optional - for payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_public

# Environment
NODE_ENV=development
PORT=3001
CLIENT_URL=http://localhost:3000
```

### 3. Generate Secure Secrets

For production, generate secure random strings:

```bash
# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate another for refresh token
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate NextAuth secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Running the Application

### Development Mode

**Terminal 1 - Backend API:**
```bash
npm run server:dev
```

Backend will run on `http://localhost:3001`

You should see:
```
✅ Database connection established successfully
✅ Database models synchronized
🚀 NordLion API server running on port 3001
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### Verify Everything Works

1. **Backend Health Check:**
   ```bash
   curl http://localhost:3001/health
   ```
   Should return: `{"status":"OK","message":"NordLion API is running"}`

2. **Frontend:**
   Open browser to `http://localhost:3000`
   You should see the NordLion homepage

3. **Database Connection:**
   Check terminal logs for successful database sync

---

## Production Deployment

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Deploy Frontend to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables in Vercel Dashboard:**
   - Go to your project settings
   - Add all `NEXT_PUBLIC_*` variables
   - Add `NEXTAUTH_SECRET` and `NEXTAUTH_URL`

#### Deploy Backend to Railway

1. **Create Railway Account:** [railway.app](https://railway.app)

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository

3. **Add PostgreSQL:**
   - Click "+ New"
   - Select "Database" → "PostgreSQL"
   - Railway will auto-configure DATABASE_URL

4. **Configure Environment Variables:**
   - Go to your backend service settings
   - Add all environment variables from `.env`
   - Make sure to use production values

5. **Set Start Command:**
   ```
   npm run server
   ```

6. **Deploy:**
   - Railway will automatically deploy on push to main branch

### Option 2: DigitalOcean App Platform

1. **Create Account:** [digitalocean.com](https://www.digitalocean.com)

2. **Create App:**
   - Go to Apps → Create App
   - Connect GitHub repository
   - DigitalOcean will detect Next.js

3. **Add PostgreSQL Database:**
   - In app settings, add a database component
   - Select PostgreSQL
   - Connection string will be auto-injected

4. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Run Command: `npm start`

5. **Set Environment Variables:**
   - Add all production variables
   - Use provided DATABASE_URL

### Option 3: AWS (Advanced)

**Frontend (S3 + CloudFront):**
```bash
npm run build
# Upload .next/static and public to S3
# Configure CloudFront distribution
```

**Backend (EC2 or ECS):**
- Set up EC2 instance or ECS cluster
- Install Node.js and PostgreSQL
- Clone repository and run production build
- Use PM2 for process management:
  ```bash
  npm i -g pm2
  pm2 start npm --name "nordlion-api" -- run server
  pm2 save
  pm2 startup
  ```

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed

**Error:** `Unable to connect to the database`

**Solutions:**
- Verify PostgreSQL is running: `pg_isready`
- Check credentials in `.env`
- Ensure database exists: `psql -U postgres -l`
- Check if port 5432 is available: `lsof -i :5432`

#### 2. Port Already in Use

**Error:** `EADDRINUSE: address already in use :::3000`

**Solutions:**
```bash
# Find process using port
lsof -ti:3000

# Kill process
kill -9 $(lsof -ti:3000)

# Or use different port
PORT=3002 npm run dev
```

#### 3. Module Not Found

**Error:** `Cannot find module '@/components/...'`

**Solutions:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

#### 4. TypeScript Errors

**Solutions:**
```bash
# Check TypeScript version
npx tsc --version

# Rebuild TypeScript
npm run build
```

#### 5. Database Migration Issues

**Error:** `Relation does not exist`

**Solutions:**
```bash
# Drop and recreate database (DEVELOPMENT ONLY)
psql -U postgres -c "DROP DATABASE IF EXISTS nordlion_db;"
psql -U postgres -c "CREATE DATABASE nordlion_db;"

# Restart backend to sync models
npm run server:dev
```

### Getting Help

1. **Check Logs:**
   - Backend: Check terminal running server
   - Frontend: Check browser console (F12)
   - Database: Check PostgreSQL logs

2. **Documentation:**
   - [Next.js Docs](https://nextjs.org/docs)
   - [Express Docs](https://expressjs.com/)
   - [PostgreSQL Docs](https://www.postgresql.org/docs/)
   - [Sequelize Docs](https://sequelize.org/)

3. **Contact Support:**
   - Email: support@nordlionauto.com
   - GitHub Issues: [Create Issue](https://github.com/lucdemierre/nordlion_updated/issues)

---

## Next Steps

1. **Create Admin User:**
   - Use `/api/auth/register` endpoint
   - Manually update role to 'superadmin' in database

2. **Add Sample Data:**
   - Use admin dashboard to add vehicles
   - Or import from CSV/JSON

3. **Configure Email:**
   - Set up SMTP credentials for notifications
   - Test password reset flow

4. **Set Up Payment Processing:**
   - Create Stripe account
   - Add Stripe keys to environment
   - Test checkout flow

5. **Customize Branding:**
   - Update logo and colors in `tailwind.config.ts`
   - Modify homepage content
   - Add your vehicle images

---

## Security Checklist

Before going to production:

- [ ] Change all default secrets and passwords
- [ ] Enable HTTPS/SSL certificates
- [ ] Set up rate limiting
- [ ] Configure CORS properly
- [ ] Enable database backups
- [ ] Set up monitoring and alerts
- [ ] Review and update security headers
- [ ] Test authentication flows
- [ ] Implement input sanitization
- [ ] Set up logging and error tracking

---

For more information, see the main [README.md](./README.md) file.
