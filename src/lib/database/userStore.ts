// User Store - Simulates database
// Will be replaced with Supabase in production

import { User } from './schema'

class UserStore {
  private users: Map<string, User> = new Map()

  constructor() {
    this.initializeData()
  }

  private initializeData() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nordlion_users')
      if (saved) {
        const parsed = JSON.parse(saved)
        this.users = new Map(Object.entries(parsed).map(([k, v]: [string, any]) => [
          k,
          { ...v, joinDate: new Date(v.joinDate), lastActive: new Date(v.lastActive) }
        ]))
      } else {
        this.seedDefaultUsers()
      }
    }
  }

  private seedDefaultUsers() {
    const defaultUsers: User[] = [
      {
        id: 'u1',
        email: 'client@nordlionauto.com',
        password: 'client123',
        firstName: 'John',
        lastName: 'Smith',
        role: 'client',
        status: 'active',
        verified: true,
        phone: '+44 20 1234 5678',
        address: {
          street: '123 Mayfair Lane',
          city: 'London',
          state: 'England',
          country: 'United Kingdom',
          postalCode: 'W1K 5NP'
        },
        preferences: {
          notifications: { email: true, sms: true, push: true },
          language: 'en',
          currency: 'GBP'
        },
        joinDate: new Date('2025-11-15'),
        lastActive: new Date(),
        orders: ['o1', 'o2', 'o3'],
        wishlist: ['v2', 'v4'],
        totalSpent: 845000
      },
      {
        id: 'u2',
        email: 'broker@nordlionauto.com',
        password: 'broker123',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'broker',
        status: 'active',
        verified: true,
        phone: '+44 20 8765 4321',
        address: {
          street: '456 Chelsea Road',
          city: 'London',
          state: 'England',
          country: 'United Kingdom',
          postalCode: 'SW3 5SR'
        },
        preferences: {
          notifications: { email: true, sms: true, push: true },
          language: 'en',
          currency: 'GBP'
        },
        joinDate: new Date('2025-10-01'),
        lastActive: new Date(),
        clients: ['u1', 'u3', 'u4'],
        commission: 145000,
        performanceRating: 4.8
      },
      {
        id: 'u3',
        email: 'admin@nordlionauto.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        status: 'active',
        verified: true,
        phone: '+44 20 9999 0000',
        preferences: {
          notifications: { email: true, sms: false, push: true },
          language: 'en',
          currency: 'GBP'
        },
        joinDate: new Date('2025-09-01'),
        lastActive: new Date()
      },
      {
        id: 'u4',
        email: 'emma@example.com',
        password: 'password123',
        firstName: 'Emma',
        lastName: 'Wilson',
        role: 'client',
        status: 'active',
        verified: true,
        phone: '+44 20 2345 6789',
        address: {
          street: '789 Knightsbridge',
          city: 'London',
          state: 'England',
          country: 'United Kingdom',
          postalCode: 'SW1X 7XL'
        },
        preferences: {
          notifications: { email: true, sms: true, push: false },
          language: 'en',
          currency: 'GBP'
        },
        joinDate: new Date('2025-12-10'),
        lastActive: new Date(),
        orders: ['o4', 'o5'],
        wishlist: ['v1', 'v3', 'v5'],
        totalSpent: 1450000
      },
      {
        id: 'u5',
        email: 'michael@example.com',
        password: 'password123',
        firstName: 'Michael',
        lastName: 'Brown',
        role: 'client',
        status: 'active',
        verified: true,
        phone: '+44 20 3456 7890',
        joinDate: new Date('2026-01-05'),
        lastActive: new Date(),
        orders: ['o6', 'o7'],
        wishlist: ['v2'],
        totalSpent: 620000
      }
    ]

    defaultUsers.forEach(u => this.users.set(u.id, u))
    this.saveToStorage()
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      const obj: Record<string, User> = {}
      this.users.forEach((u, id) => { obj[id] = u })
      localStorage.setItem('nordlion_users', JSON.stringify(obj))
    }
  }

  getAll(): User[] {
    return Array.from(this.users.values())
  }

  getById(id: string): User | undefined {
    return this.users.get(id)
  }

  getByEmail(email: string): User | undefined {
    return this.getAll().find(u => u.email === email)
  }

  getByRole(role: User['role']): User[] {
    return this.getAll().filter(u => u.role === role)
  }

  update(id: string, updates: Partial<User>): User | null {
    const user = this.users.get(id)
    if (!user) return null
    
    const updated = { ...user, ...updates, lastActive: new Date() }
    this.users.set(id, updated)
    this.saveToStorage()
    return updated
  }

  updateProfile(id: string, profile: {
    firstName?: string
    lastName?: string
    phone?: string
    address?: User['address']
    preferences?: User['preferences']
  }): User | null {
    return this.update(id, profile)
  }

  delete(id: string): boolean {
    const deleted = this.users.delete(id)
    if (deleted) this.saveToStorage()
    return deleted
  }
}

export const userStore = new UserStore()
