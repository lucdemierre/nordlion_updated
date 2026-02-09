# 🦁 NordLion - Luxury Automotive Platform

> Enterprise-grade luxury vehicle marketplace with real-time messaging, order management, and analytics.

## ✨ Features

- 🚗 **Vehicle Management** - Full CRUD for luxury vehicles
- 👥 **User Management** - Admin, Dealer, and Client roles
- 📊 **Analytics Dashboard** - Revenue, sales, and performance metrics
- 💬 **Real-time Messaging** - Socket.IO powered chat system
- 🛒 **Order Management** - Complete order lifecycle tracking
- 🎨 **Modern UI** - Dark theme with smooth animations
- 🔐 **Secure Authentication** - JWT-based auth system
- 📱 **Responsive Design** - Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+ (PGAdmin 4)
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/lucdemierre/nordlion_updated.git
cd nordlion_updated

# Install dependencies
npm install
cd backend && npm install && cd ..
```

### Database Setup

1. **Create database in PGAdmin:**
   - Open PGAdmin 4
   - Right-click "Databases" > Create > Database
   - Name: `nordlion_db`
   - Click Save

2. **Configure environment:**

Create `.env` in root directory:

```env
# Database (Update with YOUR credentials)
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/nordlion_db

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long

# Backend
PORT=3001
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

3. **Check database connection:**

```bash
node scripts/check-database.js
```

You should see:
```
✅ Database connection successful!
✅ Found tables
🎉 Database Status: HEALTHY
```

4. **Seed database:**

```bash
node scripts/seed-database.js
```

This creates:
- ✅ 5 users (admin, users, dealer)
- ✅ 10 luxury vehicles (Ferrari, Lamborghini, Bugatti, Pagani, etc.)
- ✅ 3 complete orders
- ✅ 4 customer reviews
- ✅ 6 message conversations

### Run Application

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

### Login

Go to http://localhost:3000 and login:

- **Admin**: admin@nordlion.com / Admin123!@#
- **User**: john.hamilton@example.com / User123!@#
- **Dealer**: dealer@elitecars.com / Dealer123!@#

## 📁 Project Structure

```
nordlion_updated/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin dashboard pages
│   │   │   ├── page.tsx    # Dashboard with stats
│   │   │   ├── users/      # User management
│   │   │   ├── vehicles/   # Vehicle CRUD (Add/Edit/View/Delete)
│   │   │   ├── orders/     # Order management
│   │   │   ├── messages/   # Real-time messaging
│   │   │   └── analytics/  # Analytics with charts
│   │   ├── client/         # Client dashboard
│   │   ├── broker/         # Broker dashboard
│   │   └── auth/           # Authentication pages
│   ├── components/
│   │   └── Sidebar.tsx     # Universal sidebar component
│   └── lib/
│       └── auth.ts         # Auth utilities
├── backend/
│   ├── server.js           # Express + Socket.IO server
│   ├── models/             # Sequelize models
│   ├── routes/             # API routes
│   ├── controllers/        # Business logic
│   └── middleware/         # Auth & validation
├── scripts/
│   ├── seed-database.js    # Database seeder
│   └── check-database.js   # Database health check
└── docs/
    ├── SETUP_GUIDE.md      # Detailed setup instructions
    └── API_INTEGRATION.md  # API integration guide
```

## 🎯 What's Working

### ✅ Admin Dashboard
- Single sidebar (no duplicates!)
- Real-time statistics
- Revenue tracking
- Order summaries
- Top performing vehicles

### ✅ Vehicle Management
- **View all vehicles** with status filters
- **Add new vehicles** with complete details
- **Edit vehicles** with modal form
- **View details** in beautiful modal
- **Delete vehicles** with confirmation
- Search and filter functionality
- Featured vehicle toggle

### ✅ Analytics Page
- Interactive charts (Line, Bar, Doughnut)
- Revenue trends over time
- Sales by month visualization
- Order status breakdown
- Vehicles by make distribution
- Top performing vehicles table
- Quick stats sidebar
- Time range filters (7d, 30d, 90d, 1y)

### ✅ User Management
- List all users with roles
- Search by name/email
- Filter by role (admin, dealer, user)
- Online status indicators
- Order history and spending per user
- Fixed scrolling (no overlap!)

### ✅ Messaging System
- Conversations list with search
- Messages load properly when switching chats
- Real-time message sending
- Online/offline status
- Unread message counts
- Typing indicators ready

### ✅ Order Management
- Individual order detail pages
- Complete vehicle and customer information
- Payment status tracking
- Delivery address display
- Order timeline with updates

## 📊 Database Tables

| Table | Records | Description |
|-------|---------|-------------|
| Users | 5 | Admin, users, dealer accounts |
| Vehicles | 10 | Luxury cars (Ferrari, Lamborghini, Bugatti, etc.) |
| Orders | 3 | Complete order records |
| Reviews | 4 | Customer reviews |
| Messages | 6 | Real-time conversations |

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide Icons** - Icon library
- **Chart.js** - Data visualization
- **React Chart.js 2** - React wrapper for Chart.js

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Sequelize** - ORM
- **PostgreSQL** - Database
- **Socket.IO** - Real-time messaging
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 🔧 Available Scripts

```bash
# Check if database is working
node scripts/check-database.js

# Seed database with sample data
node scripts/seed-database.js

# Start backend (port 3001)
cd backend && npm run dev

# Start frontend (port 3000)
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## 🐛 Troubleshooting

### Database Connection Failed

```bash
# Check if PostgreSQL is running
pg_isready

# Verify database exists
psql -U postgres -l | grep nordlion

# Create database if missing
psql -U postgres -c "CREATE DATABASE nordlion_db;"
```

### Port Already in Use

```bash
# Kill process on port 3001 (backend)
lsof -ti:3001 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Still Seeing Two Sidebars

```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

### No Data Showing

```bash
# Run seed script
node scripts/seed-database.js

# If errors, reset database
psql -U postgres -c "DROP DATABASE nordlion_db;"
psql -U postgres -c "CREATE DATABASE nordlion_db;"
node scripts/seed-database.js
```

## 📈 What's Next

### Phase 1 (Current Week)
- [x] Single sidebar implementation
- [x] Analytics page with charts
- [x] Full vehicle CRUD
- [x] Database health check
- [ ] Connect frontend to backend API
- [ ] Real-time Socket.IO integration

### Phase 2 (Next 2 Weeks)
- [ ] Stripe payment integration
- [ ] Email notifications
- [ ] Advanced search filters
- [ ] Image upload to cloud storage
- [ ] Order invoices (PDF generation)

### Phase 3 (Month 2)
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] 360° vehicle views
- [ ] Virtual showroom
- [ ] AI-powered recommendations

## 📝 License

Private - NordLion © 2026

## 🤝 Contributing

This is a private project. Contact admin for access.

## 📞 Support

For issues or questions:
1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. Run database health check: `node scripts/check-database.js`
3. Check browser console for errors
4. Verify both servers are running

---

**Built with ❤️ for luxury automotive excellence**
