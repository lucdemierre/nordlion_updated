'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Package, Clock, CheckCircle, MapPin, FileText } from 'lucide-react'

export default function ClientOrders() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<any>(null)
  const [selectedFilter, setSelectedFilter] = useState(searchParams.get('filter') || 'all')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('client')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const orders = [
    { id: '1', vehicle: 'Porsche 911 GT3 RS', orderNumber: 'ORD-2026-001', status: 'in-transit', date: 'Feb 1, 2026', price: 289000, estimatedDelivery: 'Feb 15, 2026', tracking: 'TRK-UK-2026-89347' },
    { id: '2', vehicle: 'Ferrari SF90 Stradale', orderNumber: 'ORD-2026-002', status: 'processing', date: 'Jan 28, 2026', price: 625000, estimatedDelivery: 'Mar 10, 2026', tracking: null },
    { id: '3', vehicle: 'Lamborghini Huracán STO', orderNumber: 'ORD-2026-003', status: 'delivered', date: 'Jan 15, 2026', price: 345000, estimatedDelivery: 'Jan 28, 2026', tracking: 'TRK-UAE-2026-76523' },
  ]

  const filteredOrders = selectedFilter === 'all' 
    ? orders
    : selectedFilter === 'in-transit'
    ? orders.filter(o => o.status === 'in-transit')
    : orders.filter(o => o.status === selectedFilter)

  if (!user) return null

  return (
    <div className="flex h-screen bg-[#0f0f0f]">
      <Sidebar role="client" />
      
      <div className="flex-1 ml-16 overflow-auto">
        <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-2xl font-light text-white">My Orders</h1>
            <p className="text-sm text-white/50 font-light mt-1">{orders.length} total orders</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto">
            {['all', 'processing', 'in-transit', 'delivered'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-light transition-colors whitespace-nowrap ${
                  selectedFilter === filter
                    ? 'bg-[#D67C3C] text-white'
                    : 'bg-[#141414] text-white/50 hover:text-white border border-white/5'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-[#141414] border border-white/5 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">{order.vehicle}</h3>
                    <p className="text-sm text-white/50 font-light">{order.orderNumber}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    order.status === 'delivered' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    order.status === 'in-transit' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                    'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {order.status.replace('-', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-white/40 mb-1">Order Date</p>
                    <p className="text-sm text-white font-light">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Price</p>
                    <p className="text-sm text-[#D67C3C] font-medium">${order.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Estimated Delivery</p>
                    <p className="text-sm text-white font-light">{order.estimatedDelivery}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Tracking</p>
                    <p className="text-sm text-white font-light">{order.tracking || 'Pending'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
