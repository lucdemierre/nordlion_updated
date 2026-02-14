'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import Navigation from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ProductCard } from '@/components/ui/ProductCard'
import { Button } from '@/components/ui/Button'

export default function CarsPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [selectedCondition, setSelectedCondition] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  // Mock data - will be replaced with API call
  const cars = [
    {
      id: '1',
      category: 'cars',
      brand: 'Ferrari',
      model: 'SF90 Stradale',
      year: 2023,
      price: 625000,
      image: '/api/placeholder/800/600',
      condition: 'Unworn',
      featured: true,
    },
    {
      id: '2',
      category: 'cars',
      brand: 'Porsche',
      model: '911 GT3 RS',
      year: 2024,
      price: 285000,
      image: '/api/placeholder/800/600',
      condition: 'Excellent',
      featured: true,
    },
    {
      id: '3',
      category: 'cars',
      brand: 'McLaren',
      model: '765LT Spider',
      year: 2023,
      price: 485000,
      image: '/api/placeholder/800/600',
      condition: 'Like New',
    },
    {
      id: '4',
      category: 'cars',
      brand: 'Lamborghini',
      model: 'Revuelto',
      year: 2024,
      price: 725000,
      image: '/api/placeholder/800/600',
      condition: 'Unworn',
      featured: true,
    },
  ]

  const brands = ['Ferrari', 'Porsche', 'McLaren', 'Lamborghini', 'Bugatti', 'Koenigsegg', 'Pagani']
  const conditions = ['Unworn', 'Like New', 'Excellent', 'Very Good', 'Good']

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black" />
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center" />
        
        <div className="relative z-10 container-elita text-center">
          <div className="fade-in">
            <Link href="/" className="inline-block text-xs text-neutral-500 hover:text-[#ff6b35] mb-4 transition-colors">
              Home
            </Link>
            <h1 className="heading-1 mb-4">CARS</h1>
            <p className="body-lg max-w-2xl mx-auto">
              Exceptional exotic vehicles from the world's finest manufacturers
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="container-elita section-padding">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <SlidersHorizontal size={16} />
              <span className="text-sm font-light">Filters</span>
            </button>
            
            {(selectedBrand !== 'all' || selectedCondition !== 'all') && (
              <div className="flex items-center gap-2">
                {selectedBrand !== 'all' && (
                  <span className="px-3 py-1 bg-[#ff6b35]/20 text-[#ff6b35] text-xs flex items-center gap-2">
                    {selectedBrand}
                    <button onClick={() => setSelectedBrand('all')}>
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedCondition !== 'all' && (
                  <span className="px-3 py-1 bg-[#ff6b35]/20 text-[#ff6b35] text-xs flex items-center gap-2">
                    {selectedCondition}
                    <button onClick={() => setSelectedCondition('all')}>
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500 font-light">{cars.length} vehicles</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 text-sm font-light focus:outline-none focus:border-[#ff6b35]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <div className="space-y-8 sticky top-24">
                {/* Brand Filter */}
                <div>
                  <h3 className="text-sm font-light tracking-wider uppercase mb-4 text-neutral-400">Brand</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="brand"
                        value="all"
                        checked={selectedBrand === 'all'}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-4 h-4 accent-[#ff6b35]"
                      />
                      <span className="text-sm font-light group-hover:text-[#ff6b35] transition-colors">
                        All Brands
                      </span>
                    </label>
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="brand"
                          value={brand}
                          checked={selectedBrand === brand}
                          onChange={(e) => setSelectedBrand(e.target.value)}
                          className="w-4 h-4 accent-[#ff6b35]"
                        />
                        <span className="text-sm font-light group-hover:text-[#ff6b35] transition-colors">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Condition Filter */}
                <div>
                  <h3 className="text-sm font-light tracking-wider uppercase mb-4 text-neutral-400">Condition</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="condition"
                        value="all"
                        checked={selectedCondition === 'all'}
                        onChange={(e) => setSelectedCondition(e.target.value)}
                        className="w-4 h-4 accent-[#ff6b35]"
                      />
                      <span className="text-sm font-light group-hover:text-[#ff6b35] transition-colors">
                        All Conditions
                      </span>
                    </label>
                    {conditions.map((condition) => (
                      <label key={condition} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="condition"
                          value={condition}
                          checked={selectedCondition === condition}
                          onChange={(e) => setSelectedCondition(e.target.value)}
                          className="w-4 h-4 accent-[#ff6b35]"
                        />
                        <span className="text-sm font-light group-hover:text-[#ff6b35] transition-colors">
                          {condition}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <ProductCard key={car.id} {...car} />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <Button variant="secondary">
                Load More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-elita section-padding border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="heading-3">CAN'T FIND WHAT YOU'RE LOOKING FOR?</h2>
          <p className="body-md">
            Our acquisition team can source specific vehicles through our global network of dealerships, auction houses, and private collectors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/client-care/submit-asset">Submit Inquiry</Button>
            <Button href="/client-care/schedule-appointment" variant="secondary">
              Schedule Appointment
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
