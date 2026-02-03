# 🦁 NordLion - Enterprise Luxury Automotive Platform

> A full-stack, production-ready luxury automotive marketplace inspired by Elita, featuring modern animations, comprehensive admin/user dashboards, and enterprise-grade architecture.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black.svg)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-green.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌟 Features

### 🎨 Frontend Excellence
- **Modern Design System**: Elita-inspired UI with luxury color scheme
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Layout**: Mobile-first design that works on all devices
- **Dark/Light Mode**: System preference-aware theming
- **Optimized Performance**: Next.js 14 with App Router for lightning-fast loads

### 🛠️ Admin Dashboard
- **Real-time Analytics**: Revenue tracking, sales metrics, user engagement
- **Vehicle Management**: Complete CRUD operations for inventory
- **Order Management**: Track and manage customer orders
- **User Administration**: Manage customers and permissions
- **Interactive Charts**: Beautiful data visualizations

### 👤 User Dashboard
- **Order Tracking**: Real-time order status updates
- **Saved Vehicles**: Wishlist functionality
- **Purchase History**: Complete transaction records
- **Profile Management**: Update personal information
- **24/7 Support Access**: Integrated concierge service

### 🔒 Enterprise Backend
- **RESTful API**: Clean, documented endpoints
- **JWT Authentication**: Secure token-based auth with refresh tokens
- **Role-Based Access**: Granular permission system
- **Data Validation**: Comprehensive input sanitization
- **Error Handling**: Graceful error management

### 📈 Production Ready
- **TypeScript**: End-to-end type safety
- **PostgreSQL**: Robust relational database
- **Sequelize ORM**: Type-safe database operations
- **API Documentation**: Complete endpoint reference
- **Deployment Guides**: Step-by-step production deployment

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17.0 or higher
- PostgreSQL 14 or higher
- npm 9.6.7 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/lucdemierre/nordlion_updated.git
cd nordlion_updated

# Run automated setup
npm run setup

# Or manual installation
npm install
cp .env.example .env
# Edit .env with your configuration

# Create database
psql -U postgres -c "CREATE DATABASE nordlion_db;"
```

### Development

**Start both frontend and backend:**
```bash
npm run dev:all
```

**Or start individually:**

```bash
# Terminal 1 - Backend (port 3001)
npm run server:dev

# Terminal 2 - Frontend (port 3000)
npm run dev
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Admin Dashboard: http://localhost:3000/admin
- User Dashboard: http://localhost:3000/dashboard

---

## 📚 Documentation

- **[Setup Guide](SETUP.md)** - Complete installation and configuration
- **[Architecture](ARCHITECTURE.md)** - System design and technical details
- **[Contributing](CONTRIBUTING.md)** - Contribution guidelines
- **[API Documentation](docs/API.md)** - Endpoint reference (coming soon)

---

## 📱 Project Structure

```
nordlion_updated/
├── src/                        # Frontend source
│   ├── app/                   # Next.js pages (App Router)
│   │   ├── page.tsx          # Homepage
│   │   ├── admin/            # Admin dashboard
│   │   ├── dashboard/        # User dashboard
│   │   └── vehicles/         # Vehicle pages
│   ├── components/           # React components
│   │   ├── home/            # Homepage sections
│   │   ├── layout/          # Layout components
│   │   └── ui/              # Reusable UI
│   └── lib/                  # Utilities
│
├── server/                    # Backend API
│   ├── config/               # Configuration
│   ├── controllers/          # Route handlers
│   ├── middleware/           # Express middleware
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   └── index.ts              # Server entry
│
├── public/                    # Static assets
├── scripts/                   # Utility scripts
└── docs/                      # Documentation
```

---

## 🎨 Design System

### Color Palette

**Primary Colors:**
- Primary: `#0ea5e9` (Sky Blue)
- Accent: `#eab308` (Gold)
- Dark: `#0f172a` (Slate)

**Semantic Colors:**
- Success: `#10b981`
- Error: `#ef4444`
- Warning: `#f59e0b`
- Info: `#3b82f6`

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: 700 weight, tight line-height
- **Body**: 400 weight, 1.5 line-height

### Components
- Glass-morphism effects
- Smooth hover transitions
- Consistent spacing system (8px grid)
- Accessible contrast ratios

