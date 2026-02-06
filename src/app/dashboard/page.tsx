'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'

export default function DashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()
    
    if (!user) {
      router.push('/auth/login')
      return
    }

    // Redirect to role-based dashboard
    switch (user.role) {
      case 'admin':
        router.push('/admin')
        break
      case 'broker':
        router.push('/broker')
        break
      case 'client':
      default:
        router.push('/client')
        break
    }
  }, [router])

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#22c55e] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/50 text-sm font-light">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}
