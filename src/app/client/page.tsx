'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import DraggableWidget from '@/components/DraggableWidget'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Package, TrendingUp, Clock, DollarSign, ArrowRight } from 'lucide-react'

export default function ClientDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [widgetPositions, setWidgetPositions] = useState<Record<string, { x: number; y: number }>>({})

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('client')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)

    // Load saved widget positions
    const saved = localStorage.getItem('client_widget_positions')
    if (saved) {
      setWidgetPositions(JSON.parse(saved))
    }
  }, [router])

  const handleWidgetMove = (id: string, position: { x: number; y: number }) => {
    const newPositions = { ...widgetPositions, [id]: position }
    setWidgetPositions(newPositions)
    localStorage.setItem('client_widget_positions', JSON.stringify(newPositions))
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-24">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-white mb-1">
                Welcome back, {user.firstName}
              </h1>
              <p className="text-sm text-white/50 font-light">Client Dashboard</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-[#22c55e]/10 rounded-lg border border-[#22c55e]/20">
                <p className="text-xs text-white/50 font-light">Status</p>
                <p className="text-sm text-[#22c55e] font-medium">Verified</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center">
                <Package size={20} className="text-[#22c55e]" />
              </div>
              <span className="text-xs text-white/40 font-light">Active</span>
            </div>
            <p className="text-2xl font-light text-white mb-1">2</p>
            <p className="text-sm text-white/50 font-light">Active Orders</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Clock size={20} className="text-blue-400" />
              </div>
              <span className="text-xs text-white/40 font-light">Pending</span>
            </div>
            <p className="text-2xl font-light text-white mb-1">1</p>
            <p className="text-sm text-white/50 font-light">Pending Inquiry</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <TrendingUp size={20} className="text-purple-400" />
              </div>
              <span className="text-xs text-white/40 font-light">Total</span>
            </div>
            <p className="text-2xl font-light text-white mb-1">5</p>
            <p className="text-sm text-white/50 font-light">Completed</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <DollarSign size={20} className="text-orange-400" />
              </div>
              <span className="text-xs text-white/40 font-light">Lifetime</span>
            </div>
            <p className="text-2xl font-light text-white mb-1">$2.4M</p>
            <p className="text-sm text-white/50 font-light">Total Value</p>
          </div>
        </div>

        {/* Draggable Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DraggableWidget
            id="recent-orders"
            title="Recent Orders"
            initialPosition={widgetPositions['recent-orders']}
            onPositionChange={handleWidgetMove}
          >
            <div className="space-y-3">
              {[
                { car: 'Porsche 911 GT3 RS', status: 'In Transit', date: 'Feb 15, 2026' },
                { car: 'Ferrari SF90 Stradale', status: 'Processing', date: 'Feb 10, 2026' },
              ].map((order, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
                  <div>
                    <p className="text-sm text-white font-medium">{order.car}</p>
                    <p className="text-xs text-white/40 font-light mt-1">{order.date}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#22c55e]/10 text-[#22c55e] text-xs rounded-full">
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </DraggableWidget>

          <DraggableWidget
            id="pending-documents"
            title="Pending Documents"
            initialPosition={widgetPositions['pending-documents']}
            onPositionChange={handleWidgetMove}
          >
            <div className="space-y-3">
              <div className="p-3 bg-[#0a0a0a] rounded-lg">
                <p className="text-sm text-white mb-2">Vehicle Registration - Porsche 911</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#22c55e] w-3/4"></div>
                  </div>
                  <span className="text-xs text-white/40">75%</span>
                </div>
              </div>
              <button className="w-full py-2 border border-white/10 rounded-lg text-sm text-white/60 hover:text-white hover:border-white/20 transition-colors font-light">
                Upload Required Documents
              </button>
            </div>
          </DraggableWidget>
        </div>

        {/* Recent Activity */}
        <DraggableWidget
          id="recent-activity"
          title="Recent Activity"
          initialPosition={widgetPositions['recent-activity']}
          onPositionChange={handleWidgetMove}
        >
          <div className="space-y-3">
            {[
              { action: 'Order status updated', detail: 'Porsche 911 GT3 RS', time: '2 hours ago' },
              { action: 'Message received', detail: 'From: Sales Team', time: '5 hours ago' },
              { action: 'Document uploaded', detail: 'Insurance certificate', time: '1 day ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-[#0a0a0a] rounded-lg">
                <div className="w-2 h-2 rounded-full bg-[#22c55e] mt-1.5"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.action}</p>
                  <p className="text-xs text-white/40 font-light mt-1">{activity.detail}</p>
                </div>
                <span className="text-xs text-white/30 font-light">{activity.time}</span>
              </div>
            ))}
          </div>
        </DraggableWidget>
      </main>

      <BottomNav />
    </div>
  )
}
