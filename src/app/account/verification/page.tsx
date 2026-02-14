'use client';

import { useState } from 'react';
import { Upload, CheckCircle, Clock, AlertCircle, FileText, Shield, Camera } from 'lucide-react';

interface VerificationItem {
  id: string;
  assetName: string;
  assetType: string;
  submittedDate: string;
  status: 'pending' | 'under_review' | 'verified' | 'rejected';
  documents: string[];
  notes?: string;
}

export default function VerificationPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'verified'>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const verifications: VerificationItem[] = [
    {
      id: 'V001',
      assetName: 'Patek Philippe Nautilus 5711',
      assetType: 'Watch',
      submittedDate: '2026-02-10',
      status: 'verified',
      documents: ['Certificate of Authenticity', 'Original Box & Papers', 'Purchase Receipt'],
    },
    {
      id: 'V002',
      assetName: 'Ferrari F8 Tributo',
      assetType: 'Vehicle',
      submittedDate: '2026-02-12',
      status: 'under_review',
      documents: ['Vehicle Registration', 'Service History', 'Inspection Report'],
      notes: 'Awaiting third-party authentication confirmation',
    },
    {
      id: 'V003',
      assetName: 'Rolex Daytona 116500',
      assetType: 'Watch',
      submittedDate: '2026-02-14',
      status: 'pending',
      documents: ['Certificate Uploaded'],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'under_review':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-neutral-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      verified: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      under_review: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      pending: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
      rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const filteredVerifications = verifications.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return item.status === 'pending' || item.status === 'under_review';
    if (activeTab === 'verified') return item.status === 'verified';
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-2">AUTHENTICATION & VERIFICATION</h1>
              <p className="text-neutral-400 text-sm">
                Track the authentication status of your assets
              </p>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-3 bg-[#ff4d6d] hover:bg-[#ff3355] text-white rounded-sm transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Upload className="w-4 h-4" />
              SUBMIT FOR VERIFICATION
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-neutral-800">
            {['all', 'pending', 'verified'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {tab.toUpperCase()}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff4d6d]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Verification Process Info */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                <Upload className="w-5 h-5 text-neutral-400" />
              </div>
              <span className="text-neutral-400 text-xs">STEP 1</span>
            </div>
            <h3 className="text-sm font-medium mb-1">Submit Documents</h3>
            <p className="text-xs text-neutral-500">Upload certificates, receipts, and photos</p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                <Shield className="w-5 h-5 text-neutral-400" />
              </div>
              <span className="text-neutral-400 text-xs">STEP 2</span>
            </div>
            <h3 className="text-sm font-medium mb-1">Expert Review</h3>
            <p className="text-xs text-neutral-500">Authentication specialists examine your asset</p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                <Camera className="w-5 h-5 text-neutral-400" />
              </div>
              <span className="text-neutral-400 text-xs">STEP 3</span>
            </div>
            <h3 className="text-sm font-medium mb-1">Physical Inspection</h3>
            <p className="text-xs text-neutral-500">Optional in-person verification if required</p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-sm p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-neutral-400 text-xs">STEP 4</span>
            </div>
            <h3 className="text-sm font-medium mb-1">Certification</h3>
            <p className="text-xs text-neutral-500">Receive official authentication certificate</p>
          </div>
        </div>

        {/* Verifications List */}
        <div className="space-y-4">
          {filteredVerifications.length === 0 ? (
            <div className="text-center py-20 border border-neutral-800 rounded-sm">
              <FileText className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <p className="text-neutral-400 mb-2">No verifications found</p>
              <p className="text-neutral-600 text-sm mb-6">
                Submit an asset for authentication to get started
              </p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-6 py-2 border border-neutral-700 hover:border-neutral-600 text-white rounded-sm transition-colors text-sm"
              >
                SUBMIT ASSET
              </button>
            </div>
          ) : (
            filteredVerifications.map((item) => (
              <div
                key={item.id}
                className="bg-neutral-900/30 border border-neutral-800 hover:border-neutral-700 rounded-sm p-6 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="pt-1">{getStatusIcon(item.status)}</div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-light">{item.assetName}</h3>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-neutral-400">
                        <span>{item.assetType}</span>
                        <span>•</span>
                        <span>ID: {item.id}</span>
                        <span>•</span>
                        <span>Submitted {new Date(item.submittedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-neutral-400 hover:text-white text-sm transition-colors">
                    VIEW DETAILS →
                  </button>
                </div>

                {/* Documents */}
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-neutral-500 uppercase mb-2">Documents Submitted</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.documents.map((doc, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-neutral-800 text-neutral-300 rounded-sm text-xs flex items-center gap-2"
                      >
                        <FileText className="w-3 h-3" />
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {item.notes && (
                  <div className="bg-neutral-800/50 border border-neutral-700 rounded-sm p-4">
                    <p className="text-sm text-neutral-300">{item.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-4">
                  <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-sm text-xs transition-colors">
                    UPLOAD ADDITIONAL DOCUMENTS
                  </button>
                  {item.status === 'verified' && (
                    <button className="px-4 py-2 border border-neutral-700 hover:border-neutral-600 text-white rounded-sm text-xs transition-colors">
                      DOWNLOAD CERTIFICATE
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
              <h2 className="text-xl font-light">SUBMIT FOR VERIFICATION</h2>
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
                  <label className="block text-sm font-medium mb-2">SELECT ASSET</label>
                  <select className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600">
                    <option>Choose from your vault</option>
                    <option>Patek Philippe Nautilus 5711</option>
                    <option>Audemars Piguet Royal Oak</option>
                    <option>Ferrari F8 Tributo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">UPLOAD DOCUMENTS</label>
                  <div className="border-2 border-dashed border-neutral-700 rounded-sm p-8 text-center hover:border-neutral-600 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-neutral-500 mx-auto mb-3" />
                    <p className="text-sm text-neutral-400 mb-1">Drop files here or click to browse</p>
                    <p className="text-xs text-neutral-600">PDF, JPG, PNG up to 10MB each</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">ADDITIONAL NOTES</label>
                  <textarea
                    rows={4}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
                    placeholder="Any additional information about the asset..."
                  />
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
                    SUBMIT FOR REVIEW
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
