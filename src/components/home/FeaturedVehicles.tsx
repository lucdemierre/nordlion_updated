'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { ChevronRight, Heart, Eye } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const featuredVehicles = [
  {
    id: 1,
    name: 'Porsche 911 Turbo S',
    year: 2024,
    price: 245000,
    image: '/vehicles/porsche-911.jpg',
    category: 'Sports Car',
    specs: { hp: '640', acceleration: '2.6s', topSpeed: '205mph' },
  },
  {
    id: 2,
    name: 'Mercedes-AMG GT',
    year: 2024,
    price: 189000,
    image: '/vehicles/mercedes-amg.jpg',
    category: 'Grand Tourer',
    specs: { hp: '577', acceleration: '3.1s', topSpeed: '198mph' },
  },
  {
    id: 3,
    name: 'BMW M8 Competition',
    year: 2024,
    price: 156000,
    image: '/vehicles/bmw-m8.jpg',
    category: 'Luxury Coupe',
    specs: { hp: '617', acceleration: '3.0s', topSpeed: '190mph' },
  },
]

export default function FeaturedVehicles() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-dark-50 relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-white">Featured</span>{' '}
            <span className="gradient-text">Collection</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Hand-picked masterpieces that define automotive excellence
          </p>
        </motion.div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <Link href={`/vehicles/${vehicle.id}`}>
                <div className="glass-effect rounded-2xl overflow-hidden card-hover">
                  {/* Image */}
                  <div className="relative h-64 bg-dark-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-50 to-transparent z-10"></div>
                    {/* Placeholder for vehicle image */}
                    <div className="absolute inset-0 flex items-center justify-center text-white/20">
                      <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                      </svg>
                    </div>
                    
                    {/* Overlay Actions */}
                    <div className="absolute top-4 right-4 z-20 flex space-x-2">
                      <button className="p-2 glass-effect rounded-full hover:bg-white/20 transition-colors">
                        <Heart size={18} className="text-white" />
                      </button>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="px-3 py-1 glass-effect text-xs font-medium text-white rounded-full">
                        {vehicle.category}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-white/50 text-sm mb-4">{vehicle.year}</p>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-white/10">
                      <div>
                        <div className="text-primary-400 font-semibold">{vehicle.specs.hp}</div>
                        <div className="text-xs text-white/50">Horsepower</div>
                      </div>
                      <div>
                        <div className="text-primary-400 font-semibold">{vehicle.specs.acceleration}</div>
                        <div className="text-xs text-white/50">0-60 mph</div>
                      </div>
                      <div>
                        <div className="text-primary-400 font-semibold">{vehicle.specs.topSpeed}</div>
                        <div className="text-xs text-white/50">Top Speed</div>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-white/50">Starting at</div>
                        <div className="text-2xl font-bold gradient-text">
                          ${vehicle.price.toLocaleString()}
                        </div>
                      </div>
                      <button className="p-3 bg-primary-600 hover:bg-primary-700 rounded-full transition-all group-hover:scale-110">
                        <ChevronRight size={20} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/vehicles" className="btn-primary inline-flex items-center">
            View Full Collection
            <ChevronRight className="ml-2" size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
