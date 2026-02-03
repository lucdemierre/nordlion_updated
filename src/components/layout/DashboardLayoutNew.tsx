'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from './BottomNav'
import { getCurrentUser } from '@/lib/auth'

interface DashboardLayoutNewProps {
  children: ReactNode
  requireRole?: ('client' | 'broker' | 'admin')[]
}

export default function DashboardLayoutNew({ children, requireRole }: DashboardLayoutNewProps) {
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      router.push('/auth/login')
      return
    }
    if (requireRole && !requireRole.includes(user.role)) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-20">
      {/* Main Content */}
      <main className="w-full">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
