'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  FileText,
  User,
  Search,
  Bell,
} from 'lucide-react'
import { getCurrentUser } from '@/lib/auth'
import type { UserRole } from '@/lib/auth'

const clientNav = [
  { label: 'Dashboard', href: '/client', icon: LayoutDashboard },
  { label: 'Orders', href: '/client/orders', icon: Package },
  { label: 'Messages', href: '/client/messages', icon: MessageSquare },
  { label: 'Documents', href: '/client/documents', icon: FileText },
]

const brokerNav = [
  { label: 'Dashboard', href: '/broker', icon: LayoutDashboard },
  { label: 'Clients', href: '/broker/clients', icon: User },
  { label: 'Inventory', href: '/broker/inventory', icon: Package },
  { label: 'Messages', href: '/broker/messages', icon: MessageSquare },
]

const adminNav = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: User },
  { label: 'Vehicles', href: '/admin/vehicles', icon: Package },
  { label: 'Reports', href: '/admin/reports', icon: FileText },
]

export default function BottomNav() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const getNavItems = (role: UserRole) => {
    switch (role) {
      case 'client':
        return clientNav
      case 'broker':
        return brokerNav
      case 'admin':
        return adminNav
      default:
        return clientNav
    }
  }

  const navItems = user ? getNavItems(user.role) : clientNav
  const isActive = (href: string) => pathname === href

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-white/5 z-50 pb-safe">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.slice(0, 2).map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-16 h-16 transition-all ${
                  isActive(item.href)
                    ? 'text-[#22c55e]'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                <Icon size={20} className="mb-1" />
                <span className="text-[10px] font-light">{item.label}</span>
              </Link>
            )
          })}

          {/* Center Profile Button */}
          <Link
            href={`/${user?.role || 'client'}/profile`}
            className="flex flex-col items-center justify-center w-20 h-20 -mt-8 relative"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                pathname.includes('/profile')
                  ? 'bg-[#22c55e] shadow-lg shadow-[#22c55e]/50'
                  : 'bg-gradient-to-br from-[#22c55e] to-[#16a34a] hover:shadow-lg hover:shadow-[#22c55e]/30'
              }`}
            >
              <User size={24} className="text-white" />
            </div>
            <span
              className={`text-[10px] font-light mt-1 ${
                pathname.includes('/profile') ? 'text-[#22c55e]' : 'text-white/50'
              }`}
            >
              Profile
            </span>
          </Link>

          {navItems.slice(2).map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-16 h-16 transition-all ${
                  isActive(item.href)
                    ? 'text-[#22c55e]'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                <Icon size={20} className="mb-1" />
                <span className="text-[10px] font-light">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
