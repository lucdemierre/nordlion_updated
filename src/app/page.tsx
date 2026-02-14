'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, Shield, Clock, Globe, Award, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Asset Categories - Mirroring ELITA's structure
  const categories = [
    { name: 'WATCHES', href: '/collection/watches', featured: 'Patek Philippe, Rolex, Richard Mille' },
    { name: 'CARS', href: '/collection/cars', featured: 'Ferrari, McLaren, Koenigsegg' },
    { name: 'JETS', href: '/collection/jets', featured: 'Gulfstream, Bombardier, Dassault' },
    { name: 'YACHTS', href: '/collection/yachts', featured: 'Azimut, Sunseeker, Riva' },
    { name: 'ESTATES', href: '/collection/estates', featured: 'Prime Properties Worldwide' }
  ]

  // Recent Mandates - Similar to ELITA's placements showcase
  const recentPlacements = [
    {
      asset: 'PATEK PHILIPPE',
      model: 'NAUTILUS 5711/1A',
      origin: 'Geneva',
      destination: 'Singapore',
      brief: 'High-net-worth collector sought allocation-only reference. NordLion coordinated through verified boutique channels, arranged authentication at manufacture, and executed white-glove delivery with full documentation.',
      timeline: '14 Days',
      status: 'COMPLETE',
      date: 'JAN 2026'
    },
    {
      asset: 'MCLAREN',
      model: 'SENNA GTR',
      origin: 'Woking, UK',
      destination: 'Dubai, UAE',
      brief: 'Private client required track-focused hypercar with factory MSO specification. NordLion facilitated factory liaison, export documentation, and specialist enclosed transport with full service history verification.',
      timeline: '28 Days',
      status: 'COMPLETE',
      date: 'DEC 2025'
    },
    {
      asset: 'GULFSTREAM',
      model: 'G650ER',
      origin: 'Savannah, USA',
      destination: 'London, UK',
      brief: 'Family office sought ultra-long-range capability with bespoke interior. NordLion coordinated pre-purchase inspection, regulatory compliance, and cross-border positioning with full airworthiness certification.',
      timeline: '45 Days',
      status: 'COMPLETE',
      date: 'NOV 2025'
    }
  ]

  // Service Pillars
  const services = [
    {
      title: 'ACQUIRE & SOURCE',
      description: 'Discreet sourcing across primary markets, private networks, and vetted partners—focused on provenance and condition.',
      href: '/services/acquisition'
    },
    {
      title: 'VERIFY & AUTHENTICATE',
      description: 'Specialist verification through certified experts—supporting documentation and clear risk control.',
      href: '/services/authentication'
    },
    {
      title: 'VAULT & CUSTODY',
      description: 'Secure custody with appointment-based intake, vault-to-vault coordination, and institutional-grade reporting.',
      href: '/services/custody'
    },
    {
      title: 'FINANCE & COLLATERALISE',
      description: 'Liquidity against qualifying assets with insured logistics—clean terms, discreet onboarding, efficient settlement.',
      href: '/services/collateralisation'
    },
    {
      title: 'TRADE & UPGRADE',
      description: 'Portfolio rotation without friction—validate both sides, secure custody, and structured settlement.',
      href: '/services/trade'
    },
    {
      title: 'GLOBAL LOGISTICS',
      description: 'Fully insured worldwide delivery through institutional partners—vault-to-vault transfers across 1,200+ cities.',
      href: '/services/logistics'
    }
  ]

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      {/* Refined Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[var(--color-bg-primary)]/95 backdrop-blur-xl border-b border-[var(--color-border-primary)]' 
          : 'bg-transparent'
      }`}>
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-xl font-light tracking-wider text-white hover:text-[var(--color-accent-primary)] transition-colors">
              NORDLION
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/collection" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors tracking-wide">
                COLLECTIONS
              </Link>
              <Link href="/services" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors tracking-wide">
                SERVICES
              </Link>
              <Link href="/about" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors tracking-wide">
                ABOUT
              </Link>
              <Link href="/journal" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors tracking-wide">
                JOURNAL
              </Link>
              <Link href="/contact" className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors tracking-wide">
                CONTACT
              </Link>
              
              <div className="h-4 w-px bg-[var(--color-border-primary)]"></div>
              
              <button className="text-[var(--color-text-secondary)] hover:text-white transition-colors">
                <Search size={18} />
              </button>
              
              <Link
                href="/account"
                className="px-5 py-2 bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)] text-black text-sm font-medium tracking-wide rounded-md transition-colors"
              >
                PRIVATE DESK
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Institutional & Refined */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Minimal Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,165,116,0.03),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--color-bg-primary)_95%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 section-container text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Overline */}
            <div className="text-label text-[var(--color-accent-primary)]">
              NORDLION PRIVATE LUXURY DESK
            </div>

            {/* Main Headline */}
            <h1 className="text-headline max-w-5xl mx-auto">
              INSTITUTIONAL-GRADE
              <br />
              <span className="text-[var(--color-text-secondary)]">PASSION ASSET PLATFORM</span>
            </h1>

            {/* Subheadline */}
            <p className="text-body-large max-w-2xl mx-auto">
              Discreet acquisition, authentication, custody, and placement of ultra-luxury assets through verified networks and institutional protocols.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link href="/collection" className="btn-primary">
                DISCOVER COLLECTION
                <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn-secondary">
                PRIVATE DESK SERVICES
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 pt-12 text-xs text-[var(--color-text-tertiary)] tracking-wider">
              <div className="flex items-center gap-2">
                <Shield size={14} />
                <span>VERIFIED NETWORK</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} />
                <span>GLOBAL LOGISTICS</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={14} />
                <span>INSTITUTIONAL CUSTODY</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories - Clean Grid */}
      <section className="section-container section-padding border-t border-[var(--color-border-primary)]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group relative aspect-square bg-[var(--color-bg-elevated)] border border-[var(--color-border-primary)] hover:border-[var(--color-border-accent)] rounded-lg overflow-hidden transition-all"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-lg font-medium tracking-wider mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed">
                  {category.featured}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Placements - Case Study Style */}
      <section className="section-container section-padding">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="max-w-3xl">
            <h4 className="text-label mb-4">RECENT MANDATES</h4>
            <h2 className="text-subheadline mb-6">VERIFIED EXECUTION</h2>
            <p className="text-body-large">
              Case studies demonstrating our network reach, verification protocols, and institutional settlement capabilities.
            </p>
          </div>

          {/* Placement Cards */}
          <div className="space-y-6">
            {recentPlacements.map((placement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-elevated p-8 hover:border-[var(--color-border-accent)] transition-all"
              >
                <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
                  {/* Main Content */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="badge badge-available">{placement.status}</span>
                        <span className="text-label">{placement.date}</span>
                      </div>
                      <h3 className="text-3xl font-light mb-2">
                        {placement.asset}
                      </h3>
                      <h4 className="text-xl text-[var(--color-accent-primary)] font-light mb-4">
                        {placement.model}
                      </h4>
                      <div className="flex items-center gap-6 text-sm text-[var(--color-text-tertiary)]">
                        <span>{placement.origin}</span>
                        <ArrowRight size={14} />
                        <span>{placement.destination}</span>
                      </div>
                    </div>
                    
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                      {placement.brief}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="flex lg:flex-col justify-between lg:justify-start gap-6">
                    <div>
                      <div className="text-label mb-2">TIMELINE</div>
                      <div className="text-2xl font-light">{placement.timeline}</div>
                    </div>
                    <button className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors flex items-center gap-2 text-sm tracking-wide">
                      FULL CASE STUDY
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-container section-padding bg-[var(--color-bg-secondary)]">
        <div className="space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <h4 className="text-label mb-4">PRIVATE DESK PROTOCOL</h4>
            <h2 className="text-subheadline mb-6">INSTITUTIONAL EXECUTION</h2>
            <p className="text-body-large">
              Six pillars supporting discreet, secure, and compliant asset management across all categories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group card-elevated p-8 hover:border-[var(--color-border-accent)] transition-all"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-medium tracking-wide group-hover:text-[var(--color-accent-primary)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-primary)] transition-colors">
                    EXPLORE PROTOCOL
                    <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container section-padding text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-6">
            <h2 className="text-subheadline">
              ACCESS THE
              <br />
              <span className="text-[var(--color-accent-primary)]">PRIVATE DESK</span>
            </h2>
            <p className="text-body-large">
              Institutional protocols, verified networks, and white-glove execution for ultra-high-net-worth clients.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/account" className="btn-primary">
              OPEN PRIVATE DESK
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-secondary">
              SCHEDULE CONSULTATION
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Minimal & Refined */}
      <footer className="border-t border-[var(--color-border-primary)] py-12">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="text-xl font-light tracking-wider">
                NORDLION
              </Link>
              <p className="text-xs text-[var(--color-text-tertiary)] mt-4 leading-relaxed">
                Private luxury desk for passion assets
              </p>
            </div>

            {/* Collections */}
            <div>
              <h4 className="text-label mb-4">COLLECTIONS</h4>
              <div className="space-y-2">
                {categories.map((cat, i) => (
                  <Link key={i} href={cat.href} className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-label mb-4">SERVICES</h4>
              <div className="space-y-2">
                <Link href="/services/acquisition" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                  Acquisition
                </Link>
                <Link href="/services/authentication" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                  Authentication
                </Link>
                <Link href="/services/custody" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                  Custody & Vaulting
                </Link>
                <Link href="/services/collateralisation" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                  Collateralisation
                </Link>
                <Link href="/services/logistics" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                  Global Logistics
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
                <Link href="/about/network" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                  Network
                </Link>
                <Link href="/journal" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                  Journal
                </Link>
                <Link href="/about/careers" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                  Careers
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-label mb-4">CLIENT CARE</h4>
              <div className="space-y-2">
                <Link href="/contact" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="/submit-asset" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                  Submit Asset
                </Link>
                <Link href="/schedule" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                  Schedule Appointment
                </Link>
                <Link href="/account" className="block text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors">
                  Private Desk
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[var(--color-border-primary)] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--color-text-tertiary)]">
              © 2026 NordLion. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-[var(--color-text-tertiary)]">
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
      </footer>
    </div>
  )
}
