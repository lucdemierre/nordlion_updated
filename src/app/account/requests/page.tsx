'use client';

import { useState } from 'react';
import { Plus, Search, ChevronDown, MessageSquare, Paperclip } from 'lucide-react';

interface Request {
  id: string;
  date: string;
  assetTitle: string;
  type: 'acquisition' | 'valuation' | 'consignment' | 'authentication' | 'servicing';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  lastUpdate: string;
  messages: number;
  assignedTo?: string;
}

export default function RequestsPage() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const requests: Request[] = [
    {
      id: 'REQ-2024-001',
      date: '2024-02-10',
      assetTitle: 'Rolex Daytona 116500LN - Authentication',
      type: 'authentication',
      status: 'in-progress',
      lastUpdate: '2024-02-12',
      messages: 3,
      assignedTo: 'Sarah Chen'
    },
    {
      id: 'REQ-2024-002',
      date: '2024-02-08',
      assetTitle: 'Patek Philippe Nautilus 5711/1A - Valuation',
      type: 'valuation',
      status: 'completed',
      lastUpdate: '2024-02-09',
      messages: 5,
      assignedTo: 'Michael Torres'
    },
    {
      id: 'REQ-2024-003',
      date: '2024-02-05',
      assetTitle: 'Porsche 911 GT3 RS - Acquisition Inquiry',
      type: 'acquisition',
      status: 'pending',
      lastUpdate: '2024-02-05',
      messages: 1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400';
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-neutral-500/20 text-neutral-400';
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-light tracking-wide mb-2">YOUR REQUESTS</h1>
            <p className="text-neutral-400 text-sm">
              Track inquiries, valuations, and service requests
            </p>
          </div>
          <button className="bg-[#ff4d6d] hover:bg-[#e6445f] text-white px-6 py-3 text-sm tracking-wider transition-colors flex items-center gap-2">
            <Plus size={18} />
            NEW REQUEST
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500" size={20} />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-neutral-700"
            />
          </div>

          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 text-white px-4 py-3 focus:outline-none focus:border-neutral-700 min-w-[200px]"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Requests Table */}
        <div className="border border-neutral-800 overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 bg-neutral-900 px-6 py-4 text-sm text-neutral-400 tracking-wider">
            <div className="col-span-2">REQUEST ID</div>
            <div className="col-span-4">ASSET / REQUEST</div>
            <div className="col-span-2">TYPE</div>
            <div className="col-span-2">STATUS</div>
            <div className="col-span-2">LAST UPDATE</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-neutral-800">
            {requests.map((request) => (
              <div key={request.id}>
                {/* Main Row */}
                <div
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-6 hover:bg-neutral-900/50 transition-colors cursor-pointer"
                  onClick={() => setExpandedRow(expandedRow === request.id ? null : request.id)}
                >
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-xs text-neutral-500 md:hidden mb-1">REQUEST ID</p>
                    <p className="font-mono text-sm">{request.id}</p>
                  </div>
                  <div className="col-span-1 md:col-span-4">
                    <p className="text-xs text-neutral-500 md:hidden mb-1">ASSET / REQUEST</p>
                    <p className="text-sm">{request.assetTitle}</p>
                    <p className="text-xs text-neutral-500 mt-1 flex items-center gap-2">
                      <MessageSquare size={14} />
                      {request.messages} {request.messages === 1 ? 'message' : 'messages'}
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-xs text-neutral-500 md:hidden mb-1">TYPE</p>
                    <p className="text-sm">{getTypeLabel(request.type)}</p>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-xs text-neutral-500 md:hidden mb-1">STATUS</p>
                    <span className={`inline-block px-3 py-1 text-xs tracking-wider ${getStatusColor(request.status)}`}>
                      {request.status.toUpperCase().replace('-', ' ')}
                    </span>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex justify-between items-start">
                    <div>
                      <p className="text-xs text-neutral-500 md:hidden mb-1">LAST UPDATE</p>
                      <p className="text-sm">{new Date(request.lastUpdate).toLocaleDateString()}</p>
                    </div>
                    <ChevronDown
                      className={`transform transition-transform ${expandedRow === request.id ? 'rotate-180' : ''}`}
                      size={20}
                    />
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedRow === request.id && (
                  <div className="bg-neutral-900/30 px-6 py-6 border-t border-neutral-800">
                    <div className="space-y-6">
                      {/* Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-neutral-500 mb-1">SUBMITTED</p>
                          <p className="text-sm">{new Date(request.date).toLocaleDateString()}</p>
                        </div>
                        {request.assignedTo && (
                          <div>
                            <p className="text-xs text-neutral-500 mb-1">ASSIGNED TO</p>
                            <p className="text-sm">{request.assignedTo}</p>
                          </div>
                        )}
                      </div>

                      {/* Conversation Thread */}
                      <div>
                        <p className="text-xs text-neutral-500 mb-4">CONVERSATION</p>
                        <div className="space-y-4">
                          <div className="border-l-2 border-neutral-700 pl-4">
                            <p className="text-xs text-neutral-500 mb-1">You • {new Date(request.date).toLocaleDateString()}</p>
                            <p className="text-sm">Initial request submitted with documentation.</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
                              <Paperclip size={12} />
                              <span>3 attachments</span>
                            </div>
                          </div>
                          {request.messages > 1 && (
                            <div className="border-l-2 border-[#ff4d6d] pl-4">
                              <p className="text-xs text-neutral-500 mb-1">
                                {request.assignedTo || 'NordLion Team'} • {new Date(request.lastUpdate).toLocaleDateString()}
                              </p>
                              <p className="text-sm">Thank you for your inquiry. We are currently reviewing your request and will provide an update shortly.</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-4 border-t border-neutral-800">
                        <button className="border border-neutral-700 hover:border-neutral-600 px-4 py-2 text-xs tracking-wider transition-colors">
                          ADD MESSAGE
                        </button>
                        <button className="border border-neutral-700 hover:border-neutral-600 px-4 py-2 text-xs tracking-wider transition-colors">
                          UPLOAD DOCUMENTS
                        </button>
                        <button className="border border-neutral-700 hover:border-neutral-600 px-4 py-2 text-xs tracking-wider transition-colors text-red-400 border-red-900">
                          CANCEL REQUEST
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {requests.length === 0 && (
          <div className="text-center py-20 border border-neutral-800">
            <div className="w-24 h-24 bg-neutral-900 rounded-full mx-auto mb-6 flex items-center justify-center">
              <MessageSquare size={40} className="text-neutral-600" />
            </div>
            <h3 className="text-2xl font-light mb-2">No requests yet</h3>
            <p className="text-neutral-400 mb-6">Submit your first inquiry or service request</p>
            <button className="bg-[#ff4d6d] hover:bg-[#e6445f] text-white px-8 py-3 text-sm tracking-wider transition-colors">
              CREATE NEW REQUEST
            </button>
          </div>
        )}
      </div>
    </div>
  );
}