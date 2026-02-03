'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { ChevronRight, Phone } from 'lucide-react'
import Link from 'next/link'

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-24 bg-dark-100 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-dark-100 to-accent-950 opacity-50"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-effect p-12 md:p-16 rounded-3xl text-center max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            <span className="text-white">Ready to Experience</span>
            <br />
            <span className="gradient-text">Automotive Excellence?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/70 mb-10 max-w-2xl mx-auto"
          >
            Schedule a private consultation with our luxury automotive specialists
            and discover your perfect vehicle today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact" className="btn-primary group">
              <span>Schedule Consultation</span>
              <ChevronRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <a href="tel:+1234567890" className="btn-secondary group">
              <Phone className="inline mr-2" size={20} />
              <span>Call +1 (234) 567-890</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
