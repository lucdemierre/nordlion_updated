# NordLion Architecture

## System Overview

NordLion is a full-stack enterprise automotive marketplace built with modern web technologies.

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Next.js    │  │   React 18   │  │  Tailwind    │     │
│  │   14.1.0     │  │  + TypeScript│  │     CSS      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                        API Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Express    │  │     JWT      │  │   Bcrypt     │     │
│  │   Node.js    │  │     Auth     │  │ Encryption   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↕ SQL
┌─────────────────────────────────────────────────────────────┐
│                      Database Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  PostgreSQL  │  │  Sequelize   │  │   Indexes    │     │
│  │     14+      │  │     ORM      │  │   Caching    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend

- **Framework**: Next.js 14.1.0 (App Router)
- **Language**: TypeScript 5.3.3
- **Styling**: Tailwind CSS 3.4.1
- **Animations**: Framer Motion 11.0.5
- **State Management**: React Hooks + Context API
- **Forms**: React Hook Form
- **UI Components**: Custom component library

### Backend

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18.2
- **Language**: TypeScript 5.3.3
- **ORM**: Sequelize 6.35.2
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcrypt 5.1.1
- **Validation**: express-validator

### Database

- **DBMS**: PostgreSQL 14+
- **Features Used**:
  - JSONB for flexible data
  - Full-text search
  - Indexes for performance
  - Foreign key constraints
  - Transactions

## Project Structure

```
nordlion_updated/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── admin/             # Admin dashboard
│   │   ├── dashboard/         # User dashboard
│   │   ├── vehicles/          # Vehicle listings
│   │   └── api/               # API routes (if needed)
│   │
│   ├── components/            # React components
│   │   ├── home/             # Homepage sections
│   │   ├── layout/           # Layout components
│   │   └── ui/               # Reusable UI components
│   │
│   ├── lib/                  # Utility functions
│   └── styles/               # Global styles
│
├── server/                    # Backend Express API
│   ├── config/               # Configuration files
│   │   └── database.ts       # Database connection
│   │
│   ├── controllers/          # Route controllers
│   │   ├── authController.ts
│   │   ├── vehicleController.ts
│   │   └── userController.ts
│   │
│   ├── middleware/           # Express middleware
│   │   ├── authMiddleware.ts
│   │   └── errorHandler.ts
│   │
│   ├── models/               # Sequelize models
│   │   ├── User.ts
│   │   ├── Vehicle.ts
│   │   └── Order.ts
│   │
│   ├── routes/               # API routes
│   │   ├── authRoutes.ts
│   │   ├── vehicleRoutes.ts
│   │   └── userRoutes.ts
│   │
│   └── index.ts              # Server entry point
│
├── public/                    # Static assets
├── scripts/                   # Utility scripts
├── .env.example              # Environment variables template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind config
└── next.config.js            # Next.js config
```

## Data Flow

### Authentication Flow

```
1. User submits login credentials
   ↓
2. Frontend sends POST /api/auth/login
   ↓
3. Backend validates credentials with bcrypt
   ↓
4. If valid, generate JWT access + refresh tokens
   ↓
5. Return tokens to frontend
   ↓
6. Frontend stores in memory + httpOnly cookie
   ↓
7. Subsequent requests include JWT in Authorization header
   ↓
8. authMiddleware validates JWT on protected routes
```

### Vehicle Purchase Flow

