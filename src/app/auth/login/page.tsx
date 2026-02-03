'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validation
    const newErrors: { email?: string; password?: string } = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">NL</span>
            </div>
            <span className="text-2xl font-semibold text-white">NordLion</span>
          </Link>
          <h1 className="text-3xl font-semibold text-white mb-2">Welcome Back</h1>
          <p className="text-white/50 font-light">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <div className="bg-[#141414] rounded-2xl border border-white/5 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-white/70 text-sm font-normal mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border rounded-xl text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                    errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#D67C3C]'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-2 font-light">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/70 text-sm font-normal mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-12 pr-12 py-3 bg-[#0a0a0a] border rounded-xl text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                    errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#D67C3C]'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-2 font-light">{errors.password}</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-[#0a0a0a] text-[#D67C3C] focus:ring-[#D67C3C]" />
                <span className="text-sm text-white/60 font-light">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-[#D67C3C] hover:text-[#B85A1F] transition-colors font-normal">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-xl font-normal transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#141414] px-4 text-white/40 font-light">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="py-3 px-4 bg-[#0a0a0a] hover:bg-white/5 border border-white/10 rounded-xl text-white font-normal text-sm transition-colors">
              Google
            </button>
            <button className="py-3 px-4 bg-[#0a0a0a] hover:bg-white/5 border border-white/10 rounded-xl text-white font-normal text-sm transition-colors">
              Apple
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-white/50 text-sm font-light">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-[#D67C3C] hover:text-[#B85A1F] transition-colors font-normal">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  )
}
