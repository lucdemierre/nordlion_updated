# NordLion Enterprise Platform - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- Supabase account (free tier works)
- Code editor (VS Code recommended)

---

## 📦 Installation

### 1. Clone & Install
```bash
cd /c/xampp/htdocs/nordlion_updated
git pull origin main
npm install
```

### 2. Install Required Dependencies
```bash
npm install @supabase/supabase-js
npm install bcryptjs
npm install @types/bcryptjs --save-dev
```

---

## 🗄️ Database Setup (Supabase)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization
4. Enter project details:
   - Name: `nordlion-production`
   - Database Password: (save this!)
   - Region: Europe West (London) or closest
5. Wait for project creation (~2 minutes)

### Step 2: Run Migrations
1. In Supabase Dashboard, go to **SQL Editor**
2. Copy contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and run
4. Copy contents of `supabase/migrations/002_seed_data.sql`
5. Paste and run

### Step 3: Get API Keys
1. Go to **Settings** → **API**
2. Copy these values:
   - `Project URL`
   - `anon/public key`
   - `service_role key` (keep secret!)

---

## ⚙️ Environment Configuration

### Create .env.local file
```bash
cp .env.example .env.local
```

### Edit .env.local with your values:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 🏃 Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 👥 Test Accounts

### Client Account
- Email: `client@nordlionauto.com`
- Password: `client123`
- Dashboard: `/client`

### Broker Account
- Email: `broker@nordlionauto.com`
- Password: `broker123`
- Dashboard: `/broker`

### Admin Account
- Email: `admin@nordlionauto.com`
- Password: `admin123`
- Dashboard: `/admin`

---

## 📁 Project Structure

```
nordlion_updated/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── client/            # Client dashboard
│   │   ├── broker/            # Broker dashboard
│   │   └── admin/             # Admin dashboard
│   ├── components/            # Reusable components
│   ├── lib/                   # Utilities
│   │   ├── supabase.ts       # Database client
│   │   ├── auth.ts           # Auth utilities
│   │   └── db/               # Database queries
│   └── emails/                # Email templates
├── supabase/
│   └── migrations/            # Database migrations
├── public/                    # Static assets
└── .env.local                 # Environment variables
```

---

## 🎨 Features Overview

### Client Dashboard (7 pages)
- ✅ Dashboard with widgets
- ✅ Order tracking
- ✅ Messaging system
- ✅ Document management
- ✅ Wishlist
- ✅ Settings
- ✅ Profile

### Broker Dashboard (5 pages)
- ✅ Dashboard with analytics
- ✅ Client management
- ✅ Inventory management
- ✅ Messages
- ✅ Profile

### Admin Dashboard (5 pages)
- ✅ Control center
- ✅ User management
- ✅ Vehicle management
- ✅ Reports & analytics
- ✅ Profile

---

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL

# Test connection
npm run test:db
```

### Build Errors
```bash
# Clear cache
rm -rf .next
npm run build
```

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

---

## 🚀 Deployment (Coming in Phase 9)

### Vercel Deployment
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables Needed
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`

---

## 📚 API Documentation

### Authentication
```typescript
POST /api/auth/login
Body: { email, password }

POST /api/auth/register
Body: { email, password, firstName, lastName }
```

### Vehicles
```typescript
GET /api/vehicles?status=available
POST /api/vehicles
PUT /api/vehicles/[id]
DELETE /api/vehicles/[id]
```

### Orders
```typescript
GET /api/orders?userId=xxx
POST /api/orders
```

### Messages
```typescript
GET /api/messages?conversationId=xxx
POST /api/messages
```

---

## 🎯 Next Steps

### Phase 7: Payment Integration
- Stripe setup
- Payment processing
- Invoice generation

### Phase 8: Media Assets
- Vehicle images
- Background videos
- Logo optimization

### Phase 9: Production Deployment
- Vercel setup
- Domain configuration
- SSL certificates
- Performance optimization

---

## 📞 Support

For issues or questions:
- Check GitHub Issues
- Review documentation
- Contact development team

---

## 🔒 Security Notes

- Never commit `.env.local` to git
- Keep service role key secret
- Use row-level security in production
- Enable 2FA on all accounts
- Regular security audits

---

**Built with ❤️ for NordLion by Enterprise Development Team**
