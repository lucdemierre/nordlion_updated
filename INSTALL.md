# 🚀 NordLion Installation Guide

## ⚠️ IMPORTANT: Follow These Steps EXACTLY

### Step 1: Pull Latest Code

```bash
git pull origin main
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

This installs:
- Next.js, React, TypeScript
- Tailwind CSS
- Framer Motion
- Chart.js and react-chartjs-2
- Lucide icons

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

This installs:
- Express
- Sequelize + PostgreSQL
- Socket.IO
- JWT, bcrypt
- All middleware

### Step 4: Create .env File

Create `.env` in the ROOT directory (not in backend):

```env
# Database - UPDATE WITH YOUR PGADMIN PASSWORD
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD_HERE@localhost:5432/nordlion_db

# JWT Secret - Generate a long random string
JWT_SECRET=nordlion-super-secret-jwt-key-change-this-in-production-min-32-chars

# Backend
PORT=3001
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Step 5: Create Database in PGAdmin

1. Open **PGAdmin 4**
2. Connect to your PostgreSQL server
3. Right-click **"Databases"**
4. Select **"Create"** > **"Database..."**
5. Name: `nordlion_db`
6. Click **"Save"**

**OR via command line:**

```bash
psql -U postgres -c "CREATE DATABASE nordlion_db;"
```

### Step 6: Seed the Database

```bash
node scripts/seed-database.js
```

You should see:
```
✅ Created 5 users
✅ Created 10 luxury vehicles
✅ Created 3 orders
✅ Created 4 reviews
✅ Created 6 messages

🔐 Login Credentials:
   Admin:  admin@nordlion.com / Admin123!@#
   User:   john.hamilton@example.com / User123!@#
   Dealer: dealer@elitecars.com / Dealer123!@#
```

### Step 7: Start Backend Server

Open **Terminal 1**:

```bash
cd backend
npm run dev
```

You should see:
```
============================================================
🚀 NordLion Backend Server Running
============================================================
🌍 Environment: development
🔌 Port: 3001
📊 Health: http://localhost:3001/health
🔌 API: http://localhost:3001/api
🔌 Socket.IO: Enabled
============================================================
```

### Step 8: Start Frontend Server

Open **Terminal 2** (NEW terminal, leave backend running):

```bash
npm run dev
```

You should see:
```
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000
```

### Step 9: Test Everything

1. Open browser: http://localhost:3000
2. You should see the **public homepage**
3. Click **"Login"** (top right)
4. Login: `admin@nordlion.com` / `Admin123!@#`
5. Check all pages work:
   - ✅ Dashboard
   - ✅ Users
   - ✅ Vehicles (can add/edit/view/delete)
   - ✅ Orders
   - ✅ Messages
   - ✅ Analytics (with charts)

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'socket.io'"

**Fix:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
cd ..
```

### Error: "Cannot find module check-database.js"

**Fix:** You're running from wrong directory.
```bash
# Make sure you're in the root directory
cd /c/xampp/htdocs/nordlion_updated
node scripts/check-database.js
```

### Error: "Database connection failed"

**Check:**
1. PostgreSQL is running (check PGAdmin)
2. Database `nordlion_db` exists
3. `.env` file has correct password
4. Port 5432 is not blocked

**Fix:**
```bash
# Test PostgreSQL connection
psql -U postgres -c "\l"

# If database doesn't exist
psql -U postgres -c "CREATE DATABASE nordlion_db;"
```

### Error: "Port 3001 already in use"

**Fix:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

### Analytics page shows blank

**Fix:**
```bash
# Install chart dependencies
npm install chart.js react-chartjs-2

# Restart frontend
# Press Ctrl+C in frontend terminal
npm run dev
```

### Vehicle modals don't open

**Fix:**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

---

## ✅ Installation Checklist

- [ ] Pulled latest code (`git pull origin main`)
- [ ] Installed frontend dependencies (`npm install`)
- [ ] Installed backend dependencies (`cd backend && npm install`)
- [ ] Created `.env` file with correct DATABASE_URL
- [ ] Created `nordlion_db` database in PGAdmin
- [ ] Ran seed script (`node scripts/seed-database.js`)
- [ ] Backend running on port 3001
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can login with admin@nordlion.com
- [ ] Dashboard loads
- [ ] Analytics page shows charts
- [ ] Can add/edit/view vehicles
- [ ] Messages work
- [ ] No duplicate sidebars

---

## 🎯 Quick Start (After Installation)

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2 (new terminal)
npm run dev

# Browser
# Go to: http://localhost:3000
# Login: admin@nordlion.com / Admin123!@#
```

---

**Need help? Run these diagnostic commands:**

```bash
# Check if database exists
psql -U postgres -l | grep nordlion

# Check if backend dependencies installed
ls backend/node_modules | wc -l
# Should show a number > 100

# Check if frontend dependencies installed  
ls node_modules | wc -l
# Should show a number > 100

# Test backend health
curl http://localhost:3001/health

# Test frontend
curl http://localhost:3000
```