---

## 📦 Tech Stack

### Frontend
- **Framework**: Next.js 14.1.0
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.4.1
- **Animations**: Framer Motion 11.0.5
- **Charts**: Recharts 2.10.4
- **Icons**: Lucide React 0.344.0

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18.2
- **Language**: TypeScript 5.3.3
- **ORM**: Sequelize 6.35.2
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator

### Database
- **DBMS**: PostgreSQL 14+
- **Features**: JSONB, Full-text search, Indexes

### DevOps
- **Version Control**: Git + GitHub
- **Deployment**: Vercel (Frontend) + Railway (Backend)
- **CI/CD**: GitHub Actions (optional)

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/nordlion_db

# API
API_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001

# JWT Secrets (Generate new ones for production!)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
REFRESH_TOKEN_SECRET=your-refresh-secret-key-min-32-characters
NEXTAUTH_SECRET=your-nextauth-secret-key-min-32-characters

# URLs
NEXTAUTH_URL=http://localhost:3000
CLIENT_URL=http://localhost:3000

# Environment
NODE_ENV=development
PORT=3001
```

**Generate secure secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    Register new user
POST   /api/auth/login       Login user
POST   /api/auth/refresh     Refresh access token
GET    /api/auth/me          Get current user
```

### Vehicles
```
GET    /api/vehicles         List all vehicles
GET    /api/vehicles/:id     Get vehicle details
POST   /api/vehicles         Create vehicle (admin)
PUT    /api/vehicles/:id     Update vehicle (admin)
DELETE /api/vehicles/:id     Delete vehicle (admin)
```

### Orders
```
GET    /api/orders           List user orders
GET    /api/orders/:id       Get order details
POST   /api/orders           Create order
PUT    /api/orders/:id       Update order (admin)
```

See [API Documentation](docs/API.md) for complete reference.

---

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start frontend
npm run server:dev       # Start backend
npm run dev:all          # Start both

# Building
npm run build            # Build frontend
npm run server:build     # Build backend

# Production
npm start                # Run frontend production
npm run server           # Run backend production

# Utilities
npm run lint             # Lint code
npm run format           # Format code
npm run type-check       # TypeScript check
npm test                 # Run tests
```

### Code Quality

```bash
# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# Testing
npm test
npm run test:watch
```

---

## 🚀 Deployment

### Vercel (Frontend)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Railway (Backend)

1. Create Railway account
2. New project from GitHub
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

**Detailed guides**: See [SETUP.md](SETUP.md)

---

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration
- Rate limiting
- Security headers (Helmet.js)

---

## 📊 Performance

- Server-side rendering (SSR)
- Image optimization
- Code splitting
- Database indexing
- Response caching
- Connection pooling

**Lighthouse Score Target**: 90+

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Known Issues

- [ ] Image uploads need S3 integration
- [ ] Email notifications pending SMTP setup
- [ ] Payment processing needs Stripe configuration

---

## 🛝v️ Roadmap

### Phase 1 (Current)
- [x] Core frontend structure
- [x] Backend API
- [x] Admin dashboard
- [x] User dashboard
- [x] Authentication system

### Phase 2 (Next)
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Image upload to S3
- [ ] Advanced search filters
- [ ] Real-time notifications

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] AI-powered recommendations

---

## 📞 Support

- **Email**: support@nordlionauto.com
- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/lucdemierre/nordlion_updated/issues)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by [Elita](https://elita.net)
- Design influenced by modern luxury automotive brands
- Built with love for car enthusiasts

---

## 📸 Screenshots

### Homepage
![Homepage](docs/screenshots/homepage.png)

### Admin Dashboard
![Admin Dashboard](docs/screenshots/admin-dashboard.png)

### User Dashboard
![User Dashboard](docs/screenshots/user-dashboard.png)

### Vehicle Listing
![Vehicle Listing](docs/screenshots/vehicles.png)

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=lucdemierre/nordlion_updated&type=Date)](https://star-history.com/#lucdemierre/nordlion_updated&Date)

---

<div align="center">

**Made with ❤️ by the NordLion Team**

[Website](https://nordlionauto.com) • [Documentation](docs/) • [Issues](https://github.com/lucdemierre/nordlion_updated/issues)

</div>
