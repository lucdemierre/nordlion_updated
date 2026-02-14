'use client'

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'
import Link from 'next/link'

export default function EstatesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <h4 className="text-label mb-4">COLLECTION</h4>
            <h1 className="text-headline mb-6">ESTATES</h1>
            <p className="text-body-large">
              Prime residential properties, vineyard estates, and landmark buildings across key global markets—legal coordination, title verification, and discreet transaction management.
            </p>
          </div>
        </div>
      </section>

      <section className="section-container py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[var(--color-text-secondary)] mb-8">
            Real estate transactions are coordinated through our Property Desk in partnership with licensed brokers in each jurisdiction.
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center">
            PROPERTY DESK INQUIRY
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}