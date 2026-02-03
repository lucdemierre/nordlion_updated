'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validatePhone = (phone: string) => {
    const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    return regex.test(phone)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newErrors: Record<string, string> = {}

    // Validation
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must include uppercase, lowercase, and number'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
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
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">NL</span>
            </div>
            <span className="text-2xl font-semibold text-white">NordLion</span>
          </Link>
          <h1 className="text-3xl font-semibold text-white mb-2">Create Account</h1>
          <p className="text-white/50 font-light">Join NordLion's exclusive community</p>
        </div>

        {/* Form */}
        <div className="bg-[#141414] rounded-2xl border border-white/5 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm font-normal mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={`w-full px-4 py-3 bg-[#0a0a0a] border rounded-xl text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                    errors.firstName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#D67C3C]'
                  }`}
                  placeholder="John"
                />
                {errors.firstName && <p className="text-red-400 text-xs mt-1 font-light">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-white/70 text-sm font-normal mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className={`w-full px-4 py-3 bg-[#0a0a0a] border rounded-xl text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                    errors.lastName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#D67C3C]'
                  }`}
                  placeholder="Doe"
                />
                {errors.lastName && <p className="text-red-400 text-xs mt-1 font-light">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/70 text-sm font-normal mb-2">Email Address</label>
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
              {errors.email && <p className="text-red-400 text-xs mt-1 font-light">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white/70 text-sm font-normal mb-2">Phone Number <span className="text-white/40">(Optional)</span></label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border rounded-xl text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                    errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#D67C3C]'
                  }`}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              {errors.phone && <p className="text-red-400 text-xs mt-1 font-light">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/70 text-sm font-normal mb-2">Password</label>
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
              {errors.password && <p className="text-red-400 text-xs mt-1 font-light">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-white/70 text-sm font-normal mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full pl-12 pr-12 py-3 bg-[#0a0a0a] border rounded-xl text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                    errors.confirmPassword ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#D67C3C]'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1 font-light">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded border-white/10 bg-[#0a0a0a] text-[#D67C3C] focus:ring-[#D67C3C]"
                />
                <span className="text-sm text-white/60 font-light">
                  I agree to the{' '}
                  <Link href="/terms" className="text-[#D67C3C] hover:text-[#B85A1F] transition-colors">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-[#D67C3C] hover:text-[#B85A1F] transition-colors">Privacy Policy</Link>
                </span>
              </label>
              {errors.agreeToTerms && <p className="text-red-400 text-xs mt-1 font-light">{errors.agreeToTerms}</p>}
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
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Sign In Link */}
        <p className="text-center mt-6 text-white/50 text-sm font-light">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#D67C3C] hover:text-[#B85A1F] transition-colors font-normal">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
