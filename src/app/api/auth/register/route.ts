import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName, role = 'client' } = body

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists (mock)
    // In production, check database
    
    // Create user (mock)
    const newUser = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      role,
      createdAt: new Date().toISOString(),
    }

    // In production, use JWT tokens
    const token = Buffer.from(JSON.stringify(newUser)).toString('base64')

    return NextResponse.json({
      success: true,
      user: newUser,
      token,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
