'use client'

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function AcquisitionPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <h4 className="text-label mb-4">SERVICES</h4>
            <h1 className="text-headline mb-6">ACQUISITION</h1>
            <p className="text-body-large">
              Discreet sourcing across primary allocations, private networks, and vetted secondary channels—focused on provenance verification, condition assessment, and institutional settlement protocols.
            </p>
          </div>
        </div>
      </section>

      <section className="section-container section-padding">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-subheadline mb-8">PROTOCOL OVERVIEW</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <CheckCircle className="text-[var(--color-accent-primary)] flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-medium mb-2">Primary Market Access</h4>
                  <p className="text-[var(--color-text-secondary)] text-sm">Direct relationships with authorized dealers, boutiques, and manufacturer representatives for allocation-based assets.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="text-[var(--color-accent-primary)] flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-medium mb-2">Private Network Sourcing</h4>
                  <p className="text-[var(--color-text-secondary)] text-sm">Confidential inquiries through verified collector networks, family offices, and institutional holders.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="text-[var(--color-accent-primary)] flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-medium mb-2">Condition & Provenance</h4>
                  <p className="text-[var(--color-text-secondary)] text-sm">Specialist inspection, service history verification, and chain of custody documentation before commitment.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="text-[var(--color-accent-primary)] flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-medium mb-2">Secure Settlement</h4>
                  <p className="text-[var(--color-text-secondary)] text-sm">Escrow coordination, payment verification, and insured delivery through institutional logistics partners.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-elevated p-8">
            <h3 className="text-xl font-medium mb-6">TYPICAL TIMELINE</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[var(--color-text-tertiary)]">Initial Brief</span>
                  <span className="text-sm">24-48 Hours</span>
                </div>
                <div className="h-1 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full w-full bg-[var(--color-accent-primary)]"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[var(--color-text-tertiary)]">Network Search</span>
                  <span className="text-sm">5-14 Days</span>
                </div>
                <div className="h-1 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-[var(--color-accent-primary)]"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[var(--color-text-tertiary)]">Verification</span>
                  <span className="text-sm">3-7 Days</span>
                </div>
                <div className="h-1 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-[var(--color-accent-primary)]"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[var(--color-text-tertiary)]">Settlement & Delivery</span>
                  <span className="text-sm">3-5 Days</span>
                </div>
                <div className="h-1 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-[var(--color-accent-primary)]"></div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-[var(--color-border-primary)]">
              <p className="text-sm text-[var(--color-text-tertiary)] mb-4">Total Typical Duration</p>
              <p className="text-2xl font-light">14-30 Days</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container section-padding bg-[var(--color-bg-secondary)]">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-subheadline mb-6">INITIATE ACQUISITION</h2>
          <p className="text-body-large mb-8">
            Submit a detailed brief through the Private Desk or schedule a confidential consultation to discuss specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/account" className="btn-primary">
              PRIVATE DESK ACCESS
              <ArrowRight size={16} />
            </Link>
            <Link href="/client-care/schedule-appointment" className="btn-secondary">
              SCHEDULE CONSULTATION
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}