'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { TrendingUp, Award, Users, Globe } from 'lucide-react'

const stats = [
  {
    icon: TrendingUp,
    value: 2500,
    suffix: '+',
    label: 'Vehicles Sold',
    description: 'Successfully delivered worldwide',
  },
  {
    icon: Award,
    value: 15,
    suffix: '+',
    label: 'Years Excellence',
    description: 'Industry-leading expertise',
  },
  {
    icon: Users,
    value: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Exceptional service ratings',
  },
  {
    icon: Globe,
    value: 45,
    suffix: '+',
    label: 'Countries Served',
    description: 'Global delivery network',
  },
]

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = target
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-dark-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500 via-transparent to-transparent"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="gradient-text">Proven</span>{' '}
            <span className="text-white">Excellence</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Numbers that speak to our commitment to automotive excellence and client satisfaction
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="mb-6">
                  <div className="inline-flex p-3 rounded-xl bg-primary-600/20 group-hover:bg-primary-600/30 transition-colors">
                    <Icon className="text-primary-400" size={32} />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </div>
                <p className="text-sm text-white/50">{stat.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
