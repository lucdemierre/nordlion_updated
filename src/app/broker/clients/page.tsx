'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Users, Search, Mail, Phone, DollarSign, Package } from 'lucide-react'

export default function BrokerClients() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<any>(null)
  const [selectedView, setSelectedView] = useState(searchParams.get('view') || 'all')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('broker')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const clients = [
    { id: '1', name: 'John Smith', email: 'john@example.com', phone: '+44 20 1234 5678', orders: 3, spent: 875000, status: 'active', joined: 'Jan 2026' },
    { id: '2', name: 'Emma Wilson', email: 'emma@example.com', phone: '+44 20 2345 6789', orders: 5, spent: 1450000, status: 'active', joined: 'Dec 2025' },
    { id: '3', name: 'Michael Brown', email: 'michael@example.com', phone: '+44 20 3456 7890', orders: 2, spent: 620000, status: 'active', joined: 'Jan 2026' },
    { id: '4', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+44 20 4567 8901', orders: 1, spent: 385000, status: 'inactive', joined: 'Nov 2025' },
  ]

  if (!user) return null

  const totalEarnings = clients.reduce((sum, client) => sum + (client.spent * 0.05), 0)

  return (
    <div className="flex h-screen bg-[#0f0f0f]">
      <Sidebar role="broker" />
      
      <div className="flex-1 ml-16 overflow-auto">
        <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-light text-white">Clients</h1>
                <p className="text-sm text-white/50 font-light mt-1">{clients.length} active clients</p>
              </div>
              {selectedView === 'earnings' && (
                <div className="px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="text-xs text-white/50 font-light">Total Commission</p>
                  <p className="text-lg text-green-400 font-medium">${totalEarnings.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Search & Filter */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search clients..."
                className="w-full pl-10 pr-4 py-2 bg-[#141414] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light"
              />
            </div>
            <div className="flex items-center gap-2">
              {['all', 'active', 'earnings'].map((view) => (
                <button
                  key={view}
                  onClick={() => setSelectedView(view)}
                  className={`px-4 py-2 rounded-lg text-sm font-light transition-colors whitespace-nowrap ${
                    selectedView === view
                      ? 'bg-[#D67C3C] text-white'
                      : 'bg-[#141414] text-white/50 hover:text-white border border-white/5'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clients.map((client) => (
              <div key={client.id} className="bg-[#141414] border border-white/5 rounded-xl p-6 hover:border-[#D67C3C]/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center text-white font-medium">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{client.name}</h3>
                      <p className="text-xs text-white/40 font-light">Member since {client.joined}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    client.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
                  }`}>
                    {client.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-white/70 font-light">
                    <Mail size={14} className="text-white/40" />
                    {client.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/70 font-light">
                    <Phone size={14} className="text-white/40" />
                    {client.phone}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xs text-white/40 mb-1">Orders</p>
                    <p className="text-sm text-white font-medium">{client.orders}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Spent</p>
                    <p className="text-sm text-[#D67C3C] font-medium">${(client.spent / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 mb-1">Commission</p>
                    <p className="text-sm text-green-400 font-medium">${((client.spent * 0.05) / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
