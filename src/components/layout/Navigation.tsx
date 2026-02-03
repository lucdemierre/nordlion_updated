'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, User, ShoppingCart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Inventory', href: '/inventory' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => pathname === href

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#32b8c6] to-[#1a6873] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">NL</span>
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-[#32b8c6] transition-colors">
                NORDLION
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all relative ${
                    isActive(item.href)
                      ? 'text-[#32b8c6] bg-[#32b8c6]/10'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <User size={20} />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/cart" 
              className="p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all relative"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#32b8c6] text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive(item.href)
                      ? 'text-[#32b8c6] bg-[#32b8c6]/10'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-3 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white text-center rounded-lg font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
