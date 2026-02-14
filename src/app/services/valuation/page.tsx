'use client'

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'

export default function ValuationPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <h4 className="text-label mb-4">SERVICES</h4>
            <h1 className="text-headline mb-6">VALUATION</h1>
            <p className="text-body-large">
              Market-informed valuations for insurance, estate planning, collateralization, or portfolio reporting—comparable sales analysis, condition assessment, and formal documentation.
            </p>
          </div>
        </div>
      </section>

      <section className="section-container section-padding">
        <div className="max-w-4xl mx-auto">
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            Valuation reports prepared by accredited specialists with supporting market data, photographic documentation, and clear methodology disclosure. Standard turnaround 7-10 business days from receipt of complete asset information and imagery.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}