'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from '@/lib/auth'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  FileText,
  Heart,
  Settings,
  Users,
  BarChart3,
  UserCircle,
  LogOut,
  ChevronRight,
  Home,
} from 'lucide-react'

interface SidebarProps {
  role: 'client' | 'broker' | 'admin'
}

const navigationConfig = {
  client: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/client' },
    { icon: ShoppingCart, label: 'Orders', path: '/client/orders' },
    { icon: MessageSquare, label: 'Messages', path: '/client/messages' },
    { icon: FileText, label: 'Documents', path: '/client/documents' },
    { icon: Heart, label: 'Wishlist', path: '/client/wishlist' },
    { icon: Settings, label: 'Settings', path: '/client/settings' },
    { icon: UserCircle, label: 'Profile', path: '/client/profile' },
  ],
  broker: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/broker' },
    { icon: Users, label: 'Clients', path: '/broker/clients' },
    { icon: Package, label: 'Inventory', path: '/broker/inventory' },
    { icon: MessageSquare, label: 'Messages', path: '/broker/messages' },
    { icon: UserCircle, label: 'Profile', path: '/broker/profile' },
  ],
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Package, label: 'Vehicles', path: '/admin/vehicles' },
    { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
    { icon: UserCircle, label: 'Profile', path: '/admin/profile' },
  ],
}

export default function Sidebar({ role }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const navigation = navigationConfig[role]

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-[#0a0a0a] border-r border-white/5 z-50 transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-white/5">
          <div className={`transition-all duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-0 w-0'
          }`}>
            <h1 className="text-lg font-light text-white whitespace-nowrap">NordLion</h1>
          </div>
          <div className={`transition-all duration-300 ${
            isExpanded ? 'opacity-0 w-0' : 'opacity-100'
          }`}>
            <Home size={24} className="text-[#D67C3C]" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#D67C3C] text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span
                  className={`text-sm font-light whitespace-nowrap transition-all duration-300 ${
                    isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span
              className={`text-sm font-light whitespace-nowrap transition-all duration-300 ${
                isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
