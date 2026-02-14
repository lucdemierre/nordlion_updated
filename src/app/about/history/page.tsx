'use client'

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-label mb-4">ABOUT NORDLION</h4>
            <h1 className="text-headline mb-12">HISTORY</h1>
            
            <div className="space-y-12">
              <div className="border-l-2 border-[var(--color-accent-primary)] pl-8 py-4">
                <div className="text-label mb-2">2024</div>
                <h3 className="text-2xl font-light mb-3">FOUNDED</h3>
                <p className="text-[var(--color-text-secondary)]">NordLion established as independent platform for passion asset management with initial focus on watches and automotive.</p>
              </div>
              
              <div className="border-l-2 border-[var(--color-border-primary)] pl-8 py-4">
                <div className="text-label mb-2">2025</div>
                <h3 className="text-2xl font-light mb-3">SINGAPORE RESERVE</h3>
                <p className="text-[var(--color-text-secondary)]">Flagship viewing facility opened in Singapore with appointment-based access and institutional vault partnership.</p>
              </div>
              
              <div className="border-l-2 border-[var(--color-border-primary)] pl-8 py-4">
                <div className="text-label mb-2">2025</div>
                <h3 className="text-2xl font-light mb-3">EXPANDED CATEGORIES</h3>
                <p className="text-[var(--color-text-secondary)]">Added aviation, marine, and real estate desks with specialist teams and regulatory partnerships.</p>
              </div>
              
              <div className="border-l-2 border-[var(--color-border-primary)] pl-8 py-4">
                <div className="text-label mb-2">2026</div>
                <h3 className="text-2xl font-light mb-3">PRIVATE DESK PLATFORM</h3>
                <p className="text-[var(--color-text-secondary)]">Launched digital client portal with vault inventory management, request tracking, and appointment scheduling.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}