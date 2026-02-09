# 🔧 QUICK FIX - Your Current Errors

## 🚨 Error 1: "Cannot find module 'dotenv'"

**Fix:**
```bash
npm install
```

This will install dotenv and other missing root dependencies.

---

## 🚨 Error 2: "password authentication failed for user postgres"

This means your `.env` file has the wrong PostgreSQL password.

### **How to Find Your PostgreSQL Password:**

#### Method 1: You Know Your Password
If you remember your PostgreSQL password, skip to **Update .env File** below.

#### Method 2: Reset PostgreSQL Password (Windows)

1. **Open Command Prompt as Administrator**

2. **Find PostgreSQL bin folder** (usually one of these):
   ```
   C:\Program Files\PostgreSQL\15\bin
   C:\Program Files\PostgreSQL\14\bin
   C:\PostgreSQL\15\bin
   ```

3. **Connect to PostgreSQL:**
   ```bash
   psql -U postgres
   ```

4. **If it asks for password and you don't know it**, you need to reset it:

   a. Open: `C:\Program Files\PostgreSQL\15\data\pg_hba.conf`
   
   b. Find this line:
   ```
   host    all             all             127.0.0.1/32            scram-sha-256
   ```
   
   c. Change `scram-sha-256` to `trust`:
   ```
   host    all             all             127.0.0.1/32            trust
   ```
   
   d. Restart PostgreSQL service:
   - Open Services (Win + R, type `services.msc`)
   - Find "postgresql-x64-15" (or your version)
   - Right-click > Restart
   
   e. Now connect without password:
   ```bash
   psql -U postgres
   ```
   
   f. Set new password:
   ```sql
   ALTER USER postgres WITH PASSWORD 'YourNewPassword123';
   ```
   
   g. Change `pg_hba.conf` back to `scram-sha-256`
   
   h. Restart PostgreSQL service again

#### Method 3: Check PGAdmin

1. Open **PGAdmin 4**
2. When you connect to your server, it asks for password
3. If you have "Save Password" checked, you can:
   - Right-click your server
   - Properties
   - Connection tab
   - You might see the password (if saved)

---

### **Update .env File**

Once you know your password:

1. **Open** `.env` file (create if doesn't exist)
2. **Update** with YOUR password:

```env
DATABASE_URL=postgresql://postgres:YOUR_ACTUAL_PASSWORD@localhost:5432/nordlion_db
JWT_SECRET=nordlion-super-secret-jwt-key-change-this-in-production-min-32-chars
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Example with real password:**
```env
DATABASE_URL=postgresql://postgres:MyPassword123@localhost:5432/nordlion_db
```

---

## ✅ Complete Fix Sequence

```bash
# 1. Install root dependencies (fixes dotenv error)
npm install

# 2. Make sure .env exists with CORRECT password
# Edit .env file and put your real PostgreSQL password

# 3. Test database connection
node scripts/check-database.js

# If this works, continue:

# 4. Seed database
node scripts/seed-database.js

# 5. Start backend (Terminal 1)
cd backend
npm run dev

# 6. Start frontend (Terminal 2 - NEW terminal)
npm run dev
```

---

## 📝 What Each Command Does:

| Command | What It Does |
|---------|-------------|
| `npm install` | Installs dotenv, sequelize, pg, bcryptjs to root |
| `node scripts/check-database.js` | Tests if database connection works |
| `node scripts/seed-database.js` | Creates tables and adds sample data |
| `cd backend && npm run dev` | Starts Express + Socket.IO server |
| `npm run dev` | Starts Next.js frontend |

---

## 🚨 If You Still Get Password Error:

### Option A: Use Default PostgreSQL Password

Many PostgreSQL installations use these default passwords:
- `postgres`
- `root`
- `admin`
- `password`

Try each in your `.env` file.

### Option B: Create New PostgreSQL User

```bash
psql -U postgres
```

Then:
```sql
CREATE USER nordlion WITH PASSWORD 'NordLion123!';
ALTER USER nordlion CREATEDB;
CREATE DATABASE nordlion_db OWNER nordlion;
```

Then use this in `.env`:
```env
DATABASE_URL=postgresql://nordlion:NordLion123!@localhost:5432/nordlion_db
```

---

## ✅ Success Indicators:

### When `node scripts/check-database.js` works:
```
🔍 NordLion Database Health Check
============================================================
📡 Testing database connection...
✅ Database connection successful!
```

### When `node scripts/seed-database.js` works:
```
✅ Created 5 users
✅ Created 10 luxury vehicles
✅ Created 3 orders
```

### When backend starts successfully:
```
🚀 NordLion Backend Server Running
✅ Database connection established
✅ Database models synced
🔌 Port: 3001
```

---

## 🎯 Quick Test Commands

```bash
# Test if PostgreSQL is running
psql -U postgres -c "SELECT version();"

# List databases
psql -U postgres -c "\l"

# Check if nordlion_db exists
psql -U postgres -c "\l" | grep nordlion
```

---

**Once you fix the password in .env, everything will work!** 🚀
