import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collection • NordLion',
  description: 'Curated passion assets across watches, cars, jets, yachts, and estates',
}

export default function CollectionLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
