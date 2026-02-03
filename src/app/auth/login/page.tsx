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
    remember: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      const user = validateCredentials(formData.email, formData.password)

      if (user) {
        setAuthToken(user)
        router.push('/dashboard')
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
            <div className="w-12 h-12 bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">NL</span>
            </div>
            <span className="text-2xl font-bold text-white">NordLion</span>
          </Link>
          <h1 className="text-2xl font-light text-white mt-6 mb-2">Welcome back</h1>
          <p className="text-white/50 text-sm font-light">Sign in to your account</p>
        </div>

        {/* Test Credentials Info */}
        <div className="bg-[#D67C3C]/10 border border-[#D67C3C]/20 rounded-xl p-4 mb-6">
          <p className="text-[#D67C3C] text-sm font-medium mb-2">Test Credentials:</p>
          <div className="space-y-1 text-xs text-white/70 font-light">
            <p>Admin: admin@nordlionauto.com / admin123</p>
            <p>User: test@nordlionauto.com / test123</p>
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
            <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] transition-colors pr-12"
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

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.remember}
                onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                className="w-4 h-4 rounded border-white/20 bg-[#1a1a1a] text-[#D67C3C] focus:ring-[#D67C3C] focus:ring-offset-0"
              />
              <span className="text-sm text-white/60 font-light">Remember me</span>
            </label>
            <Link href="/auth/forgot-password" className="text-sm text-[#D67C3C] hover:text-[#B85A1F] transition-colors font-light">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

        {/* Register Link */}
        <p className="text-center text-sm text-white/60 font-light mt-6">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-[#D67C3C] hover:text-[#B85A1F] transition-colors font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
