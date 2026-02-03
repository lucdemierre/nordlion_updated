'use client'

import { ReactNode } from 'react'
import CollapsibleSidebar from './CollapsibleSidebar'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <CollapsibleSidebar />
      <main className="ml-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
