'use client'

import Navigation from '@/components/shared/Navigation'
import Footer from '@/components/shared/Footer'
import { Calendar, Clock, MapPin } from 'lucide-react'

export default function ScheduleAppointmentPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
      <Navigation />

      <section className="relative pt-32 pb-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <h4 className="text-label mb-4">CLIENT CARE</h4>
            <h1 className="text-headline mb-6">SCHEDULE APPOINTMENT</h1>
            <p className="text-body-large mb-12">
              Book a private viewing, authentication consultation, or private desk meeting at The Reserve Singapore or via secure video conference.
            </p>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Appointment Type *</label>
                <select className="input-field">
                  <option value="">Select service</option>
                  <option value="viewing">Private Viewing</option>
                  <option value="consultation">Acquisition Consultation</option>
                  <option value="authentication">Authentication Review</option>
                  <option value="valuation">Valuation Discussion</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm mb-2">Preferred Location *</label>
                <select className="input-field">
                  <option value="singapore">The Reserve Singapore</option>
                  <option value="video">Video Conference</option>
                </select>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">Preferred Date *</label>
                  <div className="relative">
                    <input type="date" className="input-field pr-10" />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">Preferred Time *</label>
                  <div className="relative">
                    <input type="time" className="input-field pr-10" />
                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" size={18} />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-2">Additional Notes</label>
                <textarea className="input-field min-h-[100px]" placeholder="Specific assets of interest, questions, special requirements..." />
              </div>
              
              <div className="border-t border-[var(--color-border-primary)] pt-6">
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
                      <label className="block text-sm mb-2">Phone *</label>
                      <input type="tel" className="input-field" />
                    </div>
                  </div>
                </div>
              </div>
              
              <button type="submit" className="btn-primary w-full">
                REQUEST APPOINTMENT
              </button>
              
              <p className="text-xs text-center text-[var(--color-text-tertiary)]">
                You will receive confirmation within 24 hours
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}