'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Heart,
  User,
  Settings,
  LogOut,
  Upload,
  ShieldCheck,
} from 'lucide-react'
import { getCurrentUser, logout } from '@/lib/auth'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Orders', href: '/dashboard/orders', icon: Package },
  { name: 'Profile', href: '/dashboard/profile', icon: User, highlight: true },
  { name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState(getCurrentUser())

  useEffect(() => {
    setUser(getCurrentUser())
  }, [pathname])

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  const isActive = (href: string) => pathname === href

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navigation.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all group relative ${
                  active
                    ? item.highlight
                      ? 'text-[#00ff87]'
                      : 'text-[#D67C3C]'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {/* Active indicator */}
                {active && (
                  <div className={`absolute -top-[2px] left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full ${
                    item.highlight ? 'bg-[#00ff87]' : 'bg-[#D67C3C]'
                  }`} />
                )}
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-light">{item.name}</span>
              </Link>
            )
          })}
          
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl text-white/40 hover:text-red-400 transition-all group"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-light">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
