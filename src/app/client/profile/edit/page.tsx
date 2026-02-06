'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { userStore } from '@/lib/database/userStore'
import { Save, X } from 'lucide-react'

export default function EditProfile() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
  })

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('client')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)

    const dbUser = userStore.getByEmail(currentUser.email)
    if (dbUser) {
      setFormData({
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        phone: dbUser.phone || '',
        street: dbUser.address?.street || '',
        city: dbUser.address?.city || '',
        state: dbUser.address?.state || '',
        country: dbUser.address?.country || '',
        postalCode: dbUser.address?.postalCode || '',
        emailNotifications: dbUser.preferences?.notifications.email ?? true,
        smsNotifications: dbUser.preferences?.notifications.sms ?? true,
        pushNotifications: dbUser.preferences?.notifications.push ?? true,
      })
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const dbUser = userStore.getByEmail(user.email)
    if (dbUser) {
      userStore.updateProfile(dbUser.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postalCode: formData.postalCode,
        },
        preferences: {
          notifications: {
            email: formData.emailNotifications,
            sms: formData.smsNotifications,
            push: formData.pushNotifications,
          },
          language: 'en',
          currency: 'GBP',
        },
      })

      // Update localStorage user
      const updatedUser = { ...user, firstName: formData.firstName, lastName: formData.lastName }
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      setUser(updatedUser)

      setSuccess(true)
      setTimeout(() => {
        router.push('/client/profile')
      }, 1500)
    }

    setSaving(false)
  }

  if (!user) return null

  return (
    <div className="flex h-screen bg-[#0f0f0f]">
      <Sidebar role="client" />
      
      <div className="flex-1 ml-16 overflow-auto">
        <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-light text-white">Edit Profile</h1>
                <p className="text-sm text-white/50 font-light mt-1">Update your personal information</p>
              </div>
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={20} className="text-white/60" />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8">
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-400 text-sm">Profile updated successfully!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/50 mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C]"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-white/50 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C]"
                    placeholder="+44 20 1234 5678"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Address</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/50 mb-2">Street Address</label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/50 mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 mb-2">State/County</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/50 mb-2">Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-white/70">Email Notifications</span>
                  <input
                    type="checkbox"
                    checked={formData.emailNotifications}
                    onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                    className="w-5 h-5"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-white/70">SMS Notifications</span>
                  <input
                    type="checkbox"
                    checked={formData.smsNotifications}
                    onChange={(e) => setFormData({ ...formData, smsNotifications: e.target.checked })}
                    className="w-5 h-5"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-white/70">Push Notifications</span>
                  <input
                    type="checkbox"
                    checked={formData.pushNotifications}
                    onChange={(e) => setFormData({ ...formData, pushNotifications: e.target.checked })}
                    className="w-5 h-5"
                  />
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Save size={18} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
