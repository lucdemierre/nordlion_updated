'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Bell, Lock, Globe, CreditCard, Shield } from 'lucide-react'

export default function ClientSettings() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)

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
            <h1 className="text-2xl font-light text-white">Settings</h1>
            <p className="text-sm text-white/50 font-light mt-1">Manage your account preferences</p>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-8">
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#D67C3C]/10 flex items-center justify-center">
                  <Bell size={20} className="text-[#D67C3C]" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Notifications</h3>
                  <p className="text-sm text-white/50 font-light">Manage how you receive updates</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">Email Notifications</p>
                    <p className="text-xs text-white/40 font-light mt-1">Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      emailNotifications ? 'bg-[#D67C3C]' : 'bg-white/10'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">Push Notifications</p>
                    <p className="text-xs text-white/40 font-light mt-1">Receive push notifications</p>
                  </div>
                  <button
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      pushNotifications ? 'bg-[#D67C3C]' : 'bg-white/10'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      pushNotifications ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Shield size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Security</h3>
                  <p className="text-sm text-white/50 font-light">Protect your account</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-white/40 font-light mt-1">Add an extra layer of security</p>
                  </div>
                  <button
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      twoFactor ? 'bg-[#D67C3C]' : 'bg-white/10'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      twoFactor ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                  </button>
                </div>
                <button className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm font-light transition-colors text-left">
                  Change Password
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button className="w-full px-6 py-3 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors">
              Save Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
