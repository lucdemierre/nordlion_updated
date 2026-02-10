import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NordLion | Curated Luxury Automotive Excellence',
  description: 'Discover the world\'s most exceptional luxury vehicles, hypercars, and private jets. NordLion curates an exclusive collection of automotive masterpieces for discerning collectors and enthusiasts.',
  keywords: [
    'luxury cars',
    'hypercars',
    'exotic vehicles',
    'private jets',
    'automotive excellence',
    'luxury automotive marketplace',
    'rare automobiles',
    'limited edition vehicles',
    'supercar collection',
    'luxury vehicle specialists',
    'NordLion',
  ],
  authors: [{ name: 'NordLion Automotive' }],
  creator: 'NordLion',
  publisher: 'NordLion Automotive',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nordlionauto.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NordLion | Curated Luxury Automotive Excellence',
    description: 'Experience unparalleled luxury and performance through our curated collection of the world\'s finest vehicles',
    url: 'https://nordlionauto.com',
    siteName: 'NordLion',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NordLion Luxury Automotive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NordLion | Curated Luxury Automotive Excellence',
    description: 'Experience unparalleled luxury and performance',
    images: ['/og-image.jpg'],
    creator: '@nordlionauto',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#D4AF37" />
      </head>
      <body className={`${inter.className} antialiased bg-[#050505] text-white`}>
        {children}
      </body>
    </html>
  )
}
