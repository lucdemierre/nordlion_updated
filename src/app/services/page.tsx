'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { Truck, FileCheck, Shield, Wrench, CreditCard, HeadphonesIcon } from 'lucide-react'

const services = [
  {
    title: 'Concierge Delivery',
    description: 'White-glove delivery service to your doorstep, anywhere in the world. We handle all logistics so you don\'t have to.',
    icon: Truck,
    features: [
      'Worldwide delivery',
      'Professional transport',
      'Full insurance coverage',
      'Real-time tracking'
    ]
  },
  {
    title: 'Vehicle Inspection',
    description: 'Comprehensive 300-point inspection ensuring every vehicle meets our exacting standards of excellence.',
    icon: FileCheck,
    features: [
      'Mechanical inspection',
      'Cosmetic evaluation',
      'History verification',
      'Certified reports'
    ]
  },
  {
    title: 'Extended Warranty',
    description: 'Comprehensive coverage options providing peace of mind for your investment.',
    icon: Shield,
    features: [
      'Bumper-to-bumper coverage',
      'Roadside assistance',
      'Nationwide service',
      'Transferable plans'
    ]
  },
  {
    title: 'Maintenance Services',
    description: 'Factory-certified technicians providing expert care for your luxury vehicle.',
    icon: Wrench,
    features: [
      'Scheduled maintenance',
      'Performance upgrades',
      'Detailing services',
      'Storage solutions'
    ]
  },
  {
    title: 'Flexible Financing',
    description: 'Tailored financing solutions designed around your unique financial situation.',
    icon: CreditCard,
    features: [
      'Competitive rates',
      'Flexible terms',
      'Quick approval',
      'Lease options'
    ]
  },
  {
    title: '24/7 Concierge',
    description: 'Round-the-clock personalized assistance from our dedicated team of automotive experts.',
    icon: HeadphonesIcon,
    features: [
      'Personal advisor',
      'VIP access',
      'Event invitations',
      'Priority service'
    ]
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20 text-center">
            <h1 className="text-6xl font-bold text-white mb-6">
              Premium Services
              <br />
              <span className="text-[#32b8c6]">Tailored for You</span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              From acquisition to ownership, we provide comprehensive services designed to exceed your expectations at every step.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="group bg-[#141414] rounded-2xl border border-white/5 hover:border-[#32b8c6]/30 p-8 transition-all duration-300 hover:scale-105"
                >
                  <div className="inline-flex p-4 bg-gradient-to-br from-[#32b8c6]/20 to-[#1a6873]/20 rounded-2xl mb-6">
                    <Icon className="w-8 h-8 text-[#32b8c6]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#32b8c6] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/60 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#32b8c6] mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-[#32b8c6]/10 to-[#1a6873]/10 rounded-3xl border border-[#32b8c6]/20 p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Experience the NordLion Difference
                </h2>
                <p className="text-white/70 text-lg mb-6">
                  Let our team of experts guide you through every step of your luxury vehicle journey. Schedule a consultation today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-xl font-medium transition-colors">
                    Schedule Consultation
                  </button>
                  <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors border border-white/10">
                    Contact Us
                  </button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&h=600&fit=crop"
                  alt="Premium service"
                  className="rounded-2xl w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
