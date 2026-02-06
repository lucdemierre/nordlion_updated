import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mock orders database
let orders = [
  {
    id: '1',
    orderNumber: 'ORD-2026-001',
    userId: '1',
    vehicleId: '1',
    vehicle: 'Porsche 911 GT3 RS',
    price: 289000,
    status: 'in-transit',
    date: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    trackingNumber: 'TRK-UK-2026-89347',
  },
]

// GET all orders
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')

    let filtered = [...orders]

    if (userId) {
      filtered = filtered.filter(o => o.userId === userId)
    }

    if (status) {
      filtered = filtered.filter(o => o.status === status)
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

// POST create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
      ...body,
      date: new Date().toISOString(),
      status: 'processing',
    }

    orders.push(newOrder)

    return NextResponse.json({
      success: true,
      data: newOrder,
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
