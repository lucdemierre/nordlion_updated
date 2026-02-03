'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

const locations = [
  {
    city: 'Beverly Hills',
    address: '9600 Wilshire Blvd, Beverly Hills, CA 90210',
    phone: '+1 (310) 555-0100',
    email: 'beverlyhills@nordlion.com'
  },
  {
    city: 'Miami',
    address: '1000 Brickell Ave, Miami, FL 33131',
    phone: '+1 (305) 555-0200',
    email: 'miami@nordlion.com'
  },
  {
    city: 'New York',
    address: '350 Fifth Avenue, New York, NY 10118',
    phone: '+1 (212) 555-0300',
    email: 'newyork@nordlion.com'
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-6xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Our concierge team is ready to assist you. Reach out through any of our locations or send us a message.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Form */}
            <div className="lg:col-span-2 bg-[#141414] rounded-2xl border border-white/5 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/70 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-[#32b8c6] focus:outline-none transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-[#32b8c6] focus:outline-none transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-[#32b8c6] focus:outline-none transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-[#32b8c6] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your automotive needs..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#32b8c6]/10 rounded-xl">
                    <Phone className="w-6 h-6 text-[#32b8c6]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Phone</h3>
                    <p className="text-white/60">+1 (800) NORDLION</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#32b8c6]/10 rounded-xl">
                    <Mail className="w-6 h-6 text-[#32b8c6]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <p className="text-white/60">concierge@nordlion.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#32b8c6]/10 rounded-xl">
                    <Clock className="w-6 h-6 text-[#32b8c6]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Hours</h3>
                    <p className="text-white/60">Mon-Fri: 9AM-8PM</p>
                    <p className="text-white/60">Sat-Sun: 10AM-6PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Our Locations</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="bg-[#141414] rounded-2xl border border-white/5 hover:border-white/10 p-6 transition-all"
                >
                  <h3 className="text-xl font-bold text-white mb-4">{location.city}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#32b8c6] flex-shrink-0 mt-0.5" />
                      <p className="text-white/70 text-sm">{location.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#32b8c6]" />
                      <p className="text-white/70 text-sm">{location.phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#32b8c6]" />
                      <p className="text-white/70 text-sm">{location.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
