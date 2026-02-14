'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Menu, X, MapPin, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[var(--color-bg-primary)]/95 backdrop-blur-xl border-b border-[var(--color-border-primary)]' 
          : 'bg-transparent'
      }`}>
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Left: Hamburger Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-[var(--color-accent-primary)] transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            {/* Center: Logo */}
            <Link 
              href="/" 
              className="absolute left-1/2 transform -translate-x-1/2 text-xl font-light tracking-[0.2em] text-white hover:text-[var(--color-accent-primary)] transition-colors"
            >
              NORDLION
            </Link>

            {/* Right: Icons */}
            <div className="flex items-center gap-4">
              <button className="text-white hover:text-[var(--color-accent-primary)] transition-colors" aria-label="Locations">
                <MapPin size={18} />
              </button>
              <button className="text-white hover:text-[var(--color-accent-primary)] transition-colors" aria-label="Contact">
                <Phone size={18} />
              </button>
              <button className="text-white hover:text-[var(--color-accent-primary)] transition-colors" aria-label="Search">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-50 overflow-y-auto"
          >
            <div className="section-container py-6">
              {/* Close Button */}
              <div className="flex justify-between items-center mb-16">
                <Link href="/" className="text-xl font-light tracking-[0.2em] text-white">
                  NORDLION
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-white hover:text-[var(--color-accent-primary)] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Menu Content */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-8">
                {/* Collections */}
                <div>
                  <h4 className="text-label mb-6">COLLECTIONS</h4>
                  <div className="space-y-3">
                    <Link href="/watches" className="block text-2xl font-light hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Watches
                    </Link>
                    <Link href="/cars" className="block text-2xl font-light hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Cars
                    </Link>
                    <Link href="/jets" className="block text-2xl font-light hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Jets
                    </Link>
                    <Link href="/yachts" className="block text-2xl font-light hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Yachts
                    </Link>
                    <Link href="/estates" className="block text-2xl font-light hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Estates
                    </Link>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h4 className="text-label mb-6">SERVICES</h4>
                  <div className="space-y-3">
                    <Link href="/services/acquisition" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Acquisition
                    </Link>
                    <Link href="/services/resale-consignment" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Resale & Consignment
                    </Link>
                    <Link href="/services/authentication-provenance" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Authentication & Provenance
                    </Link>
                    <Link href="/services/valuation" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Valuation
                    </Link>
                    <Link href="/services/collateralisation" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Collateralisation
                    </Link>
                    <Link href="/services/vaulting-logistics" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Vaulting & Logistics
                    </Link>
                    <Link href="/services/aftercare-servicing" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Aftercare & Servicing
                    </Link>
                  </div>
                </div>

                {/* About */}
                <div>
                  <h4 className="text-label mb-6">ABOUT NORDLION</h4>
                  <div className="space-y-3">
                    <Link href="/about/vision" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Vision
                    </Link>
                    <Link href="/about/services" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Services
                    </Link>
                    <Link href="/about/reserve-singapore" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      The Reserve Singapore
                    </Link>
                    <Link href="/about/history" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      History
                    </Link>
                    <Link href="/about/foundation" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Foundation
                    </Link>
                    <Link href="/about/press" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Press & Editorials
                    </Link>
                    <Link href="/careers" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Careers
                    </Link>
                  </div>
                </div>

                {/* Client Care */}
                <div>
                  <h4 className="text-label mb-6">CLIENT CARE</h4>
                  <div className="space-y-3">
                    <Link href="/client-care/submit-asset" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Submit Asset
                    </Link>
                    <Link href="/client-care/schedule-appointment" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Schedule Appointment
                    </Link>
                    <Link href="/client-care/aftercare" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Aftercare & Servicing
                    </Link>
                    <Link href="/client-care/warranty-claims" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Warranty Claims
                    </Link>
                    <Link href="/client-care/concierge-support" className="block text-sm hover:text-[var(--color-accent-primary)] transition-colors" onClick={() => setMenuOpen(false)}>
                      Concierge Support
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="border-t border-[var(--color-border-primary)] pt-8 mt-12">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link
                    href="/account"
                    className="btn-primary"
                    onClick={() => setMenuOpen(false)}
                  >
                    PRIVATE DESK
                  </Link>
                  <div className="text-xs text-[var(--color-text-tertiary)]">
                    build 1ce6d86 · 2026-02-14
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}