'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import DraggableWidget from '@/components/DraggableWidget'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Users, Package, DollarSign, TrendingUp } from 'lucide-react'

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
    <div className="flex h-screen bg-[#0f0f0f]">
      <Sidebar role="broker" />
      
      <div className="flex-1 ml-16 overflow-auto">
        <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-2xl font-light text-white mb-1">
              Welcome back, {user.firstName}
            </h1>
            <p className="text-sm text-white/50 font-light">Your broker dashboard</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Users, label: 'Active Clients', value: '24', color: 'bg-[#D67C3C]' },
              { icon: Package, label: 'Inventory', value: '156', color: 'bg-blue-500' },
              { icon: DollarSign, label: 'Commission', value: '$145K', color: 'bg-green-500' },
              { icon: TrendingUp, label: 'Sales', value: '18', color: 'bg-purple-500' },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="bg-[#141414] border border-white/5 rounded-xl p-6">
                  <div className={`w-10 h-10 rounded-lg ${stat.color}/10 flex items-center justify-center mb-4`}>
                    <Icon size={20} className={stat.color.replace('bg-', 'text-')} />
                  </div>
                  <p className="text-2xl font-light text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-white/50 font-light">{stat.label}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DraggableWidget
              id="broker-performance"
              title="Performance Overview"
              initialPosition={widgetPositions['broker-performance']}
              onPositionChange={handleWidgetMove}
            >
              <div className="space-y-4">
                {[
                  { label: 'Sales Target', value: 18, total: 25, color: 'bg-[#D67C3C]' },
                  { label: 'Client Satisfaction', value: 94, total: 100, color: 'bg-green-500' },
                  { label: 'Response Time', value: 85, total: 100, color: 'bg-blue-500' },
                ].map((stat, i) => {
                  const percentage = (stat.value / stat.total) * 100
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/70 font-light">{stat.label}</span>
                        <span className="text-sm text-white font-medium">{stat.value}/{stat.total}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </DraggableWidget>

            <DraggableWidget
              id="recent-clients"
              title="Recent Client Activity"
              initialPosition={widgetPositions['recent-clients']}
              onPositionChange={handleWidgetMove}
            >
              <div className="space-y-3">
                {[
                  { name: 'John Smith', action: 'Purchased Ferrari SF90', time: '2h ago' },
                  { name: 'Emma Wilson', action: 'Viewing Porsche 911', time: '5h ago' },
                  { name: 'Michael Brown', action: 'Requested quote', time: '1d ago' },
                ].map((client, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-[#0a0a0a] rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center text-white text-xs font-medium">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{client.name}</p>
                      <p className="text-xs text-white/40 font-light mt-1">{client.action}</p>
                    </div>
                    <span className="text-xs text-white/30 font-light">{client.time}</span>
                  </div>
                ))}
              </div>
            </DraggableWidget>
          </div>
        </main>
      </div>
    </div>
  )
}
