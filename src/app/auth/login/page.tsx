'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { validateCredentials, setAuthToken } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const user = validateCredentials(formData.email, formData.password)

      if (user) {
        setAuthToken(user)
        // Redirect based on role
        if (user.role === 'admin') {
          router.push('/admin')
        } else if (user.role === 'broker') {
          router.push('/broker')
        } else {
          router.push('/client')
        }
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">NL</span>
            </div>
            <span className="text-2xl font-light text-white">NordLion</span>
          </Link>
          <h1 className="text-2xl font-light text-white mt-6 mb-2">Welcome</h1>
          <p className="text-white/50 text-sm font-light">Sign in to access your dashboard</p>
        </div>

        {/* Test Credentials */}
        <div className="bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-xl p-4 mb-6">
          <p className="text-[#22c55e] text-sm font-medium mb-3">Test Accounts:</p>
          <div className="space-y-2 text-xs text-white/70 font-light">
            <div>
              <p className="text-white/90 font-medium mb-1">Client Dashboard:</p>
              <p>client@nordlionauto.com / client123</p>
            </div>
            <div>
              <p className="text-white/90 font-medium mb-1">Broker Dashboard:</p>
              <p>broker@nordlionauto.com / broker123</p>
            </div>
            <div>
              <p className="text-white/90 font-medium mb-1">Admin Dashboard:</p>
              <p>admin@nordlionauto.com / admin123</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              <p className="text-red-400 text-sm font-light">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-light text-white/70 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#22c55e] transition-colors font-light"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-light text-white/70 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#22c55e] transition-colors pr-12 font-light"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
