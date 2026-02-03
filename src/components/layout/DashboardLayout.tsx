'use client'

import { ReactNode, useState, useEffect } from 'react'
import CollapsibleSidebar from './CollapsibleSidebar'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(256) // 64 * 4 = w-64 in pixels

  useEffect(() => {
    // Listen for sidebar state changes
    const handleResize = () => {
      const sidebar = document.querySelector('aside')
      if (sidebar) {
        setSidebarWidth(sidebar.offsetWidth)
      }
    }

    // Check initially
    handleResize()

    // Listen for changes
    const observer = new ResizeObserver(handleResize)
    const sidebar = document.querySelector('aside')
    if (sidebar) {
      observer.observe(sidebar)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      {/* Sidebar - Fixed position, doesn't affect layout flow */}
      <CollapsibleSidebar />
      
      {/* Main Content Area - Pushes based on sidebar width */}
      <main 
        className="flex-1 overflow-auto transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {children}
      </main>
    </div>
  )
}
