// Simple authentication utilities
// In production, use proper authentication like NextAuth.js

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'user'
}

// Test credentials
const TEST_USERS = [
  {
    id: '1',
    email: 'admin@nordlionauto.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'test@nordlionauto.com',
    password: 'test123',
    firstName: 'Test',
    lastName: 'User',
    role: 'user' as const,
  },
]

export function validateCredentials(email: string, password: string): User | null {
  const user = TEST_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )

  if (user) {
    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  return null
}

export function setAuthToken(user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_user', JSON.stringify(user))
    localStorage.setItem('auth_token', 'test_token_' + user.id)
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
