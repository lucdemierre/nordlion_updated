'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, Grid3x3, List, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CollectionPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'ALL CATEGORIES', count: 247 },
    { id: 'watches', label: 'WATCHES', count: 89, href: '/collection/watches' },
    { id: 'cars', label: 'CARS', count: 67, href: '/collection/cars' },
    { id: 'jets', label: 'JETS', count: 23, href: '/collection/jets' },
    { id: 'yachts', label: 'YACHTS', count: 34, href: '/collection/yachts' },
    { id: 'estates', label: 'ESTATES', count: 34, href: '/collection/estates' }
  ]

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-primary)]/95 backdrop-blur-xl border-b border-[var(--color-border-primary)]">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-light tracking-wider text-white hover:text-[var(--color-accent-primary)] transition-colors">
              NORDLION
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/collection" className="text-sm text-white hover:text-[var(--color-accent-primary)] transition-colors tracking-wide">
                COLLECTIONS
              </Link>
              <Link href="/services" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors tracking-wide">
                SERVICES
              </Link>
              <Link href="/about" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors tracking-wide">
                ABOUT
              </Link>
              <Link href="/account" className="px-5 py-2 bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)] text-black text-sm font-medium tracking-wide rounded-md transition-colors">
                PRIVATE DESK
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20">
        <div className="section-container">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-light tracking-tight mb-4">COLLECTION</h1>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl">
              Curated selection of verified passion assets across watches, cars, jets, yachts, and estates.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[var(--color-accent-primary)] text-black'
                    : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-border-hover)] border border-[var(--color-border-primary)]'
                }`}
              >
                {cat.label}
                <span className="ml-2 opacity-60">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Filters & Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-[var(--color-border-primary)]">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" />
                <input
                  type="text"
                  placeholder="Search collection..."
                  className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-elevated)] border border-[var(--color-border-primary)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-border-accent)] transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Filters */}
              <button className="btn-secondary text-sm py-2.5">
                <SlidersHorizontal size={16} />
                FILTERS
              </button>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-[var(--color-bg-elevated)] border border-[var(--color-border-primary)] rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[var(--color-accent-primary)] text-black'
                      : 'text-[var(--color-text-secondary)] hover:text-white'
                  }`}
                >
                  <Grid3x3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[var(--color-accent-primary)] text-black'
                      : 'text-[var(--color-text-secondary)] hover:text-white'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Featured Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.filter(c => c.id !== 'all').map((category, index) => (
              <Link
                key={category.id}
                href={category.href}
                className="group card-elevated overflow-hidden hover:border-[var(--color-border-accent)] transition-all"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-bg-overlay)] to-[var(--color-bg-elevated)] relative overflow-hidden">
                  {/* Placeholder - would be actual images */}
                  <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-tertiary)]">
                    <div className="text-center">
                      <div className="text-6xl font-light mb-2 opacity-20">{category.count}</div>
                      <div className="text-sm tracking-wider opacity-40">ASSETS</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-light tracking-wide group-hover:text-[var(--color-accent-primary)] transition-colors">
                      {category.label}
                    </h3>
                    <ArrowRight size={18} className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-primary)] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {category.count} verified assets available
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          <div className="mt-16 text-center py-12">
            <p className="text-[var(--color-text-tertiary)] mb-4">
              Select a category above to browse assets
            </p>
            <Link href="/contact" className="btn-secondary inline-flex items-center gap-2">
              REQUEST OFF-MARKET ACCESS
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
