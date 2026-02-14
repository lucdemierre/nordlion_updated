'use client'

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-label mb-4">ABOUT NORDLION</h4>
            <h1 className="text-headline mb-12">VISION</h1>
            
            <div className="space-y-8 text-[var(--color-text-secondary)] leading-relaxed">
              <p className="text-xl">
                NordLion operates as an institutional-grade platform within the secondary luxury market, providing verified acquisition, authentication, custody, and placement services for ultra-high-net-worth individuals and family offices.
              </p>
              
              <p>
                Our focus is institutional execution: discreet sourcing through verified networks, specialist authentication protocols, secure vault custody with appointment-based access, and structured settlement with full compliance oversight.
              </p>
              
              <p>
                We maintain direct relationships with authorized dealers, independent watchmakers, marque specialists, and institutional logistics partners (BRINKS, Malca-Amit) to ensure chain-of-custody integrity and transparent provenance documentation.
              </p>
              
              <p>
                All transactions are subject to KYC/AML compliance, sanctions screening, and adherence to applicable regulatory frameworks in each jurisdiction. Client confidentiality is maintained through strict information controls and secure communication protocols.
              </p>
              
              <p>
                NordLion is an independent platform and maintains no sponsored affiliations with any luxury brands or manufacturers. All trademarks remain the property of their respective owners and are referenced for descriptive purposes only.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}