'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Heart, Share2, ShoppingCart, Trash2, Search } from 'lucide-react'
import { useState } from 'react'

const wishlistItems = [
  {
    id: '1',
    vehicle: 'Ferrari SF90 Stradale',
    model: 'SF90 Stradale',
    year: '2024',
    price: 625000,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop',
    availability: 'Available',
    dateAdded: '2024-01-20',
  },
  {
    id: '2',
    vehicle: 'McLaren 720S',
    model: '720S Performance',
    year: '2024',
    price: 315000,
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=600&h=400&fit=crop',
    availability: 'Coming Soon',
    dateAdded: '2024-01-18',
  },
  {
    id: '3',
    vehicle: 'Aston Martin DB12',
    model: 'DB12 Volante',
    year: '2024',
    price: 265000,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop',
    availability: 'Available',
    dateAdded: '2024-01-15',
  },
  {
    id: '4',
    vehicle: 'Bentley Continental GT',
    model: 'Continental GT Speed',
    year: '2024',
    price: 285000,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&h=400&fit=crop',
    availability: 'Available',
    dateAdded: '2024-01-12',
  },
  {
    id: '5',
    vehicle: 'Rolls-Royce Ghost',
    model: 'Ghost Black Badge',
    year: '2024',
    price: 425000,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f3c8d?w=600&h=400&fit=crop',
    availability: 'Reserved',
    dateAdded: '2024-01-10',
  },
  {
    id: '6',
    vehicle: 'Porsche Taycan',
    model: 'Taycan Turbo S',
    year: '2024',
    price: 198000,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop',
    availability: 'Available',
    dateAdded: '2024-01-08',
  },
]

const availabilityConfig = {
  'Available': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
  'Coming Soon': { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  'Reserved': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
}

export default function WishlistPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = wishlistItems.filter(item =>
    item.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.model.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Wishlist</h1>
            <p className="text-white/60 text-lg">{wishlistItems.length} vehicles saved for later</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your wishlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#141414] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#32b8c6] transition-colors"
          />
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#141414] rounded-2xl border border-white/5 hover:border-white/10 transition-all overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-white/5">
                <img
                  src={item.image}
                  alt={item.vehicle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-red-500/20 transition-all">
                    <Heart className="w-5 h-5 text-white fill-red-500" />
                  </button>
                  <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all">
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${availabilityConfig[item.availability].bg} ${availabilityConfig[item.availability].text} ${availabilityConfig[item.availability].border} backdrop-blur-sm`}>
                    {item.availability}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{item.vehicle}</h3>
                      <p className="text-white/50 text-sm">{item.model} • {item.year}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    ${item.price.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>Added {item.dateAdded}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2.5 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Order Now
                  </button>
                  <button className="px-4 py-2.5 bg-white/5 hover:bg-red-500/10 text-white hover:text-red-400 rounded-xl font-medium transition-all border border-white/10 hover:border-red-500/20">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="bg-[#141414] rounded-2xl border border-white/5 p-12 text-center">
            <Heart className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No vehicles found</h3>
            <p className="text-white/60 mb-6">Try adjusting your search or add more vehicles to your wishlist</p>
            <button className="px-6 py-3 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-xl font-medium transition-all">
              Browse Vehicles
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
