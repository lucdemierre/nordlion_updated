'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FormInput } from '@/components/ui/FormInput'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Mock login - replace with actual API call
    setTimeout(() => {
      router.push('/account')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-light tracking-widest">NORDLION</h1>
          </Link>
          <p className="text-sm text-neutral-500 mt-2 font-light">Private Desk Access</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
              {error}
            </div>
          )}

          <FormInput
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
          />

          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#ff6b35]"
              />
              <span className="text-neutral-400 font-light">Remember me</span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-[#ff6b35] hover:text-[#ff6b35]/80 font-light transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-black text-neutral-500 font-light">or</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center text-sm">
          <span className="text-neutral-500 font-light">Don't have an account? </span>
          <Link
            href="/auth/signup"
            className="text-[#ff6b35] hover:text-[#ff6b35]/80 font-light transition-colors"
          >
            Create Private Desk
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-white font-light transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
