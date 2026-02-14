'use client';

import { useState } from 'react';
import { Bell, Mail, Smartphone, MessageSquare } from 'lucide-react';

export default function NotificationsSettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: {
      newInquiries: true,
      inquiryUpdates: true,
      appointmentReminders: true,
      assetVerification: true,
      marketingEmails: false,
      newsletter: true,
    },
    pushNotifications: {
      newInquiries: true,
      inquiryUpdates: true,
      appointmentReminders: true,
      assetVerification: true,
    },
    smsNotifications: {
      appointmentReminders: true,
      urgentUpdates: true,
    },
  });

  return (
    <div className="space-y-8">
      {/* Email Notifications */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-5 h-5 text-neutral-400" />
          <h2 className="text-xl font-light">EMAIL NOTIFICATIONS</h2>
        </div>
        <div className="space-y-4">
          {Object.entries(settings.emailNotifications).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm cursor-pointer hover:bg-neutral-800 transition-colors">
              <span className="text-sm">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </span>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailNotifications: { ...settings.emailNotifications, [key]: e.target.checked },
                  })
                }
                className="w-5 h-5"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-neutral-400" />
          <h2 className="text-xl font-light">PUSH NOTIFICATIONS</h2>
        </div>
        <div className="space-y-4">
          {Object.entries(settings.pushNotifications).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm cursor-pointer hover:bg-neutral-800 transition-colors">
              <span className="text-sm">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </span>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    pushNotifications: { ...settings.pushNotifications, [key]: e.target.checked },
                  })
                }
                className="w-5 h-5"
              />
            </label>
          ))}
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Smartphone className="w-5 h-5 text-neutral-400" />
          <h2 className="text-xl font-light">SMS NOTIFICATIONS</h2>
        </div>
        <div className="space-y-4">
          {Object.entries(settings.smsNotifications).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm cursor-pointer hover:bg-neutral-800 transition-colors">
              <span className="text-sm">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </span>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    smsNotifications: { ...settings.smsNotifications, [key]: e.target.checked },
                  })
                }
                className="w-5 h-5"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <h2 className="text-xl font-light mb-6">NOTIFICATION PREFERENCES</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">QUIET HOURS</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-2">FROM</label>
                <input
                  type="time"
                  defaultValue="22:00"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
                />
              </div>
              <div>
                <label className="block text-xs text-neutral-400 mb-2">TO</label>
                <input
                  type="time"
                  defaultValue="08:00"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
                />
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-2">No notifications will be sent during these hours</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">DIGEST FREQUENCY</label>
            <select className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600">
              <option>Real-time</option>
              <option>Daily digest</option>
              <option>Weekly digest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
