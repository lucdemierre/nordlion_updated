'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import DraggableWidget from '@/components/DraggableWidget'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Users, Package, TrendingUp, DollarSign, Target, Award } from 'lucide-react'

export default function BrokerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [widgetPositions, setWidgetPositions] = useState<Record<string, { x: number; y: number }>>({})

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('broker')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)

    const saved = localStorage.getItem('broker_widget_positions')
    if (saved) {
      setWidgetPositions(JSON.parse(saved))
    }
  }, [router])

  const handleWidgetMove = (id: string, position: { x: number; y: number }) => {
    const newPositions = { ...widgetPositions, [id]: position }
    setWidgetPositions(newPositions)
    localStorage.setItem('broker_widget_positions', JSON.stringify(newPositions))
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-24">
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-white mb-1">
                Welcome back, {user.firstName}
              </h1>
              <p className="text-sm text-white/50 font-light">Broker Dashboard</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-[#D67C3C]/10 rounded-lg border border-[#D67C3C]/20">
                <p className="text-xs text-white/50 font-light">Commission This Month</p>
                <p className="text-lg text-[#D67C3C] font-medium">$45,200</p>
              </div>
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
            </div>
            <p className="text-2xl font-light text-white mb-1">24</p>
            <p className="text-sm text-white/50 font-light">Active Clients</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Package size={20} className="text-blue-400" />
              </div>
            </div>
            <p className="text-2xl font-light text-white mb-1">12</p>
            <p className="text-sm text-white/50 font-light">Active Deals</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <TrendingUp size={20} className="text-green-400" />
              </div>
            </div>
            <p className="text-2xl font-light text-white mb-1">$2.1M</p>
            <p className="text-sm text-white/50 font-light">Sales This Month</p>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Award size={20} className="text-purple-400" />
              </div>
            </div>
            <p className="text-2xl font-light text-white mb-1">95%</p>
            <p className="text-sm text-white/50 font-light">Success Rate</p>
          </div>
        </div>

        {/* Draggable Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DraggableWidget
            id="active-deals"
            title="Active Deals Pipeline"
            initialPosition={widgetPositions['active-deals']}
            onPositionChange={handleWidgetMove}
          >
            <div className="space-y-3">
              {[
                { client: 'John Smith', vehicle: 'Ferrari SF90', value: '$625K', stage: 'Negotiation' },
                { client: 'Emma Wilson', vehicle: 'Porsche GT3 RS', value: '$289K', stage: 'Contract' },
                { client: 'Michael Brown', vehicle: 'Lamborghini Huracán', value: '$345K', stage: 'Deposit' },
              ].map((deal, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
                  <div>
                    <p className="text-sm text-white font-medium">{deal.client}</p>
                    <p className="text-xs text-white/40 font-light mt-1">{deal.vehicle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#D67C3C] font-medium">{deal.value}</p>
                    <span className="text-xs text-white/40">{deal.stage}</span>
                  </div>
                </div>
              ))}
            </div>
          </DraggableWidget>

          <DraggableWidget
            id="top-clients"
            title="Top Clients"
            initialPosition={widgetPositions['top-clients']}
            onPositionChange={handleWidgetMove}
          >
            <div className="space-y-3">
              {[
                { name: 'David Miller', spent: '$1.2M', vehicles: 4 },
                { name: 'Sarah Johnson', spent: '$890K', vehicles: 3 },
                { name: 'Robert Garcia', spent: '$765K', vehicles: 2 },
              ].map((client, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center text-white text-sm font-medium">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">{client.name}</p>
                      <p className="text-xs text-white/40 font-light">{client.vehicles} vehicles</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#D67C3C] font-medium">{client.spent}</p>
                </div>
              ))}
            </div>
          </DraggableWidget>
        </div>

        {/* Commission Breakdown */}
        <DraggableWidget
          id="commission"
          title="Commission Breakdown"
          initialPosition={widgetPositions['commission']}
          onPositionChange={handleWidgetMove}
        >
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Pending', amount: '$28,500', color: 'bg-yellow-500' },
              { label: 'Approved', amount: '$45,200', color: 'bg-green-500' },
              { label: 'Paid', amount: '$125,000', color: 'bg-[#D67C3C]' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-[#0a0a0a] rounded-lg">
                <div className={`w-8 h-1 ${item.color} rounded-full mb-3`}></div>
                <p className="text-white/40 text-xs font-light mb-1">{item.label}</p>
                <p className="text-xl font-light text-white">{item.amount}</p>
              </div>
            ))}
          </div>
        </DraggableWidget>
      </main>

      <BottomNav />
    </div>
  )
}
