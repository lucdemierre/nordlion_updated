'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Package, Clock, CheckCircle, Truck, MapPin, Phone, Mail, Download, Eye } from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  vehicle: string
  brand: string
  model: string
  year: number
  price: number
  status: 'processing' | 'in-transit' | 'delivered' | 'completed'
  date: string
  estimatedDelivery?: string
  image: string
  trackingNumber?: string
}

export default function ClientOrders() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('client')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2026-001',
      vehicle: 'Porsche 911 GT3 RS',
      brand: 'Porsche',
      model: '911 GT3 RS',
      year: 2024,
      price: 289000,
      status: 'in-transit',
      date: 'Feb 1, 2026',
      estimatedDelivery: 'Feb 15, 2026',
      image: '/images/porsche-gt3rs.jpg',
      trackingNumber: 'TRK-UK-2026-89347',
    },
    {
      id: '2',
      orderNumber: 'ORD-2026-002',
      vehicle: 'Ferrari SF90 Stradale',
      brand: 'Ferrari',
      model: 'SF90 Stradale',
      year: 2023,
      price: 625000,
      status: 'processing',
      date: 'Jan 28, 2026',
      estimatedDelivery: 'Mar 10, 2026',
      image: '/images/ferrari-sf90.jpg',
    },
    {
      id: '3',
      orderNumber: 'ORD-2025-087',
      vehicle: 'Lamborghini Huracán STO',
      brand: 'Lamborghini',
      model: 'Huracán STO',
      year: 2023,
      price: 345000,
      status: 'completed',
      date: 'Dec 15, 2025',
      image: '/images/lambo-huracan.jpg',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'in-transit': return 'bg-[#D67C3C]/10 text-[#D67C3C] border-[#D67C3C]/20'
      case 'delivered': return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/20'
      default: return 'bg-white/5 text-white/40 border-white/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return Clock
      case 'in-transit': return Truck
      case 'delivered': return CheckCircle
      case 'completed': return CheckCircle
      default: return Package
    }
  }

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(o => o.status === selectedStatus)

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-24">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-light text-white">My Orders</h1>
          <p className="text-sm text-white/50 font-light mt-1">
            Track and manage your vehicle orders
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Clock size={20} className="text-blue-400" />
              </div>
            </div>
            <p className="text-2xl font-light text-white mb-1">1</p>
            <p className="text-sm text-white/50 font-light">Processing</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#D67C3C]/10 flex items-center justify-center">
                <Truck size={20} className="text-[#D67C3C]" />
              </div>
            </div>
            <p className="text-2xl font-light text-white mb-1">1</p>
            <p className="text-sm text-white/50 font-light">In Transit</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle size={20} className="text-green-400" />
              </div>
            </div>
            <p className="text-2xl font-light text-white mb-1">1</p>
            <p className="text-sm text-white/50 font-light">Completed</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Package size={20} className="text-purple-400" />
              </div>
            </div>
            <p className="text-2xl font-light text-white mb-1">3</p>
            <p className="text-sm text-white/50 font-light">Total Orders</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          {['all', 'processing', 'in-transit', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-light transition-colors whitespace-nowrap ${
                selectedStatus === status
                  ? 'bg-[#D67C3C] text-white'
                  : 'bg-[#141414] text-white/50 hover:text-white border border-white/5'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const StatusIcon = getStatusIcon(order.status)
            return (
              <div
                key={order.id}
                className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden hover:border-[#D67C3C]/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="w-full md:w-64 h-48 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
                    <Package size={64} className="text-white/10" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-white">{order.vehicle}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(order.status)}`}>
                            <StatusIcon size={12} className="inline mr-1" />
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-white/50 font-light">Order #{order.orderNumber}</p>
                      </div>
                      <p className="text-xl font-light text-[#D67C3C]">
                        ${order.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-white/40 font-light mb-1">Order Date</p>
                        <p className="text-sm text-white">{order.date}</p>
                      </div>
                      {order.estimatedDelivery && (
                        <div>
                          <p className="text-xs text-white/40 font-light mb-1">Est. Delivery</p>
                          <p className="text-sm text-[#D67C3C]">{order.estimatedDelivery}</p>
                        </div>
                      )}
                      {order.trackingNumber && (
                        <div>
                          <p className="text-xs text-white/40 font-light mb-1">Tracking</p>
                          <p className="text-sm text-white font-mono text-xs">{order.trackingNumber}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-white/40 font-light mb-1">Year</p>
                        <p className="text-sm text-white">{order.year}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <Eye size={16} />
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-light transition-colors flex items-center gap-2">
                        <Download size={16} />
                        Invoice
                      </button>
                      {order.trackingNumber && (
                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-light transition-colors flex items-center gap-2">
                          <MapPin size={16} />
                          Track
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
