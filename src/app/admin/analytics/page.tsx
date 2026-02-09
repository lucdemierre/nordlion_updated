'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Car, Eye, Heart, MessageSquare, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function AnalyticsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')
  const [analytics, setAnalytics] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('admin')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
    fetchAnalytics()
  }, [router, timeRange])

  const fetchAnalytics = async () => {
    try {
      // TODO: Replace with real API when backend is ready
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/dashboard?range=${timeRange}`)
      // const data = await response.json()
      
      setTimeout(() => {
        setAnalytics({
          revenue: {
            total: 1250000,
            change: 12.5,
            trend: [850000, 920000, 1050000, 1120000, 1250000]
          },
          orders: {
            total: 28,
            change: 8.3,
            completed: 18,
            pending: 7,
            cancelled: 3
          },
          vehicles: {
            total: 10,
            available: 6,
            sold: 2,
            pending: 1,
            reserved: 1
          },
          users: {
            total: 156,
            change: 15.2,
            active: 89,
            new: 12
          },
          topVehicles: [
            { name: 'Bugatti Chiron', views: 8934, inquiries: 45, revenue: 3900000 },
            { name: 'Pagani Huayra BC', views: 12456, inquiries: 67, revenue: 3500000 },
            { name: 'Lamborghini Revuelto', views: 2145, inquiries: 23, revenue: 608358 },
            { name: 'Ferrari 296 GTB', views: 1247, inquiries: 18, revenue: 325000 },
            { name: 'Rolls-Royce Spectre', views: 2341, inquiries: 31, revenue: 420000 },
          ],
          salesByMonth: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            data: [2, 3, 2, 4, 5]
          },
          revenueByMonth: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            data: [850000, 920000, 1050000, 1120000, 1250000]
          },
          orderStatus: {
            labels: ['Completed', 'Pending', 'Cancelled'],
            data: [18, 7, 3]
          },
          vehiclesByMake: {
            labels: ['Ferrari', 'Lamborghini', 'Porsche', 'McLaren', 'Others'],
            data: [2, 1, 1, 1, 5]
          }
        })
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#fff',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: '#141414',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#D67C3C',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#888' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#888' }
      }
    }
  }

  const revenueChartData = {
    labels: analytics.revenueByMonth.labels,
    datasets: [
      {
        label: 'Revenue',
        data: analytics.revenueByMonth.data,
        borderColor: '#D67C3C',
        backgroundColor: 'rgba(214, 124, 60, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const salesChartData = {
    labels: analytics.salesByMonth.labels,
    datasets: [
      {
        label: 'Sales',
        data: analytics.salesByMonth.data,
        backgroundColor: '#D67C3C',
        borderRadius: 8
      }
    ]
  }

  const orderStatusData = {
    labels: analytics.orderStatus.labels,
    datasets: [
      {
        data: analytics.orderStatus.data,
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 0
      }
    ]
  }

  const vehiclesMakeData = {
    labels: analytics.vehiclesByMake.labels,
    datasets: [
      {
        data: analytics.vehiclesByMake.data,
        backgroundColor: ['#D67C3C', '#B85A1F', '#8B4513', '#654321', '#3d2b1f'],
        borderWidth: 0
      }
    ]
  }

  return (
    <div>
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-white">Analytics</h1>
              <p className="text-sm text-white/50 font-light mt-1">Comprehensive business insights</p>
            </div>
            <div className="flex items-center gap-2">
              {['7d', '30d', '90d', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-light transition-colors ${
                    timeRange === range
                      ? 'bg-[#D67C3C] text-white'
                      : 'bg-[#141414] text-white/50 hover:text-white border border-white/5'
                  }`}
                >
                  {range === '1y' ? '1 Year' : range.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <DollarSign size={24} className="text-green-400" />
              </div>
              <div className="flex items-center gap-1 text-sm text-green-400">
                <TrendingUp size={16} />
                <span>{analytics.revenue.change}%</span>
              </div>
            </div>
            <p className="text-2xl font-semibold text-white mb-1">
              £{(analytics.revenue.total / 1000).toFixed(0)}K
            </p>
            <p className="text-sm text-white/50 font-light">Total Revenue</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <ShoppingBag size={24} className="text-blue-400" />
              </div>
              <div className="flex items-center gap-1 text-sm text-green-400">
                <TrendingUp size={16} />
                <span>{analytics.orders.change}%</span>
              </div>
            </div>
            <p className="text-2xl font-semibold text-white mb-1">{analytics.orders.total}</p>
            <p className="text-sm text-white/50 font-light">Total Orders</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Users size={24} className="text-purple-400" />
              </div>
              <div className="flex items-center gap-1 text-sm text-green-400">
                <TrendingUp size={16} />
                <span>{analytics.users.change}%</span>
              </div>
            </div>
            <p className="text-2xl font-semibold text-white mb-1">{analytics.users.total}</p>
            <p className="text-sm text-white/50 font-light">Total Users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-[#D67C3C]/10">
                <Car size={24} className="text-[#D67C3C]" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-white mb-1">{analytics.vehicles.available}/{analytics.vehicles.total}</p>
            <p className="text-sm text-white/50 font-light">Available Vehicles</p>
          </motion.div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-6"
          >
            <h2 className="text-lg font-light text-white mb-4">Revenue Trend</h2>
            <div className="h-72">
              <Line data={revenueChartData} options={chartOptions} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-6"
          >
            <h2 className="text-lg font-light text-white mb-4">Sales by Month</h2>
            <div className="h-72">
              <Bar data={salesChartData} options={chartOptions} />
            </div>
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-6"
          >
            <h2 className="text-lg font-light text-white mb-4">Order Status</h2>
            <div className="h-64">
              <Doughnut data={orderStatusData} options={{ ...chartOptions, scales: undefined }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-6"
          >
            <h2 className="text-lg font-light text-white mb-4">Vehicles by Make</h2>
            <div className="h-64">
              <Doughnut data={vehiclesMakeData} options={{ ...chartOptions, scales: undefined }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-[#141414] border border-white/5 rounded-xl p-6"
          >
            <h2 className="text-lg font-light text-white mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-green-400" />
                  <span className="text-sm text-white/70">Completed</span>
                </div>
                <span className="text-white font-semibold">{analytics.orders.completed}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-yellow-400" />
                  <span className="text-sm text-white/70">Pending</span>
                </div>
                <span className="text-white font-semibold">{analytics.orders.pending}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-blue-400" />
                  <span className="text-sm text-white/70">Active Users</span>
                </div>
                <span className="text-white font-semibold">{analytics.users.active}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <Car size={18} className="text-[#D67C3C]" />
                  <span className="text-sm text-white/70">Vehicles Sold</span>
                </div>
                <span className="text-white font-semibold">{analytics.vehicles.sold}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Top Performing Vehicles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-[#141414] border border-white/5 rounded-xl p-6"
        >
          <h2 className="text-lg font-light text-white mb-4">Top Performing Vehicles</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/5">
                <tr className="text-left">
                  <th className="px-4 py-3 text-xs font-medium text-white/50 uppercase">Vehicle</th>
                  <th className="px-4 py-3 text-xs font-medium text-white/50 uppercase">Views</th>
                  <th className="px-4 py-3 text-xs font-medium text-white/50 uppercase">Inquiries</th>
                  <th className="px-4 py-3 text-xs font-medium text-white/50 uppercase">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {analytics.topVehicles.map((vehicle: any, index: number) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#D67C3C]/20 flex items-center justify-center text-[#D67C3C] font-semibold text-sm">
                          {index + 1}
                        </div>
                        <span className="text-white font-medium">{vehicle.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Eye size={16} className="text-white/40" />
                        <span className="text-white">{vehicle.views.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={16} className="text-white/40" />
                        <span className="text-white">{vehicle.inquiries}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[#D67C3C] font-semibold">
                        £{(vehicle.revenue / 1000).toFixed(0)}K
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
