'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Car, Shield, Award, Clock, CheckCircle, Star, Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      icon: Car,
      title: 'Curated Collection',
      description: 'Hand-picked luxury vehicles from the world\'s most prestigious manufacturers'
    },
    {
      icon: Shield,
      title: 'Verified Authenticity',
      description: 'Every vehicle undergoes rigorous inspection and certification process'
    },
    {
      icon: Award,
      title: 'Concierge Service',
      description: 'Personalized assistance throughout your entire purchasing journey'
    },
    {
      icon: Clock,
      title: 'Global Delivery',
      description: 'Secure, white-glove delivery to your location anywhere in the world'
    }
  ]

  const vehicles = [
    {
      make: 'Bugatti',
      model: 'Chiron Super Sport',
      price: '£3,900,000',
      image: 'https://images.unsplash.com/photo-1566023888012-f8f9c6da149a?w=800',
      status: 'Available'
    },
    {
      make: 'Pagani',
      model: 'Huayra Roadster BC',
      price: '£3,500,000',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      status: 'Reserved'
    },
    {
      make: 'Ferrari',
      model: '296 GTB',
      price: '£325,000',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
      status: 'Available'
    }
  ]

  const testimonials = [
    {
      name: 'James Anderson',
      role: 'Collector',
      rating: 5,
      text: 'The most professional and seamless experience I\'ve had purchasing a hypercar. Their attention to detail is unmatched.'
    },
    {
      name: 'Sarah Mitchell',
      role: 'Entrepreneur',
      rating: 5,
      text: 'NordLion made my dream of owning a Lamborghini a reality. The concierge service was exceptional from start to finish.'
    },
    {
      name: 'Michael Chen',
      role: 'Investment Banker',
      rating: 5,
      text: 'Outstanding collection of rare vehicles. The verification process gave me complete confidence in my purchase.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-light text-white">
              NordLion
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/inventory" className="text-white/70 hover:text-white transition-colors">
                Inventory
              </Link>
              <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/services" className="text-white/70 hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                Contact
              </Link>
              <Link
                href="/auth/login"
                className="px-6 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg transition-colors"
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <Link href="/inventory" className="block text-white/70 hover:text-white transition-colors">
                Inventory
              </Link>
              <Link href="/about" className="block text-white/70 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/services" className="block text-white/70 hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/contact" className="block text-white/70 hover:text-white transition-colors">
                Contact
              </Link>
              <Link
                href="/auth/login"
                className="block px-6 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg transition-colors text-center"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1920"
            alt="Luxury Vehicle"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0f0f]/50 to-[#0f0f0f]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-light text-white mb-6"
          >
            Redefining Luxury
            <br />
            <span className="text-[#D67C3C]">Automotive Excellence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/70 mb-8 font-light"
          >
            Discover the world's most exclusive collection of hypercars and luxury vehicles
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              href="/inventory"
              className="px-8 py-4 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg transition-all flex items-center gap-2 group"
            >
              Explore Collection
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg transition-all border border-white/10"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Why Choose <span className="text-[#D67C3C]">NordLion</span>
            </h2>
            <p className="text-white/60 text-lg">The pinnacle of luxury automotive acquisition</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#141414] border border-white/5 rounded-xl p-8 hover:border-[#D67C3C]/50 transition-all"
                >
                  <div className="w-12 h-12 bg-[#D67C3C]/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-[#D67C3C]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60 font-light">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Featured <span className="text-[#D67C3C]">Collection</span>
            </h2>
            <p className="text-white/60 text-lg">Rare and exclusive vehicles available now</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden hover:border-[#D67C3C]/50 transition-all group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#D67C3C] text-white text-sm rounded-full">
                    {vehicle.status}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-2xl text-[#D67C3C] font-bold mb-4">{vehicle.price}</p>
                  <Link
                    href="/inventory"
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    View Details <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/inventory"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg transition-all"
            >
              View Full Collection <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
              Client <span className="text-[#D67C3C]">Testimonials</span>
            </h2>
            <p className="text-white/60 text-lg">Hear from our distinguished clientele</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#141414] border border-white/5 rounded-xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-[#D67C3C] fill-[#D67C3C]" />
                  ))}
                </div>
                <p className="text-white/70 mb-6 font-light italic">"{testimonial.text}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-white/50 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Ready to Experience
              <br />
              <span className="text-[#D67C3C]">Automotive Excellence?</span>
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Join the elite circle of NordLion collectors and enthusiasts
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg transition-all text-lg"
            >
              Get Started Today <ArrowRight size={24} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-light text-white mb-4">NordLion</h3>
              <p className="text-white/50 text-sm font-light">
                The world's premier destination for luxury and exotic vehicles.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/inventory" className="block text-white/50 hover:text-white transition-colors text-sm">
                  Inventory
                </Link>
                <Link href="/about" className="block text-white/50 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
                <Link href="/services" className="block text-white/50 hover:text-white transition-colors text-sm">
                  Services
                </Link>
                <Link href="/contact" className="block text-white/50 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <div className="space-y-2">
                <p className="text-white/50 text-sm">Vehicle Sourcing</p>
                <p className="text-white/50 text-sm">Concierge Service</p>
                <p className="text-white/50 text-sm">Global Delivery</p>
                <p className="text-white/50 text-sm">After-Sales Support</p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-white/50 text-sm">
                <p>London, United Kingdom</p>
                <p>info@nordlion.com</p>
                <p>+44 20 1234 5678</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 text-center text-white/50 text-sm">
            <p>&copy; 2026 NordLion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
