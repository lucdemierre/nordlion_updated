import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Mock user database (replace with real database query)
    const users = [
      {
        id: '1',
        email: 'client@nordlionauto.com',
        password: 'client123',
        firstName: 'John',
        lastName: 'Client',
        role: 'client',
      },
      {
        id: '2',
        email: 'broker@nordlionauto.com',
        password: 'broker123',
        firstName: 'Sarah',
        lastName: 'Broker',
        role: 'broker',
      },
      {
        id: '3',
        email: 'admin@nordlionauto.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      },
    ]

    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // In production, use JWT tokens
    const token = Buffer.from(JSON.stringify(userWithoutPassword)).toString('base64')

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
