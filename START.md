# 🚀 NordLion Startup Guide

## Quick Start Commands

You need **TWO terminal windows** (or tabs) to run NordLion:

### Terminal 1️⃣ - Backend Server

```bash
cd backend
npm run dev
```

**You should see:**
```
🦁 NordLion Backend Server
✅ Database connected successfully
✅ Server running on http://localhost:3001
✅ Socket.IO ready for real-time messaging
```

### Terminal 2️⃣ - Frontend Server

```bash
npm run dev
```

**You should see:**
```
▲ Next.js 14.2.3
- Local: http://localhost:3000
✓ Ready in 2.5s
```

---

## 🗄️ PGAdmin 4 Setup

### First Time Setup

1. **Open PGAdmin 4**
   - Windows: Start Menu > PGAdmin 4
   - Mac: Applications > PGAdmin 4
   - Linux: `pgadmin4`

2. **Create Server Connection**
   - Right-click "Servers" > Register > Server
   - **General Tab:**
     - Name: `NordLion Local`
   - **Connection Tab:**
     - Host: `localhost`
     - Port: `5432`
     - Maintenance database: `postgres`
     - Username: `postgres`
     - Password: `[your password]`
     - Save password: ✅

3. **Create Database**
   - Expand "NordLion Local"
   - Right-click "Databases" > Create > Database
   - Name: `nordlion_db`
   - Owner: `postgres`
   - Click "Save"

4. **Verify Database**
   ```bash
   npm run check-db
   ```

5. **Seed Database**
   ```bash
   npm run seed
   ```

---

## 🔧 Complete Startup Checklist

### 1. Prerequisites Check
```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Check PostgreSQL is running
pg_isready
```

### 2. First Time Setup
```bash
# Clone repository (if not done)
git clone https://github.com/lucdemierre/nordlion_updated.git
cd nordlion_updated

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with your database password
nano .env  # or use any text editor
```

### 3. Database Setup
```bash
# Check database connection
npm run check-db

# Seed database with sample data
npm run seed
```

### 4. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 5. Access Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **PGAdmin 4:** http://localhost:5050 (or desktop app)

---

## 🔐 Default Login Credentials

### Admin Account
- **Email:** admin@nordlion.com
- **Password:** Admin123!@#
- **Access:** Full system access

### Dealer Account
- **Email:** dealer@elitecars.com
- **Password:** Dealer123!@#
- **Access:** Dealer dashboard

### Client Account
- **Email:** john.hamilton@example.com
- **Password:** User123!@#
- **Access:** Client dashboard

---

## 🛑 Troubleshooting

### Port Already in Use

**Backend (Port 3001):**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID [PID_NUMBER] /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

**Frontend (Port 3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Database Connection Issues

```bash
# Check PostgreSQL is running
# Windows
services.msc  # Look for "postgresql-x64-14"

# Mac
brew services list | grep postgresql

# Linux
sudo systemctl status postgresql

# Restart PostgreSQL if needed
# Windows: Use Services app
# Mac: brew services restart postgresql
# Linux: sudo systemctl restart postgresql
```

### Clear Cache and Restart

```bash
# Stop both servers (Ctrl+C in both terminals)

# Clear Next.js cache
rm -rf .next

# Clear node_modules if needed
rm -rf node_modules
npm install

# Restart servers
cd backend && npm run dev  # Terminal 1
npm run dev                # Terminal 2
```

---

## 📊 Monitoring Logs

### Backend Logs
The backend terminal will show:
- ✅ Database connections
- 🔵 API requests (GET, POST, PUT, DELETE)
- 🟢 Socket.IO connections
- ❌ Errors and warnings

### Frontend Logs
The frontend terminal will show:
- ✓ Page compilations
- ⚠ Build warnings
- Browser console logs appear in browser DevTools (F12)

---

## 🎯 Testing the System

### 1. Test Backend API
```bash
# Health check
curl http://localhost:3001/health

# Should return: {"status":"healthy","timestamp":"..."}
```

### 2. Test Database
```bash
npm run check-db
```

### 3. Test Frontend
- Open http://localhost:3000
- Login with admin credentials
- Check if sidebar loads
- Navigate to different pages

---

## 🔄 Daily Development Workflow

### Morning Startup
```bash
# Terminal 1
cd nordlion_updated/backend
npm run dev

# Terminal 2  
cd nordlion_updated
npm run dev
```

### End of Day
```bash
# Press Ctrl+C in both terminals
# Commit your changes
git add .
git commit -m "Your commit message"
git push
```

---

## 🚀 Production Deployment

### Build for Production
```bash
# Build frontend
npm run build

# Test production build locally
npm start

# Backend runs same in production
cd backend
NODE_ENV=production npm start
```

---

## 📱 Useful Commands

```bash
# Check all running Node processes
ps aux | grep node

# Check all ports in use
# Windows: netstat -ano
# Mac/Linux: lsof -i -P -n | grep LISTEN

# View real-time backend logs
cd backend && npm run dev

# View real-time database queries (in PGAdmin)
# Tools > Server Status > Dashboard

# Clear all logs
clear  # Mac/Linux
cls    # Windows
```

---

## 🎨 Development Tips

### Hot Reload
- Frontend: Changes auto-reload in browser
- Backend: Nodemon auto-restarts server
- Database: Manual restart required for schema changes

### Best Practices
1. Always start backend first (Terminal 1)
2. Then start frontend (Terminal 2)
3. Keep both terminals visible to monitor logs
4. Use PGAdmin to inspect database changes
5. Check browser console (F12) for frontend errors

---

**Need help? Check the main [README.md](./README.md) for detailed documentation.**
