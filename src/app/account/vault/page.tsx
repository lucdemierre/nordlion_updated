'use client';

import { useState } from 'react';
import { Plus, Grid3x3, List, Search, Filter } from 'lucide-react';

interface Asset {
  id: string;
  image: string;
  category: string;
  brand: string;
  model: string;
  year: number;
  estimatedValue: number;
  status: 'active' | 'pending' | 'sold';
  addedDate: string;
}

export default function VaultPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Mock data - replace with API call
  const assets: Asset[] = [
    {
      id: '1',
      image: '/images/watches/rolex-daytona.jpg',
      category: 'Watches',
      brand: 'Rolex',
      model: 'Daytona 116500LN',
      year: 2023,
      estimatedValue: 45000,
      status: 'active',
      addedDate: '2024-01-15'
    },
    {
      id: '2',
      image: '/images/cars/porsche-911.jpg',
      category: 'Cars',
      brand: 'Porsche',
      model: '911 GT3 RS',
      year: 2022,
      estimatedValue: 285000,
      status: 'active',
      addedDate: '2024-02-20'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-light tracking-wide mb-2">YOUR VAULT</h1>
            <p className="text-neutral-400 text-sm">
              {assets.length} {assets.length === 1 ? 'asset' : 'assets'} in your collection
            </p>
          </div>
          <button className="bg-[#ff4d6d] hover:bg-[#e6445f] text-white px-6 py-3 text-sm tracking-wider transition-colors flex items-center gap-2">
            <Plus size={18} />
            ADD TO VAULT
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500" size={20} />
            <input
              type="text"
              placeholder="Search your collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-neutral-700"
            />
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 border ${viewMode === 'grid' ? 'bg-neutral-900 border-neutral-700' : 'border-neutral-800'} transition-colors`}
            >
              <Grid3x3 size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 border ${viewMode === 'list' ? 'bg-neutral-900 border-neutral-700' : 'border-neutral-800'} transition-colors`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="p-3 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center gap-2"
            >
              <Filter size={20} />
              <span className="hidden sm:inline text-sm">Filter</span>
            </button>
          </div>
        </div>

        {/* Assets Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map((asset) => (
              <div key={asset.id} className="group cursor-pointer">
                <div className="relative aspect-square bg-neutral-900 mb-4 overflow-hidden">
                  <div className="absolute inset-0 bg-neutral-800"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs tracking-wider ${
                      asset.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      asset.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-neutral-500/20 text-neutral-400'
                    }`}>
                      {asset.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white text-sm tracking-wider">VIEW DETAILS</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-neutral-500 tracking-wider">{asset.category.toUpperCase()}</p>
                  <h3 className="text-lg font-light">{asset.brand}</h3>
                  <p className="text-sm text-neutral-400">{asset.model}</p>
                  <p className="text-sm text-neutral-500">{asset.year}</p>
                  <p className="text-lg font-light mt-2">
                    ${asset.estimatedValue.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 border border-neutral-800 hover:border-neutral-700 py-2 text-xs tracking-wider transition-colors">
                    SELL
                  </button>
                  <button className="flex-1 border border-neutral-800 hover:border-neutral-700 py-2 text-xs tracking-wider transition-colors">
                    SERVICE
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {assets.map((asset) => (
              <div key={asset.id} className="border border-neutral-800 hover:border-neutral-700 transition-colors p-6 flex gap-6 cursor-pointer group">
                <div className="w-32 h-32 bg-neutral-900 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-neutral-500 tracking-wider mb-1">{asset.category.toUpperCase()}</p>
                      <h3 className="text-xl font-light">{asset.brand} {asset.model}</h3>
                      <p className="text-sm text-neutral-400">{asset.year}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs tracking-wider ${
                      asset.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      asset.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-neutral-500/20 text-neutral-400'
                    }`}>
                      {asset.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-lg font-light mb-4">${asset.estimatedValue.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <button className="border border-neutral-800 hover:border-neutral-700 px-4 py-2 text-xs tracking-wider transition-colors">
                      SELL
                    </button>
                    <button className="border border-neutral-800 hover:border-neutral-700 px-4 py-2 text-xs tracking-wider transition-colors">
                      REQUEST VALUATION
                    </button>
                    <button className="border border-neutral-800 hover:border-neutral-700 px-4 py-2 text-xs tracking-wider transition-colors">
                      SCHEDULE SERVICING
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {assets.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-neutral-900 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Plus size={40} className="text-neutral-600" />
            </div>
            <h3 className="text-2xl font-light mb-2">Your vault is empty</h3>
            <p className="text-neutral-400 mb-6">Start building your collection</p>
            <button className="bg-[#ff4d6d] hover:bg-[#e6445f] text-white px-8 py-3 text-sm tracking-wider transition-colors">
              ADD YOUR FIRST ASSET
            </button>
          </div>
        )}
      </div>
    </div>
  );
}