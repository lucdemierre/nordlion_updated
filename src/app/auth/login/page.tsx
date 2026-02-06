'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth'
import Link from 'next/link'
import { Mail, Lock, AlertCircle } from 'lucide-react'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = login(email, password)
      
      if (user) {
        // Redirect based on role
        const dashboardPath = `/${user.role}`
        router.push(dashboardPath)
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-white mb-2">NordLion Auto</h1>
          <p className="text-sm text-white/50 font-light">Luxury Vehicle Platform</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#141414] border border-white/5 rounded-xl p-8">
          <h2 className="text-xl font-light text-white mb-6">Welcome Back</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 font-light mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/70 font-light mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Test Accounts */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-xs text-white/40 font-light mb-3">Test Accounts:</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2 bg-[#0a0a0a] rounded">
                <span className="text-white/50">Client:</span>
                <span className="text-white/70 font-mono">client@nordlionauto.com / client123</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-[#0a0a0a] rounded">
                <span className="text-white/50">Broker:</span>
                <span className="text-white/70 font-mono">broker@nordlionauto.com / broker123</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-[#0a0a0a] rounded">
                <span className="text-white/50">Admin:</span>
                <span className="text-white/70 font-mono">admin@nordlionauto.com / admin123</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-white/40 font-light mt-6">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-[#D67C3C] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
