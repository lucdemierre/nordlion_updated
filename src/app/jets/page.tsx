'use client'

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'
import Link from 'next/link'

export default function JetsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <h4 className="text-label mb-4">COLLECTION</h4>
            <h1 className="text-headline mb-6">JETS</h1>
            <p className="text-body-large">
              Long-range business jets from Gulfstream, Bombardier, and Dassault—complete pre-purchase inspection, regulatory compliance, and global positioning coordination.
            </p>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[var(--color-text-secondary)] mb-8">
            All aviation asset transactions are managed through our specialized Aviation Desk with direct manufacturer relationships and certified inspection protocols.
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center">
            AVIATION DESK INQUIRY
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}