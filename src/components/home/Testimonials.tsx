'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'James Mitchell',
    role: 'Entrepreneur',
    rating: 5,
    text: 'The entire experience was exceptional. From the initial consultation to the delivery of my Porsche 911, every detail was perfect. NordLion truly understands luxury service.',
    image: '/testimonials/client1.jpg',
  },
  {
    name: 'Sarah Chen',
    role: 'CEO, Tech Innovations',
    rating: 5,
    text: 'Outstanding professionalism and attention to detail. The team went above and beyond to ensure I found the perfect vehicle. The concierge service is unmatched.',
    image: '/testimonials/client2.jpg',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Investment Banker',
    rating: 5,
    text: 'I\'ve purchased luxury vehicles from various dealers, but NordLion stands in a league of its own. The quality, service, and expertise are simply phenomenal.',
    image: '/testimonials/client3.jpg',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-dark-50 relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-white">Client</span>{' '}
            <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Hear from our distinguished clientele
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-effect p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote size={48} className="text-primary-400" />
              </div>

              {/* Stars */}
              <div className="flex space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-accent-400 fill-accent-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-white/70 leading-relaxed mb-8 relative z-10">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-white/50">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
