'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import DraggableWidget from '@/components/DraggableWidget'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Package, TrendingUp, Clock, DollarSign, ArrowRight, PlayCircle, Star } from 'lucide-react'
import Image from 'next/image'

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

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-24 relative overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 z-0 opacity-5">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.pixabay.com/video/2023/07/27/173289-850135509_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-transparent to-[#0f0f0f]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with Background Image */}
        <header className="border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl sticky top-0 z-40 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
              alt="Luxury cars"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-light text-white mb-1">
                  Welcome back, {user.firstName}
                </h1>
                <p className="text-sm text-white/50 font-light">Client Dashboard</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-[#D67C3C]/10 rounded-lg border border-[#D67C3C]/20">
                  <p className="text-xs text-white/50 font-light">Status</p>
                  <p className="text-sm text-[#D67C3C] font-medium">Verified</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-[#D67C3C]/30 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D67C3C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D67C3C]/10 flex items-center justify-center">
                    <Package size={20} className="text-[#D67C3C]" />
                  </div>
                  <span className="text-xs text-white/40 font-light">Active</span>
                </div>
                <p className="text-2xl font-light text-white mb-1">2</p>
                <p className="text-sm text-white/50 font-light">Active Orders</p>
              </div>
            </div>

            <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-[#D67C3C]/30 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Clock size={20} className="text-blue-400" />
                  </div>
                  <span className="text-xs text-white/40 font-light">Pending</span>
                </div>
                <p className="text-2xl font-light text-white mb-1">1</p>
                <p className="text-sm text-white/50 font-light">Pending Inquiry</p>
              </div>
            </div>

            <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-[#D67C3C]/30 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <TrendingUp size={20} className="text-purple-400" />
                  </div>
                  <span className="text-xs text-white/40 font-light">Total</span>
                </div>
                <p className="text-2xl font-light text-white mb-1">5</p>
                <p className="text-sm text-white/50 font-light">Completed</p>
              </div>
            </div>

            <div className="bg-[#141414]/80 backdrop-blur-sm border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-[#D67C3C]/30 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D67C3C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D67C3C]/10 flex items-center justify-center">
                    <DollarSign size={20} className="text-[#D67C3C]" />
                  </div>
                  <span className="text-xs text-white/40 font-light">Lifetime</span>
                </div>
                <p className="text-2xl font-light text-white mb-1">$2.4M</p>
                <p className="text-sm text-white/50 font-light">Total Value</p>
              </div>
            </div>
          </div>

          {/* Featured Video Section */}
          <div className="mb-8 bg-[#141414]/80 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80"
                alt="Luxury vehicle showcase"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-[#D67C3C] hover:bg-[#B85A1F] rounded-full flex items-center justify-center transition-all hover:scale-110">
                  <PlayCircle size={32} className="text-white" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-light text-white mb-2">Your Porsche 911 GT3 RS - Delivery Update</h3>
                <p className="text-sm text-white/60 font-light">Watch your vehicle's journey from our facility to your location</p>
              </div>
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
                  { 
                    car: 'Porsche 911 GT3 RS', 
                    status: 'In Transit', 
                    date: 'Feb 15, 2026',
                    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80'
                  },
                  { 
                    car: 'Ferrari SF90 Stradale', 
                    status: 'Processing', 
                    date: 'Feb 10, 2026',
                    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&q=80'
                  },
                ].map((order, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-lg hover:bg-[#0a0a0a]/80 transition-colors group">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={order.image}
                        alt={order.car}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">{order.car}</p>
                      <p className="text-xs text-white/40 font-light mt-1">{order.date}</p>
                    </div>
                    <span className="px-3 py-1 bg-[#D67C3C]/10 text-[#D67C3C] text-xs rounded-full">
                      {order.status}
                    </span>
                  </div>
                ))}
                <button className="w-full py-3 border border-[#D67C3C]/20 rounded-lg text-sm text-[#D67C3C] hover:bg-[#D67C3C]/5 transition-colors font-light flex items-center justify-center gap-2">
                  View All Orders
                  <ArrowRight size={16} />
                </button>
              </div>
            </DraggableWidget>

            <DraggableWidget
              id="wishlist-vehicles"
              title="Wishlist Vehicles"
              initialPosition={widgetPositions['wishlist-vehicles']}
              onPositionChange={handleWidgetMove}
            >
              <div className="space-y-3">
                {[
                  {
                    car: 'Lamborghini Huracán STO',
                    price: '$350,000',
                    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80'
                  },
                  {
                    car: 'McLaren 720S Spider',
                    price: '$315,000',
                    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=400&q=80'
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-lg hover:bg-[#0a0a0a]/80 transition-colors group">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.car}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">{item.car}</p>
                      <p className="text-xs text-[#D67C3C] font-light mt-1">{item.price}</p>
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <Star size={16} className="text-[#D67C3C]" fill="#D67C3C" />
                    </button>
                  </div>
                ))}
                <button className="w-full py-3 border border-[#D67C3C]/20 rounded-lg text-sm text-[#D67C3C] hover:bg-[#D67C3C]/5 transition-colors font-light flex items-center justify-center gap-2">
                  Browse Inventory
                  <ArrowRight size={16} />
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
                { action: 'Order status updated', detail: 'Porsche 911 GT3 RS', time: '2 hours ago', type: 'order' },
                { action: 'Message received', detail: 'From: Sales Team', time: '5 hours ago', type: 'message' },
                { action: 'Document uploaded', detail: 'Insurance certificate', time: '1 day ago', type: 'document' },
                { action: 'Payment processed', detail: '$50,000 deposit', time: '2 days ago', type: 'payment' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-[#0a0a0a] rounded-lg hover:bg-[#0a0a0a]/80 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                    activity.type === 'order' ? 'bg-[#D67C3C]' :
                    activity.type === 'message' ? 'bg-blue-400' :
                    activity.type === 'document' ? 'bg-green-400' :
                    'bg-purple-400'
                  }`}></div>
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
      </div>

      <BottomNav />
    </div>
  )
}
