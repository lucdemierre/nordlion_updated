'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

export default function WatchDetailPage() {
  const params = useParams()
  const [currentImage, setCurrentImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Mock data
  const watch = {
    id: params.id,
    brand: 'Patek Philippe',
    model: 'Nautilus 5711/1A',
    reference: '5711/1A-010',
    year: 2021,
    price: 185000,
    condition: 'Unworn',
    description: 'The legendary Patek Philippe Nautilus 5711/1A represents the pinnacle of luxury sports watchmaking. This final production year example features the iconic blue dial and integrated bracelet design that has made it one of the most sought-after timepieces in the world.',
    images: [
      '/api/placeholder/1200/900',
      '/api/placeholder/1200/900',
      '/api/placeholder/1200/900',
      '/api/placeholder/1200/900',
    ],
    specs: {
      'Reference': '5711/1A-010',
      'Movement': 'Caliber 26-330 S C',
      'Case Material': 'Stainless Steel',
      'Case Diameter': '40mm',
      'Water Resistance': '120m',
      'Power Reserve': '45 hours',
      'Functions': 'Hours, Minutes, Seconds, Date',
      'Bracelet': 'Integrated Stainless Steel',
    },
    provenance: {
      origin: 'Authorized Dealer',
      papers: 'Yes - Original',
      box: 'Yes - Complete Set',
      warranty: 'Active until 2023',
      service: 'Never serviced',
    },
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="container-elita pt-32 pb-16">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/watches" className="hover:text-[#ff6b35] transition-colors">Watches</Link>
          <span>/</span>
          <span className="text-white">{watch.brand}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] bg-white/5 overflow-hidden">
              <Image
                src={watch.images[currentImage]}
                alt={`${watch.brand} ${watch.model}`}
                fill
                className="object-cover"
              />
              
              {/* Navigation Arrows */}
              {watch.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage(prev => prev === 0 ? watch.images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 hover:bg-[#ff6b35] backdrop-blur-sm flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentImage(prev => prev === watch.images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 hover:bg-[#ff6b35] backdrop-blur-sm flex items-center justify-center transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {watch.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`relative aspect-square bg-white/5 overflow-hidden border-2 transition-all ${
                    currentImage === idx ? 'border-[#ff6b35]' : 'border-transparent hover:border-white/20'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`View ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#ff6b35]/20 text-[#ff6b35] text-xs font-light tracking-wider uppercase">
                  {watch.condition}
                </span>
                <span className="text-neutral-500 text-sm">Ref. {watch.reference}</span>
              </div>
              
              <h1 className="heading-3 mb-2">{watch.brand}</h1>
              <h2 className="text-2xl text-neutral-300 font-light mb-6">{watch.model}</h2>
              
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-light">{formatCurrency(watch.price)}</span>
                <span className="text-neutral-500 text-sm font-light">SGD</span>
              </div>

              <p className="body-md">{watch.description}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button className="flex-1" href="/client-care/submit-asset">
                SUBMIT INQUIRY
              </Button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 py-3 border transition-all ${
                  isWishlisted
                    ? 'border-[#ff6b35] bg-[#ff6b35]/20'
                    : 'border-white/20 hover:border-[#ff6b35] hover:bg-white/5'
                }`}
              >
                <Heart className={isWishlisted ? 'fill-[#ff6b35] text-[#ff6b35]' : ''} size={20} />
              </button>
              <button className="px-6 py-3 border border-white/20 hover:border-[#ff6b35] hover:bg-white/5 transition-all">
                <Share2 size={20} />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <Button variant="secondary" href="/client-care/schedule-appointment">
                SCHEDULE VIEWING
              </Button>
              <Button variant="secondary" href="/account/vault">
                ADD TO VAULT
              </Button>
            </div>

            {/* Specifications */}
            <div className="pt-8 border-t border-white/10">
              <h3 className="text-sm font-light tracking-wider uppercase mb-6 text-neutral-400">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(watch.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-neutral-500 font-light">{key}</span>
                    <span className="text-sm font-light">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Provenance */}
            <div className="pt-8 border-t border-white/10">
              <h3 className="text-sm font-light tracking-wider uppercase mb-6 text-neutral-400">Provenance</h3>
              <div className="space-y-3">
                {Object.entries(watch.provenance).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sm text-neutral-500 font-light capitalize">{key}</span>
                    <span className="text-sm font-light">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
