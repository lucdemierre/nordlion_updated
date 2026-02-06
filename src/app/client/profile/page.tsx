'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { User, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react'

export default function ClientProfile() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('client')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  if (!user) return null

  return (
    <div className="flex h-screen bg-[#0f0f0f]">
      <Sidebar role="client" />
      
      <div className="flex-1 ml-16 overflow-auto">
        <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-2xl font-light text-white">My Profile</h1>
            <p className="text-sm text-white/50 font-light mt-1">Manage your personal information</p>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-8">
          {/* Profile Header */}
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center">
                <span className="text-2xl font-medium text-white">
                  {user.firstName[0]}{user.lastName[0]}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-light text-white mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-white/50 font-light mb-2">{user.email}</p>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-[#D67C3C]/10 rounded-full border border-[#D67C3C]/20">
                    <span className="text-xs text-[#D67C3C] font-medium">Premium Client</span>
                  </div>
                  <div className="px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                    <span className="text-xs text-green-400 font-medium">Verified</span>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2">
                <Edit size={16} className="text-white/60" />
                <span className="text-sm text-white/70 font-light">Edit</span>
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="bg-[#141414] border border-white/5 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <User size={18} className="text-white/40" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/40 font-light">Full Name</p>
                  <p className="text-sm text-white font-light">{user.firstName} {user.lastName}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Mail size={18} className="text-white/40" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/40 font-light">Email Address</p>
                  <p className="text-sm text-white font-light">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Phone size={18} className="text-white/40" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/40 font-light">Phone Number</p>
                  <p className="text-sm text-white font-light">+44 20 1234 5678</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin size={18} className="text-white/40" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/40 font-light">Location</p>
                  <p className="text-sm text-white font-light">London, United Kingdom</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Calendar size={18} className="text-white/40" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/40 font-light">Member Since</p>
                  <p className="text-sm text-white font-light">January 2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Orders', value: '12' },
              { label: 'Total Spent', value: '$2.4M' },
              { label: 'Saved', value: '8' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#141414] border border-white/5 rounded-xl p-6">
                <p className="text-2xl font-light text-white mb-1">{stat.value}</p>
                <p className="text-sm text-white/50 font-light">{stat.label}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
