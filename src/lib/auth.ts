// Enhanced authentication with role-based access

export type UserRole = 'client' | 'broker' | 'admin'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  avatar?: string
  phone?: string
}

// Test accounts for all roles
const TEST_USERS = [
  {
    id: '1',
    email: 'admin@nordlionauto.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin' as UserRole,
    phone: '+44 20 1234 5678',
  },
  {
    id: '2',
    email: 'broker@nordlionauto.com',
    password: 'broker123',
    firstName: 'Broker',
    lastName: 'Manager',
    role: 'broker' as UserRole,
    phone: '+44 20 1234 5679',
  },
  {
    id: '3',
    email: 'client@nordlionauto.com',
    password: 'client123',
    firstName: 'John',
    lastName: 'Smith',
    role: 'client' as UserRole,
    phone: '+44 20 1234 5680',
  },
]

export function validateCredentials(email: string, password: string): User | null {
  const user = TEST_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )

  if (user) {
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  return null
}

export function setAuthToken(user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_user', JSON.stringify(user))
    localStorage.setItem('auth_token', `nl_token_${user.id}_${Date.now()}`)
    localStorage.setItem('auth_role', user.role)
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('auth_user')
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch {
        return null
      }
    }
  }
  return null
}

export function getUserRole(): UserRole | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_role') as UserRole | null
  }
  return null
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_role')
  }
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null
}

export function hasRole(role: UserRole): boolean {
  return getUserRole() === role
}

export function canAccessDashboard(requiredRole?: UserRole): boolean {
  if (!isAuthenticated()) return false
  if (!requiredRole) return true
  
  const userRole = getUserRole()
  if (userRole === 'admin') return true // Admin can access everything
  
  return userRole === requiredRole
}
