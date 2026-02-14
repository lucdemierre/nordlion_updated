'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { FormInput, FormTextarea, FormSelect } from '@/components/ui/FormInput'
import { Button } from '@/components/ui/Button'

export default function SubmitAssetPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    type: 'inquiry',
    category: '',
    brand: '',
    model: '',
    year: '',
    budget: '',
    description: '',
    name: '',
    email: '',
    phone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Mock API call
    setTimeout(() => {
      router.push('/account/requests')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="container-elita pt-32 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-2 mb-4">SUBMIT INQUIRY</h1>
            <p className="body-md text-neutral-400">
              Complete this form to submit an acquisition brief, sale inquiry, or general request.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Inquiry Type */}
            <div className="card-elita p-8 space-y-6">
              <h2 className="text-xl font-light">Inquiry Type</h2>
              
              <FormSelect
                label="Type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                options={[
                  { value: 'inquiry', label: 'Acquisition Inquiry' },
                  { value: 'sell', label: 'Sell/Consignment' },
                  { value: 'valuation', label: 'Valuation Request' },
                  { value: 'authentication', label: 'Authentication' },
                  { value: 'general', label: 'General Inquiry' },
                ]}
                required
              />

              <FormSelect
                label="Asset Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                options={[
                  { value: '', label: 'Select category' },
                  { value: 'watches', label: 'Watches' },
                  { value: 'cars', label: 'Cars' },
                  { value: 'jets', label: 'Jets' },
                  { value: 'yachts', label: 'Yachts' },
                  { value: 'estates', label: 'Estates' },
                ]}
                required
              />
            </div>

            {/* Asset Details */}
            <div className="card-elita p-8 space-y-6">
              <h2 className="text-xl font-light">Asset Details</h2>
              
              <FormInput
                label="Brand/Manufacturer"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="e.g., Patek Philippe, Ferrari"
                required
              />

              <FormInput
                label="Model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="e.g., Nautilus 5711, F8 Tributo"
                required
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="Year (if applicable)"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2023"
                />

                <FormInput
                  label="Budget/Expected Value"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="e.g., $100,000 - $150,000"
                />
              </div>

              <FormTextarea
                label="Additional Details"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Include specific requirements, condition preferences, location, timeline, and any other relevant information..."
                rows={6}
              />
            </div>

            {/* Contact Information */}
            <div className="card-elita p-8 space-y-6">
              <h2 className="text-xl font-light">Contact Information</h2>
              
              <FormInput
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />

                <FormInput
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT INQUIRY'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.back()}
              >
                CANCEL
              </Button>
            </div>

            <p className="text-sm text-neutral-500 text-center font-light">
              By submitting this form, you agree to our{' '}
              <a href="/legal/terms" className="text-[#ff6b35] hover:underline">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="/legal/privacy" className="text-[#ff6b35] hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
