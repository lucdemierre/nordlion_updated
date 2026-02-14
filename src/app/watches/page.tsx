'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'
import { ChevronDown, Grid3x3, List, SlidersHorizontal } from 'lucide-react'

export default function WatchesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterOpen, setFilterOpen] = useState(false)

  // Sample data - would come from API/database
  const watches = [
    {
      id: 1,
      brand: 'PATEK PHILIPPE',
      model: 'Nautilus 5711/1A-018',
      year: 2024,
      price: 'Price on Request',
      reference: '5711/1A-018',
      condition: 'Unworn',
      image: '/placeholder-watch.jpg',
      status: 'available'
    },
    // Add more watches...
  ]

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <h4 className="text-label mb-4">COLLECTION</h4>
            <h1 className="text-headline mb-6">WATCHES</h1>
            <p className="text-body-large">
              Rare timepieces from independent manufactures and established maisons—authenticated through specialist networks, documented provenance, and available for immediate delivery or vault custody.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="border-t border-[var(--color-border-primary)] sticky top-16 z-40 bg-[var(--color-bg-primary)]/95 backdrop-blur-xl">
        <div className="section-container py-4">
          <div className="flex items-center justify-between">
            {/* Filter Toggles */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="btn-secondary text-sm"
              >
                <SlidersHorizontal size={16} />
                FILTERS
              </button>
              
              <div className="hidden md:flex items-center gap-2 text-sm">
                <button className="px-4 py-2 bg-[var(--color-bg-elevated)] rounded-lg hover:border-[var(--color-border-accent)] border border-[var(--color-border-primary)]">
                  Brand <ChevronDown size={14} className="inline ml-1" />
                </button>
                <button className="px-4 py-2 bg-[var(--color-bg-elevated)] rounded-lg hover:border-[var(--color-border-accent)] border border-[var(--color-border-primary)]">
                  Year <ChevronDown size={14} className="inline ml-1" />
                </button>
                <button className="px-4 py-2 bg-[var(--color-bg-elevated)] rounded-lg hover:border-[var(--color-border-accent)] border border-[var(--color-border-primary)]">
                  Price <ChevronDown size={14} className="inline ml-1" />
                </button>
                <button className="px-4 py-2 bg-[var(--color-bg-elevated)] rounded-lg hover:border-[var(--color-border-accent)] border border-[var(--color-border-primary)]">
                  Condition <ChevronDown size={14} className="inline ml-1" />
                </button>
              </div>
            </div>

            {/* View Mode & Sort */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-1 bg-[var(--color-bg-elevated)] rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-[var(--color-accent-primary)] text-black' : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  <Grid3x3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-[var(--color-accent-primary)] text-black' : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
              
              <select className="input-field py-2 text-sm">
                <option>Newest First</option>
                <option>Price: High to Low</option>
                <option>Price: Low to High</option>
                <option>Brand A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-container py-12">
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {watches.map((watch) => (
            <Link
              key={watch.id}
              href={`/watches/${watch.id}`}
              className="group card-elevated p-6 hover:border-[var(--color-border-accent)] transition-all"
            >
              <div className="aspect-square bg-[var(--color-bg-secondary)] rounded-lg mb-4 flex items-center justify-center">
                {/* Placeholder for watch image */}
                <span className="text-[var(--color-text-tertiary)] text-sm">IMAGE</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="badge badge-available text-xs">AVAILABLE</span>
                  <span className="text-xs text-[var(--color-text-tertiary)]">{watch.year}</span>
                </div>
                
                <h3 className="text-lg font-medium group-hover:text-[var(--color-accent-primary)] transition-colors">
                  {watch.brand}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{watch.model}</p>
                
                <div className="pt-4 border-t border-[var(--color-border-primary)] mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--color-text-tertiary)]">{watch.reference}</span>
                    <span className="text-sm font-medium">{watch.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <button className="px-4 py-2 text-sm border border-[var(--color-border-primary)] rounded-lg hover:border-[var(--color-border-accent)] transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 text-sm bg-[var(--color-accent-primary)] text-black rounded-lg">
            1
          </button>
          <button className="px-4 py-2 text-sm border border-[var(--color-border-primary)] rounded-lg hover:border-[var(--color-border-accent)] transition-colors">
            2
          </button>
          <button className="px-4 py-2 text-sm border border-[var(--color-border-primary)] rounded-lg hover:border-[var(--color-border-accent)] transition-colors">
            3
          </button>
          <button className="px-4 py-2 text-sm border border-[var(--color-border-primary)] rounded-lg hover:border-[var(--color-border-accent)] transition-colors">
            Next
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}