'use client'

import { TrendingUp, TrendingDown, DollarSign, Car, Users, ShoppingBag } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const stats = [
  {
    name: 'Total Revenue',
    value: '$2,453,250',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    name: 'Vehicles Sold',
    value: '187',
    change: '+8.2%',
    trend: 'up',
    icon: Car,
  },
  {
    name: 'Active Users',
    value: '4,892',
    change: '+23.1%',
    trend: 'up',
    icon: Users,
  },
  {
    name: 'Pending Orders',
    value: '24',
    change: '-4.3%',
    trend: 'down',
    icon: ShoppingBag,
  },
]

const revenueData = [
  { month: 'Jan', revenue: 185000 },
  { month: 'Feb', revenue: 220000 },
  { month: 'Mar', revenue: 198000 },
  { month: 'Apr', revenue: 245000 },
  { month: 'May', revenue: 267000 },
  { month: 'Jun', revenue: 289000 },
]

const vehicleData = [
  { category: 'Sports', count: 45 },
  { category: 'Luxury', count: 67 },
  { category: 'SUV', count: 38 },
  { category: 'Sedan', count: 52 },
  { category: 'Coupe', count: 29 },
]

const recentOrders = [
  { id: 'NL-2024-001', customer: 'John Smith', vehicle: 'Porsche 911 Turbo', amount: 245000, status: 'pending' },
  { id: 'NL-2024-002', customer: 'Sarah Johnson', vehicle: 'Mercedes-AMG GT', amount: 189000, status: 'confirmed' },
  { id: 'NL-2024-003', customer: 'Michael Chen', vehicle: 'BMW M8', amount: 156000, status: 'processing' },
  { id: 'NL-2024-004', customer: 'Emma Davis', vehicle: 'Audi R8', amount: 178000, status: 'delivered' },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-white/60">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="glass-effect p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary-600/20">
                  <Icon className="text-primary-400" size={24} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/50">{stat.name}</div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="glass-effect p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Vehicle Distribution */}
        <div className="glass-effect p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-6">Vehicle Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vehicleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="category" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="count" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="glass-effect p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-6">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-white/50 text-sm border-b border-white/10">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Vehicle</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 text-white font-medium">{order.id}</td>
                  <td className="py-4 text-white/70">{order.customer}</td>
                  <td className="py-4 text-white/70">{order.vehicle}</td>
                  <td className="py-4 text-white font-medium">${order.amount.toLocaleString()}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                      order.status === 'confirmed' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
