'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Package, Heart, Clock, CheckCircle, TrendingUp, DollarSign } from 'lucide-react'

const stats = [
  { name: 'Total Orders', value: '12', icon: Package, color: 'from-blue-500/20 to-blue-600/20', iconColor: 'text-blue-400', change: '+3 this month' },
  { name: 'Saved Vehicles', value: '8', icon: Heart, color: 'from-red-500/20 to-red-600/20', iconColor: 'text-red-400', change: '2 new' },
  { name: 'In Progress', value: '2', icon: Clock, color: 'from-yellow-500/20 to-yellow-600/20', iconColor: 'text-yellow-400', change: 'On track' },
  { name: 'Delivered', value: '10', icon: CheckCircle, color: 'from-green-500/20 to-green-600/20', iconColor: 'text-green-400', change: 'All on time' },
]

const recentOrders = [
  {
    id: 'NL-2024-145',
    vehicle: 'Porsche 911 Turbo S',
    date: '2024-01-15',
    status: 'Delivered',
    amount: 245000,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f3c8d?w=400&h=300&fit=crop',
  },
  {
    id: 'NL-2024-132',
    vehicle: 'Mercedes-AMG GT',
    date: '2024-01-10',
    status: 'In Transit',
    amount: 189000,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
  },
  {
    id: 'NL-2023-298',
    vehicle: 'BMW M8 Competition',
    date: '2023-12-22',
    status: 'Delivered',
    amount: 156000,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop',
  },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/60 text-lg">Here's an overview of your activity</p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-sm">Last login</p>
            <p className="text-white font-medium">Today at 9:42 AM</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.name} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#32b8c6]/5 to-[#1a6873]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-[#141414] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                    <Icon className={`${stat.iconColor} w-6 h-6`} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/50 mb-2">{stat.name}</div>
                  <div className="text-xs text-[#32b8c6]">{stat.change}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Recent Orders</h3>
              <button className="text-[#32b8c6] hover:text-[#2aa0ad] text-sm font-medium transition-colors">
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-white/5">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-4 p-6 hover:bg-white/[0.02] transition-colors group cursor-pointer"
              >
                <div className="w-20 h-16 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                  <img
                    src={order.image}
                    alt={order.vehicle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium mb-1 truncate">{order.vehicle}</h4>
                  <p className="text-sm text-white/50">
                    Order {order.id} • {order.date}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-white font-bold mb-2">
                    ${order.amount.toLocaleString()}
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#141414] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-[#32b8c6]/10 to-[#1a6873]/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-[#32b8c6]" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Track Your Order</h3>
            <p className="text-white/60 mb-4 text-sm">
              Get real-time updates on your vehicle's location and delivery status.
            </p>
            <button className="w-full py-3 px-4 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-xl font-medium transition-all transform group-hover:scale-[1.02]">
              Track Order
            </button>
          </div>
          <div className="bg-[#141414] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl">
                <DollarSign className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Need Assistance?</h3>
            <p className="text-white/60 mb-4 text-sm">
              Our concierge team is available 24/7 to help with any questions or concerns.
            </p>
            <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all border border-white/10">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
