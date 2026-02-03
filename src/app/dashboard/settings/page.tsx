'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Bell, Lock, Shield, Globe, CreditCard, Smartphone, Mail, Trash2 } from 'lucide-react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    orderUpdates: true,
    marketing: false,
  })

  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white mb-1">Settings</h1>
          <p className="text-white/50 text-sm font-light">Manage your account preferences and security</p>
        </div>

        {/* Notifications */}
        <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-[#D67C3C]" />
            <h2 className="text-lg font-medium text-white">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-white font-normal text-sm">Email Notifications</p>
                <p className="text-white/40 text-xs font-light">Receive notifications via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D67C3C]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-white font-normal text-sm">Push Notifications</p>
                <p className="text-white/40 text-xs font-light">Receive notifications in your browser</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D67C3C]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-white font-normal text-sm">SMS Notifications</p>
                <p className="text-white/40 text-xs font-light">Receive notifications via text message</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D67C3C]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-white font-normal text-sm">Order Updates</p>
                <p className="text-white/40 text-xs font-light">Get notified about order status changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.orderUpdates}
                  onChange={(e) => setNotifications({ ...notifications, orderUpdates: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D67C3C]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-white font-normal text-sm">Marketing Communications</p>
                <p className="text-white/40 text-xs font-light">Receive news and special offers</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.marketing}
                  onChange={(e) => setNotifications({ ...notifications, marketing: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D67C3C]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-[#D67C3C]" />
            <h2 className="text-lg font-medium text-white">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-white font-normal text-sm">Two-Factor Authentication</p>
                <p className="text-white/40 text-xs font-light">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                className={`px-4 py-2 rounded-lg text-xs font-normal transition-colors ${
                  twoFactor
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-[#D67C3C] hover:bg-[#B85A1F] text-white'
                }`}
              >
                {twoFactor ? 'Enabled' : 'Enable'}
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-white font-normal text-sm">Change Password</p>
                <p className="text-white/40 text-xs font-light">Update your password regularly</p>
              </div>
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-xs font-normal transition-colors">
                Change
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-white font-normal text-sm">Active Sessions</p>
                <p className="text-white/40 text-xs font-light">Manage your active login sessions</p>
              </div>
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-xs font-normal transition-colors">
                View
              </button>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-[#D67C3C]" />
            <h2 className="text-lg font-medium text-white">Privacy</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-white font-normal text-sm">Profile Visibility</p>
                <p className="text-white/40 text-xs font-light">Control who can see your profile</p>
              </div>
              <select className="px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-xs font-normal focus:outline-none focus:border-[#D67C3C] transition-colors">
                <option>Public</option>
                <option>Private</option>
                <option>Friends Only</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-white font-normal text-sm">Data Export</p>
                <p className="text-white/40 text-xs font-light">Download a copy of your data</p>
              </div>
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-xs font-normal transition-colors">
                Request
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Trash2 className="w-5 h-5 text-red-400" />
            <h2 className="text-lg font-medium text-red-400">Danger Zone</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-white font-normal text-sm">Delete Account</p>
                <p className="text-white/40 text-xs font-light">Permanently delete your account and all data</p>
              </div>
              <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 text-xs font-normal transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
