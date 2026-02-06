'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail, Download, Eye } from 'lucide-react'
import Link from 'next/link'

type OrderStatus = 'processing' | 'in_transit' | 'delivered' | 'completed'

interface Order {
  id: string
  orderNumber: string
  vehicle: {
    name: string
    image: string
    vin: string
    year: number
  }
  status: OrderStatus
  price: number
  orderDate: string
  estimatedDelivery: string
  actualDelivery?: string
  tracking?: string
  broker: {
    name: string
    email: string
    phone: string
  }
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'NL-2026-001',
    vehicle: {
      name: 'Porsche 911 GT3 RS',
      image: 'https://images.unsplash.com/photo-1611821064430-f9fbe6e0d422?w=800',
      vin: 'WP0ZZZ99ZTS123456',
      year: 2024,
    },
    status: 'in_transit',
    price: 285000,
    orderDate: '2026-01-15',
    estimatedDelivery: '2026-02-20',
    tracking: 'TRACK-GT3-2024',
    broker: {
      name: 'James Wilson',
      email: 'james@nordlionauto.com',
      phone: '+44 20 7123 4567',
    },
  },
  {
    id: '2',
    orderNumber: 'NL-2026-002',
    vehicle: {
      name: 'Ferrari SF90 Stradale',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
      vin: 'ZFF94HRA8L0987654',
      year: 2024,
    },
    status: 'processing',
    price: 625000,
    orderDate: '2026-02-01',
    estimatedDelivery: '2026-03-15',
    broker: {
      name: 'Sarah Mitchell',
      email: 'sarah@nordlionauto.com',
      phone: '+44 20 7123 4568',
    },
  },
  {
    id: '3',
    orderNumber: 'NL-2025-089',
    vehicle: {
      name: 'Lamborghini Huracán STO',
      image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800',
      vin: 'ZHWUC4ZF5MLA12345',
      year: 2023,
    },
    status: 'completed',
    price: 385000,
    orderDate: '2025-11-10',
    estimatedDelivery: '2025-12-20',
    actualDelivery: '2025-12-18',
    broker: {
      name: 'James Wilson',
      email: 'james@nordlionauto.com',
      phone: '+44 20 7123 4567',
    },
  },
]

export default function ClientOrders() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all')
  const [orders, setOrders] = useState<Order[]>(mockOrders)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('client')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  if (!user) return null

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus)

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'in_transit': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'delivered': return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      case 'completed': return 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20'
    }
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'processing': return Clock
      case 'in_transit': return Truck
      case 'delivered': return Package
      case 'completed': return CheckCircle
    }
  }

  const stats = {
    total: orders.length,
    active: orders.filter(o => ['processing', 'in_transit'].includes(o.status)).length,
    completed: orders.filter(o => o.status === 'completed').length,
    totalValue: orders.reduce((sum, o) => sum + o.price, 0),
  }

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
              <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center">
                <Package size={20} className="text-[#22c55e]" />
              </div>
            </div>
            <p className="text-2xl font-light text-white mb-1">{stats.total}</p>
            <p className="text-sm text-white/50 font-light">Total Orders</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Clock size={20} className="text-blue-400" />
              </div>
            </div>
            <p className="text-2xl font-light text-white mb-1">{stats.active}</p>
            <p className="text-sm text-white/50 font-light">Active Orders</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <CheckCircle size={20} className="text-purple-400" />
              </div>
            </div>
            <p className="text-2xl font-light text-white mb-1">{stats.completed}</p>
            <p className="text-sm text-white/50 font-light">Completed</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Package size={20} className="text-orange-400" />
              </div>
            </div>
            <p className="text-2xl font-light text-white mb-1">
              ${(stats.totalValue / 1000000).toFixed(1)}M
            </p>
            <p className="text-sm text-white/50 font-light">Total Value</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'processing', 'in_transit', 'delivered', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status as any)}
              className={`px-4 py-2 rounded-lg text-sm font-light whitespace-nowrap transition-colors ${
                selectedStatus === status
                  ? 'bg-[#22c55e] text-white'
                  : 'bg-[#141414] text-white/60 hover:text-white border border-white/5'
              }`}
            >
              {status.replace('_', ' ').toUpperCase()}
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
                className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors"
              >
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Vehicle Image */}
                    <img
                      src={order.vehicle.image}
                      alt={order.vehicle.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />

                    {/* Order Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-white mb-1">
                            {order.vehicle.name}
                          </h3>
                          <p className="text-sm text-white/40 font-light">
                            Order #{order.orderNumber}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full border flex items-center gap-2 ${getStatusColor(order.status)}`}>
                          <StatusIcon size={14} />
                          <span className="text-xs font-medium">
                            {order.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-white/40 font-light mb-1">Price</p>
                          <p className="text-sm text-white font-medium">
                            ${order.price.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-white/40 font-light mb-1">Order Date</p>
                          <p className="text-sm text-white">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-white/40 font-light mb-1">
                            {order.actualDelivery ? 'Delivered' : 'Est. Delivery'}
                          </p>
                          <p className="text-sm text-white">
                            {new Date(order.actualDelivery || order.estimatedDelivery).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-white/40 font-light mb-1">VIN</p>
                          <p className="text-sm text-white font-mono text-xs">
                            {order.vehicle.vin}
                          </p>
                        </div>
                      </div>

                      {/* Broker Info */}
                      <div className="flex items-center gap-4 p-3 bg-[#0a0a0a] rounded-lg mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
                          <span className="text-[#22c55e] font-medium text-sm">
                            {order.broker.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white font-medium">{order.broker.name}</p>
                          <p className="text-xs text-white/40 font-light">Your Broker</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${order.broker.email}`}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <Mail size={16} className="text-white/60" />
                          </a>
                          <a
                            href={`tel:${order.broker.phone}`}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <Phone size={16} className="text-white/60" />
                          </a>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/client/orders/${order.id}`}
                          className="px-4 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                          <Eye size={16} />
                          View Details
                        </Link>
                        {order.tracking && (
                          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-light transition-colors flex items-center gap-2">
                            <Truck size={16} />
                            Track Shipment
                          </button>
                        )}
                        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-light transition-colors flex items-center gap-2">
                          <Download size={16} />
                          Documents
                        </button>
                      </div>
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
