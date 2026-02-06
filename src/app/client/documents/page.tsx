'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { documentStore } from '@/lib/database/documentStore'
import { FileText, Download, Eye, Trash2, Upload, CheckCircle, Clock, XCircle } from 'lucide-react'

export default function ClientDocuments() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [documents, setDocuments] = useState<any[]>([])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('client')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)

    // Get user documents
    const userDocs = documentStore.getByUserId('u1') // Current user ID
    setDocuments(userDocs)
  }, [router])

  const handleDownload = (docId: string) => {
    documentStore.downloadDocument(docId)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} className="text-green-400" />
      case 'pending':
        return <Clock size={16} className="text-yellow-400" />
      case 'rejected':
        return <XCircle size={16} className="text-red-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'rejected':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      default:
        return 'bg-white/5 text-white/40 border-white/10'
    }
  }

  const getTypeIcon = (type: string) => {
    return <FileText size={20} className="text-[#D67C3C]" />
  }

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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/5">
                  <tr className="text-left">
                    <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Document</th>
                    <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Uploaded</th>
                    <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#D67C3C]/10 flex items-center justify-center">
                            {getTypeIcon(doc.type)}
                          </div>
                          <div>
                            <p className="text-sm text-white font-medium">{doc.name}</p>
                            <p className="text-xs text-white/40 font-light">{doc.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-white/70 font-light capitalize">{doc.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-white/70 font-light">{(doc.size / 1024).toFixed(1)} KB</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-white/70 font-light">
                          {new Date(doc.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(doc.status)}
                          <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDownload(doc.id)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
                            title="Download"
                          >
                            <Download size={16} className="text-white/60 group-hover:text-[#D67C3C]" />
                          </button>
                          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors group" title="View">
                            <Eye size={16} className="text-white/60 group-hover:text-blue-400" />
                          </button>
                          <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group" title="Delete">
                            <Trash2 size={16} className="text-white/60 group-hover:text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
