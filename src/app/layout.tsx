import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NORDLION | Ultra-Luxury Asset Brokerage',
  description: 'Premier brokerage for ultra-luxury assets: rare timepieces, exotic vehicles, private jets, superyachts, and exceptional estates.',
  keywords: 'luxury watches, exotic cars, private jets, yachts, estates, ultra-luxury assets, high-end brokerage',
  openGraph: {
    title: 'NORDLION | Ultra-Luxury Asset Brokerage',
    description: 'Premier brokerage for ultra-luxury assets: rare timepieces, exotic vehicles, private jets, superyachts, and exceptional estates.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NORDLION | Ultra-Luxury Asset Brokerage',
    description: 'Premier brokerage for ultra-luxury assets',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navigation />
        <main style={{ paddingTop: '72px', minHeight: '100vh' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
