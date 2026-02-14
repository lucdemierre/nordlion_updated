'use client';

import { useState } from 'react';
import { Shield, Smartphone, Key, Eye, EyeOff } from 'lucide-react';

export default function SecuritySettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <h2 className="text-xl font-light mb-6">CHANGE PASSWORD</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">CURRENT PASSWORD</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 pr-12 text-white focus:outline-none focus:border-neutral-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">NEW PASSWORD</label>
            <input
              type="password"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">CONFIRM NEW PASSWORD</label>
            <input
              type="password"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#ff4d6d] hover:bg-[#ff3355] text-white rounded-sm transition-colors"
          >
            UPDATE PASSWORD
          </button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-light mb-2">TWO-FACTOR AUTHENTICATION</h2>
            <p className="text-sm text-neutral-400">Add an extra layer of security to your account</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            twoFactorEnabled
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-neutral-500/10 text-neutral-400 border border-neutral-500/20'
          }`}>
            {twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
          </div>
        </div>
        {twoFactorEnabled ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-neutral-800/50 rounded-sm">
              <Smartphone className="w-8 h-8 text-neutral-400" />
              <div className="flex-1">
                <div className="text-sm font-medium mb-1">Authenticator App</div>
                <div className="text-xs text-neutral-400">Using Google Authenticator</div>
              </div>
              <button className="px-4 py-2 border border-neutral-700 hover:border-neutral-600 text-white rounded-sm text-xs transition-colors">
                MANAGE
              </button>
            </div>
            <button className="w-full px-6 py-3 border border-red-500/20 hover:bg-red-500/10 text-red-400 rounded-sm transition-colors">
              DISABLE TWO-FACTOR AUTHENTICATION
            </button>
          </div>
        ) : (
          <button className="px-6 py-3 bg-[#ff4d6d] hover:bg-[#ff3355] text-white rounded-sm transition-colors">
            ENABLE TWO-FACTOR AUTHENTICATION
          </button>
        )}
      </div>

      {/* Biometric Authentication */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <h2 className="text-xl font-light mb-6">BIOMETRIC AUTHENTICATION</h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm cursor-pointer">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-neutral-400" />
              <div>
                <div className="text-sm font-medium">Face ID / Touch ID</div>
                <div className="text-xs text-neutral-400">Use biometrics to sign in</div>
              </div>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </label>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <h2 className="text-xl font-light mb-6">ACTIVE SESSIONS</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm">
            <div>
              <div className="text-sm font-medium mb-1">Singapore, SG</div>
              <div className="text-xs text-neutral-400">Chrome on macOS • Current session</div>
            </div>
            <span className="text-xs text-emerald-400">ACTIVE</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm">
            <div>
              <div className="text-sm font-medium mb-1">Singapore, SG</div>
              <div className="text-xs text-neutral-400">Safari on iOS • 2 days ago</div>
            </div>
            <button className="text-xs text-red-400 hover:text-red-300">REVOKE</button>
          </div>
        </div>
        <button className="w-full mt-4 px-6 py-3 border border-neutral-700 hover:border-neutral-600 text-white rounded-sm text-sm transition-colors">
          SIGN OUT ALL OTHER SESSIONS
        </button>
      </div>
    </div>
  );
}
