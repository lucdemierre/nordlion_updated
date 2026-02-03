'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Camera, Mail, Phone, MapPin, Calendar, Shield, Edit2, Save } from 'lucide-react'
import { useState } from 'react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'Alexandre Rousseau',
    email: 'alexandre.rousseau@example.com',
    phone: '+44 20 7946 0958',
    location: 'London, United Kingdom',
    memberSince: 'January 2023',
    bio: 'Passionate car enthusiast with a love for high-performance vehicles and luxury automotive experiences.',
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
            <p className="text-white/60 text-lg">Manage your personal information and preferences</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-xl font-medium transition-all flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all border border-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-xl font-medium transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-6 space-y-6">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#32b8c6] to-[#1a6873] flex items-center justify-center text-white text-4xl font-bold">
                    AR
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-[#32b8c6] hover:bg-[#2aa0ad] rounded-full text-white transition-all opacity-0 group-hover:opacity-100">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-white mt-4 text-center">{profileData.name}</h2>
                <p className="text-white/50 text-sm">Premium Member</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">12</div>
                  <div className="text-xs text-white/50">Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">8</div>
                  <div className="text-xs text-white/50">Wishlist</div>
                </div>
              </div>

              {/* Member Since */}
              <div className="pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 text-white/60">
                  <Calendar className="w-5 h-5" />
                  <div>
                    <p className="text-xs text-white/40">Member Since</p>
                    <p className="text-sm font-medium text-white">{profileData.memberSince}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#32b8c6] transition-colors"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl">
                      <span className="text-white">{profileData.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#32b8c6] transition-colors"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl">
                      <Mail className="w-5 h-5 text-white/40" />
                      <span className="text-white">{profileData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#32b8c6] transition-colors"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl">
                      <Phone className="w-5 h-5 text-white/40" />
                      <span className="text-white">{profileData.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#32b8c6] transition-colors"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl">
                      <MapPin className="w-5 h-5 text-white/40" />
                      <span className="text-white">{profileData.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
              <h3 className="text-xl font-semibold text-white mb-6">About</h3>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#32b8c6] transition-colors resize-none"
                />
              ) : (
                <p className="text-white/60 leading-relaxed">{profileData.bio}</p>
              )}
            </div>

            {/* Security */}
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-[#32b8c6]" />
                <h3 className="text-xl font-semibold text-white">Security</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 px-4 bg-[#0a0a0a] border border-white/10 rounded-xl">
                  <div>
                    <p className="text-white font-medium">Password</p>
                    <p className="text-sm text-white/50">Last changed 3 months ago</p>
                  </div>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-all text-sm border border-white/10">
                    Change
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 px-4 bg-[#0a0a0a] border border-white/10 rounded-xl">
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-white/50">Add an extra layer of security</p>
                  </div>
                  <button className="px-4 py-2 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-lg font-medium transition-all text-sm">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
