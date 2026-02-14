'use client'

import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/ui/ProductCard'

export default function AccountOverviewPage() {
  // Mock data
  const vaultAssets = [
    {
      id: '1',
      category: 'watches',
      brand: 'Patek Philippe',
      model: 'Nautilus 5711/1A',
      year: 2021,
      price: 185000,
      image: '/api/placeholder/800/600',
      condition: 'Unworn',
    },
    {
      id: '2',
      category: 'cars',
      brand: 'Ferrari',
      model: '812 Competizione',
      year: 2023,
      price: 850000,
      image: '/api/placeholder/800/600',
      condition: 'Like New',
    },
  ]

  const recentActivity = [
    { date: 'Feb 14, 2026', action: 'Inquiry submitted', item: 'Rolex Daytona 116500LN' },
    { date: 'Feb 12, 2026', action: 'Appointment scheduled', item: 'Viewing at Singapore Reserve' },
    { date: 'Feb 10, 2026', action: 'Asset added to vault', item: 'Patek Philippe Nautilus' },
  ]

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="border-b border-white/10">
          <div className="container-elita py-8">
            <h1 className="heading-3 mb-2">Welcome Back</h1>
            <p className="text-neutral-400 font-light">Manage your private desk</p>
          </div>
        </div>

        <div className="container-elita py-12">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <Link
              href="/client-care/submit-asset"
              className="card-elita card-hover p-6 text-center group"
            >
              <Plus className="w-6 h-6 mx-auto mb-3 text-[#ff6b35] group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-light tracking-wide">SUBMIT ASSET</h3>
            </Link>
            <Link
              href="/client-care/schedule-appointment"
              className="card-elita card-hover p-6 text-center group"
            >
              <Plus className="w-6 h-6 mx-auto mb-3 text-[#ff6b35] group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-light tracking-wide">SCHEDULE APPOINTMENT</h3>
            </Link>
            <Link
              href="/account/finance"
              className="card-elita card-hover p-6 text-center group"
            >
              <Plus className="w-6 h-6 mx-auto mb-3 text-[#ff6b35] group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-light tracking-wide">REQUEST COLLATERAL</h3>
            </Link>
            <Link
              href="/watches"
              className="card-elita card-hover p-6 text-center group"
            >
              <Plus className="w-6 h-6 mx-auto mb-3 text-[#ff6b35] group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-light tracking-wide">BROWSE COLLECTION</h3>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Vault Assets */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-light">Your Vault</h2>
                  <Link
                    href="/account/vault"
                    className="text-sm text-[#ff6b35] hover:text-[#ff6b35]/80 flex items-center gap-2 transition-colors"
                  >
                    View All
                    <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {vaultAssets.map((asset) => (
                    <ProductCard key={asset.id} {...asset} />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-2xl font-light mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => (
                    <div
                      key={idx}
                      className="card-elita p-4 flex items-start justify-between gap-4"
                    >
                      <div>
                        <p className="text-sm font-light mb-1">{activity.action}</p>
                        <p className="text-xs text-neutral-500">{activity.item}</p>
                      </div>
                      <span className="text-xs text-neutral-500 whitespace-nowrap">
                        {activity.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Portfolio Value */}
              <div className="card-elita p-6">
                <h3 className="text-sm text-neutral-500 mb-2 font-light tracking-wide uppercase">Portfolio Value</h3>
                <p className="text-3xl font-light mb-6">$1,035,000</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Watches</span>
                    <span className="font-light">$185,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Cars</span>
                    <span className="font-light">$850,000</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card-elita p-4">
                  <p className="text-2xl font-light mb-1">3</p>
                  <p className="text-xs text-neutral-500 font-light">Active Inquiries</p>
                </div>
                <div className="card-elita p-4">
                  <p className="text-2xl font-light mb-1">2</p>
                  <p className="text-xs text-neutral-500 font-light">Appointments</p>
                </div>
              </div>

              {/* CTA */}
              <div className="card-elita p-6 bg-[#ff6b35]/5 border-[#ff6b35]/20">
                <h3 className="font-light mb-2">Need Assistance?</h3>
                <p className="text-sm text-neutral-400 mb-4 font-light">
                  Our concierge team is available 24/7
                </p>
                <Button variant="secondary" className="w-full">
                  Contact Concierge
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
