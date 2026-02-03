'use client'

import { ReactNode } from 'react'
import Navigation from '@/components/layout/Navigation'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      
      {/* Main Content - No sidebar here, it's handled in the page component */}
      <main className="pt-20">
        {children}
      </main>
    </div>
  )
}
