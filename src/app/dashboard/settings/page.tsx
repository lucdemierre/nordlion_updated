'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Bell, Globe, Moon, Shield, CreditCard, Mail, Smartphone, Eye, Download } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [orderUpdates, setOrderUpdates] = useState(true)
  const [newsletter, setNewsletter] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/60 text-lg">Manage your account preferences and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-4 space-y-2">
              {[
                { icon: Bell, label: 'Notifications', active: true },
                { icon: Globe, label: 'Preferences', active: false },
                { icon: Shield, label: 'Privacy & Security', active: false },
                { icon: CreditCard, label: 'Billing', active: false },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      item.active
                        ? 'bg-[#32b8c6]/10 text-[#32b8c6]'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notifications */}
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-[#32b8c6]" />
                <h3 className="text-xl font-semibold text-white">Notification Preferences</h3>
              </div>

              <div className="space-y-6">
                {/* Email Notifications */}
                <div className="flex items-center justify-between py-4 border-b border-white/5">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-white/40 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-sm text-white/50 mt-1">Receive notifications via email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#32b8c6]"></div>
                  </label>
                </div>

                {/* Push Notifications */}
                <div className="flex items-center justify-between py-4 border-b border-white/5">
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-white/40 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Push Notifications</p>
                      <p className="text-sm text-white/50 mt-1">Receive push notifications on your devices</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pushNotifications}
                      onChange={(e) => setPushNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#32b8c6]"></div>
                  </label>
                </div>

                {/* Order Updates */}
                <div className="flex items-center justify-between py-4 border-b border-white/5">
                  <div>
                    <p className="text-white font-medium">Order Updates</p>
                    <p className="text-sm text-white/50 mt-1">Get notified about order status changes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={orderUpdates}
                      onChange={(e) => setOrderUpdates(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#32b8c6]"></div>
                  </label>
                </div>

                {/* Newsletter */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-white font-medium">Newsletter</p>
                    <p className="text-sm text-white/50 mt-1">Receive our monthly newsletter and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#32b8c6]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Moon className="w-6 h-6 text-[#32b8c6]" />
                <h3 className="text-xl font-semibold text-white">Appearance</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-white font-medium">Dark Mode</p>
                    <p className="text-sm text-white/50 mt-1">Use dark theme across the application</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#32b8c6]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-[#32b8c6]" />
                <h3 className="text-xl font-semibold text-white">Privacy</h3>
              </div>

              <div className="space-y-4">
                <button className="w-full flex items-center justify-between py-4 px-4 bg-[#0a0a0a] rounded-xl hover:bg-white/5 transition-colors">
                  <div className="text-left">
                    <p className="text-white font-medium">Download Your Data</p>
                    <p className="text-sm text-white/50 mt-1">Get a copy of your information</p>
                  </div>
                  <Download className="w-5 h-5 text-white/40" />
                </button>

                <button className="w-full flex items-center justify-between py-4 px-4 bg-[#0a0a0a] rounded-xl hover:bg-red-500/10 hover:border-red-500/20 transition-colors border border-white/10">
                  <div className="text-left">
                    <p className="text-white font-medium">Delete Account</p>
                    <p className="text-sm text-white/50 mt-1">Permanently delete your account</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="px-8 py-3 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-xl font-medium transition-all">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
