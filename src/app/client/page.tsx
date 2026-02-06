'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import DraggableWidget from '@/components/DraggableWidget'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Package, TrendingUp, Clock, MessageSquare, FileText, Heart } from 'lucide-react'

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

  const stats = [
    { icon: Package, label: 'Active Orders', value: '3', color: 'bg-[#D67C3C]', link: '/client/orders' },
    { icon: TrendingUp, label: 'Total Spent', value: '$2.4M', color: 'bg-green-500', link: '/client/documents' },
    { icon: Clock, label: 'In Transit', value: '1', color: 'bg-blue-500', link: '/client/orders?filter=in-transit' },
    { icon: MessageSquare, label: 'Unread', value: '5', color: 'bg-purple-500', link: '/client/messages' },
  ]

  return (
    <div className="flex h-screen bg-[#0f0f0f]">
      <Sidebar role="client" />
      
      <div className="flex-1 ml-16 overflow-auto">
        <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-2xl font-light text-white mb-1">
              Welcome back, {user.firstName}
            </h1>
            <p className="text-sm text-white/50 font-light">Here's what's happening with your orders</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Quick Stats - Clickable */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <Link
                  key={i}
                  href={stat.link}
                  className="bg-[#141414] border border-white/5 rounded-xl p-6 hover:border-[#D67C3C]/30 transition-all cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-lg ${stat.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={20} className={stat.color.replace('bg-', 'text-')} />
                  </div>
                  <p className="text-2xl font-light text-white mb-1 group-hover:text-[#D67C3C] transition-colors">{stat.value}</p>
                  <p className="text-sm text-white/50 font-light">{stat.label}</p>
                </Link>
              )
            })}
          </div>

          {/* Draggable Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DraggableWidget
              id="recent-orders"
              title="Recent Orders"
              initialPosition={widgetPositions['recent-orders']}
              onPositionChange={handleWidgetMove}
            >
              <div className="space-y-3">
                {[
                  { vehicle: 'Porsche 911 GT3 RS', status: 'In Transit', date: 'Feb 15, 2026', link: '/client/orders' },
                  { vehicle: 'Ferrari SF90', status: 'Processing', date: 'Mar 10, 2026', link: '/client/orders' },
                  { vehicle: 'Lamborghini Huracán', status: 'Delivered', date: 'Jan 28, 2026', link: '/client/orders' },
                ].map((order, i) => (
                  <Link
                    key={i}
                    href={order.link}
                    className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div>
                      <p className="text-sm text-white">{order.vehicle}</p>
                      <p className="text-xs text-white/40 font-light mt-1">{order.date}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-[#D67C3C]/10 text-[#D67C3C] border border-[#D67C3C]/20">
                      {order.status}
                    </span>
                  </Link>
                ))}
              </div>
            </DraggableWidget>

            <DraggableWidget
              id="recent-messages"
              title="Recent Messages"
              initialPosition={widgetPositions['recent-messages']}
              onPositionChange={handleWidgetMove}
            >
              <div className="space-y-3">
                {[
                  { from: 'Sarah - Broker', message: 'Your vehicle is ready!', time: '2m ago' },
                  { from: 'Support Team', message: 'Document processed', time: '1h ago' },
                  { from: 'John - Sales', message: 'New Ferrari available', time: '3h ago' },
                ].map((msg, i) => (
                  <Link
                    key={i}
                    href="/client/messages"
                    className="flex items-start gap-3 p-3 bg-[#0a0a0a] rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                      {msg.from.split(' ')[0][0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">{msg.from}</p>
                      <p className="text-xs text-white/40 font-light mt-1">{msg.message}</p>
                    </div>
                    <span className="text-xs text-white/30 font-light whitespace-nowrap">{msg.time}</span>
                  </Link>
                ))}
              </div>
            </DraggableWidget>
          </div>
        </main>
      </div>
    </div>
  )
}
