'use client'

import { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <Sidebar role="admin" />
      <div className="flex-1 ml-16">
        {children}
      </div>
    </div>
  )
}
