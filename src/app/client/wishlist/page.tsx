'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import InquiryModal from '@/components/InquiryModal'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Heart, Trash2, Eye, Package, MessageSquare } from 'lucide-react'

export default function ClientWishlist() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('client')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const wishlist = [
    {
      id: '1',
      make: 'McLaren',
      model: '720S Spider',
      year: 2024,
      price: 385000,
      mileage: 300,
      location: 'Los Angeles, USA',
      status: 'available',
      addedDate: 'Feb 1, 2026',
    },
    {
      id: '2',
      make: 'Lamborghini',
      model: 'Aventador SVJ',
      year: 2023,
      price: 575000,
      mileage: 450,
      location: 'Monaco',
      status: 'available',
      addedDate: 'Jan 28, 2026',
    },
    {
      id: '3',
      make: 'Porsche',
      model: 'Taycan Turbo S',
      year: 2024,
      price: 185000,
      mileage: 120,
      location: 'London, UK',
      status: 'reserved',
      addedDate: 'Jan 25, 2026',
    },
  ]

  const handleInquire = (vehicle: any) => {
    setSelectedVehicle(vehicle)
  }

  const handleInquirySubmit = (data: any) => {
    console.log('Inquiry submitted:', data)
    // In production, send to API
    alert('Inquiry sent successfully! A broker will contact you shortly.')
  }

  if (!user) return null

  return (
    <div className="flex h-screen bg-[#0f0f0f]">
      <Sidebar role="client" />
      
      <div className="flex-1 ml-16 overflow-auto">
        <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-light text-white">My Wishlist</h1>
                <p className="text-sm text-white/50 font-light mt-1">{wishlist.length} vehicles saved</p>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={20} className="text-[#D67C3C]" />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((vehicle) => (
              <div key={vehicle.id} className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden hover:border-[#D67C3C]/30 transition-colors">
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center relative">
                  <Package size={64} className="text-white/10" />
                  <button className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg backdrop-blur-sm transition-colors">
                    <Heart size={18} className="text-[#D67C3C] fill-[#D67C3C]" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-white mb-1">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-sm text-white/50 font-light">
                      {vehicle.year} • {vehicle.mileage.toLocaleString()} mi
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Price</span>
                      <span className="text-sm text-[#D67C3C] font-medium">
                        ${vehicle.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Location</span>
                      <span className="text-sm text-white/70 font-light">{vehicle.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-white/40">Status</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        vehicle.status === 'available'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {vehicle.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleInquire(vehicle)}
                      className="flex-1 px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={16} />
                      Inquire Now
                    </button>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      <Eye size={16} className="text-white/60" />
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

      {/* Inquiry Modal */}
      {selectedVehicle && (
        <InquiryModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onSubmit={handleInquirySubmit}
        />
      )}
    </div>
  )
}
