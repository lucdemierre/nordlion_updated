import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mock vehicles database (same as above, in production use shared DB)
let vehicles = [
  {
    id: '1',
    make: 'Porsche',
    model: '911 GT3 RS',
    year: 2024,
    price: 289000,
    status: 'available',
    mileage: 1200,
    location: 'London, UK',
  },
]

// GET single vehicle
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vehicle = vehicles.find(v => v.id === params.id)

    if (!vehicle) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: vehicle,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT update vehicle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const index = vehicles.findIndex(v => v.id === params.id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      )
    }

    vehicles[index] = {
      ...vehicles[index],
      ...body,
      id: params.id, // Prevent ID from being changed
    }

    return NextResponse.json({
      success: true,
      data: vehicles[index],
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE vehicle
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const index = vehicles.findIndex(v => v.id === params.id)

    if (index === -1) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      )
    }

    const deleted = vehicles.splice(index, 1)[0]

    return NextResponse.json({
      success: true,
      data: deleted,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
