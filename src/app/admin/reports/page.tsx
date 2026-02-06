'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, canAccessDashboard, logout } from '@/lib/auth'
import { TrendingUp, DollarSign, Users, Package, Download, Calendar, BarChart3, PieChart, LogOut, Home } from 'lucide-react'

export default function AdminReports() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('admin')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Home size={20} className="text-white/60" />
              </Link>
              <div>
                <h1 className="text-2xl font-light text-white">Reports & Analytics</h1>
                <p className="text-sm text-white/50 font-light mt-1">Performance insights and data</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <Download size={16} />
                Export Report
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-colors flex items-center gap-2 text-red-400 font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 pb-16">
        {/* Period Selector */}
        <div className="flex items-center gap-2 mb-8">
          {['week', 'month', 'quarter', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-light transition-colors ${
                selectedPeriod === period
                  ? 'bg-[#D67C3C] text-white'
                  : 'bg-[#141414] text-white/50 hover:text-white border border-white/5'
              }`}
            >
              This {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Revenue', value: '$12.4M', change: '+23%', icon: DollarSign, color: 'bg-green-500' },
            { label: 'Total Sales', value: '156', change: '+18%', icon: TrendingUp, color: 'bg-[#D67C3C]' },
            { label: 'New Users', value: '2,847', change: '+12%', icon: Users, color: 'bg-blue-500' },
            { label: 'Inventory', value: '342', change: '+5%', icon: Package, color: 'bg-purple-500' },
          ].map((kpi, i) => {
            const Icon = kpi.icon
            return (
              <div key={i} className="bg-[#141414] border border-white/5 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg ${kpi.color}/10 flex items-center justify-center`}>
                    <Icon size={20} className={kpi.color.replace('bg-', 'text-')} />
                  </div>
                  <span className="text-xs text-green-400 font-light">{kpi.change}</span>
                </div>
                <p className="text-2xl font-light text-white mb-1">{kpi.value}</p>
                <p className="text-sm text-white/50 font-light">{kpi.label}</p>
              </div>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white">Revenue Trend</h3>
              <BarChart3 size={20} className="text-white/40" />
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {[45, 52, 48, 65, 70, 68, 85, 90, 88, 95, 100, 92].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end">
                  <div 
                    className="bg-gradient-to-t from-[#D67C3C] to-[#B85A1F] rounded-t transition-all hover:opacity-80"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-white/40 text-center mt-2">J{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sales by Category */}
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white">Sales by Category</h3>
              <PieChart size={20} className="text-white/40" />
            </div>
            <div className="space-y-4">
              {[
                { label: 'Super Cars', percentage: 45, value: '$5.58M', color: 'bg-[#D67C3C]' },
                { label: 'Luxury Sedans', percentage: 30, value: '$3.72M', color: 'bg-blue-500' },
                { label: 'SUVs', percentage: 15, value: '$1.86M', color: 'bg-green-500' },
                { label: 'Classics', percentage: 10, value: '$1.24M', color: 'bg-purple-500' },
              ].map((category, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/70 font-light">{category.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#D67C3C] font-medium">{category.value}</span>
                      <span className="text-xs text-white/40">{category.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${category.color} rounded-full`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-6">Top Performing Vehicles</h3>
          <div className="space-y-3">
            {[
              { vehicle: 'Ferrari SF90 Stradale', sales: 12, revenue: '$7.5M', views: 4521 },
              { vehicle: 'Lamborghini Aventador SVJ', sales: 8, revenue: '$4.8M', views: 3845 },
              { vehicle: 'Porsche 911 GT3 RS', sales: 15, revenue: '$4.3M', views: 5234 },
              { vehicle: 'McLaren 720S', sales: 10, revenue: '$3.8M', views: 2876 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#D67C3C]/10 flex items-center justify-center text-[#D67C3C] font-medium">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{item.vehicle}</p>
                    <p className="text-xs text-white/40 font-light">{item.views} views</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#D67C3C] font-medium">{item.revenue}</p>
                  <p className="text-xs text-white/40 font-light">{item.sales} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
