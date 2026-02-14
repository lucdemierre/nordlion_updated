'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, MapPin, Phone, Search } from 'lucide-react'

const navigationSections = [
  {
    title: 'Collection',
    links: [
      { label: 'Watches', href: '/watches' },
      { label: 'Cars', href: '/cars' },
      { label: 'Jets', href: '/jets' },
      { label: 'Yachts', href: '/yachts' },
      { label: 'Estates', href: '/estates' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Acquisition', href: '/services/acquisition' },
      { label: 'Resale & Consignment', href: '/services/resale-consignment' },
      { label: 'Authentication & Provenance', href: '/services/authentication-provenance' },
      { label: 'Valuation', href: '/services/valuation' },
      { label: 'Collateralisation', href: '/services/collateralisation' },
      { label: 'Vaulting & Logistics', href: '/services/vaulting-logistics' },
      { label: 'Aftercare & Servicing', href: '/services/aftercare-servicing' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Vision', href: '/about/vision' },
      { label: 'Services', href: '/about/services' },
      { label: 'Reserve Singapore', href: '/about/reserve-singapore' },
      { label: 'History', href: '/about/history' },
      { label: 'Foundation', href: '/about/foundation' },
      { label: 'Press', href: '/about/press' },
      { label: 'Careers', href: '/about/careers' },
    ],
  },
  {
    title: 'Client Care',
    links: [
      { label: 'Submit Asset', href: '/client-care/submit-asset' },
      { label: 'Schedule Appointment', href: '/client-care/schedule-appointment' },
      { label: 'Aftercare', href: '/client-care/aftercare' },
      { label: 'Warranty Claims', href: '/client-care/warranty-claims' },
      { label: 'Concierge Support', href: '/client-care/concierge-support' },
    ],
  },
  {
    title: 'More',
    links: [
      { label: 'Locations', href: '/locations' },
      { label: 'Journal', href: '/journal' },
      { label: 'Contact', href: '/contact' },
      { label: 'Investors', href: '/investors/overview' },
    ],
  },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close menu on route change
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="container-elita">
          <div className="flex items-center justify-between h-20">
            {/* Left: Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 text-white hover:text-neutral-300 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
              <span className="text-sm font-medium tracking-wider hidden md:inline">MENU</span>
            </button>

            {/* Center: Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <div className="text-2xl font-light tracking-widest text-white hover:text-neutral-300 transition-colors">
                NORDLION
              </div>
            </Link>

            {/* Right: Icons */}
            <div className="flex items-center gap-4">
              <Link
                href="/locations"
                className="text-white hover:text-neutral-300 transition-colors"
                aria-label="Locations"
              >
                <MapPin className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-neutral-300 transition-colors"
                aria-label="Contact"
              >
                <Phone className="w-5 h-5" />
              </Link>
              <button
                className="text-white hover:text-neutral-300 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container-elita h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between h-20 border-b border-white/10">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-white hover:text-neutral-300 transition-colors"
            >
              <X className="w-6 h-6" />
              <span className="text-sm font-medium tracking-wider hidden md:inline">CLOSE</span>
            </button>

            <Link href="/" className="text-2xl font-light tracking-widest text-white">
              NORDLION
            </Link>

            <div className="w-24" /> {/* Spacer for centering */}
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
              {navigationSections.map((section, idx) => (
                <div
                  key={section.title}
                  className="space-y-6"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <h3 className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
                    {section.title}
                  </h3>
                  <ul className="space-y-4">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-xl md:text-2xl font-light text-white hover:text-primary transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 pt-12 border-t border-white/10 flex flex-col md:flex-row gap-6">
              <Link href="/dashboard" className="btn-primary flex-1 md:flex-none">
                Private Desk
              </Link>
              <Link href="/client-care/schedule-appointment" className="btn-secondary flex-1 md:flex-none">
                Schedule Appointment
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="py-6 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
              <p>&copy; 2026 NordLion. All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/legal/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
                <Link href="/legal/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link href="/legal/compliance" className="hover:text-white transition-colors">
                  Compliance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}