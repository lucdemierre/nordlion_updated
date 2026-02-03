// Enhanced authentication with multiple roles
// In production, use proper authentication like NextAuth.js

export type UserRole = 'client' | 'broker' | 'admin'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  verified: boolean
  profileComplete: boolean
  twoFactorEnabled: boolean
}

// Test credentials for different roles
const TEST_USERS = [
  {
    id: '1',
    email: 'admin@nordlionauto.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin' as const,
    verified: true,
    profileComplete: true,
    twoFactorEnabled: false,
  },
  {
    id: '2',
    email: 'broker@nordlionauto.com',
    password: 'broker123',
    firstName: 'Broker',
    lastName: 'Agent',
    role: 'broker' as const,
    verified: true,
    profileComplete: true,
    twoFactorEnabled: false,
  },
  {
    id: '3',
    email: 'client@nordlionauto.com',
    password: 'client123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'client' as const,
    verified: false,
    profileComplete: false,
    twoFactorEnabled: false,
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
    localStorage.setItem('auth_token', 'token_' + user.id + '_' + user.role)
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

export function updateCurrentUser(updates: Partial<User>) {
  const user = getCurrentUser()
  if (user) {
    const updatedUser = { ...user, ...updates }
    setAuthToken(updatedUser)
    return updatedUser
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

export function requireAuth(allowedRoles?: UserRole[]) {
  const user = getCurrentUser()
  if (!user) return false
  if (allowedRoles && !allowedRoles.includes(user.role)) return false
  return true
}
