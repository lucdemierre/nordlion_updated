'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Camera, Mail, Phone, MapPin, Calendar, Edit2, Save } from 'lucide-react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Luxury Lane',
    city: 'Monaco',
    country: 'Monaco',
    bio: 'Passionate automotive enthusiast and collector of exceptional vehicles.'
  })

  const handleSave = () => {
    // Handle save logic
    setIsEditing(false)
  }

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-1">Profile</h1>
            <p className="text-white/50 text-sm font-light">Manage your personal information</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] rounded-xl text-white text-sm font-normal transition-colors flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-normal transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] rounded-xl text-white text-sm font-normal transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden">
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] relative">
            {isEditing && (
              <button className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-sm hover:bg-black/60 rounded-lg transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] border-4 border-[#141414] flex items-center justify-center">
                <span className="text-white font-bold text-4xl">JD</span>
              </div>
              {isEditing && (
                <button className="absolute bottom-2 right-2 p-2 bg-[#D67C3C] hover:bg-[#B85A1F] rounded-full transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              )}
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm font-normal mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm font-normal mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Contact */}
              <div>
                <label className="block text-white/70 text-sm font-normal mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-normal mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-white/70 text-sm font-normal mb-2">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm font-normal mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm font-normal mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-white/70 text-sm font-normal mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#141414] rounded-xl border border-white/5 p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-[#D67C3C]" />
              <span className="text-white/60 text-sm font-light">Member Since</span>
            </div>
            <p className="text-white font-semibold">January 2024</p>
          </div>
          <div className="bg-[#141414] rounded-xl border border-white/5 p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-[#D67C3C]" />
              <span className="text-white/60 text-sm font-light">Total Orders</span>
            </div>
            <p className="text-white font-semibold">5</p>
          </div>
          <div className="bg-[#141414] rounded-xl border border-white/5 p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-[#D67C3C]" />
              <span className="text-white/60 text-sm font-light">Total Spent</span>
            </div>
            <p className="text-white font-semibold">$1,502,000</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
