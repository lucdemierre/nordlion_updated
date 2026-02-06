'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { getCurrentUser, logout } from '@/lib/auth'
import { LogOut, TrendingUp, Award, Target, DollarSign } from 'lucide-react'

export default function BrokerProfile() {
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
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-light text-white">Broker Profile</h1>
          <p className="text-sm text-white/50 font-light mt-1">Your performance & stats</p>
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
                  <span className="text-xs text-[#D67C3C] font-medium">Senior Broker</span>
                </div>
                <div className="px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                  <span className="text-xs text-green-400 font-medium">Top Performer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { icon: DollarSign, label: 'Total Commission', value: '$245,000', color: 'bg-[#D67C3C]' },
            { icon: TrendingUp, label: 'Sales This Year', value: '$5.2M', color: 'bg-green-500' },
            { icon: Target, label: 'Deals Closed', value: '48', color: 'bg-blue-500' },
            { icon: Award, label: 'Success Rate', value: '95%', color: 'bg-purple-500' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="bg-[#141414] border border-white/5 rounded-xl p-6">
                <div className={`w-10 h-10 rounded-lg ${stat.color}/10 flex items-center justify-center mb-4`}>
                  <Icon size={20} className={`${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <p className="text-2xl font-light text-white mb-1">{stat.value}</p>
                <p className="text-sm text-white/50 font-light">{stat.label}</p>
              </div>
            )
          })}
        </div>

        <button
          onClick={handleLogout}
          className="w-full px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2 text-red-400 font-medium">
          <LogOut size={20} />
          Logout from Account
        </button>
      </main>

      <BottomNav />
    </div>
  )
}
