export type UserRole = 'client' | 'broker' | 'admin'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
}

export interface LoginResult {
  success: boolean
  user?: User
  message?: string
}

// Mock user database
const users = [
  {
    id: '1',
    email: 'client@nordlionauto.com',
    password: 'client123',
    firstName: 'John',
    lastName: 'Client',
    role: 'client' as UserRole,
  },
  {
    id: '2',
    email: 'broker@nordlionauto.com',
    password: 'broker123',
    firstName: 'Sarah',
    lastName: 'Broker',
    role: 'broker' as UserRole,
  },
  {
    id: '3',
    email: 'admin@nordlionauto.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin' as UserRole,
  },
]

export function login(email: string, password: string): LoginResult {
  const user = users.find((u) => u.email === email && u.password === password)
  if (user) {
    const { password: _, ...userWithoutPassword } = user
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      localStorage.setItem('isAuthenticated', 'true')
    }
    return {
      success: true,
      user: userWithoutPassword
    }
  }
  return {
    success: false,
    message: 'Invalid email or password'
  }
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    // Clear all dashboard-specific data
    localStorage.removeItem('client_widget_positions')
    localStorage.removeItem('broker_widget_positions')
    localStorage.removeItem('admin_widget_positions')
  }
}

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user')
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (userStr && isAuthenticated === 'true') {
      return JSON.parse(userStr)
    }
  }
  return null
}

export function isAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true'
  }
  return false
}

export function canAccessDashboard(role: UserRole): boolean {
  const user = getCurrentUser()
  return user !== null && user.role === role
}

export function getDashboardPath(role: UserRole): string {
  return `/${role}`
}
