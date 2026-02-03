'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Bell, Package, Heart, MessageSquare, CreditCard, CheckCircle, Settings } from 'lucide-react'
import { useState } from 'react'

const notifications = [
  {
    id: '1',
    type: 'order',
    icon: Package,
    title: 'Order Delivered',
    message: 'Your Porsche 911 Turbo S has been delivered successfully',
    time: '2 hours ago',
    read: false,
    color: 'blue',
  },
  {
    id: '2',
    type: 'wishlist',
    icon: Heart,
    title: 'Vehicle Available',
    message: 'Ferrari SF90 Stradale from your wishlist is now available',
    time: '5 hours ago',
    read: false,
    color: 'red',
  },
  {
    id: '3',
    type: 'message',
    icon: MessageSquare,
    title: 'New Message',
    message: 'Support team replied to your inquiry',
    time: 'Yesterday',
    read: true,
    color: 'green',
  },
  {
    id: '4',
    type: 'payment',
    icon: CreditCard,
    title: 'Payment Processed',
    message: 'Your payment of $245,000 has been confirmed',
    time: '2 days ago',
    read: true,
    color: 'purple',
  },
  {
    id: '5',
    type: 'order',
    icon: Package,
    title: 'Order Shipped',
    message: 'Mercedes-AMG GT is in transit to your location',
    time: '3 days ago',
    read: true,
    color: 'blue',
  },
  {
    id: '6',
    type: 'system',
    icon: CheckCircle,
    title: 'Profile Updated',
    message: 'Your profile information has been updated successfully',
    time: '1 week ago',
    read: true,
    color: 'teal',
  },
]

const colorConfig = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  teal: { bg: 'bg-[#32b8c6]/10', text: 'text-[#32b8c6]', border: 'border-[#32b8c6]/20' },
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all')
  const [notifs, setNotifs] = useState(notifications)

  const unreadCount = notifs.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })))
  }

  const filteredNotifs = filter === 'all' 
    ? notifs 
    : filter === 'unread' 
    ? notifs.filter(n => !n.read)
    : notifs.filter(n => n.type === filter)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Notifications</h1>
            <p className="text-white/60 text-lg">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Mark All Read
            </button>
            <button className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          {[
            { id: 'all', label: 'All' },
            { id: 'unread', label: 'Unread' },
            { id: 'order', label: 'Orders' },
            { id: 'message', label: 'Messages' },
            { id: 'wishlist', label: 'Wishlist' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filter === f.id
                  ? 'bg-[#32b8c6] text-white'
                  : 'bg-[#141414] text-white/60 hover:text-white hover:bg-white/5 border border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifs.map((notif) => {
            const Icon = notif.icon
            const colors = colorConfig[notif.color]
            return (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`bg-[#141414] rounded-2xl border transition-all cursor-pointer ${
                  notif.read 
                    ? 'border-white/5 hover:border-white/10' 
                    : 'border-[#32b8c6]/20 hover:border-[#32b8c6]/40'
                }`}
              >
                <div className="flex items-start gap-4 p-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 p-3 rounded-xl ${colors.bg} border ${colors.border}`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-white">{notif.title}</h3>
                      <span className="text-xs text-white/40 flex-shrink-0">{notif.time}</span>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">{notif.message}</p>
                  </div>

                  {/* Unread Indicator */}
                  {!notif.read && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#32b8c6]" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {filteredNotifs.length === 0 && (
          <div className="bg-[#141414] rounded-2xl border border-white/5 p-12 text-center">
            <Bell className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No notifications</h3>
            <p className="text-white/60">You're all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
