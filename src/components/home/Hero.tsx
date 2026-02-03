'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Play } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-luxury-sports-car-on-road-5352/1080p.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-orange-500 to-white bg-clip-text text-transparent">
              NORDLION
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 mb-8 font-light">
            Elevate Your Drive
          </p>
          
          <p className="text-base md:text-lg lg:text-xl text-white/70 mb-12 max-w-2xl mx-auto px-4">
            Experience luxury, performance, and exclusivity with our curated collection of premium vehicles
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link
              href="/inventory"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 orange-glow inline-flex items-center justify-center gap-2"
            >
              Explore Collection
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-all duration-300 border border-white/20 inline-flex items-center justify-center gap-2"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}
