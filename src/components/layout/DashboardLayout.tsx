'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNavbar from './BottomNavbar'
import { isAuthenticated } from '@/lib/auth'

interface DashboardLayoutProps {
  children: ReactNode
  requiredRole?: 'client' | 'broker' | 'admin'
}

export default function DashboardLayout({ children, requiredRole }: DashboardLayoutProps) {
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/auth/login')
    }
  }, [])

  if (!isAuthenticated()) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-20">
      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavbar />
    </div>
  )
}
