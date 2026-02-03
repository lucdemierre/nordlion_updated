'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Package, Clock, CheckCircle2, XCircle, Truck, Eye, Download } from 'lucide-react'
import Link from 'next/link'

const orders = [
  {
    id: 'NL-2024-145',
    vehicle: 'Porsche 911 Turbo S',
    year: '2024',
    specs: '640 HP • 3.8L Twin-Turbo • AWD',
    status: 'delivered',
    statusText: 'Delivered',
    date: '2024-01-15',
    deliveryDate: '2024-02-20',
    amount: 245000,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f3c8d?w=400&h=300&fit=crop',
  },
  {
    id: 'NL-2024-132',
    vehicle: 'Mercedes-AMG GT',
    year: '2024',
    specs: '577 HP • 4.0L V8 Twin-Turbo',
    status: 'in_transit',
    statusText: 'In Transit',
    date: '2024-01-10',
    deliveryDate: '2024-02-28',
    amount: 189000,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
  },
  {
    id: 'NL-2024-098',
    vehicle: 'Ferrari SF90 Stradale',
    year: '2024',
    specs: '986 HP • Hybrid • AWD',
    status: 'processing',
    statusText: 'Processing',
    date: '2024-01-05',
    deliveryDate: '2024-03-15',
    amount: 625000,
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400&h=300&fit=crop',
  },
  {
    id: 'NL-2023-298',
    vehicle: 'BMW M8 Competition',
    year: '2023',
    specs: '617 HP • 4.4L V8 Twin-Turbo',
    status: 'delivered',
    statusText: 'Delivered',
    date: '2023-12-22',
    deliveryDate: '2024-01-30',
    amount: 156000,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop',
  },
  {
    id: 'NL-2023-276',
    vehicle: 'Lamborghini Huracan EVO',
    year: '2023',
    specs: '631 HP • 5.2L V10',
    status: 'cancelled',
    statusText: 'Cancelled',
    date: '2023-12-10',
    deliveryDate: null,
    amount: 287000,
    image: 'https://images.unsplash.com/photo-1519440985/53a0c1c46e92?w=400&h=300&fit=crop',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-500/10 text-green-400 border-green-500/20'
    case 'in_transit':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    case 'processing':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    case 'cancelled':
      return 'bg-red-500/10 text-red-400 border-red-500/20'
    default:
      return 'bg-white/5 text-white/40 border-white/10'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle2 className="w-4 h-4" />
    case 'in_transit':
      return <Truck className="w-4 h-4" />
    case 'processing':
      return <Clock className="w-4 h-4" />
    case 'cancelled':
      return <XCircle className="w-4 h-4" />
    default:
      return <Package className="w-4 h-4" />
  }
}

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-1">Orders</h1>
            <p className="text-white/50 text-sm font-light">Track and manage your vehicle orders</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-normal transition-colors">
              Filter
            </button>
            <button className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] rounded-xl text-white text-sm font-normal transition-colors">
              New Order
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#141414] rounded-xl border border-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#D67C3C]/10 rounded-lg">
                <Package className="w-5 h-5 text-[#D67C3C]" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">5</div>
                <div className="text-xs text-white/50 font-light">Total Orders</div>
              </div>
            </div>
          </div>
          <div className="bg-[#141414] rounded-xl border border-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">1</div>
                <div className="text-xs text-white/50 font-light">Processing</div>
              </div>
            </div>
          </div>
          <div className="bg-[#141414] rounded-xl border border-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Truck className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">1</div>
                <div className="text-xs text-white/50 font-light">In Transit</div>
              </div>
            </div>
          </div>
          <div className="bg-[#141414] rounded-xl border border-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">2</div>
                <div className="text-xs text-white/50 font-light">Delivered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-[#141414] rounded-xl border border-white/5 overflow-hidden">
          <div className="divide-y divide-white/5">
            {orders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-start gap-6">
                  {/* Image */}
                  <div className="w-32 h-24 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                    <img
                      src={order.image}
                      alt={order.vehicle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-white font-medium mb-1">{order.vehicle}</h3>
                        <p className="text-xs text-white/40 font-light">
                          Order {order.id} • {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold mb-2">
                          ${order.amount.toLocaleString()}
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.statusText}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-white/50 font-light mb-3">{order.specs}</p>

                    {order.deliveryDate && (
                      <p className="text-xs text-white/40 font-light mb-4">
                        {order.status === 'delivered' ? 'Delivered on' : 'Expected delivery'}: {order.deliveryDate}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] rounded-lg text-white text-xs font-normal transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Details
                      </Link>
                      {order.status === 'in_transit' && (
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-xs font-normal transition-colors">
                          <Truck className="w-3.5 h-3.5" />
                          Track Shipment
                        </button>
                      )}
                      {order.status === 'delivered' && (
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-xs font-normal transition-colors">
                          <Download className="w-3.5 h-3.5" />
                          Download Invoice
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
