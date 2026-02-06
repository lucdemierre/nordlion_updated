'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { login } from '@/lib/auth'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = login(email, password)
    
    if (result.success) {
      // Show success animation
      await new Promise(resolve => setTimeout(resolve, 800))
      
      if (result.user?.role === 'client') {
        router.push('/client')
      } else if (result.user?.role === 'broker') {
        router.push('/broker')
      } else if (result.user?.role === 'admin') {
        router.push('/admin')
      }
    } else {
      setError(result.message || 'Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#D67C3C]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#B85A1F]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#D67C3C]/3 to-transparent rounded-full blur-2xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] mb-4 shadow-lg shadow-[#D67C3C]/20 animate-scale-in">
            <Sparkles size={32} className="text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-light text-white mb-2 tracking-tight">NordLion Auto</h1>
          <p className="text-white/40 text-sm font-light">Luxury Vehicle Specialists</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl animate-fade-in-up">
          <div className="mb-6">
            <h2 className="text-2xl font-light text-white mb-2">Welcome back</h2>
            <p className="text-white/50 text-sm font-light">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-shake">
              <p className="text-red-400 text-sm font-light">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="group">
              <label className="block text-sm text-white/60 mb-2 font-light transition-colors group-focus-within:text-[#D67C3C]">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-[#D67C3C]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#141414]/80 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] focus:ring-2 focus:ring-[#D67C3C]/20 transition-all font-light"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <label className="block text-sm text-white/60 mb-2 font-light transition-colors group-focus-within:text-[#D67C3C]">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-[#D67C3C]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-[#141414]/80 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] focus:ring-2 focus:ring-[#D67C3C]/20 transition-all font-light"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-[#141414] text-[#D67C3C] focus:ring-[#D67C3C] focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-white/50 font-light group-hover:text-white/70 transition-colors">Remember me</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-[#D67C3C] hover:text-[#B85A1F] font-light transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#D67C3C] to-[#B85A1F] hover:from-[#B85A1F] hover:to-[#D67C3C] text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#D67C3C]/20 hover:shadow-xl hover:shadow-[#D67C3C]/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 text-white/30 bg-[#0a0a0a]/60 font-light">or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-white/50 font-light">
              Don't have an account?{' '}
              <Link
                href="/auth/register"
                className="text-[#D67C3C] hover:text-[#B85A1F] font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Test Accounts */}
        <div className="mt-6 p-4 bg-[#0a0a0a]/40 backdrop-blur-sm border border-white/5 rounded-xl animate-fade-in">
          <p className="text-xs text-white/30 font-light mb-3">Test Accounts:</p>
          <div className="space-y-2 text-xs text-white/40 font-light font-mono">
            <div>Client: client@nordlionauto.com / client123</div>
            <div>Broker: broker@nordlionauto.com / broker123</div>
            <div>Admin: admin@nordlionauto.com / admin123</div>
          </div>
        </div>
      </div>
    </div>
  )
}
