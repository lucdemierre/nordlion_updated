'use client';

import { Globe, Palette, Layout, Zap } from 'lucide-react';

export default function PreferencesSettingsPage() {
  return (
    <div className="space-y-8">
      {/* Display Preferences */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-5 h-5 text-neutral-400" />
          <h2 className="text-xl font-light">DISPLAY PREFERENCES</h2>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">THEME</label>
            <div className="grid grid-cols-3 gap-3">
              {['Dark', 'Light', 'Auto'].map((theme) => (
                <label
                  key={theme}
                  className="relative p-4 border border-neutral-700 rounded-sm cursor-pointer hover:border-neutral-600 transition-colors"
                >
                  <input type="radio" name="theme" value={theme.toLowerCase()} className="sr-only" defaultChecked={theme === 'Dark'} />
                  <div className="text-sm font-medium text-center">{theme}</div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">DENSITY</label>
            <select className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600">
              <option>Comfortable</option>
              <option>Compact</option>
              <option>Spacious</option>
            </select>
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-5 h-5 text-neutral-400" />
          <h2 className="text-xl font-light">REGIONAL SETTINGS</h2>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">LANGUAGE</label>
            <select className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600">
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>中文 (简体)</option>
              <option>日本語</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">TIMEZONE</label>
            <select className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600">
              <option>Asia/Singapore (GMT+8)</option>
              <option>America/New_York (GMT-5)</option>
              <option>Europe/London (GMT+0)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">CURRENCY</label>
            <select className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600">
              <option>SGD ($)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">DATE FORMAT</label>
            <select className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Preferences */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Layout className="w-5 h-5 text-neutral-400" />
          <h2 className="text-xl font-light">CONTENT PREFERENCES</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm cursor-pointer hover:bg-neutral-800 transition-colors">
            <div>
              <div className="text-sm font-medium mb-1">Auto-play Videos</div>
              <div className="text-xs text-neutral-400">Automatically play videos when scrolling</div>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </label>
          <label className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm cursor-pointer hover:bg-neutral-800 transition-colors">
            <div>
              <div className="text-sm font-medium mb-1">High-Quality Images</div>
              <div className="text-xs text-neutral-400">Load full resolution images</div>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </label>
          <label className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm cursor-pointer hover:bg-neutral-800 transition-colors">
            <div>
              <div className="text-sm font-medium mb-1">Infinite Scroll</div>
              <div className="text-xs text-neutral-400">Automatically load more items when scrolling</div>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </label>
        </div>
      </div>

      {/* Performance */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-5 h-5 text-neutral-400" />
          <h2 className="text-xl font-light">PERFORMANCE</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm cursor-pointer hover:bg-neutral-800 transition-colors">
            <div>
              <div className="text-sm font-medium mb-1">Hardware Acceleration</div>
              <div className="text-xs text-neutral-400">Use GPU for smoother animations</div>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </label>
          <label className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm cursor-pointer hover:bg-neutral-800 transition-colors">
            <div>
              <div className="text-sm font-medium mb-1">Reduced Motion</div>
              <div className="text-xs text-neutral-400">Minimize animations and transitions</div>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-[#ff4d6d] hover:bg-[#ff3355] text-white rounded-sm transition-colors">
          SAVE PREFERENCES
        </button>
      </div>
    </div>
  );
}
