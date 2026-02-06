'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Search, Filter, Plus, Edit, Trash2, Eye, Package, TrendingUp, Tag } from 'lucide-react'

export default function BrokerInventory() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('broker')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const inventory = [
    { id: '1', make: 'Porsche', model: '911 GT3 RS', year: 2024, price: 289000, status: 'available', mileage: 1200, location: 'London, UK', commission: 8500, leads: 12 },
    { id: '2', make: 'Ferrari', model: 'SF90 Stradale', year: 2023, price: 625000, status: 'reserved', mileage: 850, location: 'Monaco', commission: 18750, leads: 24 },
    { id: '3', make: 'Lamborghini', model: 'Huracán STO', year: 2023, price: 345000, status: 'sold', mileage: 500, location: 'Dubai, UAE', commission: 10350, leads: 18 },
    { id: '4', make: 'McLaren', model: '720S Spider', year: 2024, price: 385000, status: 'available', mileage: 300, location: 'Los Angeles, USA', commission: 11550, leads: 9 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'reserved': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'sold': return 'bg-red-500/10 text-red-400 border-red-500/20'
      default: return 'bg-white/5 text-white/40 border-white/10'
    }
  }

  const filteredInventory = selectedStatus === 'all' 
    ? inventory 
    : inventory.filter(v => v.status === selectedStatus)

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-24">
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-white">Inventory Management</h1>
              <p className="text-sm text-white/50 font-light mt-1">{inventory.length} vehicles in your portfolio</p>
            </div>
            <button className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Plus size={16} />
              Add Vehicle
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
              <Package size={20} className="text-green-400" />
            </div>
            <p className="text-2xl font-light text-white mb-1">2</p>
            <p className="text-sm text-white/50 font-light">Available Now</p>
          </div>
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
              <Tag size={20} className="text-yellow-400" />
            </div>
            <p className="text-2xl font-light text-white mb-1">1</p>
            <p className="text-sm text-white/50 font-light">Reserved</p>
          </div>
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-[#D67C3C]/10 flex items-center justify-center mb-4">
              <TrendingUp size={20} className="text-[#D67C3C]" />
            </div>
            <p className="text-2xl font-light text-white mb-1">63</p>
            <p className="text-sm text-white/50 font-light">Total Leads</p>
          </div>
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
              <TrendingUp size={20} className="text-purple-400" />
            </div>
            <p className="text-2xl font-light text-white mb-1">$49K</p>
            <p className="text-sm text-white/50 font-light">Potential Commission</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full pl-10 pr-4 py-3 bg-[#141414] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light"
            />
          </div>
          <button className="px-4 py-3 bg-[#141414] border border-white/10 hover:border-white/20 rounded-xl text-white transition-colors flex items-center gap-2">
            <Filter size={18} />
            <span className="text-sm font-light">Filter</span>
          </button>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          {['all', 'available', 'reserved', 'sold'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-light transition-colors whitespace-nowrap ${
                selectedStatus === status
                  ? 'bg-[#D67C3C] text-white'
                  : 'bg-[#141414] text-white/50 hover:text-white border border-white/5'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredInventory.map((vehicle) => (
            <div key={vehicle.id} className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden hover:border-[#D67C3C]/30 transition-colors">
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
                <Package size={64} className="text-white/10" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">{vehicle.make} {vehicle.model}</h3>
                    <p className="text-sm text-white/50 font-light">{vehicle.year} • {vehicle.mileage.toLocaleString()} mi</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-white/40 font-light mb-1">Price</p>
                    <p className="text-lg text-[#D67C3C] font-medium">${vehicle.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 font-light mb-1">Your Commission</p>
                    <p className="text-lg text-green-400 font-medium">${vehicle.commission.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 font-light mb-1">Location</p>
                    <p className="text-sm text-white font-light">{vehicle.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 font-light mb-1">Leads</p>
                    <p className="text-sm text-white font-medium">{vehicle.leads} inquiries</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <Eye size={16} />
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                    <Edit size={16} className="text-white/60" />
                  </button>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                    <Trash2 size={16} className="text-white/60" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
