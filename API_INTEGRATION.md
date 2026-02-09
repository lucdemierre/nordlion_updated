# 🔌 API Integration Guide

## Overview

This document outlines how to connect the frontend to the real backend API. Currently, the frontend uses mock data with `// TODO:` comments marking where API calls should be made.

---

## 🎯 Current Status

### ✅ Backend Ready
- Complete REST API (25+ endpoints)
- Socket.IO server configured
- JWT authentication
- Database models and associations
- Seed data populated

### 🔄 Frontend Needs
- Replace mock data with API calls
- Add authentication context
- Implement Socket.IO client
- Handle loading/error states

---

## 📋 Pages to Update

### 1. Admin Dashboard (`src/app/admin/page.tsx`)

**Current:** Mock statistics

**Replace with:**
```typescript
const fetchDashboardStats = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    setStats(data)
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
  }
}
```

**Backend Endpoint:** `GET /api/analytics/dashboard`

---

### 2. Users Page (`src/app/admin/users/page.tsx`)

**Current:** Mock user array

**Replace with:**
```typescript
const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    setUsers(data.users)
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}
```

**Backend Endpoint:** `GET /api/users`

---

### 3. Messages Page (`src/app/admin/messages/page.tsx`)

**Current:** Mock conversations and messages

**Replace with:**

```typescript
// Fetch conversations
const fetchConversations = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/conversations`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    setConversations(data.conversations)
  } catch (error) {
    console.error('Failed to fetch conversations:', error)
  }
}

// Load messages for specific user
const loadMessages = async (partnerId: string) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/messages/${partnerId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    const data = await response.json()
    setMessages(data.messages)
  } catch (error) {
    console.error('Failed to load messages:', error)
  }
}

// Send message
const handleSendMessage = async () => {
  if (!messageInput.trim() || !selectedConversation) return

  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        receiverId: selectedConversation.partner.id,
        content: messageInput
      })
    })
    
    const newMessage = await response.json()
    setMessages([...messages, newMessage])
    setMessageInput('')
  } catch (error) {
    console.error('Failed to send message:', error)
  }
}
```

**Backend Endpoints:**
- `GET /api/messages/conversations`
- `GET /api/messages/:userId`
- `POST /api/messages`

---

### 4. Vehicles Page

**Replace with:**
```typescript
const fetchVehicles = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vehicles`)
    const data = await response.json()
    setVehicles(data.vehicles)
  } catch (error) {
    console.error('Failed to fetch vehicles:', error)
  }
}
```

**Backend Endpoint:** `GET /api/vehicles`

---

### 5. Orders Page

**Replace with:**
```typescript
const fetchOrders = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    setOrders(data.orders)
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  }
}
```

**Backend Endpoint:** `GET /api/orders`

---

## 🔐 Authentication Context

Create `src/contexts/AuthContext.tsx`:

```typescript
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
  role: string
  isOnline: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('token')
    }
    
    setLoading(false)
  }

  const login = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      throw new Error('Login failed')
    }

    const data = await response.json()
    localStorage.setItem('token', data.token)
    setUser(data.user)
    
    // Redirect based on role
    if (data.user.role === 'admin') {
      router.push('/admin')
    } else if (data.user.role === 'dealer') {
      router.push('/broker')
    } else {
      router.push('/client')
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('token')
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    } catch (error) {
      console.error('Logout failed:', error)
    }
    
    localStorage.removeItem('token')
    setUser(null)
    router.push('/auth/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

---

## 🔌 Socket.IO Integration

Create `src/lib/socket.ts`:

```typescript
import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export const initSocket = (token: string) => {
  if (socket) return socket

  socket = io(process.env.NEXT_PUBLIC_API_URL!, {
    auth: { token }
  })

  socket.on('connect', () => {
    console.log('Socket connected')
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected')
  })

  // User online/offline events
  socket.on('user:online', (userId: string) => {
    console.log('User online:', userId)
    // Update UI
  })

  socket.on('user:offline', (userId: string) => {
    console.log('User offline:', userId)
    // Update UI
  })

  // Message events
  socket.on('message:received', (message: any) => {
    console.log('New message:', message)
    // Update messages list
  })

  socket.on('message:read', (messageId: string) => {
    console.log('Message read:', messageId)
    // Update read status
  })

  // Typing indicators
  socket.on('typing:start', (userId: string) => {
    console.log('User typing:', userId)
    // Show typing indicator
  })

  socket.on('typing:stop', (userId: string) => {
    console.log('User stopped typing:', userId)
    // Hide typing indicator
  })

  return socket
}

export const getSocket = () => socket

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

// Send message via socket
export const sendMessage = (receiverId: string, content: string) => {
  if (!socket) throw new Error('Socket not initialized')
  
  socket.emit('message:send', {
    receiverId,
    content
  })
}

// Emit typing events
export const startTyping = (receiverId: string) => {
  if (!socket) return
  socket.emit('typing:start', { receiverId })
}

export const stopTyping = (receiverId: string) => {
  if (!socket) return
  socket.emit('typing:stop', { receiverId })
}
```

---

## 📝 Implementation Checklist

### Phase 1: Basic API Connection
- [ ] Create AuthContext
- [ ] Update login page to use real API
- [ ] Replace mock data in dashboard
- [ ] Replace mock data in users page
- [ ] Replace mock data in vehicles page
- [ ] Replace mock data in orders page
- [ ] Replace mock data in messages page

### Phase 2: Real-Time Features
- [ ] Install socket.io-client: `npm install socket.io-client`
- [ ] Create socket utility
- [ ] Initialize socket on login
- [ ] Connect messages to socket
- [ ] Add online status updates
- [ ] Add typing indicators
- [ ] Add real-time notifications

### Phase 3: Error Handling
- [ ] Add loading spinners
- [ ] Add error messages
- [ ] Add retry logic
- [ ] Add offline detection
- [ ] Add toast notifications

---

## 🧪 Testing API Integration

### 1. Test Authentication
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nordlion.com","password":"Admin123!@#"}'
```

### 2. Test Protected Route
```bash
curl http://localhost:3001/api/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Test Socket Connection
```javascript
// In browser console
const socket = io('http://localhost:3001', {
  auth: { token: localStorage.getItem('token') }
})

socket.on('connect', () => console.log('Connected!'))
```

---

## 🔒 Security Notes

1. **Never commit tokens** - Use environment variables
2. **Validate on backend** - Don't trust frontend data
3. **Use HTTPS in production** - Encrypt all traffic
4. **Refresh tokens** - Implement token rotation
5. **Rate limiting** - Already configured on backend

---

## 📊 Backend Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - List all users (admin)
- `GET /api/users/online` - Get online users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin)

### Vehicles
- `GET /api/vehicles` - List vehicles
- `GET /api/vehicles/:id` - Get vehicle
- `POST /api/vehicles` - Create vehicle (dealer)
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Orders
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update status (admin)
- `DELETE /api/orders/:id` - Cancel order

### Messages
- `GET /api/messages/conversations` - Get conversations
- `GET /api/messages/:userId` - Get messages with user
- `POST /api/messages` - Send message
- `GET /api/messages/unread/count` - Unread count

### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats
- `GET /api/analytics/sales` - Sales analytics

---

**Ready to implement? Start with Phase 1 and test each endpoint before moving forward!**
