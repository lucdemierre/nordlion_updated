'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { Search, SlidersHorizontal, Grid3x3, List } from 'lucide-react'

const vehicles = [
  {
    id: 1,
    name: 'Porsche 911 Turbo S',
    year: 2024,
    price: 245000,
    mileage: '2,500 mi',
    location: 'Beverly Hills, CA',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f3c8d?w=800&h=600&fit=crop',
    category: 'Supercar',
    status: 'Available'
  },
  {
    id: 2,
    name: 'Mercedes-AMG GT',
    year: 2024,
    price: 189000,
    mileage: '1,200 mi',
    location: 'Miami, FL',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
    category: 'Luxury',
    status: 'Available'
  },
  {
    id: 3,
    name: 'Lamborghini Huracán',
    year: 2023,
    price: 285000,
    mileage: '3,800 mi',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&h=600&fit=crop',
    category: 'Supercar',
    status: 'Reserved'
  },
  {
    id: 4,
    name: 'BMW M8 Competition',
    year: 2024,
    price: 156000,
    mileage: '500 mi',
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop',
    category: 'Luxury',
    status: 'Available'
  },
  {
    id: 5,
    name: 'Ferrari SF90 Stradale',
    year: 2024,
    price: 625000,
    mileage: '1,000 mi',
    location: 'Monaco',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&h=600&fit=crop',
    category: 'Hypercar',
    status: 'Available'
  },
  {
    id: 6,
    name: 'Audi RS e-tron GT',
    year: 2024,
    price: 142000,
    mileage: '2,100 mi',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
    category: 'Electric',
    status: 'Available'
  },
]

export default function InventoryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Our Collection</h1>
            <p className="text-white/60 text-lg">Discover our curated selection of luxury and high-performance vehicles</p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col lg:flex-row gap-4 mb-12">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search by make, model, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#141414] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-[#32b8c6] focus:outline-none transition-colors"
              />
            </div>
            <button className="px-6 py-4 bg-[#141414] border border-white/10 rounded-xl text-white hover:border-[#32b8c6] transition-colors flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
            <div className="flex gap-2 bg-[#141414] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#32b8c6] text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-[#32b8c6] text-white' : 'text-white/40 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Vehicles Grid */}
          <div className={`grid ${
            viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
          } gap-6`}>
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="group bg-[#141414] rounded-2xl border border-white/5 hover:border-white/10 overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      vehicle.status === 'Available'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                      {vehicle.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#32b8c6] transition-colors">
                      {vehicle.name}
                    </h3>
                    <span className="text-sm text-white/50">{vehicle.year}</span>
                  </div>
                  <p className="text-white/40 text-sm mb-4">{vehicle.category}</p>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-white/50">Mileage</div>
                      <div className="text-white font-medium">{vehicle.mileage}</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/50">Location</div>
                      <div className="text-white font-medium text-right">{vehicle.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="text-2xl font-bold text-white">
                      ${vehicle.price.toLocaleString()}
                    </div>
                    <button className="px-6 py-2 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-lg font-medium transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
