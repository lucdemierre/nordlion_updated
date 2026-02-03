import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NordLion | Curated Luxury Automotive Excellence',
  description: 'NordLion curates the world\'s most exceptional hypercars, luxury vehicles, and private jets. Experience unparalleled automotive excellence through our exclusive collection.',
  keywords: 'luxury hypercars, exotic vehicles, private jets, automotive excellence, limited edition cars, Koenigsegg, rare automobiles, NordLion',
  openGraph: {
    title: 'NordLion | Curated Luxury Automotive Excellence',
    description: 'Experience unparalleled luxury and performance through our curated collection',
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
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-dark-900`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
