import Hero from '@/components/home/Hero'
import FeaturedVehicles from '@/components/home/FeaturedVehicles'
import Features from '@/components/home/Features'
import Stats from '@/components/home/Stats'
import Testimonials from '@/components/home/Testimonials'
import CTA from '@/components/home/CTA'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-dark-50 via-dark-100 to-dark-50">
      <Navigation />
      <Hero />
      <Stats />
      <FeaturedVehicles />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
