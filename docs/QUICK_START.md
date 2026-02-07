# Quick Start Guide

> Get NordLion up and running in minutes

## 🚀 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.17.0 or higher
- **npm** 9.6.7 or higher  
- **PostgreSQL** 14 or higher
- **Git** installed
- Code editor (VS Code recommended)

---

## 💻 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/lucdemierre/nordlion_updated.git
cd nordlion_updated
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Express
- PostgreSQL drivers
- And more...

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/nordlion_db

# API URLs
API_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001

# JWT Secrets (generate new ones!)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
REFRESH_TOKEN_SECRET=your-refresh-secret-key-min-32-characters

# Application
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
PORT=3001
```

**Generate secure secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Database Setup

```bash
# Create database
psql -U postgres -c "CREATE DATABASE nordlion_db;"

# Run migrations (if available)
npm run db:migrate
```

### 5. Start Development Servers

**Option A: Start everything together**
```bash
npm run dev:all
```

**Option B: Start separately**

```bash
# Terminal 1 - Backend API (port 3001)
npm run server:dev

# Terminal 2 - Frontend (port 3000)
npm run dev
```

---

## ✅ Verify Installation

Open your browser and visit:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Admin Dashboard**: http://localhost:3000/admin
- **User Dashboard**: http://localhost:3000/dashboard

You should see:
- ✅ Luxury gold design system
- ✅ Playfair Display typography
- ✅ Smooth animations
- ✅ Glass morphism effects
- ✅ Responsive navigation

---

## 🏛️ Project Structure

```
nordlion_updated/
├── src/                    # Frontend source
│   ├── app/                # Next.js App Router
│   │   ├── page.tsx        # Homepage
│   │   ├── layout.tsx      # Root layout
│   │   ├── globals.css     # Design system
│   │   ├── admin/          # Admin pages
│   │   ├── dashboard/      # User pages
│   │   └── vehicles/       # Vehicle pages
│   ├── components/         # React components
│   │   ├── home/           # Homepage sections
│   │   ├── layout/         # Navigation, Footer
│   │   └── ui/             # Reusable UI
│   └── lib/                # Utilities
│
├── server/                # Backend API
│   ├── config/            # Configuration
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Express middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── index.ts           # Server entry
│
├── docs/                  # Documentation
│   ├── DESIGN_SYSTEM.md   # Design guide
│   ├── COMPONENT_EXAMPLES.md
│   ├── ENHANCEMENTS_ROADMAP.md
│   └── QUICK_START.md     # This file
│
├── public/                # Static assets
├── tailwind.config.ts     # Tailwind configuration
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript config
```

---

## 🎨 Using the Design System

### Colors

```tsx
// Gold accents
<div className="text-gold">Luxury text</div>
<div className="bg-gold">Gold background</div>
<div className="border-gold">Gold border</div>

// Dark backgrounds
<div className="bg-dark-950">Deepest black</div>
<div className="bg-dark-900">Dark background</div>
```

### Typography

```tsx
// Headings (Playfair Display serif)
<h1 className="font-serif">Luxury Heading</h1>

// Body text (Inter sans-serif)
<p className="font-sans">Body content</p>

// Gradient text
<span className="gradient-text">Gold gradient</span>
```

### Buttons

```tsx
// Primary action
<button className="btn-primary">
  Explore Collection
</button>

// Secondary action
<button className="btn-secondary">
  Learn More
</button>
```

### Effects

```tsx
// Glass morphism
<div className="glass-effect p-6 rounded-xl">
  Content
</div>

// Gold glow on hover
<div className="gold-glow">
  Hover me
</div>

// Luxury hover scale
<div className="luxury-hover">
  Interactive card
</div>
```

### Animations

```tsx
// Fade in with upward motion
<div className="animate-fade-in-up">
  Animated content
</div>

// Float animation
<div className="animate-float">
  Floating element
</div>

// Gold pulse
<div className="animate-pulse-gold">
  Attention grabber
</div>
```

---

## 🛠️ Available Scripts

### Development

```bash
# Start frontend only
npm run dev

# Start backend only
npm run server:dev

# Start both (recommended)
npm run dev:all
```

### Building

```bash
# Build frontend
npm run build

# Build backend
npm run server:build

# Build everything
npm run build:all
```

### Production

```bash
# Run frontend production
npm start

# Run backend production
npm run server
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check

# Format code
npm run format
```

---

## 📚 Learning Resources

### Documentation

1. **[Design System Guide](./DESIGN_SYSTEM.md)** - Complete visual language reference
2. **[Component Examples](./COMPONENT_EXAMPLES.md)** - Practical code examples
3. **[Enhancement Roadmap](./ENHANCEMENTS_ROADMAP.md)** - Future features plan
4. **[Architecture](../ARCHITECTURE.md)** - System design overview
5. **[Contributing](../CONTRIBUTING.md)** - Contribution guidelines

### External Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hook Form](https://react-hook-form.com/)

---

## ❓ Common Issues

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3002 npm run dev
```

### Database Connection Failed

**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution**:
```bash
# Check if PostgreSQL is running
pg_isready

# Start PostgreSQL (macOS)
brew services start postgresql

# Start PostgreSQL (Linux)
sudo service postgresql start
```

### Module Not Found

**Problem**: `Error: Cannot find module 'xyz'`

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Fonts Not Loading

**Problem**: Playfair Display or Inter not rendering

**Solution**:
- Check `layout.tsx` has font imports
- Verify CSS variables are set
- Clear browser cache
- Restart dev server

---

## 🚀 Next Steps

### For Developers

1. ✅ **Review Design System** - Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
2. ✅ **Explore Components** - Check [COMPONENT_EXAMPLES.md](./COMPONENT_EXAMPLES.md)
3. ✅ **Plan Features** - Review [ENHANCEMENTS_ROADMAP.md](./ENHANCEMENTS_ROADMAP.md)
4. 🛠️ **Start Building** - Create your first component
5. 🎓 **Learn Patterns** - Study existing components

### For Designers

1. 🎨 **Review Colors** - Study the gold and dark palettes
2. 🔤 **Typography Scale** - Understand heading hierarchy
3. ✨ **Explore Effects** - Glass morphism, glows, animations
4. 📱 **Check Responsive** - Test on different screen sizes
5. 🧩 **Provide Feedback** - Share design improvements

### For Content Creators

1. 📝 **Understand Voice** - Luxury, elegant, professional
2. 📸 **Image Guidelines** - High-quality automotive photography
3. 🎯 **SEO Keywords** - Luxury automotive, hypercars, etc.
4. ✍️ **Write Content** - Vehicle descriptions, features
5. 📊 **Track Metrics** - Monitor engagement

---

## 🤝 Need Help?

### Support Channels

- **GitHub Issues**: [Report bugs or request features](https://github.com/lucdemierre/nordlion_updated/issues)
- **Discussions**: [Ask questions and share ideas](https://github.com/lucdemierre/nordlion_updated/discussions)
- **Email**: support@nordlionauto.com

### Contributing

We welcome contributions! Please see:
- [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines
- [Code of Conduct](../CODE_OF_CONDUCT.md) for community standards

---

## 🎉 You're Ready!

Your NordLion development environment is now set up with:

- ✅ Luxury gold design system
- ✅ Modern animations and effects
- ✅ Complete component library
- ✅ Backend API ready
- ✅ Database configured
- ✅ Comprehensive documentation

**Happy coding! 🚗💨**

---

**Last Updated**: February 7, 2026  
**Version**: 1.1.0
