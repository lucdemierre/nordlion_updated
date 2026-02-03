'use client'

import { ReactNode } from 'react'
import CollapsibleSidebar from './CollapsibleSidebar'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      {/* Sidebar - Now pushes content instead of overlay */}
      <CollapsibleSidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
