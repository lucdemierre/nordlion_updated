'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DraggableWidget from '@/components/DraggableWidget'
import { getCurrentUser, canAccessDashboard, logout } from '@/lib/auth'
import { Users, Package, TrendingUp, DollarSign, Activity, AlertCircle, CheckCircle, Clock, LogOut } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [widgetPositions, setWidgetPositions] = useState<Record<string, { x: number; y: number }>>({})

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('admin')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)

    const saved = localStorage.getItem('admin_widget_positions')
    if (saved) {
      setWidgetPositions(JSON.parse(saved))
    }
  }, [router])

  const handleWidgetMove = (id: string, position: { x: number; y: number }) => {
    const newPositions = { ...widgetPositions, [id]: position }
    setWidgetPositions(newPositions)
    localStorage.setItem('admin_widget_positions', JSON.stringify(newPositions))
  }

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-8">
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-white mb-1">
                Admin Control Center
              </h1>
              <p className="text-sm text-white/50 font-light">System Overview & Management</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
                <p className="text-xs text-white/50 font-light">System Status</p>
                <p className="text-sm text-green-400 font-medium flex items-center gap-2">
                  <Activity size={14} />
                  All Systems Operational
                </p>
              </div>
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

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#D67C3C]/10 flex items-center justify-center">
                <Users size={20} className="text-[#D67C3C]" />
              </div>
              <span className="text-xs text-green-400 font-light">+12 this week</span>
            </div>
            <p className="text-2xl font-light text-white mb-1">1,247</p>
            <p className="text-sm text-white/50 font-light">Total Users</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Package size={20} className="text-blue-400" />
              </div>
              <span className="text-xs text-green-400 font-light">+5 new</span>
            </div>
            <p className="text-2xl font-light text-white mb-1">342</p>
            <p className="text-sm text-white/50 font-light">Active Listings</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <TrendingUp size={20} className="text-green-400" />
              </div>
              <span className="text-xs text-green-400 font-light">+23% this month</span>
            </div>
            <p className="text-2xl font-light text-white mb-1">$12.4M</p>
            <p className="text-sm text-white/50 font-light">Total Revenue</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <DollarSign size={20} className="text-purple-400" />
              </div>
              <span className="text-xs text-green-400 font-light">+18%</span>
            </div>
            <p className="text-2xl font-light text-white mb-1">89</p>
            <p className="text-sm text-white/50 font-light">Pending Orders</p>
          </div>
        </div>

        {/* Draggable Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DraggableWidget
            id="recent-activity"
            title="Recent Platform Activity"
            initialPosition={widgetPositions['recent-activity']}
            onPositionChange={handleWidgetMove}
          >
            <div className="space-y-3">
              {[
                { type: 'user', action: 'New user registered', name: 'John Smith', time: '5 min ago', icon: Users, color: 'bg-green-500' },
                { type: 'order', action: 'Order completed', name: 'Ferrari SF90 - $625K', time: '12 min ago', icon: CheckCircle, color: 'bg-blue-500' },
                { type: 'alert', action: 'Payment issue flagged', name: 'Order #2026-089', time: '1 hour ago', icon: AlertCircle, color: 'bg-yellow-500' },
                { type: 'vehicle', action: 'New listing added', name: 'Porsche GT3 RS', time: '2 hours ago', icon: Package, color: 'bg-purple-500' },
              ].map((activity, i) => {
                const Icon = activity.icon
                return (
                  <div key={i} className="flex items-start gap-3 p-3 bg-[#0a0a0a] rounded-lg">
                    <div className={`w-8 h-8 rounded-lg ${activity.color}/10 flex items-center justify-center flex-shrink-0`}>
                      <Icon size={16} className={activity.color.replace('bg-', 'text-')} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">{activity.action}</p>
                      <p className="text-xs text-white/40 font-light mt-1">{activity.name}</p>
                    </div>
                    <span className="text-xs text-white/30 font-light whitespace-nowrap">{activity.time}</span>
                  </div>
                )
              })}
            </div>
          </DraggableWidget>

          <DraggableWidget
            id="user-stats"
            title="User Statistics"
            initialPosition={widgetPositions['user-stats']}
            onPositionChange={handleWidgetMove}
          >
            <div className="space-y-4">
              {[
                { label: 'Active Users', value: 892, total: 1247, color: 'bg-green-500' },
                { label: 'Brokers', value: 24, total: 1247, color: 'bg-[#D67C3C]' },
                { label: 'New This Month', value: 156, total: 1247, color: 'bg-blue-500' },
              ].map((stat, i) => {
                const percentage = (stat.value / stat.total) * 100
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/70 font-light">{stat.label}</span>
                      <span className="text-sm text-white font-medium">{stat.value}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${stat.color} rounded-full transition-all`} style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </DraggableWidget>
        </div>

        {/* System Alerts */}
        <DraggableWidget
          id="system-alerts"
          title="System Alerts & Notifications"
          initialPosition={widgetPositions['system-alerts']}
          onPositionChange={handleWidgetMove}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { type: 'warning', count: 3, label: 'Pending Reviews', color: 'bg-yellow-500' },
              { type: 'info', count: 12, label: 'Support Tickets', color: 'bg-blue-500' },
              { type: 'success', count: 45, label: 'Completed Today', color: 'bg-green-500' },
            ].map((alert, i) => (
              <div key={i} className="p-4 bg-[#0a0a0a] rounded-lg border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg ${alert.color}/10 flex items-center justify-center`}>
                    <Clock size={16} className={alert.color.replace('bg-', 'text-')} />
                  </div>
                  <span className={`text-2xl font-light ${alert.color.replace('bg-', 'text-')}`}>{alert.count}</span>
                </div>
                <p className="text-sm text-white/60 font-light">{alert.label}</p>
              </div>
            ))}
          </div>
        </DraggableWidget>
      </main>
    </div>
  )
}
