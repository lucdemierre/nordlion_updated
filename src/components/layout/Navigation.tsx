'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { colors, transitions } from '@/styles/design-tokens';

const menuItems = [
  {
    title: 'Collection',
    items: [
      { label: 'Watches', href: '/watches' },
      { label: 'Cars', href: '/cars' },
      { label: 'Private Jets', href: '/jets' },
      { label: 'Yachts', href: '/yachts' },
      { label: 'Estates', href: '/estates' },
    ],
  },
  {
    title: 'Services',
    items: [
      { label: 'Acquisition', href: '/services/acquisition' },
      { label: 'Resale & Consignment', href: '/services/resale-consignment' },
      { label: 'Authentication & Provenance', href: '/services/authentication-provenance' },
      { label: 'Valuation', href: '/services/valuation' },
      { label: 'Collateralisation', href: '/services/collateralisation' },
      { label: 'Vaulting & Logistics', href: '/services/vaulting-logistics' },
      { label: 'Aftercare & Servicing', href: '/services/aftercare-servicing' },
    ],
  },
  {
    title: 'About',
    items: [
      { label: 'Vision', href: '/about/vision' },
      { label: 'Services', href: '/about/services' },
      { label: 'Reserve Singapore', href: '/about/reserve-singapore' },
      { label: 'History', href: '/about/history' },
      { label: 'Foundation', href: '/about/foundation' },
      { label: 'Press', href: '/about/press' },
      { label: 'Careers', href: '/about/careers' },
    ],
  },
  {
    title: 'Client Care',
    items: [
      { label: 'Submit Asset', href: '/client-care/submit-asset' },
      { label: 'Schedule Appointment', href: '/client-care/schedule-appointment' },
      { label: 'Aftercare', href: '/client-care/aftercare' },
      { label: 'Warranty Claims', href: '/client-care/warranty-claims' },
      { label: 'Concierge Support', href: '/client-care/concierge-support' },
    ],
  },
  {
    title: 'More',
    items: [
      { label: 'Locations', href: '/locations' },
      { label: 'Journal', href: '/journal' },
      { label: 'Contact', href: '/contact' },
      { label: 'Private Desk', href: '/account' },
    ],
  },
];

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${colors.border}`,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            maxWidth: '1920px',
            margin: '0 auto',
            padding: '1rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: colors.white,
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              transition: transitions.base,
            }}
            aria-label="Toggle menu"
          >
            <span
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: colors.white,
                transition: transitions.base,
                transform: isMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
              }}
            />
            <span
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: colors.white,
                transition: transitions.base,
                opacity: isMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: colors.white,
                transition: transitions.base,
                transform: isMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
              }}
            />
          </button>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: colors.white,
                letterSpacing: '0.1em',
              }}
            >
              NORDLION
            </span>
          </Link>

          {/* Right Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link
              href="/locations"
              style={{
                color: colors.gray,
                transition: transitions.base,
                fontSize: '1.25rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.gray;
              }}
              aria-label="Locations"
            >
              📍
            </Link>
            <Link
              href="/contact"
              style={{
                color: colors.gray,
                transition: transitions.base,
                fontSize: '1.25rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.gray;
              }}
              aria-label="Contact"
            >
              ✉️
            </Link>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: colors.gray,
                fontSize: '1.25rem',
                cursor: 'pointer',
                transition: transitions.base,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.gray;
              }}
              aria-label="Search"
            >
              🔍
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Overlay Menu */}
      {isMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.black,
            zIndex: 999,
            overflow: 'auto',
            paddingTop: '5rem',
          }}
        >
          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '3rem',
            }}
          >
            {menuItems.map((section) => (
              <div key={section.title}>
                <h3
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: colors.gray,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '1.5rem',
                  }}
                >
                  {section.title}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {section.items.map((item) => (
                    <li key={item.href} style={{ marginBottom: '1rem' }}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: '500',
                          color: colors.lightGray,
                          textDecoration: 'none',
                          transition: transitions.base,
                          display: 'block',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = colors.white;
                          e.currentTarget.style.paddingLeft = '1rem';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = colors.lightGray;
                          e.currentTarget.style.paddingLeft = '0';
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
