'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/story' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  services: [
    { label: 'Buy Vehicle', href: '/vehicles' },
    { label: 'Sell Vehicle', href: '/sell' },
    { label: 'Financing', href: '/financing' },
    { label: 'Trade-In', href: '/trade-in' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-100 border-t border-white/10">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-3xl font-display font-bold gradient-text mb-4 block">
              NORDLION
            </Link>
            <p className="text-white/60 mb-6 leading-relaxed">
              Elevating the luxury automotive experience with unparalleled service and
              an exclusive collection of the world's finest vehicles.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 glass-effect rounded-lg hover:bg-primary-600/20 transition-colors group"
                    aria-label={social.label}
                  >
                    <Icon size={20} className="text-white/60 group-hover:text-primary-400 transition-colors" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-white/10">
          <div className="flex items-start space-x-3">
            <MapPin size={20} className="text-primary-400 mt-1" />
            <div>
              <div className="text-white font-medium mb-1">Visit Us</div>
              <p className="text-white/60 text-sm">
                123 Luxury Lane, Mayfair<br />
                London, W1K 5AB, UK
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Phone size={20} className="text-primary-400 mt-1" />
            <div>
              <div className="text-white font-medium mb-1">Call Us</div>
              <p className="text-white/60 text-sm">
                +44 (0) 20 1234 5678<br />
                Mon-Sat, 9AM-6PM GMT
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Mail size={20} className="text-primary-400 mt-1" />
            <div>
              <div className="text-white font-medium mb-1">Email Us</div>
              <p className="text-white/60 text-sm">
                info@nordlionauto.com<br />
                support@nordlionauto.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 text-center text-white/50 text-sm">
          <p>
            © {new Date().getFullYear()} NordLion International. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
