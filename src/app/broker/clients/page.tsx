'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Search, Filter, Plus, Mail, Phone, Eye, Edit, TrendingUp } from 'lucide-react'

export default function BrokerClients() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('broker')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const clients = [
    { id: '1', name: 'John Smith', email: 'john@example.com', phone: '+44 20 1234 5678', spent: '$625,000', vehicles: 2, status: 'active', lastContact: '2 days ago' },
    { id: '2', name: 'Emma Wilson', email: 'emma@example.com', phone: '+44 20 2345 6789', spent: '$289,000', vehicles: 1, status: 'prospect', lastContact: '1 week ago' },
    { id: '3', name: 'Michael Brown', email: 'michael@example.com', phone: '+44 20 3456 7890', spent: '$1,200,000', vehicles: 4, status: 'active', lastContact: 'Today' },
    { id: '4', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+44 20 4567 8901', spent: '$890,000', vehicles: 3, status: 'active', lastContact: '3 days ago' },
  ]

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-24">
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-white">Clients</h1>
              <p className="text-sm text-white/50 font-light mt-1">{clients.length} total clients</p>
            </div>
            <button className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Plus size={16} />
              Add Client
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search & Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients..."
              className="w-full pl-10 pr-4 py-3 bg-[#141414] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light"
            />
          </div>
          <button className="px-4 py-3 bg-[#141414] border border-white/10 hover:border-white/20 rounded-xl text-white transition-colors flex items-center gap-2">
            <Filter size={18} />
            <span className="text-sm font-light">Filter</span>
          </button>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clients.map((client) => (
            <div key={client.id} className="bg-[#141414] border border-white/5 rounded-xl p-6 hover:border-[#D67C3C]/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center text-white font-medium">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{client.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      client.status === 'active' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {client.status}
                    </span>
                  </div>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <Edit size={18} className="text-white/60" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Mail size={14} />
                  <span className="font-light">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Phone size={14} />
                  <span className="font-light">{client.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 p-3 bg-[#0a0a0a] rounded-lg mb-4">
                <div>
                  <p className="text-xs text-white/40 font-light mb-1">Total Spent</p>
                  <p className="text-sm text-[#D67C3C] font-medium">{client.spent}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 font-light mb-1">Vehicles</p>
                  <p className="text-sm text-white font-medium">{client.vehicles}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 font-light mb-1">Last Contact</p>
                  <p className="text-sm text-white font-medium">{client.lastContact}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Eye size={16} />
                  View Details
                </button>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                  <Mail size={16} className="text-white/60" />
                </button>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                  <Phone size={16} className="text-white/60" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
