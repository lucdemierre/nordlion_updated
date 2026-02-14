'use client';

import { CreditCard, Download, Plus } from 'lucide-react';

export default function BillingSettingsPage() {
  return (
    <div className="space-y-8">
      {/* Payment Methods */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-light">PAYMENT METHODS</h2>
          <button className="px-4 py-2 bg-[#ff4d6d] hover:bg-[#ff3355] text-white rounded-sm text-sm transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            ADD CARD
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-neutral-700 rounded flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-neutral-400" />
              </div>
              <div>
                <div className="text-sm font-medium">Visa ending in 4242</div>
                <div className="text-xs text-neutral-400">Expires 12/2027</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs">
                DEFAULT
              </span>
              <button className="text-xs text-neutral-400 hover:text-white">EDIT</button>
              <button className="text-xs text-red-400 hover:text-red-300">REMOVE</button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-neutral-700 rounded flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-neutral-400" />
              </div>
              <div>
                <div className="text-sm font-medium">Mastercard ending in 8888</div>
                <div className="text-xs text-neutral-400">Expires 06/2026</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs text-neutral-400 hover:text-white">SET DEFAULT</button>
              <button className="text-xs text-neutral-400 hover:text-white">EDIT</button>
              <button className="text-xs text-red-400 hover:text-red-300">REMOVE</button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <h2 className="text-xl font-light mb-6">BILLING HISTORY</h2>
        <div className="space-y-3">
          {[
            { date: '2026-02-01', description: 'Verification Service', amount: '$500.00', status: 'Paid' },
            { date: '2026-01-15', description: 'Vault Premium Subscription', amount: '$99.00', status: 'Paid' },
            { date: '2026-01-01', description: 'Authentication Service', amount: '$350.00', status: 'Paid' },
          ].map((invoice, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-sm">
              <div>
                <div className="text-sm font-medium mb-1">{invoice.description}</div>
                <div className="text-xs text-neutral-400">{new Date(invoice.date).toLocaleDateString()}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{invoice.amount}</span>
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs">
                  {invoice.status.toUpperCase()}
                </span>
                <button className="p-2 hover:bg-neutral-700 rounded-sm transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Address */}
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-sm p-8">
        <h2 className="text-xl font-light mb-6">BILLING ADDRESS</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">COUNTRY</label>
            <select className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600">
              <option>Singapore</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ADDRESS LINE 1</label>
            <input
              type="text"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ADDRESS LINE 2</label>
            <input
              type="text"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">CITY</label>
              <input
                type="text"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">POSTAL CODE</label>
              <input
                type="text"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
          </div>
          <button type="submit" className="px-6 py-3 bg-[#ff4d6d] hover:bg-[#ff3355] text-white rounded-sm transition-colors">
            UPDATE BILLING ADDRESS
          </button>
        </form>
      </div>
    </div>
  );
}
