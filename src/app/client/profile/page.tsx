'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { userStore } from '@/lib/database/userStore'
import { User, Mail, Phone, MapPin, Calendar, ShoppingBag, Heart, FileText, Edit } from 'lucide-react'

export default function ClientProfile() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [dbUser, setDbUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('client')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)

    const userData = userStore.getByEmail(currentUser.email)
    setDbUser(userData)
  }, [router])

  if (!user || !dbUser) return null

  return (
    <div className="flex h-screen bg-[#0f0f0f]">
      <Sidebar role="client" />
      
      <div className="flex-1 ml-16 overflow-auto">
        <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-light text-white">Profile</h1>
                <p className="text-sm text-white/50 font-light mt-1">Manage your account information</p>
              </div>
              <Link
                href="/client/profile/edit"
                className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Edit size={16} />
                Edit Profile
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center">
                <span className="text-2xl font-medium text-white">
                  {dbUser.firstName[0]}{dbUser.lastName[0]}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-light text-white mb-1">
                  {dbUser.firstName} {dbUser.lastName}
                </h2>
                <p className="text-sm text-white/50 font-light mb-2">{dbUser.email}</p>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                    <span className="text-xs text-blue-400 font-medium">Premium Client</span>
                  </div>
                  {dbUser.verified && (
                    <div className="px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                      <span className="text-xs text-green-400 font-medium">Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { icon: ShoppingBag, label: 'Orders', value: dbUser.orders?.length || 0, color: 'bg-[#D67C3C]' },
              { icon: Heart, label: 'Wishlist', value: dbUser.wishlist?.length || 0, color: 'bg-red-500' },
              { icon: FileText, label: 'Documents', value: '8', color: 'bg-blue-500' },
              { icon: Calendar, label: 'Member Since', value: new Date(dbUser.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), color: 'bg-purple-500' },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="bg-[#141414] border border-white/5 rounded-xl p-6">
                  <div className={`w-10 h-10 rounded-lg ${stat.color}/10 flex items-center justify-center mb-4`}>
                    <Icon size={20} className={stat.color.replace('bg-', 'text-')} />
                  </div>
                  <p className="text-2xl font-light text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-white/50 font-light">{stat.label}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <User size={18} className="text-white/40" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/40 font-light">Full Name</p>
                  <p className="text-sm text-white font-light">{dbUser.firstName} {dbUser.lastName}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Mail size={18} className="text-white/40" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/40 font-light">Email Address</p>
                  <p className="text-sm text-white font-light">{dbUser.email}</p>
                </div>
              </div>
              {dbUser.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Phone size={18} className="text-white/40" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-white/40 font-light">Phone Number</p>
                    <p className="text-sm text-white font-light">{dbUser.phone}</p>
                  </div>
                </div>
              )}
              {dbUser.address && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <MapPin size={18} className="text-white/40" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-white/40 font-light">Address</p>
                    <p className="text-sm text-white font-light">
                      {dbUser.address.street && `${dbUser.address.street}, `}
                      {dbUser.address.city && `${dbUser.address.city}, `}
                      {dbUser.address.state && `${dbUser.address.state}, `}
                      {dbUser.address.country}
                      {dbUser.address.postalCode && ` ${dbUser.address.postalCode}`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {dbUser.totalSpent && dbUser.totalSpent > 0 && (
            <div className="bg-gradient-to-r from-[#D67C3C]/10 to-[#B85A1F]/10 border border-[#D67C3C]/20 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-2">Total Spent</h3>
              <p className="text-3xl font-light text-[#D67C3C]">
                ${dbUser.totalSpent.toLocaleString()}
              </p>
              <p className="text-sm text-white/50 font-light mt-2">
                Thank you for being a valued customer!
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
