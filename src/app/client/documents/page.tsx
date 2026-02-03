'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import DocumentUpload from '@/components/DocumentUpload'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { FileText, Download, Eye, Trash2 } from 'lucide-react'

export default function ClientDocuments() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('client')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  if (!user) return null

  const documents = [
    {
      id: '1',
      name: 'Purchase Agreement - Porsche 911',
      type: 'Contract',
      date: 'Feb 1, 2026',
      size: '2.4 MB',
    },
    {
      id: '2',
      name: 'Insurance Certificate',
      type: 'Insurance',
      date: 'Jan 28, 2026',
      size: '1.2 MB',
    },
    {
      id: '3',
      name: 'Vehicle Inspection Report',
      type: 'Report',
      date: 'Jan 25, 2026',
      size: '5.8 MB',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-24">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-light text-white">Documents</h1>
          <p className="text-sm text-white/50 font-light mt-1">
            Upload and manage your vehicle documents
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Upload Section */}
        <div className="mb-8">
          <h2 className="text-lg font-light text-white mb-4">Upload New Documents</h2>
          <DocumentUpload
            onUpload={(files) => console.log('Uploaded:', files)}
            maxFiles={10}
          />
        </div>

        {/* Existing Documents */}
        <div>
          <h2 className="text-lg font-light text-white mb-4">Your Documents</h2>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-4 p-4 bg-[#141414] border border-white/5 rounded-xl hover:border-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-[#22c55e]/10 flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-[#22c55e]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium">{doc.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-white/40 font-light">{doc.type}</span>
                    <span className="text-xs text-white/30">•</span>
                    <span className="text-xs text-white/40 font-light">{doc.size}</span>
                    <span className="text-xs text-white/30">•</span>
                    <span className="text-xs text-white/40 font-light">{doc.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <Eye size={18} className="text-white/60" />
                  </button>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <Download size={18} className="text-white/60" />
                  </button>
                  <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 size={18} className="text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
