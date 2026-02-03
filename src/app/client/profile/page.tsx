'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { getCurrentUser, logout } from '@/lib/auth'
import { User, Mail, Phone, MapPin, Shield, LogOut, Bell, Globe } from 'lucide-react'

export default function ClientProfile() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-24">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-light text-white">Profile</h1>
          <p className="text-sm text-white/50 font-light mt-1">Manage your account settings</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-[#141414] border border-white/5 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center">
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
                <div className="px-3 py-1 bg-[#22c55e]/10 rounded-full border border-[#22c55e]/20">
                  <span className="text-xs text-[#22c55e] font-medium">Verified Client</span>
                </div>
                <div className="px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                  <span className="text-xs text-blue-400 font-medium">Premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-[#141414] border border-white/5 rounded-xl p-6 mb-6">
          <h3 className="text-sm font-medium text-white mb-4">Account Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-lg">
              <Mail size={20} className="text-white/40" />
              <div className="flex-1">
                <p className="text-xs text-white/40 font-light">Email</p>
                <p className="text-sm text-white">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-lg">
              <Phone size={20} className="text-white/40" />
              <div className="flex-1">
                <p className="text-xs text-white/40 font-light">Phone</p>
                <p className="text-sm text-white">+44 20 1234 5678</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-lg">
              <MapPin size={20} className="text-white/40" />
              <div className="flex-1">
                <p className="text-xs text-white/40 font-light">Location</p>
                <p className="text-sm text-white">London, United Kingdom</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-[#141414] border border-white/5 rounded-xl p-6 mb-6">
          <h3 className="text-sm font-medium text-white mb-4">Settings</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 hover:bg-[#0a0a0a] rounded-lg transition-colors text-left">
              <Bell size={20} className="text-white/40" />
              <span className="text-sm text-white font-light">Notifications</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-[#0a0a0a] rounded-lg transition-colors text-left">
              <Shield size={20} className="text-white/40" />
              <span className="text-sm text-white font-light">Security & Privacy</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-[#0a0a0a] rounded-lg transition-colors text-left">
              <Globe size={20} className="text-white/40" />
              <span className="text-sm text-white font-light">Language & Region</span>
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors"
        >
          <LogOut size={20} className="text-red-400" />
          <span className="text-sm text-red-400 font-medium">Logout</span>
        </button>
      </main>

      <BottomNav />
    </div>
  )
}
