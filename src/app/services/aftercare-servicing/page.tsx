'use client'

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'

export default function AftercarePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <h4 className="text-label mb-4">SERVICES</h4>
            <h1 className="text-headline mb-6">AFTERCARE & SERVICING</h1>
            <p className="text-body-large">
              Ongoing maintenance coordination, service history documentation, and warranty facilitation—authorized service centers, genuine parts, and complete records management.
            </p>
          </div>
        </div>
      </section>

      <section className="section-container section-padding">
        <div className="max-w-4xl mx-auto">
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">
            All servicing coordinated through manufacturer-authorized facilities or certified independent specialists with transparent pricing, genuine parts guarantee, and complete documentation for resale provenance.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-elevated p-6">
              <h3 className="font-medium mb-3">WATCHES</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Movement service, water resistance testing, strap replacement, polishing, crystal replacement—manufacturer service centers or certified watchmakers.</p>
            </div>
            <div className="card-elevated p-6">
              <h3 className="font-medium mb-3">CARS</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Scheduled maintenance, pre-sale preparation, paint protection, detailing, storage management—authorized dealers or marque specialists.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}