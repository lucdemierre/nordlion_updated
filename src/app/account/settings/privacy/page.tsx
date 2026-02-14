'use client';

import { Lock, Eye, EyeOff, Globe, Users } from 'lucide-react';

export default function PrivacySettingsPage() {
  return (
    <div className="space-y-8">
      {/* Profile Visibility */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="w-5 h-5 text-neutral-400" />
          <h2 className="text-xl font-light">PROFILE VISIBILITY</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm cursor-pointer hover:bg-neutral-800 transition-colors">
            <div>
              <div className="text-sm font-medium mb-1">Public Profile</div>
              <div className="text-xs text-neutral-400">Allow others to see your profile information</div>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </label>
          <label className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm cursor-pointer hover:bg-neutral-800 transition-colors">
            <div>
              <div className="text-sm font-medium mb-1">Show Collection</div>
              <div className="text-xs text-neutral-400">Display your assets in your public profile</div>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </label>
          <label className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm cursor-pointer hover:bg-neutral-800 transition-colors">
            <div>
              <div className="text-sm font-medium mb-1">Activity Status</div>
              <div className="text-xs text-neutral-400">Show when you're online</div>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </label>
        </div>
      </div>

      {/* Data Sharing */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-5 h-5 text-neutral-400" />
          <h2 className="text-xl font-light">DATA SHARING</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm cursor-pointer hover:bg-neutral-800 transition-colors">
            <div>
              <div className="text-sm font-medium mb-1">Share with Partners</div>
              <div className="text-xs text-neutral-400">Allow verified partners to contact you about relevant opportunities</div>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </label>
          <label className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm cursor-pointer hover:bg-neutral-800 transition-colors">
            <div>
              <div className="text-sm font-medium mb-1">Analytics</div>
              <div className="text-xs text-neutral-400">Help us improve by sharing anonymous usage data</div>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </label>
        </div>
      </div>

      {/* Connected Services */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-5 h-5 text-neutral-400" />
          <h2 className="text-xl font-light">CONNECTED SERVICES</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm">
            <div>
              <div className="text-sm font-medium mb-1">Google Account</div>
              <div className="text-xs text-neutral-400">Connected for sign-in</div>
            </div>
            <button className="text-xs text-red-400 hover:text-red-300">DISCONNECT</button>
          </div>
          <button className="w-full p-4 border border-neutral-700 hover:border-neutral-600 rounded-sm text-sm transition-colors">
            + CONNECT SERVICE
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-5 h-5 text-neutral-400" />
          <h2 className="text-xl font-light">DATA MANAGEMENT</h2>
        </div>
        <div className="space-y-3">
          <button className="w-full p-4 border border-neutral-700 hover:border-neutral-600 rounded-sm text-sm text-left transition-colors">
            <div className="font-medium mb-1">Download Your Data</div>
            <div className="text-xs text-neutral-400">Get a copy of all your information</div>
          </button>
          <button className="w-full p-4 border border-red-500/20 hover:bg-red-500/10 rounded-sm text-sm text-left text-red-400 transition-colors">
            <div className="font-medium mb-1">Delete Account</div>
            <div className="text-xs">Permanently delete your account and all data</div>
          </button>
        </div>
      </div>
    </div>
  );
}
