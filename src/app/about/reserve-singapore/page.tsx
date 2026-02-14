'use client'

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ReserveSingaporePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-label mb-4">FLAGSHIP LOCATION</h4>
            <h1 className="text-headline mb-12">THE RESERVE SINGAPORE</h1>
            
            <div className="space-y-12">
              <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
                Our flagship viewing facility in Singapore provides a discreet environment for asset inspection, authentication consultation, and private desk services by appointment only.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="card-elevated p-8">
                  <h3 className="text-xl font-medium mb-6">LOCATION</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <MapPin size={20} className="text-[var(--color-accent-primary)] flex-shrink-0" />
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">1 Raffles Place</p>
                        <p className="text-sm text-[var(--color-text-secondary)]">Singapore 048616</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Phone size={20} className="text-[var(--color-accent-primary)] flex-shrink-0" />
                      <p className="text-sm text-[var(--color-text-secondary)]">+65 6123 4567</p>
                    </div>
                    <div className="flex gap-3">
                      <Mail size={20} className="text-[var(--color-accent-primary)] flex-shrink-0" />
                      <p className="text-sm text-[var(--color-text-secondary)]">singapore@nordlion.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="card-elevated p-8">
                  <h3 className="text-xl font-medium mb-6">HOURS</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock size={20} className="text-[var(--color-accent-primary)] flex-shrink-0" />
                      <div>
                        <p className="text-sm">Monday - Friday</p>
                        <p className="text-sm text-[var(--color-text-tertiary)]">9:00 AM - 6:00 PM SGT</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[var(--color-border-primary)]">
                      <p className="text-xs text-[var(--color-text-tertiary)]">By appointment only</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-8">
                <Link href="/client-care/schedule-appointment" className="btn-primary inline-flex items-center">
                  SCHEDULE APPOINTMENT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}