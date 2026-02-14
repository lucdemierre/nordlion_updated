'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'

interface ProductCardProps {
  id: string
  category: string
  brand: string
  model: string
  year?: number
  price: number
  image: string
  condition?: string
  featured?: boolean
}

export function ProductCard({
  id,
  category,
  brand,
  model,
  year,
  price,
  image,
  condition,
  featured,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const href = `/${category}/${id}`

  return (
    <div className="group relative">
      <Link href={href} className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/3] bg-white/5 overflow-hidden mb-4">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-shimmer" />
          )}
          <Image
            src={image}
            alt={`${brand} ${model}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {featured && (
              <span className="px-3 py-1 bg-[#ff6b35] text-white text-xs font-light tracking-wider uppercase">
                Featured
              </span>
            )}
            {condition && (
              <span className="px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-light tracking-wider uppercase">
                {condition}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsWishlisted(!isWishlisted)
            }}
            className="absolute top-4 right-4 w-10 h-10 bg-black/80 backdrop-blur-sm flex items-center justify-center hover:bg-[#ff6b35] transition-colors group/btn"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isWishlisted
                  ? 'fill-white text-white'
                  : 'text-white group-hover/btn:text-white'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-light text-white group-hover:text-[#ff6b35] transition-colors truncate">
                {brand}
              </h3>
              <p className="text-sm text-neutral-400 font-light truncate">
                {model} {year && `(${year})`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-xl font-light text-white">
              {formatCurrency(price)}
            </span>
            <span className="text-xs text-neutral-500 font-light tracking-wider uppercase">
              {category}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
