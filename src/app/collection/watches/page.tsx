'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Filter, ChevronDown } from 'lucide-react'

export default function WatchesPage() {
  // Mock data - would come from database
  const watches = [
    {
      id: 1,
      brand: 'PATEK PHILIPPE',
      model: 'Nautilus 5711/1A',
      reference: '5711/1A-010',
      price: 'POA',
      year: '2021',
      condition: 'Unworn',
      status: 'Available',
      image: null
    },
    {
      id: 2,
      brand: 'ROLEX',
      model: 'Daytona Platinum',
      reference: '116506',
      price: '£120,000',
      year: '2023',
      condition: 'Excellent',
      status: 'Available',
      image: null
    },
    {
      id: 3,
      brand: 'RICHARD MILLE',
      model: 'RM 11-03 McLaren',
      reference: 'RM 11-03',
      price: 'POA',
      year: '2022',
      condition: 'Like New',
      status: 'Reserved',
      image: null
    }
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
            <Link href="/account" className="px-5 py-2 bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)] text-black text-sm font-medium tracking-wide rounded-md transition-colors">
              PRIVATE DESK
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20">
        <div className="section-container">
          {/* Breadcrumb */}
          <Link href="/collection" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors mb-8">
            <ArrowLeft size={16} />
            BACK TO COLLECTIONS
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-light tracking-tight mb-4">WATCHES</h1>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl">
              Certified timepieces from the world's most prestigious manufactures. Full provenance, service history, and authentication included.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-[var(--color-border-primary)]">
            <button className="btn-secondary text-sm py-2">
              <Filter size={14} />
              BRAND
              <ChevronDown size={14} />
            </button>
            <button className="btn-secondary text-sm py-2">
              PRICE
              <ChevronDown size={14} />
            </button>
            <button className="btn-secondary text-sm py-2">
              YEAR
              <ChevronDown size={14} />
            </button>
            <button className="btn-secondary text-sm py-2">
              CONDITION
              <ChevronDown size={14} />
            </button>
            <div className="flex-1" />
            <span className="text-sm text-[var(--color-text-tertiary)]">
              {watches.length} ASSETS
            </span>
          </div>

          {/* Watch Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watches.map((watch) => (
              <Link
                key={watch.id}
                href={`/collection/watches/${watch.id}`}
                className="group card-elevated overflow-hidden hover:border-[var(--color-border-accent)] transition-all"
              >
                {/* Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-[var(--color-bg-overlay)] to-[var(--color-bg-elevated)] relative">
                  <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-tertiary)] text-xs">
                    IMAGE UNAVAILABLE
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`badge ${
                      watch.status === 'Available' 
                        ? 'badge-available' 
                        : 'badge-reserved'
                    }`}>
                      {watch.status}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <div>
                    <div className="text-xs text-[var(--color-text-tertiary)] mb-1 tracking-wider">
                      {watch.brand}
                    </div>
                    <h3 className="text-lg font-medium mb-1 group-hover:text-[var(--color-accent-primary)] transition-colors">
                      {watch.model}
                    </h3>
                    <div className="text-sm text-[var(--color-text-secondary)]">
                      REF: {watch.reference}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-primary)]">
                    <div>
                      <div className="text-xs text-[var(--color-text-tertiary)] mb-1">PRICE</div>
                      <div className="text-xl font-light">{watch.price}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[var(--color-text-tertiary)] mb-1">YEAR</div>
                      <div className="text-sm">{watch.year}</div>
                    </div>
                  </div>

                  <div className="text-xs text-[var(--color-text-tertiary)]">
                    CONDITION: {watch.condition}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
