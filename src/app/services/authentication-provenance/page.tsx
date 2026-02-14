'use client'

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'
import Link from 'next/link'

export default function AuthenticationPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <h4 className="text-label mb-4">SERVICES</h4>
            <h1 className="text-headline mb-6">AUTHENTICATION & PROVENANCE</h1>
            <p className="text-body-large">
              Specialist verification through certified experts and manufacturer archives—supporting documentation, chain of custody review, and detailed condition reporting.
            </p>
          </div>
        </div>
      </section>

      <section className="section-container section-padding">
        <div className="space-y-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-elevated p-6">
              <h3 className="text-lg font-medium mb-3">WATCHES</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Movement photography, serial verification, manufacturer archive confirmation, service history validation.</p>
            </div>
            <div className="card-elevated p-6">
              <h3 className="text-lg font-medium mb-3">CARS</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">VIN verification, matching numbers confirmation, build sheet validation, pre-purchase inspection coordination.</p>
            </div>
            <div className="card-elevated p-6">
              <h3 className="text-lg font-medium mb-3">ALL ASSETS</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Provenance research, ownership history, documentation review, export/import compliance verification.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}