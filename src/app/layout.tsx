import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NordLion | Luxury Automotive Excellence',
  description: 'Experience unparalleled luxury and performance with NordLion\'s curated collection of premium vehicles. Your journey to automotive excellence begins here.',
  keywords: 'luxury cars, premium vehicles, exotic cars, high-performance automobiles, NordLion',
  openGraph: {
    title: 'NordLion | Luxury Automotive Excellence',
    description: 'Experience unparalleled luxury and performance',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