```
1. User browses vehicles (public)
   ↓
2. User clicks "Purchase" (requires auth)
   ↓
3. Frontend checks auth status
   ↓
4. If authenticated, show checkout page
   ↓
5. User submits order
   ↓
6. POST /api/orders with vehicle_id, payment_info
   ↓
7. Backend creates Order record
   ↓
8. Process payment (Stripe integration)
   ↓
9. Update vehicle status to 'sold'
   ↓
10. Send confirmation email
   ↓
11. Redirect to order confirmation page
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  role VARCHAR(50) DEFAULT 'customer',
  phone VARCHAR(20),
  address JSONB,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Vehicles Table
```sql
CREATE TABLE vehicles (
  id SERIAL PRIMARY KEY,
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  mileage INTEGER,
  color VARCHAR(50),
  vin VARCHAR(17) UNIQUE,
  condition VARCHAR(20),
  fuelType VARCHAR(20),
  transmission VARCHAR(20),
  description TEXT,
  images TEXT[],
  specs JSONB,
  features TEXT[],
  status VARCHAR(20) DEFAULT 'available',
  featured BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  orderNumber VARCHAR(50) UNIQUE NOT NULL,
  userId INTEGER REFERENCES users(id),
  vehicleId INTEGER REFERENCES vehicles(id),
  totalAmount DECIMAL(12,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  paymentMethod VARCHAR(50),
  paymentStatus VARCHAR(50),
  shippingAddress JSONB,
  notes TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Vehicles
- `GET /api/vehicles` - List all vehicles (public)
- `GET /api/vehicles/:id` - Get vehicle details (public)
- `POST /api/vehicles` - Create vehicle (admin only)
- `PUT /api/vehicles/:id` - Update vehicle (admin only)
- `DELETE /api/vehicles/:id` - Delete vehicle (admin only)

### Orders
- `GET /api/orders` - List user's orders (authenticated)
- `GET /api/orders/:id` - Get order details (authenticated)
- `POST /api/orders` - Create new order (authenticated)
- `PUT /api/orders/:id` - Update order (admin only)

### Users (Admin)
- `GET /api/users` - List all users (admin only)
- `GET /api/users/:id` - Get user details (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

## Security Measures

### Authentication & Authorization
- JWT-based authentication
- Refresh token rotation
- Password hashing with bcrypt (10 rounds)
- Role-based access control (RBAC)

### Data Protection
- HTTPS only in production
- Input validation and sanitization
- SQL injection prevention (ORM parameterized queries)
- XSS protection (React escaping)
- CSRF tokens

### API Security
- Rate limiting
- CORS configuration
- Request body size limits
- Helmet.js security headers

## Performance Optimizations

### Frontend
- Server-side rendering (SSR) with Next.js
- Image optimization with Next.js Image
- Code splitting and lazy loading
- CSS optimization with Tailwind

### Backend
- Database connection pooling
- Query optimization and indexes
- Response caching (Redis - optional)
- Compression middleware

### Database
- Indexed frequently queried columns
- Foreign key constraints
- Query optimization
- Connection pooling

## Deployment Architecture

### Production Stack
```
┌─────────────────┐
│   CloudFlare    │  ← CDN + DDoS Protection
└────────┬────────┘
         │
┌────────▼────────┐
│     Vercel      │  ← Frontend (Next.js)
└────────┬────────┘
         │ API Calls
┌────────▼────────┐
│    Railway      │  ← Backend (Express)
└────────┬────────┘
         │
┌────────▼────────┐
│   PostgreSQL    │  ← Database (Managed)
└─────────────────┘
```

## Monitoring & Logging

- **Frontend**: Vercel Analytics
- **Backend**: Winston logger
- **Database**: PostgreSQL logs
- **Errors**: Sentry (optional)
- **Uptime**: UptimeRobot (optional)

## Scalability Considerations

### Horizontal Scaling
- Stateless API design
- Load balancer ready
- Multiple backend instances possible

### Database Scaling
- Read replicas for reporting
- Connection pooling
- Query optimization

### Caching Strategy
- Redis for session storage (optional)
- CDN for static assets
- Browser caching headers

## Future Enhancements

1. **Real-time Features**: WebSocket for live updates
2. **Advanced Search**: Elasticsearch integration
3. **Media Storage**: S3 for vehicle images
4. **Payment Processing**: Full Stripe integration
5. **Email System**: SendGrid for notifications
6. **Analytics**: Google Analytics + custom dashboard
7. **Mobile App**: React Native version
8. **Admin CMS**: Headless CMS integration

---

For implementation details, see the [SETUP.md](./SETUP.md) guide.
