'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Shield, Truck, Clock, Award, Headphones, FileCheck } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Certified Quality',
    description: 'Every vehicle undergoes rigorous 200-point inspection and certification process',
  },
  {
    icon: Truck,
    title: 'Global Delivery',
    description: 'White-glove delivery service to your doorstep anywhere in the world',
  },
  {
    icon: Clock,
    title: '24/7 Concierge',
    description: 'Dedicated luxury concierge service available around the clock',
  },
  {
    icon: Award,
    title: 'Extended Warranty',
    description: 'Comprehensive warranty coverage and maintenance packages available',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Access to automotive specialists and personalized consultation',
  },
  {
    icon: FileCheck,
    title: 'Transparent History',
    description: 'Complete vehicle history reports and documentation provided',
  },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-dark-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text">Unmatched</span>{' '}
            <span className="text-white">Service</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Experience the NordLion difference with our premium services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="mb-6">
                  <div className="inline-flex p-4 rounded-xl bg-primary-600/20 group-hover:bg-primary-600/30 transition-colors">
                    <Icon className="text-primary-400" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
