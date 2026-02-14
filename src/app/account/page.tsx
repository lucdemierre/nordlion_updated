'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Shield, 
  Calendar, 
  Settings, 
  LogOut,
  Search,
  Bell,
  ChevronRight,
  Upload,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function AccountPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Mock user data
  const user = {
    name: 'MEMBER',
    initial: 'M',
    tier: 'TIER I',
    clearance: 15,
    status: 'IDENTITY PENDING'
  }

  // Navigation items
  const navigation = [
    { icon: LayoutDashboard, label: 'Overview', href: '/account', active: true },
    { icon: Briefcase, label: 'Collection', href: '/account/collection', count: 0 },
    { icon: FileText, label: 'Requests', href: '/account/requests', count: 3 },
    { icon: Shield, label: 'Verification', href: '/account/verification' },
    { icon: Calendar, label: 'Appointments', href: '/account/appointments' },
    { icon: FileText, label: 'Documents', href: '/account/documents' },
    { icon: Settings, label: 'Settings', href: '/account/settings' }
  ]

  // Quick actions
  const quickActions = [
    { icon: Search, label: 'SOURCE', description: 'Find specific asset', href: '/account/source' },
    { icon: Upload, label: 'SELL', description: 'Submit for placement', href: '/account/sell' },
    { icon: TrendingUp, label: 'APPRAISE', description: 'Market valuation', href: '/account/appraise' },
    { icon: Calendar, label: 'BOOK', description: 'Schedule viewing', href: '/account/book' },
    { icon: Upload, label: 'UPLOAD', description: 'Add documentation', href: '/account/upload' },
    { icon: Shield, label: 'VERIFY', description: 'Authentication request', href: '/account/verify' }
  ]

  // Active mandates
  const activeMandates = [
    {
      id: 'M-2026-0142',
      asset: 'Patek Philippe Nautilus 5711',
      type: 'ACQUISITION',
      status: 'SOURCING',
      progress: 35,
      updated: '2 hours ago'
    },
    {
      id: 'M-2026-0098',
      asset: 'McLaren 765LT Spider',
      type: 'VERIFICATION',
      status: 'IN PROGRESS',
      progress: 60,
      updated: '1 day ago'
    }
  ]

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-[var(--color-bg-primary)]/95 backdrop-blur-xl border-b border-[var(--color-border-primary)]">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-light tracking-wider hover:text-[var(--color-accent-primary)] transition-colors">
              NORDLION
            </Link>
            <div className="hidden lg:flex items-center gap-2 text-sm text-[var(--color-text-tertiary)]">
              <span>ACCOUNT</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Search */}
            <button className="text-[var(--color-text-secondary)] hover:text-white transition-colors">
              <Search size={18} />
            </button>

            {/* Notifications */}
            <button className="relative text-[var(--color-text-secondary)] hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-accent-primary)] rounded-full" />
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--color-accent-primary)] rounded-full flex items-center justify-center text-black text-sm font-medium">
                {user.initial}
              </div>
              <div className="hidden md:block text-sm">
                <div className="text-white">{user.name}</div>
                <div className="text-[var(--color-text-tertiary)] text-xs">{user.tier}</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-16 bottom-0 z-40 border-r border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}>
          <div className="flex flex-col h-full">
            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1">
              {navigation.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)]'
                        : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    <Icon size={18} />
                    {!sidebarCollapsed && (
                      <>
                        <span className="text-sm font-medium flex-1">{item.label}</span>
                        {item.count !== undefined && (
                          <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full">
                            {item.count}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Logout */}
            <div className="p-3 border-t border-[var(--color-border-primary)]">
              <button className="flex items-center gap-3 px-3 py-2.5 w-full text-[var(--color-text-secondary)] hover:text-white hover:bg-white/[0.03] rounded-lg transition-colors">
                <LogOut size={18} />
                {!sidebarCollapsed && <span className="text-sm font-medium">Sign Out</span>}
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}>
          <div className="max-w-[1400px] mx-auto p-6 lg:p-8 space-y-8">
            {/* Welcome Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-light tracking-tight">GOOD AFTERNOON</h1>
                  <p className="text-[var(--color-text-secondary)] mt-1">Saturday, Feb 14</p>
                </div>
              </div>
            </div>

            {/* Clearance Status */}
            <div className="card-elevated p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h4 className="text-label mb-2">CLEARANCE</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-light">{user.tier}</span>
                    <span className="badge bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {user.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-light mb-1">{user.clearance}%</div>
                  <p className="text-xs text-[var(--color-text-tertiary)]">COVERAGE</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--color-accent-primary)] to-amber-500 rounded-full"
                  style={{ width: `${user.clearance}%` }}
                />
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-[var(--color-text-secondary)]">Unlock Basic Services at 30%</span>
                <Link href="/account/verification" className="text-[var(--color-accent-primary)] hover:underline flex items-center gap-1">
                  START • IDENTITY
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div>
              <h2 className="text-xl font-light mb-4">QUICK ACTIONS</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={index}
                      href={action.href}
                      className="card-elevated p-4 hover:border-[var(--color-border-accent)] transition-all group"
                    >
                      <Icon size={20} className="text-[var(--color-accent-primary)] mb-3" />
                      <div className="text-sm font-medium mb-1 group-hover:text-[var(--color-accent-primary)] transition-colors">
                        {action.label}
                      </div>
                      <div className="text-xs text-[var(--color-text-tertiary)]">
                        {action.description}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Active Mandates */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-light">ACTIVE MANDATES</h2>
                  <Link href="/account/requests" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors flex items-center gap-1">
                    VIEW ALL
                    <ChevronRight size={14} />
                  </Link>
                </div>

                {activeMandates.length > 0 ? (
                  <div className="space-y-3">
                    {activeMandates.map((mandate, index) => (
                      <div key={index} className="card-elevated p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs text-[var(--color-text-tertiary)]">{mandate.id}</span>
                              <span className="badge badge-available text-xs">{mandate.status}</span>
                            </div>
                            <h3 className="text-lg font-medium mb-1">{mandate.asset}</h3>
                            <p className="text-sm text-[var(--color-text-secondary)]">{mandate.type}</p>
                          </div>
                          <Clock size={16} className="text-[var(--color-text-tertiary)]" />
                        </div>
                        
                        {/* Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-[var(--color-text-tertiary)]">
                            <span>Progress</span>
                            <span>{mandate.progress}%</span>
                          </div>
                          <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="absolute inset-y-0 left-0 bg-[var(--color-accent-primary)] rounded-full"
                              style={{ width: `${mandate.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-[var(--color-text-tertiary)]">Updated {mandate.updated}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="card-elevated p-8 text-center">
                    <AlertCircle size={32} className="mx-auto mb-3 text-[var(--color-text-tertiary)]" />
                    <p className="text-[var(--color-text-secondary)] mb-4">No active mandates</p>
                    <Link href="/account/source" className="btn-primary text-sm">
                      START NEW REQUEST
                    </Link>
                  </div>
                )}
              </div>

              {/* Sidebar Widgets */}
              <div className="space-y-6">
                {/* Documents */}
                <div className="card-elevated p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">MY DOCUMENTS</h3>
                    <Link href="/account/documents" className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-primary)] transition-colors">
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                  <div className="space-y-3">
                    <Link href="/account/documents?filter=invoices" className="flex items-center justify-between p-3 bg-white/[0.02] hover:bg-white/[0.04] rounded-lg transition-colors">
                      <span className="text-sm text-[var(--color-text-secondary)]">Invoices</span>
                      <span className="text-xs text-[var(--color-text-tertiary)]">0</span>
                    </Link>
                    <Link href="/account/documents?filter=certificates" className="flex items-center justify-between p-3 bg-white/[0.02] hover:bg-white/[0.04] rounded-lg transition-colors">
                      <span className="text-sm text-[var(--color-text-secondary)]">Certificates</span>
                      <span className="text-xs text-[var(--color-text-tertiary)]">0</span>
                    </Link>
                    <Link href="/account/documents?filter=provenance" className="flex items-center justify-between p-3 bg-white/[0.02] hover:bg-white/[0.04] rounded-lg transition-colors">
                      <span className="text-sm text-[var(--color-text-secondary)]">Provenance</span>
                      <span className="text-xs text-[var(--color-text-tertiary)]">0</span>
                    </Link>
                  </div>
                  <button className="w-full mt-4 btn-secondary text-sm py-2">
                    <Upload size={14} />
                    UPLOAD DOCUMENT
                  </button>
                </div>

                {/* Concierge */}
                <div className="card-elevated p-5">
                  <h3 className="text-sm font-medium mb-4">CONCIERGE</h3>
                  <div className="space-y-3">
                    <div className="text-xs text-[var(--color-text-tertiary)] mb-3">
                      YOUR RELATIONSHIP MANAGER<br />
                      <span className="text-[var(--color-text-secondary)]">Not yet assigned</span>
                    </div>
                    <button className="w-full btn-secondary text-sm py-2">
                      <MessageSquare size={14} />
                      MESSAGE
                    </button>
                    <button className="w-full btn-secondary text-sm py-2">
                      <Calendar size={14} />
                      BOOK APPOINTMENT
                    </button>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[var(--color-border-primary)] text-xs text-[var(--color-text-tertiary)]">
                    <div className="mb-1">GLOBAL COVERAGE • 24/7</div>
                    <div>Priority response within 4 hours</div>
                  </div>
                </div>

                {/* Market Intel */}
                <div className="card-elevated p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">MARKET INTEL</h3>
                    <TrendingUp size={16} className="text-[var(--color-text-tertiary)]" />
                  </div>
                  <div className="text-center py-6">
                    <div className="text-3xl font-light mb-2">$0</div>
                    <p className="text-xs text-[var(--color-text-tertiary)] mb-4">PORTFOLIO VALUE</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">Add assets to see market insights</p>
                  </div>
                  <Link href="/collection" className="btn-secondary text-sm py-2 w-full">
                    BROWSE CATALOGUE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
