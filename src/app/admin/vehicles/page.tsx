'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser, canAccessDashboard, logout } from '@/lib/auth'
import { Search, Filter, Plus, Edit, Trash2, Eye, Package, TrendingUp, DollarSign, CheckCircle, LogOut, Home } from 'lucide-react'

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  status: 'available' | 'reserved' | 'sold'
  mileage: number
  location: string
  addedDate: string
  views: number
  inquiries: number
}

export default function AdminVehicles() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('admin')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  const vehicles: Vehicle[] = [
    { id: '1', make: 'Porsche', model: '911 GT3 RS', year: 2024, price: 289000, status: 'available', mileage: 1200, location: 'London, UK', addedDate: 'Feb 1, 2026', views: 2847, inquiries: 23 },
    { id: '2', make: 'Ferrari', model: 'SF90 Stradale', year: 2023, price: 625000, status: 'reserved', mileage: 850, location: 'Monaco', addedDate: 'Jan 28, 2026', views: 4521, inquiries: 45 },
    { id: '3', make: 'Lamborghini', model: 'Huracán STO', year: 2023, price: 345000, status: 'sold', mileage: 500, location: 'Dubai, UAE', addedDate: 'Jan 25, 2026', views: 3245, inquiries: 34 },
    { id: '4', make: 'McLaren', model: '720S Spider', year: 2024, price: 385000, status: 'available', mileage: 300, location: 'Los Angeles, USA', addedDate: 'Jan 20, 2026', views: 1876, inquiries: 18 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'reserved': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'sold': return 'bg-red-500/10 text-red-400 border-red-500/20'
      default: return 'bg-white/5 text-white/40 border-white/10'
    }
  }

  const filteredVehicles = selectedStatus === 'all' 
    ? vehicles 
    : vehicles.filter(v => v.status === selectedStatus)

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Home size={20} className="text-white/60" />
              </Link>
              <div>
                <h1 className="text-2xl font-light text-white">Vehicle Inventory</h1>
                <p className="text-sm text-white/50 font-light mt-1">{vehicles.length} total vehicles</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <Plus size={16} />
                Add Vehicle
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-colors flex items-center gap-2 text-red-400 font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
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
            <p className="text-2xl font-light text-white mb-1">342</p>
            <p className="text-sm text-white/50 font-light">Total Inventory</p>
          </div>
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-[#D67C3C]/10 flex items-center justify-center mb-4">
              <CheckCircle size={20} className="text-[#D67C3C]" />
            </div>
            <p className="text-2xl font-light text-white mb-1">276</p>
            <p className="text-sm text-white/50 font-light">Available</p>
          </div>
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <TrendingUp size={20} className="text-blue-400" />
            </div>
            <p className="text-2xl font-light text-white mb-1">$124M</p>
            <p className="text-sm text-white/50 font-light">Total Value</p>
          </div>
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
              <DollarSign size={20} className="text-purple-400" />
            </div>
            <p className="text-2xl font-light text-white mb-1">$362K</p>
            <p className="text-sm text-white/50 font-light">Avg. Price</p>
          </div>
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

        {/* Vehicles Table */}
        <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/5">
                <tr className="text-left">
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Mileage</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
                          <Package size={20} className="text-white/20" />
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">{vehicle.make} {vehicle.model}</p>
                          <p className="text-xs text-white/40 font-light">{vehicle.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#D67C3C] font-medium">${vehicle.price.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(vehicle.status)}`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-white/70 font-light">{vehicle.mileage.toLocaleString()} mi</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-white/70 font-light">{vehicle.location}</p>
                      <p className="text-xs text-white/40 font-light">{vehicle.addedDate}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-white font-medium">{vehicle.views} views</p>
                        <p className="text-xs text-[#D67C3C] font-light">{vehicle.inquiries} inquiries</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <Eye size={16} className="text-white/60" />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <Edit size={16} className="text-white/60" />
                        </button>
                        <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
