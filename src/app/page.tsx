'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, Shield, Globe, Award, ChevronRight } from 'lucide-react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  const categories = [
    { name: 'WATCHES', href: '/watches', featured: 'Patek Philippe, Rolex, Richard Mille' },
    { name: 'CARS', href: '/cars', featured: 'Ferrari, McLaren, Koenigsegg' },
    { name: 'JETS', href: '/jets', featured: 'Gulfstream, Bombardier, Dassault' },
    { name: 'YACHTS', href: '/yachts', featured: 'Azimut, Sunseeker, Riva' },
    { name: 'ESTATES', href: '/estates', featured: 'Prime Properties Worldwide' }
  ]

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

  const services = [
    {
      title: 'ACQUIRE & SOURCE',
      description: 'Discreet sourcing across primary markets, private networks, and vetted partners—focused on provenance and condition.',
      href: '/services/acquisition'
    },
    {
      title: 'VERIFY & AUTHENTICATE',
      description: 'Specialist verification through certified experts—supporting documentation and clear risk control.',
      href: '/services/authentication-provenance'
    },
    {
      title: 'VAULT & CUSTODY',
      description: 'Secure custody with appointment-based intake, vault-to-vault coordination, and institutional-grade reporting.',
      href: '/services/vaulting-logistics'
    },
    {
      title: 'FINANCE & COLLATERALISE',
      description: 'Liquidity against qualifying assets with insured logistics—clean terms, discreet onboarding, efficient settlement.',
      href: '/services/collateralisation'
    },
    {
      title: 'TRADE & UPGRADE',
      description: 'Portfolio rotation without friction—validate both sides, secure custody, and structured settlement.',
      href: '/services/resale-consignment'
    },
    {
      title: 'GLOBAL LOGISTICS',
      description: 'Fully insured worldwide delivery through institutional partners—vault-to-vault transfers across 1,200+ cities.',
      href: '/services/vaulting-logistics'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,107,53,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        </div>

        <div className="relative z-10 container-elita text-center section-padding">
          <div className="space-y-8 fade-in">
            <div className="text-xs tracking-[0.3em] text-[#ff6b35] uppercase font-light">
              NORDLION PRIVATE LUXURY DESK
            </div>

            <h1 className="heading-1 max-w-5xl mx-auto">
              INSTITUTIONAL-GRADE
              <br />
              <span className="text-neutral-400">PASSION ASSET PLATFORM</span>
            </h1>

            <p className="body-lg max-w-2xl mx-auto">
              Discreet acquisition, authentication, custody, and placement of ultra-luxury assets through verified networks and institutional protocols.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button href="/watches" size="lg" className="gap-2">
                DISCOVER COLLECTION
                <ArrowRight size={16} />
              </Button>
              <Button href="/account" variant="secondary" size="lg">
                PRIVATE DESK
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 pt-12 text-xs text-neutral-500 tracking-wider">
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
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-elita section-padding border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group relative aspect-square bg-white/5 border border-white/10 hover:border-[#ff6b35]/50 overflow-hidden transition-all"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-lg font-light tracking-wider mb-2 group-hover:text-[#ff6b35] transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  {category.featured}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Placements */}
      <section className="container-elita section-padding">
        <div className="space-y-16">
          <div className="max-w-3xl">
            <h4 className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-4 font-light">RECENT MANDATES</h4>
            <h2 className="heading-3 mb-6">VERIFIED EXECUTION</h2>
            <p className="body-md">
              Case studies demonstrating our network reach, verification protocols, and institutional settlement capabilities.
            </p>
          </div>

          <div className="space-y-6">
            {recentPlacements.map((placement, index) => (
              <div
                key={index}
                className="card-elita card-hover p-8 slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-[#ff6b35]/20 text-[#ff6b35] text-xs font-light tracking-wider uppercase">
                          {placement.status}
                        </span>
                        <span className="text-xs text-neutral-500 tracking-wider uppercase">{placement.date}</span>
                      </div>
                      <h3 className="text-3xl font-light mb-2">
                        {placement.asset}
                      </h3>
                      <h4 className="text-xl text-[#ff6b35] font-light mb-4">
                        {placement.model}
                      </h4>
                      <div className="flex items-center gap-6 text-sm text-neutral-500">
                        <span>{placement.origin}</span>
                        <ArrowRight size={14} />
                        <span>{placement.destination}</span>
                      </div>
                    </div>
                    
                    <p className="text-neutral-300 leading-relaxed font-light">
                      {placement.brief}
                    </p>
                  </div>

                  <div className="flex lg:flex-col justify-between lg:justify-start gap-6">
                    <div>
                      <div className="text-xs text-neutral-500 mb-2 tracking-wider uppercase">TIMELINE</div>
                      <div className="text-2xl font-light">{placement.timeline}</div>
                    </div>
                    <button className="text-neutral-400 hover:text-[#ff6b35] transition-colors flex items-center gap-2 text-sm tracking-wide font-light">
                      FULL CASE STUDY
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-elita section-padding bg-white/[0.02]">
        <div className="space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <h4 className="text-xs tracking-[0.3em] text-neutral-500 uppercase mb-4 font-light">PRIVATE DESK PROTOCOL</h4>
            <h2 className="heading-3 mb-6">INSTITUTIONAL EXECUTION</h2>
            <p className="body-md">
              Six pillars supporting discreet, secure, and compliant asset management across all categories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group card-elita card-hover p-8"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-light tracking-wide group-hover:text-[#ff6b35] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-300 leading-relaxed text-sm font-light">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-neutral-500 group-hover:text-[#ff6b35] transition-colors">
                    EXPLORE PROTOCOL
                    <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-elita section-padding text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-6">
            <h2 className="heading-2">
              ACCESS THE
              <br />
              <span className="text-[#ff6b35]">PRIVATE DESK</span>
            </h2>
            <p className="body-lg">
              Institutional protocols, verified networks, and white-glove execution for ultra-high-net-worth clients.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/account" size="lg" className="gap-2">
              OPEN PRIVATE DESK
              <ArrowRight size={16} />
            </Button>
            <Button href="/client-care/schedule-appointment" variant="secondary" size="lg">
              SCHEDULE CONSULTATION
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
