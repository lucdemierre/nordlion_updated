'use client'

import { useState } from 'react'
import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'
import { Upload } from 'lucide-react'

export default function SubmitAssetPage() {
  const [formData, setFormData] = useState({
    assetType: '',
    brand: '',
    model: '',
    year: '',
    condition: '',
    description: '',
    name: '',
    email: '',
    phone: ''
  })

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <h4 className="text-label mb-4">CLIENT CARE</h4>
            <h1 className="text-headline mb-6">SUBMIT ASSET</h1>
            <p className="text-body-large mb-12">
              Begin with a confidential valuation and market positioning consultation. All submissions reviewed within 24-48 hours.
            </p>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Asset Type *</label>
                <select className="input-field">
                  <option value="">Select category</option>
                  <option value="watch">Watch</option>
                  <option value="car">Car</option>
                  <option value="jet">Jet</option>
                  <option value="yacht">Yacht</option>
                  <option value="estate">Estate</option>
                </select>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">Brand *</label>
                  <input type="text" className="input-field" placeholder="e.g., Patek Philippe" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Model *</label>
                  <input type="text" className="input-field" placeholder="e.g., Nautilus 5711" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">Year</label>
                  <input type="text" className="input-field" placeholder="e.g., 2020" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Condition</label>
                  <select className="input-field">
                    <option value="">Select condition</option>
                    <option value="unworn">Unworn</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-2">Additional Details</label>
                <textarea 
                  className="input-field min-h-[120px]" 
                  placeholder="Service history, provenance, special features, documentation available..."
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2">Photos</label>
                <div className="card-elevated p-8 text-center cursor-pointer hover:border-[var(--color-border-accent)] transition-all">
                  <Upload className="mx-auto mb-3 text-[var(--color-text-tertiary)]" size={32} />
                  <p className="text-sm text-[var(--color-text-secondary)]">Click to upload or drag and drop</p>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-2">PNG, JPG up to 10MB each</p>
                </div>
              </div>
              
              <div className="border-t border-[var(--color-border-primary)] pt-6">
                <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Full Name *</label>
                    <input type="text" className="input-field" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Email *</label>
                      <input type="email" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Phone</label>
                      <input type="tel" className="input-field" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <input type="checkbox" id="terms" className="mt-1" />
                <label htmlFor="terms" className="text-sm text-[var(--color-text-secondary)]">
                  I confirm that I am the legal owner of this asset and consent to NordLion contacting me regarding valuation and potential placement services.
                </label>
              </div>
              
              <button type="submit" className="btn-primary w-full">
                SUBMIT FOR EVALUATION
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}