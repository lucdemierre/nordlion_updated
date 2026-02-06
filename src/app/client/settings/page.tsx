'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { getCurrentUser, logout } from '@/lib/auth'
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Save,
} from 'lucide-react'

export default function ClientSettings() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)

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

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ]

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-24">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-light text-white">Settings</h1>
          <p className="text-sm text-white/50 font-light mt-1">
            Manage your account preferences
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#141414] border border-white/5 rounded-xl p-2 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#D67C3C] text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-light">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Profile Photo</h3>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center text-white text-2xl font-medium">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors">
                        Upload New
                      </button>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-light transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/70 font-light mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue={user.firstName}
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D67C3C] font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 font-light mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue={user.lastName}
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D67C3C] font-light"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-white/70 font-light mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D67C3C] font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 font-light mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+44 20 1234 5678"
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D67C3C] font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 font-light mb-2">Location</label>
                      <input
                        type="text"
                        defaultValue="London, UK"
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D67C3C] font-light"
                      />
                    </div>
                  </div>
                  <button className="mt-6 px-6 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Order Updates', desc: 'Get notified about your order status' },
                    { label: 'New Messages', desc: 'Receive alerts for new messages' },
                    { label: 'Price Drops', desc: 'Alert when wishlist items drop in price' },
                    { label: 'Marketing', desc: 'Receive news and promotional offers' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg">
                      <div>
                        <p className="text-white font-light">{item.label}</p>
                        <p className="text-sm text-white/50 font-light mt-1">{item.desc}</p>
                      </div>
                      <label className="relative inline-block w-12 h-6">
                        <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                        <div className="w-full h-full bg-white/10 peer-checked:bg-[#D67C3C] rounded-full peer transition-colors"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/70 font-light mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D67C3C] font-light pr-12"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 font-light mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D67C3C] font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 font-light mb-2">Confirm Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D67C3C] font-light"
                      />
                    </div>
                  </div>
                  <button className="mt-6 px-6 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors">
                    Update Password
                  </button>
                </div>

                <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Two-Factor Authentication</h3>
                  <p className="text-sm text-white/60 font-light mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <button className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-light transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-6">Payment Methods</h3>
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-[#0a0a0a] border border-white/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="text-white font-light">•••• •••• •••• 4242</p>
                          <p className="text-xs text-white/50 font-light mt-1">Expires 12/26</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-[#D67C3C]/10 text-[#D67C3C] text-xs rounded-full border border-[#D67C3C]/20">
                        Default
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full py-3 border-2 border-dashed border-white/10 rounded-lg text-white/60 hover:text-white hover:border-white/20 transition-colors font-light">
                  + Add Payment Method
                </button>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-6">Preferences</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-white/70 font-light mb-2">Language</label>
                    <select className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D67C3C] font-light">
                      <option>English</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Italian</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 font-light mb-2">Currency</label>
                    <select className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D67C3C] font-light">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>CHF (Fr)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 font-light mb-2">Timezone</label>
                    <select className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#D67C3C] font-light">
                      <option>GMT (London)</option>
                      <option>EST (New York)</option>
                      <option>PST (Los Angeles)</option>
                      <option>CET (Paris)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full md:w-auto px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2 text-red-400 font-medium"
          >
            <LogOut size={20} />
            Logout from Account
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
