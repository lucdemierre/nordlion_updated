'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { FileText, Download, Eye, Upload, CheckCircle, Clock, XCircle } from 'lucide-react'

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

  const documents = [
    { id: '1', name: 'Purchase Agreement - Porsche 911.pdf', type: 'Contract', status: 'approved', date: 'Feb 1, 2026', size: '2.4 MB' },
    { id: '2', name: 'Vehicle Registration.pdf', type: 'Registration', status: 'pending', date: 'Jan 30, 2026', size: '1.8 MB' },
    { id: '3', name: 'Insurance Certificate.pdf', type: 'Insurance', status: 'approved', date: 'Jan 28, 2026', size: '1.2 MB' },
    { id: '4', name: 'Inspection Report - Ferrari.pdf', type: 'Inspection', status: 'pending', date: 'Jan 25, 2026', size: '3.1 MB' },
    { id: '5', name: 'Financing Agreement.pdf', type: 'Finance', status: 'approved', date: 'Jan 20, 2026', size: '2.7 MB' },
  ]

  if (!user) return null

  return (
    <div className="flex h-screen bg-[#0f0f0f]">
      <Sidebar role="client" />
      
      <div className="flex-1 ml-16 overflow-auto">
        <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-light text-white">Documents</h1>
                <p className="text-sm text-white/50 font-light mt-1">{documents.length} documents</p>
              </div>
              <button className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <Upload size={16} />
                Upload Document
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-white/5">
                <tr className="text-left">
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Document</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#D67C3C]/10 flex items-center justify-center">
                          <FileText size={18} className="text-[#D67C3C]" />
                        </div>
                        <p className="text-sm text-white font-light">{doc.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white/70 font-light">{doc.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        doc.status === 'approved' ? 'bg-green-500/10 text-green-400' :
                        doc.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white/70 font-light">{doc.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white/70 font-light">{doc.size}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <Eye size={16} className="text-white/60" />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <Download size={16} className="text-white/60" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
