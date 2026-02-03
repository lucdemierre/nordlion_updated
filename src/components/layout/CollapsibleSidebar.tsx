'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Heart,
  User,
  Settings,
  MessageSquare,
  FileText,
  Bell,
  CreditCard,
  LogOut,
  Pin,
  PinOff,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Orders', href: '/dashboard/orders', icon: Package },
  { name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function CollapsibleSidebar() {
  const pathname = usePathname()
  const [isPinned, setIsPinned] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Load pinned state from localStorage
  useEffect(() => {
    const pinned = localStorage.getItem('sidebar-pinned') === 'true'
    setIsPinned(pinned)
  }, [])

  // Handle pin toggle
  const togglePin = () => {
    const newState = !isPinned
    setIsPinned(newState)
    localStorage.setItem('sidebar-pinned', String(newState))
  }

  const isExpanded = isPinned || isHovered

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${
        isExpanded ? 'w-64' : 'w-20'
      } h-screen bg-[#0a0a0a] border-r border-white/5 transition-all duration-300 ease-in-out flex flex-col shadow-2xl fixed top-0 left-0 z-40`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5 flex-shrink-0">
        <Link href="/dashboard" className="flex items-center space-x-3 min-w-0">
          <div className="w-8 h-8 bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">NL</span>
          </div>
          {isExpanded && (
            <span className="text-white font-medium text-base whitespace-nowrap">
              NordLion
            </span>
          )}
        </Link>
        {isExpanded && (
          <button
            onClick={togglePin}
            className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-[#D67C3C]"
            title={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
          >
            {isPinned ? <Pin size={18} className="text-[#D67C3C]" /> : <PinOff size={18} />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style jsx>{`
          nav::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center ${isExpanded ? 'px-3' : 'px-3 justify-center'} py-2.5 rounded-lg
                    transition-all duration-200 group relative
                    ${
                      isActive
                        ? 'bg-[#D67C3C]/10 text-[#D67C3C]'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <Icon
                    className={`${isExpanded ? 'mr-3' : ''} w-5 h-5 flex-shrink-0`}
                  />
                  {isExpanded && (
                    <span className="whitespace-nowrap font-normal text-sm">
                      {item.name}
                    </span>
                  )}
                  {/* Tooltip for collapsed state */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-[#1a1a1a] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[110] border border-white/10 font-normal">
                      {item.name}
                    </div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="border-t border-white/5 p-3 flex-shrink-0">
        <button
          className={`
            flex items-center w-full ${isExpanded ? 'px-3' : 'justify-center'} py-2.5 rounded-lg
            text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 group relative
          `}
        >
          <LogOut className={`${isExpanded ? 'mr-3' : ''} w-5 h-5 flex-shrink-0`} />
          {isExpanded && (
            <span className="whitespace-nowrap font-normal text-sm">
              Logout
            </span>
          )}
          {!isExpanded && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-[#1a1a1a] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[110] border border-white/10 font-normal">
              Logout
            </div>
          )}
        </button>
      </div>
    </aside>
  )
}
