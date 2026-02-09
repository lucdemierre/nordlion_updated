'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { TrendingUp, TrendingDown, Users, Car, ShoppingBag, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('admin')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
    fetchDashboardStats()
  }, [router])

  const fetchDashboardStats = async () => {
    try {
      // TODO: Replace with real API call when backend is ready
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/dashboard`)
      // const data = await response.json()
      
      // Mock data for now
      setTimeout(() => {
        setStats({
          totalRevenue: 1250000,
          revenueChange: 12.5,
          totalOrders: 28,
          ordersChange: 8.3,
          totalUsers: 156,
          usersChange: 15.2,
          totalVehicles: 10,
          vehiclesChange: 0,
          recentOrders: [
            { id: '1', customer: 'Sarah Chen', vehicle: 'Ferrari 296 GTB', amount: 325000, status: 'processing', date: '2 hours ago' },
            { id: '2', customer: 'John Hamilton', vehicle: 'Porsche 911 Turbo S', amount: 230000, status: 'completed', date: '5 hours ago' },
            { id: '3', customer: 'Michael Sterling', vehicle: 'Bentley Continental GT', amount: 285000, status: 'pending', date: '1 day ago' },
          ],
          topVehicles: [
            { id: '1', name: 'Bugatti Chiron Super Sport', views: 8934, inquiries: 45 },
            { id: '2', name: 'Pagani Huayra Roadster BC', views: 12456, inquiries: 67 },
            { id: '3', name: 'Lamborghini Revuelto', views: 2145, inquiries: 23 },
          ]
        })
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
      setLoading(false)
    }
  }

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D67C3C]"></div>
      </div>
    )
  }

  const statCards = [
    { title: 'Total Revenue', value: `£${(stats.totalRevenue / 1000).toFixed(0)}K`, change: stats.revenueChange, icon: DollarSign, color: 'text-green-400' },
    { title: 'Total Orders', value: stats.totalOrders, change: stats.ordersChange, icon: ShoppingBag, color: 'text-blue-400' },
    { title: 'Total Users', value: stats.totalUsers, change: stats.usersChange, icon: Users, color: 'text-purple-400' },
    { title: 'Total Vehicles', value: stats.totalVehicles, change: stats.vehiclesChange, icon: Car, color: 'text-[#D67C3C]' },
  ]

  return (
    <div>
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div>
            <h1 className="text-2xl font-light text-white">Dashboard</h1>
            <p className="text-sm text-white/50 font-light mt-1">Welcome back, {user.name}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#141414] border border-white/5 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                  {stat.change !== 0 && (
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.change > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stat.change > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      <span>{Math.abs(stat.change)}%</span>
                    </div>
                  )}
                </div>
                <p className="text-2xl font-semibold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-white/50 font-light">{stat.title}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-6"
          >
            <h2 className="text-lg font-light text-white mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {stats.recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <div>
                    <p className="text-white font-medium text-sm">{order.customer}</p>
                    <p className="text-white/50 text-xs font-light">{order.vehicle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#D67C3C] font-semibold text-sm">£{(order.amount / 1000).toFixed(0)}K</p>
                    <p className="text-white/40 text-xs">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Vehicles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-6"
          >
            <h2 className="text-lg font-light text-white mb-4">Top Performing Vehicles</h2>
            <div className="space-y-4">
              {stats.topVehicles.map((vehicle: any, index: number) => (
                <div key={vehicle.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#D67C3C]/20 flex items-center justify-center text-[#D67C3C] font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{vehicle.name}</p>
                      <p className="text-white/50 text-xs font-light">{vehicle.views} views</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold text-sm">{vehicle.inquiries}</p>
                    <p className="text-white/40 text-xs">inquiries</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
