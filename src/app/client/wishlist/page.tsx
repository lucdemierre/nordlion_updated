'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Heart, Share2, MessageCircle, Trash2, ShoppingCart, Eye, Filter } from 'lucide-react'

interface WishlistItem {
  id: string
  vehicle: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  location: string
  image: string
  addedDate: string
  available: boolean
}

export default function ClientWishlist() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('client')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const wishlist: WishlistItem[] = [
    {
      id: '1',
      vehicle: 'McLaren 720S Spider',
      brand: 'McLaren',
      model: '720S Spider',
      year: 2024,
      price: 385000,
      mileage: 1200,
      location: 'London, UK',
      image: '/images/mclaren-720s.jpg',
      addedDate: 'Feb 2, 2026',
      available: true,
    },
    {
      id: '2',
      vehicle: 'Aston Martin DBS Superleggera',
      brand: 'Aston Martin',
      model: 'DBS Superleggera',
      year: 2023,
      price: 295000,
      mileage: 3500,
      location: 'Monaco',
      image: '/images/aston-dbs.jpg',
      addedDate: 'Jan 28, 2026',
      available: true,
    },
    {
      id: '3',
      vehicle: 'Bentley Continental GT Speed',
      brand: 'Bentley',
      model: 'Continental GT Speed',
      year: 2024,
      price: 245000,
      mileage: 800,
      location: 'Dubai, UAE',
      image: '/images/bentley-gt.jpg',
      addedDate: 'Jan 25, 2026',
      available: false,
    },
    {
      id: '4',
      vehicle: 'Rolls-Royce Ghost',
      brand: 'Rolls-Royce',
      model: 'Ghost',
      year: 2023,
      price: 425000,
      mileage: 2100,
      location: 'Los Angeles, USA',
      image: '/images/rr-ghost.jpg',
      addedDate: 'Jan 20, 2026',
      available: true,
    },
  ]

  const handleRemove = (id: string) => {
    console.log('Remove item:', id)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-24">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-white">Wishlist</h1>
              <p className="text-sm text-white/50 font-light mt-1">
                {wishlist.length} saved vehicles
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white font-light transition-colors flex items-center gap-2">
                <Filter size={16} />
                Filter
              </button>
              <div className="flex items-center bg-[#141414] border border-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    viewMode === 'grid' ? 'bg-[#D67C3C] text-white' : 'text-white/50'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    viewMode === 'list' ? 'bg-[#D67C3C] text-white' : 'text-white/50'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden hover:border-[#D67C3C]/30 transition-all group"
            >
              {/* Image */}
              <div className="relative h-64 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart size={80} className="text-white/10" />
                </div>
                {!item.available && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-red-500 text-white text-xs rounded-full font-medium">
                      Sold
                    </span>
                  </div>
                )}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-red-500/90 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} className="text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">{item.vehicle}</h3>
                    <p className="text-sm text-white/50 font-light">{item.year} • {item.mileage.toLocaleString()} miles</p>
                  </div>
                  <p className="text-xl font-light text-[#D67C3C]">
                    ${item.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-white/50 font-light mb-4">
                  <span>{item.location}</span>
                  <span>•</span>
                  <span>Added {item.addedDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={!item.available}
                    className="flex-1 px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    {item.available ? 'Inquire Now' : 'Sold Out'}
                  </button>
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                    <Eye size={18} className="text-white/60" />
                  </button>
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                    <Share2 size={18} className="text-white/60" />
                  </button>
                  <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                    <MessageCircle size={18} className="text-white/60" />
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
