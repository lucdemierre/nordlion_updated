'use client'

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'

export default function VaultingLogisticsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <h4 className="text-label mb-4">SERVICES</h4>
            <h1 className="text-headline mb-6">VAULTING & LOGISTICS</h1>
            <p className="text-body-large">
              Secure custody with appointment-based access, vault-to-vault transfers, and global delivery coordination—full insurance, customs facilitation, and real-time tracking.
            </p>
          </div>
        </div>
      </section>

      <section className="section-container section-padding">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-light mb-6">VAULTING SERVICES</h2>
            <div className="space-y-4 text-[var(--color-text-secondary)]">
              <p>Institutional-grade storage facilities in key jurisdictions (Singapore, Switzerland, UAE, UK, USA) with 24/7 monitoring, climate control, and appointment-based viewing access.</p>
              <p>Full insurance coverage, digital inventory management, and secure intake/release protocols with photographic documentation at each custody transfer.</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-light mb-6">GLOBAL LOGISTICS</h2>
            <div className="space-y-4 text-[var(--color-text-secondary)]">
              <p>Worldwide delivery through specialized carriers (watches: BRINKS, Malca-Amit; cars: enclosed transport; aviation/marine: positioning coordination) with full insurance and customs brokerage.</p>
              <p>Real-time tracking, signature confirmation, and white-glove delivery service with unpacking assistance and condition verification upon receipt.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}