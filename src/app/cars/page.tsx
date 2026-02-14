'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'
import { Grid3x3, List, SlidersHorizontal } from 'lucide-react'

export default function CarsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <h4 className="text-label mb-4">COLLECTION</h4>
            <h1 className="text-headline mb-6">CARS</h1>
            <p className="text-body-large">
              Limited production hypercars, modern classics, and bespoke commissions from premier manufacturers—verified provenance, delivery logistics, and institutional-grade custody available.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border-primary)] sticky top-16 z-40 bg-[var(--color-bg-primary)]/95 backdrop-blur-xl">
        <div className="section-container py-4">
          <div className="flex items-center justify-between">
            <button className="btn-secondary text-sm">
              <SlidersHorizontal size={16} />
              FILTERS
            </button>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-1 bg-[var(--color-bg-elevated)] rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid' ? 'bg-[var(--color-accent-primary)] text-black' : ''
                  }`}
                >
                  <Grid3x3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list' ? 'bg-[var(--color-accent-primary)] text-black' : ''
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container py-12">
        <div className="text-center py-20">
          <p className="text-[var(--color-text-tertiary)]">Inventory coming soon. Contact Private Desk for available listings.</p>
          <Link href="/contact" className="btn-primary mt-6 inline-flex items-center">
            CONTACT PRIVATE DESK
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}