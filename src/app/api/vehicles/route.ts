import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mock vehicles database
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
    description: 'Pristine condition, full service history',
    images: [],
    features: ['Carbon fiber', 'Sport exhaust', 'PDK transmission'],
    addedDate: new Date().toISOString(),
  },
  {
    id: '2',
    make: 'Ferrari',
    model: 'SF90 Stradale',
    year: 2023,
    price: 625000,
    status: 'reserved',
    mileage: 850,
    location: 'Monaco',
    description: 'Hybrid supercar, one owner',
    images: [],
    features: ['Hybrid V8', 'Launch control', 'Carbon brakes'],
    addedDate: new Date().toISOString(),
  },
]

// GET all vehicles
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const make = searchParams.get('make')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')

    let filtered = [...vehicles]

    if (status) {
      filtered = filtered.filter(v => v.status === status)
    }

    if (make) {
      filtered = filtered.filter(v => v.make.toLowerCase() === make.toLowerCase())
    }

    if (minPrice) {
      filtered = filtered.filter(v => v.price >= parseInt(minPrice))
    }

    if (maxPrice) {
      filtered = filtered.filter(v => v.price <= parseInt(maxPrice))
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

// POST create new vehicle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newVehicle = {
      id: Date.now().toString(),
      ...body,
      addedDate: new Date().toISOString(),
      status: body.status || 'available',
    }

    vehicles.push(newVehicle)

    return NextResponse.json({
      success: true,
      data: newVehicle,
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
