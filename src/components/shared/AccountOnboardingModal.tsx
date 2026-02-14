'use client'

import { useState } from 'react'
import { X, ChevronRight, Shield, Fingerprint } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface AccountOnboardingModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (data: OnboardingData) => void
}

export interface OnboardingData {
  firstName: string
  lastName: string
  phone: string
  enableBiometric: boolean
  enableIdVerification: boolean
}

export default function AccountOnboardingModal({
  isOpen,
  onClose,
  onComplete
}: AccountOnboardingModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<OnboardingData>({
    firstName: '',
    lastName: '',
    phone: '',
    enableBiometric: false,
    enableIdVerification: false
  })

  const handleSubmit = () => {
    if (!formData.firstName) {
      alert('First name is required')
      return
    }
    onComplete(formData)
  }

  const handleSkip = () => {
    onComplete(formData)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[var(--color-text-tertiary)] hover:text-white transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="p-6 border-b border-[var(--color-border-primary)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[var(--color-accent-primary)] rounded-full flex items-center justify-center text-black font-medium">
                E
              </div>
              <div>
                <h2 className="text-2xl font-light tracking-tight">WELCOME</h2>
                <p className="text-xs text-[var(--color-text-tertiary)]">
                  Quick setup • 30 seconds
                </p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--color-accent-primary)] transition-all duration-300"
                style={{ width: step === 1 ? '50%' : '100%' }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[var(--color-text-secondary)] mb-2">
                    First name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-[var(--color-border-primary)] rounded-lg text-white placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]/50 focus:border-[var(--color-accent-primary)] transition-all"
                    placeholder="First name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-[var(--color-text-secondary)] mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-[var(--color-border-primary)] rounded-lg text-white placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]/50 focus:border-[var(--color-accent-primary)] transition-all"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[var(--color-text-secondary)] mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/[0.03] border border-[var(--color-border-primary)] rounded-lg text-white placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]/50 focus:border-[var(--color-accent-primary)] transition-all"
                  placeholder="Phone"
                />
              </div>
            </div>

            {/* Security Section */}
            <div className="space-y-3">
              <h3 className="text-xs text-[var(--color-text-tertiary)] font-medium tracking-wider">
                SECURITY
              </h3>

              {/* Face ID / Touch ID */}
              <button
                onClick={() => setFormData({ ...formData, enableBiometric: !formData.enableBiometric })}
                className="w-full flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-[var(--color-border-primary)] rounded-lg transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Fingerprint size={20} className="text-[var(--color-accent-primary)]" />
                  <div className="text-left">
                    <div className="text-sm font-medium">Enable Face ID / Touch ID</div>
                    <div className="text-xs text-[var(--color-text-tertiary)]">
                      Instant secure access
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1 bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] text-xs font-medium rounded-full border border-[var(--color-accent-primary)]/20">
                  {formData.enableBiometric ? 'ENABLED' : 'SETUP'}
                </div>
              </button>

              {/* ID Verification */}
              <button
                onClick={() => setFormData({ ...formData, enableIdVerification: !formData.enableIdVerification })}
                className="w-full flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-[var(--color-border-primary)] rounded-lg transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-[var(--color-text-tertiary)]" />
                  <div className="text-left">
                    <div className="text-sm font-medium">ID Verification</div>
                    <div className="text-xs text-[var(--color-text-tertiary)]">
                      Optional • Unlock premium
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent-primary)] transition-colors" />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[var(--color-border-primary)] flex items-center justify-between">
            <button
              onClick={handleSkip}
              className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
            >
              SKIP FOR NOW
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/90 text-black font-medium rounded-lg transition-all flex items-center gap-2"
            >
              CONTINUE
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
