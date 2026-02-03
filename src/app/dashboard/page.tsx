'use client'

import { Package, Heart, Clock, CheckCircle } from 'lucide-react'

const stats = [
  { name: 'Total Orders', value: '12', icon: Package, color: 'bg-blue-500/20 text-blue-400' },
  { name: 'Saved Vehicles', value: '8', icon: Heart, color: 'bg-red-500/20 text-red-400' },
  { name: 'In Progress', value: '2', icon: Clock, color: 'bg-yellow-500/20 text-yellow-400' },
  { name: 'Delivered', value: '10', icon: CheckCircle, color: 'bg-green-500/20 text-green-400' },
]

const recentOrders = [
  {
    id: 'NL-2024-145',
    vehicle: 'Porsche 911 Turbo S',
    date: '2024-01-15',
    status: 'Delivered',
    amount: 245000,
  },
  {
    id: 'NL-2024-132',
    vehicle: 'Mercedes-AMG GT',
    date: '2024-01-10',
    status: 'In Transit',
    amount: 189000,
  },
  {
    id: 'NL-2023-298',
    vehicle: 'BMW M8 Competition',
    date: '2023-12-22',
    status: 'Delivered',
    amount: 156000,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/60">Welcome back! Here's an overview of your activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="glass-effect p-6 rounded-xl">
              <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-4`}>
                <Icon size={24} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/50">{stat.name}</div>
            </div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="glass-effect p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-white mb-6">Recent Orders</h3>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex-1">
                <h4 className="text-white font-medium mb-1">{order.vehicle}</h4>
                <p className="text-sm text-white/50">
                  Order {order.id} • {order.date}
                </p>
              </div>
              <div className="text-right">
                <div className="text-white font-bold mb-1">
                  ${order.amount.toLocaleString()}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Delivered'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-effect p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Need Assistance?</h3>
          <p className="text-white/60 mb-4">
            Our concierge team is available 24/7 to help with any questions or concerns.
          </p>
          <button className="btn-primary w-full">Contact Support</button>
        </div>
        <div className="glass-effect p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Track Your Order</h3>
          <p className="text-white/60 mb-4">
            Get real-time updates on your vehicle's location and delivery status.
          </p>
          <button className="btn-secondary w-full">Track Order</button>
        </div>
      </div>
    </div>
  )
}
