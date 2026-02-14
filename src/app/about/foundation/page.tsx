'use client'

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'

export default function FoundationPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-label mb-4">GIVING BACK</h4>
            <h1 className="text-headline mb-12">FOUNDATION</h1>
            
            <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed mb-12">
              The NordLion Foundation supports horological education, automotive heritage preservation, and access to specialized technical training for next-generation craftspeople.
            </p>
            
            <div className="space-y-8">
              <div className="card-elevated p-8">
                <h3 className="text-xl font-medium mb-4">Watchmaking Education</h3>
                <p className="text-[var(--color-text-secondary)]">Scholarships for students enrolled in accredited watchmaking schools and apprenticeship programs.</p>
              </div>
              
              <div className="card-elevated p-8">
                <h3 className="text-xl font-medium mb-4">Automotive Preservation</h3>
                <p className="text-[var(--color-text-secondary)]">Support for automotive museums, restoration workshops, and historic vehicle documentation projects.</p>
              </div>
              
              <div className="card-elevated p-8">
                <h3 className="text-xl font-medium mb-4">Technical Training</h3>
                <p className="text-[var(--color-text-secondary)]">Funding for specialized certification programs in authentication, valuation, and conservation techniques.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}