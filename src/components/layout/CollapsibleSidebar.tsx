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
  ChevronLeft,
  ChevronRight,
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
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Load pinned state from localStorage
  useEffect(() => {
    const pinned = localStorage.getItem('sidebar-pinned') === 'true'
    setIsPinned(pinned)
    setIsExpanded(pinned)
  }, [])

  // Handle pin toggle
  const togglePin = () => {
    const newPinnedState = !isPinned
    setIsPinned(newPinnedState)
    localStorage.setItem('sidebar-pinned', String(newPinnedState))
    if (!newPinnedState) {
      setIsExpanded(false)
    }
  }

  // Handle hover
  const handleMouseEnter = () => {
    if (!isPinned) {
      setIsHovering(true)
      setIsExpanded(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsHovering(false)
      setIsExpanded(false)
    }
  }

  const sidebarWidth = isExpanded ? 'w-64' : 'w-20'

  return (
    <aside
      className={`${sidebarWidth} fixed left-0 top-0 h-screen bg-[#0a0a0a] border-r border-white/5 transition-all duration-300 ease-in-out z-50 flex flex-col`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#32b8c6] to-[#1a6873] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">NL</span>
          </div>
          {isExpanded && (
            <span className="text-white font-semibold text-lg whitespace-nowrap">
              NordLion
            </span>
          )}
        </Link>
        {isExpanded && (
          <button
            onClick={togglePin}
            className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
            aria-label={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
          >
            {isPinned ? (
              <Pin className="w-4 h-4 text-[#32b8c6]" />
            ) : (
              <PinOff className="w-4 h-4 text-white/40" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-2 overflow-y-auto">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center ${isExpanded ? 'px-4' : 'px-3 justify-center'} py-3 rounded-lg
                    transition-all duration-200 group relative
                    ${
                      isActive
                        ? 'bg-[#32b8c6]/10 text-[#32b8c6]'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <Icon
                    className={`${isExpanded ? 'mr-3' : ''} w-5 h-5 flex-shrink-0`}
                  />
                  {isExpanded && (
                    <span className="whitespace-nowrap font-medium text-sm">
                      {item.name}
                    </span>
                  )}
                  {/* Tooltip for collapsed state */}
                  {!isExpanded && !isHovering && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-[#1a1a1a] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-white/10">
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
      <div className="border-t border-white/5 p-4">
        <button
          className={`
            flex items-center w-full ${isExpanded ? 'px-3' : 'justify-center'} py-3 rounded-lg
            text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200
          `}
        >
          <LogOut className={`${isExpanded ? 'mr-3' : ''} w-5 h-5 flex-shrink-0`} />
          {isExpanded && (
            <span className="whitespace-nowrap font-medium text-sm">Logout</span>
          )}
        </button>
      </div>

      {/* Expand/Collapse Button - Only show when not hovering and not pinned */}
      {!isHovering && !isPinned && (
        <button
          onClick={() => {
            setIsPinned(true)
            setIsExpanded(true)
            localStorage.setItem('sidebar-pinned', 'true')
          }}
          className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-[#32b8c6] rounded-full flex items-center justify-center text-white hover:bg-[#2aa0ad] transition-colors"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="w-3 h-3" />
        </button>
      )}
    </aside>
  )
}
