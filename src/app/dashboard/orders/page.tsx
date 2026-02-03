'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Search, Filter, Download, Eye, Package, Truck, CheckCircle, Clock } from 'lucide-react'
import { useState } from 'react'

const orders = [
  {
    id: 'NL-2024-145',
    vehicle: 'Porsche 911 Turbo S',
    model: '992 Turbo S',
    date: '2024-01-15',
    deliveryDate: '2024-02-20',
    status: 'Delivered',
    amount: 245000,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f3c8d?w=400&h=300&fit=crop',
    progress: 100,
  },
  {
    id: 'NL-2024-132',
    vehicle: 'Mercedes-AMG GT',
    model: 'AMG GT 63 S',
    date: '2024-01-10',
    deliveryDate: '2024-02-15',
    status: 'In Transit',
    amount: 189000,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
    progress: 75,
  },
  {
    id: 'NL-2024-118',
    vehicle: 'Audi RS e-tron GT',
    model: 'RS e-tron GT',
    date: '2024-01-05',
    deliveryDate: '2024-02-10',
    status: 'Processing',
    amount: 142000,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
    progress: 40,
  },
  {
    id: 'NL-2023-298',
    vehicle: 'BMW M8 Competition',
    model: 'M8 Competition Coupe',
    date: '2023-12-22',
    deliveryDate: '2024-01-28',
    status: 'Delivered',
    amount: 156000,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop',
    progress: 100,
  },
  {
    id: 'NL-2023-276',
    vehicle: 'Lamborghini Urus',
    model: 'Urus Performante',
    date: '2023-12-10',
    deliveryDate: '2024-01-15',
    status: 'Delivered',
    amount: 298000,
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=400&h=300&fit=crop',
    progress: 100,
  },
]

const statusConfig = {
  'Delivered': { color: 'green', icon: CheckCircle, bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
  'In Transit': { color: 'blue', icon: Truck, bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  'Processing': { color: 'yellow', icon: Package, bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  'Pending': { color: 'gray', icon: Clock, bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20' },
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || order.status.toLowerCase().includes(filterStatus.toLowerCase())
    return matchesSearch && matchesFilter
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Orders</h1>
            <p className="text-white/60 text-lg">Manage and track all your vehicle orders</p>
          </div>
          <button className="px-6 py-3 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-xl font-medium transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders by vehicle or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#141414] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#32b8c6] transition-colors"
              />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-6 py-3 bg-[#141414] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#32b8c6] transition-colors cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="delivered">Delivered</option>
            <option value="transit">In Transit</option>
            <option value="processing">Processing</option>
          </select>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon
            return (
              <div
                key={order.id}
                className="bg-[#141414] rounded-2xl border border-white/5 hover:border-white/10 transition-all overflow-hidden group"
              >
                <div className="flex flex-col lg:flex-row gap-6 p-6">
                  {/* Image */}
                  <div className="w-full lg:w-48 h-32 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                    <img
                      src={order.image}
                      alt={order.vehicle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{order.vehicle}</h3>
                        <p className="text-white/50 text-sm">{order.model}</p>
                      </div>
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${statusConfig[order.status].bg} ${statusConfig[order.status].text} border ${statusConfig[order.status].border}`}>
                        <StatusIcon className="w-4 h-4" />
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-white/40 text-xs mb-1">Order ID</p>
                        <p className="text-white font-medium">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs mb-1">Order Date</p>
                        <p className="text-white font-medium">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs mb-1">Delivery Date</p>
                        <p className="text-white font-medium">{order.deliveryDate}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs mb-1">Amount</p>
                        <p className="text-white font-bold">${order.amount.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {order.status !== 'Delivered' && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-white/60 text-sm">Order Progress</p>
                          <p className="text-white/60 text-sm">{order.progress}%</p>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#32b8c6] to-[#1a6873] transition-all duration-500"
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <button className="flex-1 px-4 py-2 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all border border-white/10">
                        Track
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="bg-[#141414] rounded-2xl border border-white/5 p-12 text-center">
            <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No orders found</h3>
            <p className="text-white/60">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
