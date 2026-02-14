'use client'

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'

export default function CollateralisationPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <h4 className="text-label mb-4">SERVICES</h4>
            <h1 className="text-headline mb-6">COLLATERALISATION</h1>
            <p className="text-body-large">
              Liquidity against qualifying passion assets with secure vault custody—transparent terms, discreet onboarding, and institutional settlement protocols.
            </p>
          </div>
        </div>
      </section>

      <section className="section-container section-padding">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-light mb-4">ELIGIBLE ASSETS</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              High-value watches (Patek Philippe, Rolex, Richard Mille, Audemars Piguet), supercars (Ferrari, McLaren, Lamborghini), and other verified passion assets meeting minimum threshold requirements.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-light mb-4">CUSTODY REQUIREMENT</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              All collateralized assets held in institutional-grade vault custody through verified partners (BRINKS, Malca-Amit) with full insurance coverage and chain-of-custody documentation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-light mb-4">TERMS & STRUCTURE</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Flexible term lengths (3-24 months), competitive rates based on asset category and liquidity, no prepayment penalties, confidential application and approval process.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}