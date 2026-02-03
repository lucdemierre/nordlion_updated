# NordLion Enterprise Automotive Platform

## 🚀 Enterprise-Grade Luxury Automotive Website

A full-stack, production-ready automotive e-commerce platform built with modern technologies, featuring advanced admin dashboards, user management, and elegant dark luxury design.

## 🎯 Features

### Frontend
- **Next.js 14** with App Router and Server Components
- **TypeScript** for type safety
- **TailwindCSS** with custom luxury dark theme
- **Framer Motion** for smooth animations
- **Responsive Design** optimized for all devices
- **SEO Optimized** with metadata and structured data

### Backend
- **Node.js & Express** REST API
- **PostgreSQL** with Sequelize ORM
- **JWT Authentication** with refresh tokens
- **Role-Based Access Control** (User, Admin, Superadmin)
- **Secure Password Hashing** with bcrypt
- **Input Validation** with express-validator
- **File Upload** support with Multer

### Admin Dashboard
- Complete vehicle inventory management
- User management and role assignment
- Order tracking and fulfillment
- Revenue analytics and statistics
- Review moderation

### User Dashboard
- Profile management
- Order history and tracking
- Saved vehicles and wishlists
- Review submissions
- Account settings

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- Framer Motion
- Radix UI Components
- React Hook Form + Zod
- Axios

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT
- Bcrypt
- Helmet (Security)
- Morgan (Logging)

## 💻 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL 14+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/lucdemierre/nordlion_updated.git
cd nordlion_updated
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Update the `.env` file with your configuration:
- Database credentials
- JWT secrets
- Email service credentials (optional)
- Stripe keys (optional)

### 4. Database Setup
Create PostgreSQL database:
```sql
CREATE DATABASE nordlion_db;
```

Run migrations (automatic on first start):
```bash
npm run server:dev
```

### 5. Start Development Servers

**Backend API:**
```bash
npm run server:dev
```
Runs on `http://localhost:3001`

**Frontend:**
```bash
npm run dev
```
Runs on `http://localhost:3000`

## 📦 Production Build

```bash
# Build frontend
npm run build

# Start production server
npm start

# Start backend in production
NODE_ENV=production npm run server
```

## 📁 Project Structure

```
nordlion_updated/
├── backend/
│   ├── config/          # Database configuration
│   ├── middleware/      # Auth and validation middleware
│   ├── models/          # Sequelize models
│   ├── routes/          # API routes
│   └── server.js        # Express server
├── src/
│   ├── app/             # Next.js app directory
│   ├── components/      # React components
│   ├── lib/             # Utilities and helpers
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── public/          # Static assets
├── .env.example     # Environment variables template
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/password` - Change password
- `GET /api/users/orders` - Get user orders

### Vehicles
- `GET /api/vehicles` - List vehicles (with filters)
- `GET /api/vehicles/featured` - Get featured vehicles
- `GET /api/vehicles/:id` - Get vehicle details
- `POST /api/vehicles` - Create vehicle (Admin)
- `PUT /api/vehicles/:id` - Update vehicle (Admin)
- `DELETE /api/vehicles/:id` - Delete vehicle (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `PUT /api/orders/:id/cancel` - Cancel order

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user (Superadmin)
- `GET /api/admin/orders` - List all orders
- `GET /api/admin/reviews` - List all reviews

## 👥 Default Roles

- **User** - Browse vehicles, place orders, write reviews
- **Admin** - Manage vehicles, orders, reviews
- **Superadmin** - Full system access, user management

## 🎨 Design System

The application features a custom luxury dark theme with:
- Elegant dark gradients
- Smooth animations and transitions
- Glass morphism effects
- Premium color palette
- Responsive typography
- Custom scrollbars and selection styles

## 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention
- XSS protection with Helmet
- CORS configuration
- Rate limiting (recommended for production)
- Environment variable protection

## 📨 Deployment

### Frontend (Vercel)
```bash
vercel --prod
```

### Backend (Railway/Heroku/DigitalOcean)
1. Set environment variables
2. Configure PostgreSQL database
3. Deploy with:
```bash
git push production main
```

## 📝 License

Proprietary - © 2026 NordLion International

## 👤 Contact

For support or inquiries:
- Website: https://nordlionauto.com
- Email: support@nordlionauto.com

---

Built with ❤️ by NordLion Development Team
