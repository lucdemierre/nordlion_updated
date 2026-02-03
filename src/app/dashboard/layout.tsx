'use client'

import { ReactNode } from 'react'
import { User, Heart, ShoppingBag, Settings, LogOut, Menu, X, Bell } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/layout/Navigation'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: User },
  { name: 'My Orders', href: '/dashboard/orders', icon: ShoppingBag },
  { name: 'Saved Vehicles', href: '/dashboard/saved', icon: Heart },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-dark-50">
      <Navigation />
      
      <div className="pt-20 flex">
        {/* Mobile Sidebar Backdrop */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-72 glass-effect border-r border-white/10 pt-20 transform transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* User Info */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <div>
                  <div className="text-white font-medium">John Doe</div>
                  <div className="text-white/50 text-sm">john@example.com</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all group"
                  >
                    <Icon size={20} className="group-hover:text-primary-400 transition-colors" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/10">
              <button className="flex items-center space-x-2 px-4 py-2 text-white/60 hover:text-white transition-colors w-full">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Menu Button */}
          <div className="lg:hidden glass-effect border-b border-white/10 px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Page Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
