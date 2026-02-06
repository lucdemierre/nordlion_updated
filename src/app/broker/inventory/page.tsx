'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Package, Search, Eye, Edit, Trash2, Plus } from 'lucide-react'

export default function BrokerInventory() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('broker')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const inventory = [
    { id: '1', make: 'Porsche', model: '911 GT3 RS', year: 2024, price: 289000, mileage: 450, location: 'London, UK', status: 'available' },
    { id: '2', make: 'Ferrari', model: 'SF90 Stradale', year: 2023, price: 625000, mileage: 1200, location: 'Monaco', status: 'reserved' },
    { id: '3', make: 'Lamborghini', model: 'Aventador SVJ', year: 2023, price: 575000, mileage: 800, location: 'Dubai, UAE', status: 'available' },
    { id: '4', make: 'McLaren', model: '720S Spider', year: 2024, price: 385000, mileage: 300, location: 'Los Angeles, USA', status: 'available' },
    { id: '5', make: 'Aston Martin', model: 'DBS Superleggera', year: 2024, price: 345000, mileage: 250, location: 'London, UK', status: 'sold' },
  ]

  if (!user) return null

  return (
    <div className="flex h-screen bg-[#0f0f0f]">
      <Sidebar role="broker" />
      
      <div className="flex-1 ml-16 overflow-auto">
        <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-light text-white">Inventory</h1>
                <p className="text-sm text-white/50 font-light mt-1">{inventory.length} vehicles</p>
              </div>
              <button className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <Plus size={16} />
                Add Vehicle
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Search */}
          <div className="relative max-w-md mb-6">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full pl-10 pr-4 py-2 bg-[#141414] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light"
            />
          </div>

          {/* Inventory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((vehicle) => (
              <div key={vehicle.id} className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden hover:border-[#D67C3C]/30 transition-colors">
                <div className="h-48 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
                  <Package size={64} className="text-white/10" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">
                        {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-sm text-white/50 font-light">
                        {vehicle.year} • {vehicle.mileage.toLocaleString()} mi
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      vehicle.status === 'available' ? 'bg-green-500/10 text-green-400' :
                      vehicle.status === 'reserved' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                      {vehicle.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Price</span>
                      <span className="text-sm text-[#D67C3C] font-medium">${vehicle.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Location</span>
                      <span className="text-sm text-white/70 font-light">{vehicle.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Eye size={16} className="text-white/60" />
                      <span className="text-sm text-white/70 font-light">View</span>
                    </button>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      <Edit size={16} className="text-white/60" />
                    </button>
                    <button className="px-4 py-2 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 size={16} className="text-red-400" />
                    </button>
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
