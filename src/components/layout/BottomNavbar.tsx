'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Home,
  ShoppingBag,
  Heart,
  User,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react'
import { getCurrentUser, logout } from '@/lib/auth'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
  { name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
  { name: 'Profile', href: '/dashboard/profile', icon: User, isProfile: true },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function BottomNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const user = getCurrentUser()
  const [showLogout, setShowLogout] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5 z-50">
        <div className="max-w-7xl mx-auto h-full px-6">
          <div className="flex items-center justify-between h-full">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              const isProfile = item.isProfile

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative flex flex-col items-center justify-center min-w-[70px] group transition-all ${
                    isProfile ? 'order-3' : ''
                  }`}
                >
                  {/* Profile gets special treatment */}
                  {isProfile ? (
                    <div className="relative">
                      {/* Green circle for profile */}
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? 'bg-[#D67C3C] scale-110'
                            : 'bg-[#D67C3C]/20 group-hover:bg-[#D67C3C]/40'
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 transition-all ${
                            isActive ? 'text-white' : 'text-[#D67C3C]'
                          }`}
                        />
                      </div>
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#D67C3C] rounded-full" />
                      )}
                    </div>
                  ) : (
                    <>
                      <Icon
                        className={`w-6 h-6 mb-1 transition-colors ${
                          isActive
                            ? 'text-[#D67C3C]'
                            : 'text-white/40 group-hover:text-white/70'
                        }`}
                      />
                      <span
                        className={`text-[10px] font-light transition-colors ${
                          isActive
                            ? 'text-[#D67C3C]'
                            : 'text-white/40 group-hover:text-white/70'
                        }`}
                      >
                        {item.name}
                      </span>
                      {isActive && (
                        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#D67C3C] rounded-full" />
                      )}
                    </>
                  )}
                </Link>
              )
            })}

            {/* Logout Button */}
            <button
              onClick={() => setShowLogout(true)}
              className="flex flex-col items-center justify-center min-w-[70px] group"
            >
              <LogOut className="w-6 h-6 mb-1 text-white/40 group-hover:text-red-400 transition-colors" />
              <span className="text-[10px] font-light text-white/40 group-hover:text-red-400 transition-colors">
                Logout
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 max-w-sm w-full border border-white/10">
            <h3 className="text-xl font-light text-white mb-2">Sign Out?</h3>
            <p className="text-sm text-white/50 font-extralight mb-6">
              Are you sure you want to sign out of your account?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-light transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl text-sm font-light transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
