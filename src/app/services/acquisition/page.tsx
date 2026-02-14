'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'

export default function AcquisitionPage() {
  const features = [
    'Access to allocation-only pieces',
    'Private network of vetted dealers',
    'Direct boutique relationships',
    'Auction house coordination',
    'Private collector outreach',
    'Full provenance verification',
  ]

  const process = [
    {
      step: '01',
      title: 'Brief Submission',
      description: 'Submit detailed requirements including brand, model, specifications, condition, and budget parameters.',
    },
    {
      step: '02',
      title: 'Network Activation',
      description: 'Our acquisition team engages verified sources across global markets through discreet channels.',
    },
    {
      step: '03',
      title: 'Verification & Due Diligence',
      description: 'Each candidate asset undergoes authentication, condition assessment, and provenance verification.',
    },
    {
      step: '04',
      title: 'Presentation & Approval',
      description: 'Receive detailed documentation with imagery, specifications, and pricing for review.',
    },
    {
      step: '05',
      title: 'Secure Settlement',
      description: 'Upon approval, we coordinate payment, logistics, and white-glove delivery to your preferred location.',
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black z-10" />
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center" />
        
        <div className="relative z-20 container-elita text-center">
          <div className="fade-in">
            <div className="text-xs tracking-[0.3em] text-[#ff6b35] uppercase mb-4 font-light">
              SERVICES
            </div>
            <h1 className="heading-1 mb-6">ACQUISITION & SOURCING</h1>
            <p className="body-lg max-w-3xl mx-auto">
              Discreet sourcing of exceptional assets through verified networks, private channels, and institutional relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="container-elita section-padding">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-3 mb-8 text-center">INSTITUTIONAL ACCESS</h2>
          <p className="body-md text-center mb-12">
            Our acquisition protocol provides access to allocation-only timepieces, limited-production vehicles, and off-market opportunities through established dealer relationships and private networks spanning 45+ countries.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#ff6b35]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={14} className="text-[#ff6b35]" />
                </div>
                <span className="text-neutral-300 font-light">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-elita section-padding bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-3 mb-4 text-center">ACQUISITION PROTOCOL</h2>
          <p className="body-md text-center mb-16">
            Five-stage process from initial brief to secure delivery
          </p>

          <div className="space-y-12">
            {process.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-8 slide-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-6xl font-extralight text-[#ff6b35]/20 w-24 flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-light mb-4">{item.title}</h3>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-elita section-padding">
        <div className="card-elita p-12 text-center bg-gradient-to-br from-white/5 to-transparent">
          <h2 className="heading-3 mb-6">READY TO BEGIN?</h2>
          <p className="body-md max-w-2xl mx-auto mb-8">
            Submit your acquisition brief or schedule a confidential consultation with our sourcing team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/client-care/submit-asset" size="lg">
              SUBMIT BRIEF
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
