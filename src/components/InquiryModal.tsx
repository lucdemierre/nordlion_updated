'use client'

import { useState } from 'react'
import { X, Send } from 'lucide-react'

interface InquiryModalProps {
  vehicle: {
    make: string
    model: string
    year: number
    price: number
  }
  onClose: () => void
  onSubmit: (data: any) => void
}

export default function InquiryModal({ vehicle, onClose, onSubmit }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onSubmit(formData)
    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-[#141414] border border-white/10 rounded-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h2 className="text-xl font-light text-white">Inquire About Vehicle</h2>
            <p className="text-sm text-white/50 font-light mt-1">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={20} className="text-white/60" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-white/70 font-light mb-2">Your Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Smith"
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 font-light mb-2">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 font-light mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+44 20 1234 5678"
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light"
            />
          </div>

          <div>
            <label className="block text-sm text-white/70 font-light mb-2">Message *</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              placeholder="Tell us about your interest..."
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light resize-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Sending...' : (
                <>
                  <Send size={16} />
                  Send Inquiry
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
