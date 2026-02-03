// Enterprise authentication system with role-based access

export type UserRole = 'client' | 'broker' | 'admin'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  avatar?: string
  phone?: string
  verified: boolean
}

// Test credentials for different roles
const TEST_USERS: Array<User & { password: string }> = [
  {
    id: 'admin-1',
    email: 'admin@nordlionauto.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    verified: true,
  },
  {
    id: 'broker-1',
    email: 'broker@nordlionauto.com',
    password: 'broker123',
    firstName: 'Broker',
    lastName: 'Agent',
    role: 'broker',
    verified: true,
  },
  {
    id: 'client-1',
    email: 'client@nordlionauto.com',
    password: 'client123',
    firstName: 'John',
    lastName: 'Smith',
    role: 'client',
    verified: true,
  },
  {
    id: 'client-2',
    email: 'test@nordlionauto.com',
    password: 'test123',
    firstName: 'Test',
    lastName: 'Client',
    role: 'client',
    verified: true,
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
    localStorage.setItem('auth_token', `token_${user.role}_${user.id}`)
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

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
  }
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null
}

export function hasRole(role: UserRole): boolean {
  const user = getCurrentUser()
  return user?.role === role
}

export function canAccessDashboard(requiredRole?: UserRole): boolean {
  if (!isAuthenticated()) return false
  if (!requiredRole) return true
  return hasRole(requiredRole)
}
