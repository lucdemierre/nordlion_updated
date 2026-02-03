'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Heart, Trash2, ShoppingCart, Eye, Share2 } from 'lucide-react'
import Link from 'next/link'

const wishlistItems = [
  {
    id: '1',
    vehicle: 'Porsche 911 GT3 RS',
    year: '2024',
    specs: '525 HP • 4.0L Flat-6 • RWD',
    price: 223800,
    availability: 'In Stock',
    addedDate: '2024-01-20',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    vehicle: 'McLaren 720S',
    year: '2024',
    specs: '710 HP • 4.0L V8 Twin-Turbo',
    price: 310000,
    availability: 'Available Soon',
    addedDate: '2024-01-18',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    vehicle: 'Aston Martin DB12',
    year: '2024',
    specs: '671 HP • 4.0L V8 Twin-Turbo',
    price: 245000,
    availability: 'In Stock',
    addedDate: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    vehicle: 'Bentley Continental GT',
    year: '2024',
    specs: '650 HP • 6.0L W12 Twin-Turbo',
    price: 235000,
    availability: 'Pre-Order',
    addedDate: '2024-01-12',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    vehicle: 'Audi R8 V10 Performance',
    year: '2024',
    specs: '602 HP • 5.2L V10',
    price: 198000,
    availability: 'In Stock',
    addedDate: '2024-01-08',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop',
  },
]

const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case 'In Stock':
      return 'bg-green-500/10 text-green-400 border-green-500/20'
    case 'Available Soon':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    case 'Pre-Order':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    default:
      return 'bg-white/5 text-white/40 border-white/10'
  }
}

export default function WishlistPage() {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-1">Wishlist</h1>
            <p className="text-white/50 text-sm font-light">Your saved vehicles • {wishlistItems.length} items</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-normal transition-colors flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Wishlist
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-[#141414] rounded-xl border border-white/5 overflow-hidden group hover:border-white/10 transition-all">
              {/* Image */}
              <div className="relative aspect-video overflow-hidden bg-white/5">
                <img
                  src={item.image}
                  alt={item.vehicle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm hover:bg-red-500 rounded-full transition-colors">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </button>
                <span className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-normal border ${getAvailabilityColor(item.availability)}`}>
                  {item.availability}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-white font-medium mb-1">{item.vehicle}</h3>
                <p className="text-xs text-white/40 font-light mb-3">{item.specs}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white font-semibold text-lg">
                    ${item.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-white/40 font-light">
                    Added {item.addedDate}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/inventory/${item.id}`}
                    className="flex-1 py-2 px-4 bg-[#D67C3C] hover:bg-[#B85A1F] rounded-lg text-white text-xs font-normal transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </Link>
                  <button className="flex-1 py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-xs font-normal transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Order
                  </button>
                  <button className="p-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 rounded-lg text-white hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
