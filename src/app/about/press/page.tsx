'use client'

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'

export default function PressPage() {
  const pressReleases = [
    {
      date: '2026-02-01',
      title: 'NordLion Expands Aviation Desk Services',
      excerpt: 'New pre-purchase inspection protocols and positioning coordination for business jets.',
      category: 'Press Release'
    },
    {
      date: '2026-01-15',
      title: 'Partnership with Institutional Vaulting Provider',
      excerpt: 'Enhanced custody services through BRINKS Global network across key jurisdictions.',
      category: 'Partnership'
    }
  ]

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-label mb-4">MEDIA</h4>
            <h1 className="text-headline mb-12">PRESS & EDITORIALS</h1>
            
            <div className="space-y-6">
              {pressReleases.map((item, index) => (
                <div key={index} className="card-elevated p-8 hover:border-[var(--color-border-accent)] transition-all cursor-pointer">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-label">{item.category}</span>
                    <span className="text-xs text-[var(--color-text-tertiary)]">{item.date}</span>
                  </div>
                  <h3 className="text-2xl font-light mb-3">{item.title}</h3>
                  <p className="text-[var(--color-text-secondary)]">{item.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}