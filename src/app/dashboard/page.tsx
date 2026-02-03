'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import DraggableWidget from '@/components/dashboard/DraggableWidget'
import { Package, Heart, Clock, CheckCircle, TrendingUp, DollarSign } from 'lucide-react'

interface Widget {
  id: string
  type: 'stat' | 'orders' | 'action'
  order: number
  content: any
}

const initialStats = [
  { id: 'stat-1', name: 'Total Orders', value: '12', icon: Package, color: 'from-blue-500/20 to-blue-600/20', iconColor: 'text-blue-400', change: '+3 this month' },
  { id: 'stat-2', name: 'Saved Vehicles', value: '8', icon: Heart, color: 'from-red-500/20 to-red-600/20', iconColor: 'text-red-400', change: '2 new' },
  { id: 'stat-3', name: 'In Progress', value: '2', icon: Clock, color: 'from-yellow-500/20 to-yellow-600/20', iconColor: 'text-yellow-400', change: 'On track' },
  { id: 'stat-4', name: 'Delivered', value: '10', icon: CheckCircle, color: 'from-green-500/20 to-green-600/20', iconColor: 'text-green-400', change: 'All on time' },
]

const recentOrders = [
  {
    id: 'NL-2024-145',
    vehicle: 'Porsche 911 Turbo S',
    date: '2024-01-15',
    status: 'Delivered',
    amount: 245000,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f3c8d?w=400&h=300&fit=crop',
  },
  {
    id: 'NL-2024-132',
    vehicle: 'Mercedes-AMG GT',
    date: '2024-01-10',
    status: 'In Transit',
    amount: 189000,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
  },
  {
    id: 'NL-2023-298',
    vehicle: 'BMW M8 Competition',
    date: '2023-12-22',
    status: 'Delivered',
    amount: 156000,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop',
  },
]

export default function DashboardPage() {
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [widgets, setWidgets] = useState<Widget[]>([
    ...initialStats.map((stat, index) => ({
      id: stat.id,
      type: 'stat' as const,
      order: index,
      content: stat
    })),
    {
      id: 'orders-widget',
      type: 'orders' as const,
      order: 4,
      content: null
    },
    {
      id: 'action-1',
      type: 'action' as const,
      order: 5,
      content: {
        icon: TrendingUp,
        title: 'Track Your Order',
        description: 'Get real-time updates on your vehicle\'s location and delivery status.',
        buttonText: 'Track Order',
        buttonStyle: 'primary'
      }
    },
    {
      id: 'action-2',
      type: 'action' as const,
      order: 6,
      content: {
        icon: DollarSign,
        iconColor: 'text-purple-400',
        title: 'Need Assistance?',
        description: 'Our concierge team is available 24/7 to help with any questions or concerns.',
        buttonText: 'Contact Support',
        buttonStyle: 'secondary'
      }
    }
  ])

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragEnd = () => {
    setDraggedId(null)
  }

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return

    setWidgets(prev => {
      const newWidgets = [...prev]
      const draggedIndex = newWidgets.findIndex(w => w.id === draggedId)
      const targetIndex = newWidgets.findIndex(w => w.id === targetId)

      const [draggedWidget] = newWidgets.splice(draggedIndex, 1)
      newWidgets.splice(targetIndex, 0, draggedWidget)

      return newWidgets.map((w, i) => ({ ...w, order: i }))
    })
  }

  const sortedWidgets = [...widgets].sort((a, b) => a.order - b.order)

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-1">Welcome Back</h1>
            <p className="text-white/50 text-sm font-light">Here’s an overview of your activity</p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-xs font-light">Last login</p>
            <p className="text-white text-sm font-normal">Today at 9:42 AM</p>
          </div>
        </div>

        {/* Draggable Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedWidgets.filter(w => w.type === 'stat').map((widget) => {
            const stat = widget.content
            const Icon = stat.icon
            return (
              <DraggableWidget
                key={widget.id}
                id={widget.id}
                onDragStart={() => handleDragStart(widget.id)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(widget.id)}
                isDragging={draggedId === widget.id}
              >
                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                    <Icon className={`${stat.iconColor} w-5 h-5`} />
                  </div>
                  <div className="text-3xl font-semibold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/50 font-light">{stat.name}</div>
                  <div className="text-xs text-[#32b8c6] mt-2 font-normal">{stat.change}</div>
                </div>
              </DraggableWidget>
            )
          })}
        </div>

        {/* Recent Orders Widget */}
        {sortedWidgets.filter(w => w.type === 'orders').map((widget) => (
          <DraggableWidget
            key={widget.id}
            id={widget.id}
            onDragStart={() => handleDragStart(widget.id)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(widget.id)}
            isDragging={draggedId === widget.id}
          >
            <div className="overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Recent Orders</h3>
                  <button className="text-[#32b8c6] hover:text-[#2aa0ad] text-sm font-normal transition-colors">
                    View All
                  </button>
                </div>
              </div>
              <div className="divide-y divide-white/5">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-4 p-6 hover:bg-white/[0.02] transition-colors group cursor-pointer"
                  >
                    <div className="w-20 h-16 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                      <img
                        src={order.image}
                        alt={order.vehicle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-normal mb-1 truncate">{order.vehicle}</h4>
                      <p className="text-xs text-white/40 font-light">
                        Order {order.id} • {order.date}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-white font-semibold text-sm mb-2">
                        ${order.amount.toLocaleString()}
                      </div>
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-normal ${
                          order.status === 'Delivered'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DraggableWidget>
        ))}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedWidgets.filter(w => w.type === 'action').map((widget) => {
            const action = widget.content
            const Icon = action.icon
            const isPrimary = action.buttonStyle === 'primary'
            return (
              <DraggableWidget
                key={widget.id}
                id={widget.id}
                onDragStart={() => handleDragStart(widget.id)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(widget.id)}
                isDragging={draggedId === widget.id}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${
                      isPrimary 
                        ? 'from-[#32b8c6]/10 to-[#1a6873]/10' 
                        : 'from-purple-500/10 to-purple-600/10'
                    } rounded-xl`}>
                      <Icon className={`w-5 h-5 ${
                        action.iconColor || 'text-[#32b8c6]'
                      }`} />
                    </div>
                  </div>
                  <h3 className="text-base font-medium text-white mb-2">{action.title}</h3>
                  <p className="text-white/50 mb-4 text-sm font-light">
                    {action.description}
                  </p>
                  <button className={`w-full py-2.5 px-4 rounded-xl text-sm font-normal transition-all ${
                    isPrimary
                      ? 'bg-[#32b8c6] hover:bg-[#2aa0ad] text-white'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}>
                    {action.buttonText}
                  </button>
                </div>
              </DraggableWidget>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
