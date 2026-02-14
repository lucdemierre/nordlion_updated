'use client';

import { useState } from 'react';
import { Camera, Save } from 'lucide-react';

export default function ProfileSettingsPage() {
  const [formData, setFormData] = useState({
    firstName: 'Luc',
    lastName: 'Demierre',
    email: 'luc@nordlionauto.com',
    phone: '+65 9123 4567',
    company: 'NORDLION',
    title: 'Founder',
    bio: 'Luxury asset connoisseur and racing enthusiast',
    location: 'Singapore',
    website: 'nordlionauto.com',
  });

  return (
    <div className="space-y-8">
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <h2 className="text-xl font-light mb-6">PROFILE INFORMATION</h2>

        {/* Avatar */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-3">PROFILE PHOTO</label>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center">
              <span className="text-2xl font-light">LD</span>
            </div>
            <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-sm text-sm transition-colors flex items-center gap-2">
              <Camera className="w-4 h-4" />
              CHANGE PHOTO
            </button>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">FIRST NAME *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">LAST NAME *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">EMAIL *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">PHONE</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">COMPANY</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">TITLE</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">BIO</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">LOCATION</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">WEBSITE</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-[#ff4d6d] hover:bg-[#ff3355] text-white rounded-sm transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              SAVE CHANGES
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
