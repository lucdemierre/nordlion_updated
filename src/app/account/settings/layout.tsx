'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Shield, Bell, Lock, CreditCard, Sliders } from 'lucide-react';

const settingsSections = [
  { name: 'Profile', path: '/account/settings/profile', icon: User },
  { name: 'Security', path: '/account/settings/security', icon: Shield },
  { name: 'Notifications', path: '/account/settings/notifications', icon: Bell },
  { name: 'Privacy', path: '/account/settings/privacy', icon: Lock },
  { name: 'Billing', path: '/account/settings/billing', icon: CreditCard },
  { name: 'Preferences', path: '/account/settings/preferences', icon: Sliders },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-neutral-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-light tracking-tight mb-2">SETTINGS</h1>
          <p className="text-neutral-400 text-sm">Manage your account preferences and security</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <nav className="lg:col-span-1">
            <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-2 sticky top-32">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                const isActive = pathname === section.path;
                return (
                  <Link
                    key={section.path}
                    href={section.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                      isActive
                        ? 'bg-neutral-800 text-white'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{section.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Content */}
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
