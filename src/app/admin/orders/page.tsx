'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Package, Search, Filter, Eye, Download, TrendingUp, CheckCircle, Clock, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
  }
  vehicle: {
    make: string
    model: string
    year: number
  }
  amount: number
  status: string
  paymentStatus: string
  createdAt: string
}

const statusColors: Record<string, string> = {
  'pending': 'bg-yellow-500/10 text-yellow-500',
  'confirmed': 'bg-blue-500/10 text-blue-500',
  'processing': 'bg-purple-500/10 text-purple-500',
  'ready-for-delivery': 'bg-green-500/10 text-green-500',
  'delivered': 'bg-emerald-500/10 text-emerald-500',
  'cancelled': 'bg-red-500/10 text-red-500',
}

const paymentStatusColors: Record<string, string> = {
  'pending': 'bg-yellow-500/10 text-yellow-500',
  'paid': 'bg-green-500/10 text-green-500',
  'failed': 'bg-red-500/10 text-red-500',
}

export default function AdminOrders() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('admin')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
    fetchOrders()
  }, [router])

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         `${order.vehicle.make} ${order.vehicle.model}`.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f0f0f]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D67C3C]"></div>
      </div>
    )
  }

  return (
    <div>
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-white flex items-center gap-3">
                <Package size={28} className="text-[#D67C3C]" />
                Order Management
              </h1>
              <p className="text-sm text-white/50 font-light mt-1">{orders.length} total orders</p>
            </div>
            <button className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Download size={16} />
              Export Orders
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock size={20} className="text-yellow-500" />
              <span className="text-2xl font-semibold text-white">{orders.filter(o => o.status === 'pending').length}</span>
            </div>
            <p className="text-sm text-white/50">Pending Orders</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp size={20} className="text-purple-500" />
              <span className="text-2xl font-semibold text-white">{orders.filter(o => o.status === 'processing').length}</span>
            </div>
            <p className="text-sm text-white/50">Processing</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle size={20} className="text-green-500" />
              <span className="text-2xl font-semibold text-white">{orders.filter(o => o.status === 'delivered').length}</span>
            </div>
            <p className="text-sm text-white/50">Delivered</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <XCircle size={20} className="text-red-500" />
              <span className="text-2xl font-semibold text-white">{orders.filter(o => o.status === 'cancelled').length}</span>
            </div>
            <p className="text-sm text-white/50">Cancelled</p>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order number, customer, or vehicle..."
              className="w-full pl-10 pr-4 py-3 bg-[#141414] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C]"
            />
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          {['all', 'pending', 'processing', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                selectedStatus === status ? 'bg-[#D67C3C] text-white' : 'bg-[#141414] text-white/50 hover:text-white border border-white/5'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/5">
                <tr className="text-left">
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase">Order</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase">Customer</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase">Vehicle</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase">Amount</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase">Payment</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase">Date</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-white/40">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm text-white font-mono">{order.orderNumber}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-white">{order.customer.name}</p>
                          <p className="text-xs text-white/40">{order.customer.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-white">
                          {order.vehicle.year} {order.vehicle.make} {order.vehicle.model}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#D67C3C] font-medium">{formatCurrency(order.amount)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
                          {order.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${paymentStatusColors[order.paymentStatus]}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-white/70">{formatDate(order.createdAt)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => router.push(`/admin/orders/${order.id}`)}
                          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <Eye size={16} className="text-white/60" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
