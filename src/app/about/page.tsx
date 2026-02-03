'use client'

import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { Award, Users, Globe, Shield } from 'lucide-react'

const stats = [
  { label: 'Years of Excellence', value: '15+', icon: Award },
  { label: 'Satisfied Clients', value: '2,500+', icon: Users },
  { label: 'Global Locations', value: '12', icon: Globe },
  { label: 'Vehicles Delivered', value: '5,000+', icon: Shield },
]

const values = [
  {
    title: 'Uncompromising Quality',
    description: 'Every vehicle in our collection undergoes rigorous inspection to ensure it meets our exacting standards.',
    icon: Shield
  },
  {
    title: 'Personalized Service',
    description: 'Our dedicated concierge team provides white-glove service tailored to your unique preferences.',
    icon: Users
  },
  {
    title: 'Global Reach',
    description: 'With locations worldwide, we deliver exceptional vehicles wherever you are.',
    icon: Globe
  },
  {
    title: 'Trusted Reputation',
    description: '15 years of excellence in the luxury automotive industry speaks for itself.',
    icon: Award
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-20 text-center">
            <h1 className="text-6xl font-bold text-white mb-6">
              Redefining Luxury
              <br />
              <span className="text-[#32b8c6]">Automotive Excellence</span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              For over 15 years, NordLion has been the premier destination for discerning enthusiasts seeking the world's most exclusive and performance-driven vehicles.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="bg-[#141414] rounded-2xl border border-white/5 p-8 text-center">
                  <div className="inline-flex p-4 bg-[#32b8c6]/10 rounded-xl mb-4">
                    <Icon className="w-8 h-8 text-[#32b8c6]" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/50">{stat.label}</div>
                </div>
              )
            })}
          </div>

          {/* Story */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-white/70 text-lg leading-relaxed">
                  <p>
                    Founded in 2010, NordLion emerged from a passion for automotive excellence and a vision to create an unparalleled luxury car buying experience.
                  </p>
                  <p>
                    What started as a boutique dealership in Beverly Hills has grown into a global luxury automotive curator, with locations in the world's most prestigious cities.
                  </p>
                  <p>
                    Today, we serve a distinguished clientele who demand the finest vehicles and the highest level of personalized service. Our commitment to excellence remains unwavering.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop"
                  alt="Luxury showroom"
                  className="rounded-2xl w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="bg-[#141414] rounded-2xl border border-white/5 p-8 hover:border-white/10 transition-all">
                    <div className="inline-flex p-3 bg-[#32b8c6]/10 rounded-xl mb-4">
                      <Icon className="w-6 h-6 text-[#32b8c6]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-white/60">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Team */}
          <div className="bg-gradient-to-br from-[#32b8c6]/10 to-[#1a6873]/10 rounded-3xl border border-[#32b8c6]/20 p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Our team of automotive experts and concierge professionals is dedicated to making your luxury vehicle experience extraordinary.
            </p>
            <button className="px-8 py-4 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-xl font-medium transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
