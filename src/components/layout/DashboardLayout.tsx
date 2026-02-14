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
    if (typeof window !== 'undefined' && !isAuthenticated()) {
      router.push('/auth/login')
    }
  }, [router])

  if (typeof window !== 'undefined' && !isAuthenticated()) {
    return null
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      <main className="min-h-screen">
        {children}
      </main>
      <BottomNavbar />
    </div>
  )
}
