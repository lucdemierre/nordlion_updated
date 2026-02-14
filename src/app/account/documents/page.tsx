'use client';

import { useState } from 'react';
import { FileText, Download, Trash2, Upload, FolderOpen, Search, Filter, Eye } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'certificate' | 'receipt' | 'appraisal' | 'insurance' | 'contract' | 'other';
  assetName: string;
  uploadDate: string;
  size: string;
  url: string;
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const documents: Document[] = [
    {
      id: 'DOC001',
      name: 'Certificate of Authenticity - Patek Philippe.pdf',
      type: 'certificate',
      assetName: 'Patek Philippe Nautilus 5711',
      uploadDate: '2026-02-10',
      size: '2.4 MB',
      url: '#',
    },
    {
      id: 'DOC002',
      name: 'Purchase Receipt - Ferrari F8.pdf',
      type: 'receipt',
      assetName: 'Ferrari F8 Tributo',
      uploadDate: '2026-02-12',
      size: '1.8 MB',
      url: '#',
    },
    {
      id: 'DOC003',
      name: 'Appraisal Report - Rolex Daytona.pdf',
      type: 'appraisal',
      assetName: 'Rolex Daytona 116500',
      uploadDate: '2026-02-08',
      size: '3.2 MB',
      url: '#',
    },
    {
      id: 'DOC004',
      name: 'Insurance Policy - Watch Collection.pdf',
      type: 'insurance',
      assetName: 'Multiple Assets',
      uploadDate: '2026-01-15',
      size: '5.1 MB',
      url: '#',
    },
    {
      id: 'DOC005',
      name: 'Service History - Audemars Piguet.pdf',
      type: 'other',
      assetName: 'Audemars Piguet Royal Oak',
      uploadDate: '2026-02-01',
      size: '1.5 MB',
      url: '#',
    },
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      certificate: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      receipt: 'bg-green-500/10 text-green-400 border-green-500/20',
      appraisal: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      insurance: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      contract: 'bg-red-500/10 text-red-400 border-red-500/20',
      other: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
    };
    return colors[type as keyof typeof colors];
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.assetName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const documentStats = {
    total: documents.length,
    certificates: documents.filter((d) => d.type === 'certificate').length,
    receipts: documents.filter((d) => d.type === 'receipt').length,
    appraisals: documents.filter((d) => d.type === 'appraisal').length,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-2">DOCUMENTS</h1>
              <p className="text-neutral-400 text-sm">
                Manage certificates, receipts, and asset documentation
              </p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-3 bg-[#ff4d6d] hover:bg-[#ff3355] text-white rounded-sm transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Upload className="w-4 h-4" />
              UPLOAD DOCUMENT
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-4">
              <div className="text-2xl font-light mb-1">{documentStats.total}</div>
              <div className="text-xs text-neutral-400">Total Documents</div>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-4">
              <div className="text-2xl font-light mb-1">{documentStats.certificates}</div>
              <div className="text-xs text-neutral-400">Certificates</div>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-4">
              <div className="text-2xl font-light mb-1">{documentStats.receipts}</div>
              <div className="text-xs text-neutral-400">Receipts</div>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-4">
              <div className="text-2xl font-light mb-1">{documentStats.appraisals}</div>
              <div className="text-xs text-neutral-400">Appraisals</div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search documents or assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-sm pl-12 pr-4 py-3 text-white focus:outline-none focus:border-neutral-700"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-sm pl-12 pr-8 py-3 text-white focus:outline-none focus:border-neutral-700 appearance-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="certificate">Certificates</option>
                <option value="receipt">Receipts</option>
                <option value="appraisal">Appraisals</option>
                <option value="insurance">Insurance</option>
                <option value="contract">Contracts</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-20 border border-neutral-800 rounded-sm">
            <FolderOpen className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-400 mb-2">
              {searchQuery || filterType !== 'all' ? 'No documents found' : 'No documents uploaded'}
            </p>
            <p className="text-neutral-600 text-sm mb-6">
              {searchQuery || filterType !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Upload your first document to get started'}
            </p>
            {!searchQuery && filterType === 'all' && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-6 py-2 border border-neutral-700 hover:border-neutral-600 text-white rounded-sm transition-colors text-sm"
              >
                UPLOAD DOCUMENT
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-neutral-900/30 border border-neutral-800 hover:border-neutral-700 rounded-sm p-6 transition-colors group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-neutral-800 rounded-sm flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-neutral-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-sm font-medium truncate">{doc.name}</h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs border ${getTypeColor(doc.type)}`}
                        >
                          {doc.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                        <span>{doc.assetName}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-sm transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-sm transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-neutral-800 hover:bg-red-500/20 text-red-400 rounded-sm transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-sm max-w-2xl w-full">
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
              <h2 className="text-xl font-light">UPLOAD DOCUMENT</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">DOCUMENT TYPE</label>
                  <select className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600">
                    <option>Select document type</option>
                    <option>Certificate of Authenticity</option>
                    <option>Purchase Receipt</option>
                    <option>Appraisal Report</option>
                    <option>Insurance Policy</option>
                    <option>Contract</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">RELATED ASSET</label>
                  <select className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600">
                    <option>Select asset (optional)</option>
                    <option>Patek Philippe Nautilus 5711</option>
                    <option>Audemars Piguet Royal Oak</option>
                    <option>Ferrari F8 Tributo</option>
                    <option>Multiple Assets</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">UPLOAD FILE</label>
                  <div className="border-2 border-dashed border-neutral-700 rounded-sm p-8 text-center hover:border-neutral-600 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-neutral-500 mx-auto mb-3" />
                    <p className="text-sm text-neutral-400 mb-1">Drop file here or click to browse</p>
                    <p className="text-xs text-neutral-600">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-6 py-3 border border-neutral-700 hover:border-neutral-600 text-white rounded-sm transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-[#ff4d6d] hover:bg-[#ff3355] text-white rounded-sm transition-colors"
                  >
                    UPLOAD
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
