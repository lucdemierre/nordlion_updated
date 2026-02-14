'use client'

import Link from 'next/link'
import { Instagram, Youtube, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]">
      <div className="section-container py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Collections */}
          <div>
            <h4 className="text-label mb-4">COLLECTIONS</h4>
            <div className="space-y-2">
              <Link href="/watches" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Watches
              </Link>
              <Link href="/cars" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Cars
              </Link>
              <Link href="/jets" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Jets
              </Link>
              <Link href="/yachts" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Yachts
              </Link>
              <Link href="/estates" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Estates
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-label mb-4">SERVICES</h4>
            <div className="space-y-2">
              <Link href="/services/acquisition" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Acquisition
              </Link>
              <Link href="/services/resale-consignment" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Resale & Consignment
              </Link>
              <Link href="/services/authentication-provenance" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Authentication
              </Link>
              <Link href="/services/valuation" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Valuation
              </Link>
              <Link href="/services/collateralisation" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Collateralisation
              </Link>
              <Link href="/services/vaulting-logistics" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Vaulting & Logistics
              </Link>
              <Link href="/services/aftercare-servicing" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Aftercare
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="text-label mb-4">ABOUT</h4>
            <div className="space-y-2">
              <Link href="/about/vision" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Vision
              </Link>
              <Link href="/about/services" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/about/reserve-singapore" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                The Reserve
              </Link>
              <Link href="/about/history" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                History
              </Link>
              <Link href="/about/foundation" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Foundation
              </Link>
              <Link href="/about/press" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Press
              </Link>
              <Link href="/careers" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Careers
              </Link>
            </div>
          </div>

          {/* Client Care */}
          <div>
            <h4 className="text-label mb-4">CLIENT CARE</h4>
            <div className="space-y-2">
              <Link href="/client-care/submit-asset" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Submit Asset
              </Link>
              <Link href="/client-care/schedule-appointment" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Schedule Appointment
              </Link>
              <Link href="/client-care/aftercare" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Aftercare
              </Link>
              <Link href="/client-care/warranty-claims" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Warranty Claims
              </Link>
              <Link href="/client-care/concierge-support" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Concierge
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-label mb-4">LEGAL</h4>
            <div className="space-y-2">
              <Link href="/legal/terms" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/legal/privacy" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/compliance" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Compliance
              </Link>
              <Link href="/legal/disclaimer" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Disclaimer
              </Link>
              <Link href="/legal/faq" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>

          {/* Investors */}
          <div>
            <h4 className="text-label mb-4">INVESTORS</h4>
            <div className="space-y-2">
              <Link href="/investors/overview" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Overview
              </Link>
              <Link href="/investors/press" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Press & Updates
              </Link>
              <Link href="/investors/contact-ir" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                Contact IR
              </Link>
              <div className="pt-2 border-t border-[var(--color-border-primary)] mt-2">
                <Link href="/investors/login" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                  Investor Portal
                </Link>
                <Link href="/investors/dataroom" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors mt-2">
                  Data Room
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-[var(--color-border-primary)] pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="text-label mb-4">STAY INFORMED</h4>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                SIGN UP
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--color-border-primary)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-light tracking-[0.2em]">
              NORDLION
            </Link>
            <p className="text-xs text-[var(--color-text-tertiary)]">
              © 2026 NordLion. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-tertiary)] hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-tertiary)] hover:text-white transition-colors">
              <Youtube size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-tertiary)] hover:text-white transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-tertiary)] hover:text-white transition-colors">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Build Number */}
        <div className="text-center mt-8">
          <p className="text-xs text-[var(--color-text-muted)] font-mono">
            build 1ce6d86 · 2026-02-14T14:41:00.000Z
          </p>
        </div>
      </div>
    </footer>
  )
}