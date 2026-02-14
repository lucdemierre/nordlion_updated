'use client';

import React from 'react';
import Link from 'next/link';
import { colors } from '@/styles/design-tokens';
import { Button } from '@/components/ui/Button';

const footerLinks = {
  collection: [
    { label: 'Watches', href: '/watches' },
    { label: 'Cars', href: '/cars' },
    { label: 'Private Jets', href: '/jets' },
    { label: 'Yachts', href: '/yachts' },
    { label: 'Estates', href: '/estates' },
  ],
  services: [
    { label: 'Acquisition', href: '/services/acquisition' },
    { label: 'Resale & Consignment', href: '/services/resale-consignment' },
    { label: 'Authentication', href: '/services/authentication-provenance' },
    { label: 'Valuation', href: '/services/valuation' },
    { label: 'Collateralisation', href: '/services/collateralisation' },
    { label: 'Vaulting & Logistics', href: '/services/vaulting-logistics' },
    { label: 'Aftercare & Servicing', href: '/services/aftercare-servicing' },
  ],
  about: [
    { label: 'Vision', href: '/about/vision' },
    { label: 'Services', href: '/about/services' },
    { label: 'Reserve Singapore', href: '/about/reserve-singapore' },
    { label: 'History', href: '/about/history' },
    { label: 'Foundation', href: '/about/foundation' },
    { label: 'Press', href: '/about/press' },
    { label: 'Careers', href: '/about/careers' },
  ],
  clientCare: [
    { label: 'Submit Asset', href: '/client-care/submit-asset' },
    { label: 'Schedule Appointment', href: '/client-care/schedule-appointment' },
    { label: 'Aftercare', href: '/client-care/aftercare' },
    { label: 'Warranty Claims', href: '/client-care/warranty-claims' },
    { label: 'Concierge Support', href: '/client-care/concierge-support' },
  ],
  resources: [
    { label: 'Locations', href: '/locations' },
    { label: 'Journal', href: '/journal' },
    { label: 'Contact', href: '/contact' },
    { label: 'Private Desk', href: '/dashboard' },
    { label: 'Investors', href: '/investors/overview' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Compliance', href: '/legal/compliance' },
    { label: 'Disclaimer', href: '/legal/disclaimer' },
    { label: 'FAQ', href: '/legal/faq' },
  ],
};

export const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      style={{
        backgroundColor: colors.black,
        borderTop: `1px solid ${colors.border}`,
        padding: '4rem 2rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1920px', margin: '0 auto' }}>
        {/* Newsletter Section */}
        <div
          style={{
            marginBottom: '4rem',
            paddingBottom: '4rem',
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <h3
            style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: colors.white,
              marginBottom: '1rem',
            }}
          >
            Stay Connected
          </h3>
          <p
            style={{
              fontSize: '1rem',
              color: colors.gray,
              marginBottom: '1.5rem',
            }}
          >
            Subscribe to receive updates on new acquisitions and exclusive offerings.
          </p>
          <form
            style={{
              display: 'flex',
              gap: '1rem',
              maxWidth: '600px',
              flexWrap: 'wrap',
            }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                minWidth: '250px',
                padding: '0.75rem 1rem',
                backgroundColor: colors.darkerGray,
                border: `1px solid ${colors.border}`,
                borderRadius: '0.25rem',
                color: colors.white,
                fontSize: '1rem',
              }}
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>

        {/* Links Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: colors.gray,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              Collection
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.collection.map((link) => (
                <li key={link.href} style={{ marginBottom: '0.75rem' }}>
                  <Link
                    href={link.href}
                    style={{
                      color: colors.lightGray,
                      textDecoration: 'none',
                      fontSize: '0.9375rem',
                      transition: '200ms',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.lightGray;
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: colors.gray,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.services.map((link) => (
                <li key={link.href} style={{ marginBottom: '0.75rem' }}>
                  <Link
                    href={link.href}
                    style={{
                      color: colors.lightGray,
                      textDecoration: 'none',
                      fontSize: '0.9375rem',
                      transition: '200ms',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.lightGray;
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: colors.gray,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              About
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.about.map((link) => (
                <li key={link.href} style={{ marginBottom: '0.75rem' }}>
                  <Link
                    href={link.href}
                    style={{
                      color: colors.lightGray,
                      textDecoration: 'none',
                      fontSize: '0.9375rem',
                      transition: '200ms',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.lightGray;
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: colors.gray,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              Client Care
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.clientCare.map((link) => (
                <li key={link.href} style={{ marginBottom: '0.75rem' }}>
                  <Link
                    href={link.href}
                    style={{
                      color: colors.lightGray,
                      textDecoration: 'none',
                      fontSize: '0.9375rem',
                      transition: '200ms',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.lightGray;
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: colors.gray,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              Resources
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.resources.map((link) => (
                <li key={link.href} style={{ marginBottom: '0.75rem' }}>
                  <Link
                    href={link.href}
                    style={{
                      color: colors.lightGray,
                      textDecoration: 'none',
                      fontSize: '0.9375rem',
                      transition: '200ms',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.lightGray;
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: colors.gray,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}
            >
              Legal
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.legal.map((link) => (
                <li key={link.href} style={{ marginBottom: '0.75rem' }}>
                  <Link
                    href={link.href}
                    style={{
                      color: colors.lightGray,
                      textDecoration: 'none',
                      fontSize: '0.9375rem',
                      transition: '200ms',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.lightGray;
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '2rem',
            borderTop: `1px solid ${colors.border}`,
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.875rem', color: colors.gray }}>
            © {currentYear || '2026'} NORDLION. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link
              href="#"
              style={{ color: colors.gray, transition: '200ms' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.gray;
              }}
              aria-label="Instagram"
            >
              Instagram
            </Link>
            <Link
              href="#"
              style={{ color: colors.gray, transition: '200ms' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.gray;
              }}
              aria-label="LinkedIn"
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              style={{ color: colors.gray, transition: '200ms' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.gray;
              }}
              aria-label="Twitter"
            >
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
