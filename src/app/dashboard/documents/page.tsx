'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { FileText, Download, Eye, Trash2, Upload, Search, Filter } from 'lucide-react'
import { useState } from 'react'

const documents = [
  {
    id: '1',
    name: 'Porsche 911 Turbo S - Purchase Agreement',
    type: 'Contract',
    size: '2.4 MB',
    date: '2024-01-15',
    category: 'purchase',
    format: 'PDF',
  },
  {
    id: '2',
    name: 'Vehicle Registration Certificate',
    type: 'Certificate',
    size: '1.2 MB',
    date: '2024-01-20',
    category: 'registration',
    format: 'PDF',
  },
  {
    id: '3',
    name: 'Insurance Policy - Comprehensive',
    type: 'Insurance',
    size: '890 KB',
    date: '2024-01-18',
    category: 'insurance',
    format: 'PDF',
  },
  {
    id: '4',
    name: 'Warranty Documentation',
    type: 'Warranty',
    size: '1.5 MB',
    date: '2024-01-16',
    category: 'warranty',
    format: 'PDF',
  },
  {
    id: '5',
    name: 'Mercedes-AMG GT - Order Confirmation',
    type: 'Order',
    size: '450 KB',
    date: '2024-01-10',
    category: 'purchase',
    format: 'PDF',
  },
  {
    id: '6',
    name: 'Service History Log',
    type: 'Service',
    size: '680 KB',
    date: '2024-01-05',
    category: 'service',
    format: 'PDF',
  },
  {
    id: '7',
    name: 'BMW M8 - Inspection Report',
    type: 'Inspection',
    size: '3.2 MB',
    date: '2023-12-22',
    category: 'inspection',
    format: 'PDF',
  },
  {
    id: '8',
    name: 'Financing Agreement',
    type: 'Finance',
    size: '1.8 MB',
    date: '2023-12-20',
    category: 'finance',
    format: 'PDF',
  },
]

const categoryConfig = {
  purchase: { color: 'blue', label: 'Purchase' },
  registration: { color: 'green', label: 'Registration' },
  insurance: { color: 'purple', label: 'Insurance' },
  warranty: { color: 'yellow', label: 'Warranty' },
  service: { color: 'teal', label: 'Service' },
  inspection: { color: 'orange', label: 'Inspection' },
  finance: { color: 'red', label: 'Finance' },
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'all' || doc.category === filterCategory
    return matchesSearch && matchesFilter
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Documents</h1>
            <p className="text-white/60 text-lg">{documents.length} documents stored</p>
          </div>
          <button className="px-6 py-3 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-xl font-medium transition-all flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Documents', value: documents.length, color: 'blue' },
            { label: 'Purchase Docs', value: documents.filter(d => d.category === 'purchase').length, color: 'green' },
            { label: 'Insurance', value: documents.filter(d => d.category === 'insurance').length, color: 'purple' },
            { label: 'Service Records', value: documents.filter(d => d.category === 'service').length, color: 'teal' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#141414] rounded-xl border border-white/5 p-4">
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#141414] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#32b8c6] transition-colors"
              />
            </div>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-6 py-3 bg-[#141414] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#32b8c6] transition-colors cursor-pointer"
          >
            <option value="all">All Categories</option>
            {Object.entries(categoryConfig).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Documents List */}
        <div className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden">
          <div className="divide-y divide-white/5">
            {filteredDocs.map((doc) => {
              const category = categoryConfig[doc.category]
              return (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Icon */}
                    <div className="flex-shrink-0 p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                      <FileText className="w-6 h-6 text-white/60" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium mb-1 truncate">{doc.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-white/50">
                        <span>{doc.format}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                        <span>•</span>
                        <span className="px-2 py-0.5 bg-[#32b8c6]/10 text-[#32b8c6] rounded text-xs">
                          {category.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" title="View">
                      <Eye className="w-5 h-5 text-white/60" />
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" title="Download">
                      <Download className="w-5 h-5 text-white/60" />
                    </button>
                    <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete">
                      <Trash2 className="w-5 h-5 text-white/60 hover:text-red-400" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {filteredDocs.length === 0 && (
          <div className="bg-[#141414] rounded-2xl border border-white/5 p-12 text-center">
            <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No documents found</h3>
            <p className="text-white/60 mb-6">Try adjusting your search or filter criteria</p>
            <button className="px-6 py-3 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-xl font-medium transition-all flex items-center gap-2 mx-auto">
              <Upload className="w-4 h-4" />
              Upload Document
            </button>
          </div>
        )}

        {/* Upload Area */}
        <div className="bg-[#141414] rounded-2xl border-2 border-dashed border-white/10 p-12 text-center hover:border-[#32b8c6]/30 transition-colors cursor-pointer">
          <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Drop files here or click to upload</h3>
          <p className="text-sm text-white/50">Supports PDF, DOC, DOCX (Max 10MB)</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
