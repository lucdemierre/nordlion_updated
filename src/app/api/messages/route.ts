import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mock messages database
let messages = [
  {
    id: '1',
    conversationId: '1',
    senderId: 'support',
    receiverId: '1',
    content: 'Hello! How can I assist you today?',
    timestamp: new Date().toISOString(),
    read: true,
  },
]

// GET messages
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const conversationId = searchParams.get('conversationId')
    const userId = searchParams.get('userId')

    let filtered = [...messages]

    if (conversationId) {
      filtered = filtered.filter(m => m.conversationId === conversationId)
    }

    if (userId) {
      filtered = filtered.filter(m => m.senderId === userId || m.receiverId === userId)
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      total: filtered.length,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST send message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newMessage = {
      id: Date.now().toString(),
      ...body,
      timestamp: new Date().toISOString(),
      read: false,
    }

    messages.push(newMessage)

    return NextResponse.json({
      success: true,
      data: newMessage,
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
