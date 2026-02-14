'use client'

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ResaleConsignmentPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <h4 className="text-label mb-4">SERVICES</h4>
            <h1 className="text-headline mb-6">RESALE & CONSIGNMENT</h1>
            <p className="text-body-large">
              Discreet placement through verified buyer networks—market positioning, confidential listing protocols, and structured settlement with escrow coordination.
            </p>
          </div>
        </div>
      </section>

      <section className="section-container section-padding">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-light mb-4">CONSIGNMENT STRUCTURE</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Assets remain in client custody or institutional vault pending buyer commitment. No upfront fees—commission structure aligned with successful placement at agreed reserve pricing.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-light mb-4">BUYER QUALIFICATION</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              All inquiries subject to KYC verification, proof of funds, and confidentiality agreements before asset disclosure or viewing coordination.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-light mb-4">MARKETING APPROACH</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Selective exposure through private networks, institutional platforms, and direct outreach to qualified collectors—no public auction exposure without explicit client approval.
            </p>
          </div>
        </div>
      </section>

      <section className="section-container section-padding bg-[var(--color-bg-secondary)]">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-subheadline mb-6">SUBMIT ASSET</h2>
          <p className="text-body-large mb-8">
            Begin with a confidential valuation and market positioning consultation.
          </p>
          <Link href="/client-care/submit-asset" className="btn-primary inline-flex items-center">
            SUBMIT FOR EVALUATION
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}