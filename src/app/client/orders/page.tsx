'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Package, MapPin, Clock, CheckCircle, Truck, PlayCircle, Download, MessageSquare, ArrowRight, Calendar, DollarSign } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Order {
  id: string
  vehicle: string
  image: string
  status: 'processing' | 'in_transit' | 'delivered' | 'completed'
  orderNumber: string
  price: number
  orderDate: string
  estimatedDelivery: string
  currentLocation?: string
  progress: number
  timeline: Array<{
    status: string
    date: string
    description: string
    completed: boolean
  }>
}

export default function ClientOrders() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const orders: Order[] = [
    {
      id: '1',
      vehicle: 'Porsche 911 GT3 RS',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
      status: 'in_transit',
      orderNumber: 'NL-2026-001',
      price: 285000,
      orderDate: 'Feb 1, 2026',
      estimatedDelivery: 'Feb 15, 2026',
      currentLocation: 'Frankfurt, Germany',
      progress: 65,
      timeline: [
        { status: 'Order Placed', date: 'Feb 1, 2026', description: 'Order confirmed and payment received', completed: true },
        { status: 'Inspection', date: 'Feb 3, 2026', description: 'Pre-delivery inspection completed', completed: true },
        { status: 'In Transit', date: 'Feb 5, 2026', description: 'Vehicle shipped from dealer', completed: true },
        { status: 'Customs', date: 'Feb 10, 2026', description: 'Customs clearance pending', completed: false },
        { status: 'Final Delivery', date: 'Feb 15, 2026', description: 'Scheduled delivery to London', completed: false },
      ]
    },
    {
      id: '2',
      vehicle: 'Ferrari SF90 Stradale',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
      status: 'processing',
      orderNumber: 'NL-2026-002',
      price: 625000,
      orderDate: 'Feb 10, 2026',
      estimatedDelivery: 'Mar 5, 2026',
      progress: 25,
      timeline: [
        { status: 'Order Placed', date: 'Feb 10, 2026', description: 'Deposit received', completed: true },
        { status: 'Sourcing', date: 'Feb 12, 2026', description: 'Locating vehicle from authorized dealer', completed: true },
        { status: 'Inspection', date: 'Feb 20, 2026', description: 'Pre-purchase inspection scheduled', completed: false },
        { status: 'Shipping', date: 'Feb 25, 2026', description: 'Awaiting shipment confirmation', completed: false },
        { status: 'Delivery', date: 'Mar 5, 2026', description: 'Final delivery', completed: false },
      ]
    },
    {
      id: '3',
      vehicle: 'McLaren 720S',
      image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80',
      status: 'completed',
      orderNumber: 'NL-2025-047',
      price: 315000,
      orderDate: 'Dec 5, 2025',
      estimatedDelivery: 'Jan 15, 2026',
      progress: 100,
      timeline: [
        { status: 'Order Placed', date: 'Dec 5, 2025', description: 'Order confirmed', completed: true },
        { status: 'Inspection', date: 'Dec 10, 2025', description: 'Inspection passed', completed: true },
        { status: 'Shipped', date: 'Dec 20, 2025', description: 'In transit', completed: true },
        { status: 'Customs', date: 'Jan 5, 2026', description: 'Cleared customs', completed: true },
        { status: 'Delivered', date: 'Jan 15, 2026', description: 'Successfully delivered', completed: true },
      ]
    },
  ]

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('client')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
    setSelectedOrder(orders[0])
  }, [router])

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    if (filter === 'active') return order.status !== 'completed'
    if (filter === 'completed') return order.status === 'completed'
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'in_transit': return 'bg-[#D67C3C]/10 text-[#D67C3C] border-[#D67C3C]/20'
      case 'processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      default: return 'bg-white/5 text-white/60 border-white/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'in_transit': return Truck
      case 'processing': return Clock
      default: return Package
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-24 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#0f0f0f]/90 to-[#0f0f0f]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-light text-white">Your Orders</h1>
                <p className="text-sm text-white/50 font-light mt-1">
                  Track and manage your vehicle orders
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-[#D67C3C]/10 rounded-lg border border-[#D67C3C]/20">
                  <p className="text-xs text-white/50 font-light">Active Orders</p>
                  <p className="text-lg text-[#D67C3C] font-medium">2</p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              {(['all', 'active', 'completed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-light transition-all ${
                    filter === f
                      ? 'bg-[#D67C3C] text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders List */}
            <div className="lg:col-span-1 space-y-3">
              {filteredOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status)
                return (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`w-full text-left p-4 bg-[#141414]/80 backdrop-blur-sm border rounded-xl transition-all ${
                      selectedOrder?.id === order.id
                        ? 'border-[#D67C3C] shadow-lg shadow-[#D67C3C]/20'
                        : 'border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={order.image}
                          alt={order.vehicle}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{order.vehicle}</p>
                        <p className="text-xs text-white/40 font-light mt-1">{order.orderNumber}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <StatusIcon size={12} className={getStatusColor(order.status).split(' ')[1]} />
                          <span className="text-xs font-light capitalize">
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Order Details */}
            {selectedOrder && (
              <div className="lg:col-span-2 space-y-6">
                {/* Vehicle Image with Video */}
                <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={selectedOrder.image}
                      alt={selectedOrder.vehicle}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#D67C3C] hover:bg-[#B85A1F] rounded-full flex items-center justify-center transition-all hover:scale-110">
                      <PlayCircle size={32} className="text-white" />
                    </button>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h2 className="text-2xl font-light text-white mb-2">{selectedOrder.vehicle}</h2>
                      <p className="text-sm text-white/60 font-light">Order {selectedOrder.orderNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign size={16} className="text-[#D67C3C]" />
                      <p className="text-xs text-white/50 font-light">Total Price</p>
                    </div>
                    <p className="text-lg font-light text-white">${selectedOrder.price.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={16} className="text-blue-400" />
                      <p className="text-xs text-white/50 font-light">Order Date</p>
                    </div>
                    <p className="text-lg font-light text-white">{selectedOrder.orderDate}</p>
                  </div>
                  <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck size={16} className="text-green-400" />
                      <p className="text-xs text-white/50 font-light">Est. Delivery</p>
                    </div>
                    <p className="text-lg font-light text-white">{selectedOrder.estimatedDelivery}</p>
                  </div>
                  <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className="text-purple-400" />
                      <p className="text-xs text-white/50 font-light">Location</p>
                    </div>
                    <p className="text-sm font-light text-white truncate">{selectedOrder.currentLocation || 'Processing'}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/5 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-white">Delivery Progress</h3>
                    <span className="text-sm font-light text-[#D67C3C]">{selectedOrder.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D67C3C] to-[#B85A1F] transition-all duration-500"
                      style={{ width: `${selectedOrder.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/5 rounded-xl p-6">
                  <h3 className="text-sm font-medium text-white mb-6">Order Timeline</h3>
                  <div className="space-y-6">
                    {selectedOrder.timeline.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${
                            item.completed ? 'bg-[#D67C3C]' : 'bg-white/20'
                          }`}></div>
                          {index < selectedOrder.timeline.length - 1 && (
                            <div className={`w-0.5 flex-1 mt-2 ${
                              item.completed ? 'bg-[#D67C3C]/30' : 'bg-white/10'
                            }`}></div>
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`text-sm font-medium ${
                              item.completed ? 'text-white' : 'text-white/40'
                            }`}>{item.status}</p>
                            <span className="text-xs text-white/40 font-light">{item.date}</span>
                          </div>
                          <p className="text-xs text-white/50 font-light">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                    <MessageSquare size={18} />
                    Contact Support
                  </button>
                  <button className="flex-1 py-3 border border-white/10 hover:border-white/20 text-white rounded-xl font-light transition-colors flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download Invoice
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
