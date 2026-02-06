// Database Schema - Will be used with Supabase
// For now, simulated with localStorage

export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  location: string
  status: 'available' | 'reserved' | 'sold' | 'in-transit'
  images: string[]
  description: string
  specifications: {
    engine: string
    transmission: string
    drivetrain: string
    fuelType: string
    horsepower: number
    torque: number
    topSpeed: number
    acceleration: string // 0-60 mph
    exteriorColor: string
    interiorColor: string
    vin: string
  }
  features: string[]
  condition: 'new' | 'used' | 'certified-pre-owned'
  history: {
    owners: number
    accidents: number
    serviceRecords: boolean
  }
  brokerId?: string
  dateAdded: Date
  dateModified: Date
}

export interface User {
  id: string
  email: string
  password: string // Hashed in production
  firstName: string
  lastName: string
  role: 'client' | 'broker' | 'admin'
  status: 'active' | 'inactive' | 'suspended'
  verified: boolean
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    country: string
    postalCode: string
  }
  profileImage?: string
  preferences?: {
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
    language: string
    currency: string
  }
  joinDate: Date
  lastActive: Date
  // Client-specific
  orders?: string[] // Order IDs
  wishlist?: string[] // Vehicle IDs
  totalSpent?: number
  // Broker-specific
  clients?: string[] // Client IDs
  commission?: number
  performanceRating?: number
}

export interface Order {
  id: string
  orderNumber: string
  clientId: string
  brokerId?: string
  vehicleId: string
  status: 'pending' | 'processing' | 'in-transit' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  totalAmount: number
  deposit?: number
  balance?: number
  shippingAddress: {
    street: string
    city: string
    state: string
    country: string
    postalCode: string
  }
  trackingNumber?: string
  estimatedDelivery?: Date
  actualDelivery?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Document {
  id: string
  userId: string
  orderId?: string
  vehicleId?: string
  type: 'invoice' | 'contract' | 'insurance' | 'registration' | 'other'
  name: string
  url: string
  size: number
  uploadedAt: Date
  status: 'pending' | 'approved' | 'rejected'
}
