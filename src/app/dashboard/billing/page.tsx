'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { CreditCard, Plus, Download, Calendar, CheckCircle, Clock } from 'lucide-react'
import { useState } from 'react'

const paymentMethods = [
  {
    id: '1',
    type: 'Visa',
    last4: '4242',
    expiry: '12/25',
    isDefault: true,
    brand: 'visa',
  },
  {
    id: '2',
    type: 'Mastercard',
    last4: '8888',
    expiry: '08/26',
    isDefault: false,
    brand: 'mastercard',
  },
]

const transactions = [
  {
    id: 'TXN-2024-001',
    description: 'Porsche 911 Turbo S - Full Payment',
    amount: 245000,
    date: '2024-01-15',
    status: 'Completed',
    method: 'Visa ****4242',
  },
  {
    id: 'TXN-2024-002',
    description: 'Mercedes-AMG GT - Deposit',
    amount: 50000,
    date: '2024-01-10',
    status: 'Completed',
    method: 'Mastercard ****8888',
  },
  {
    id: 'TXN-2023-298',
    description: 'BMW M8 Competition - Full Payment',
    amount: 156000,
    date: '2023-12-22',
    status: 'Completed',
    method: 'Visa ****4242',
  },
  {
    id: 'TXN-2023-299',
    description: 'Concierge Service Fee',
    amount: 5000,
    date: '2023-12-20',
    status: 'Completed',
    method: 'Visa ****4242',
  },
  {
    id: 'TXN-2024-003',
    description: 'Audi RS e-tron GT - Deposit',
    amount: 30000,
    date: '2024-01-05',
    status: 'Pending',
    method: 'Visa ****4242',
  },
]

export default function BillingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('all')

  const totalSpent = transactions
    .filter(t => t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Billing</h1>
            <p className="text-white/60 text-lg">Manage payment methods and view transaction history</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              ${totalSpent.toLocaleString()}
            </div>
            <div className="text-sm text-white/50">Total Spent</div>
          </div>

          <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl">
                <CreditCard className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {paymentMethods.length}
            </div>
            <div className="text-sm text-white/50">Payment Methods</div>
          </div>

          <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {transactions.filter(t => t.status === 'Pending').length}
            </div>
            <div className="text-sm text-white/50">Pending Payments</div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-[#141414] rounded-2xl border border-white/5 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Payment Methods</h3>
            <button className="px-4 py-2 bg-[#32b8c6] hover:bg-[#2aa0ad] text-white rounded-xl font-medium transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="relative bg-gradient-to-br from-[#32b8c6]/10 to-[#1a6873]/10 rounded-2xl p-6 border border-[#32b8c6]/20 hover:border-[#32b8c6]/40 transition-all group"
              >
                {method.isDefault && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-[#32b8c6] text-white text-xs font-medium rounded-full">
                      Default
                    </span>
                  </div>
                )}
                <div className="mb-8">
                  <CreditCard className="w-8 h-8 text-white/60" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-2 h-2 bg-white/40 rounded-full" />
                      ))}
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-2 h-2 bg-white/40 rounded-full" />
                      ))}
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-2 h-2 bg-white/40 rounded-full" />
                      ))}
                    </div>
                    <span className="text-white font-mono font-medium">{method.last4}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">{method.type}</span>
                    <span className="text-white/60 text-sm">Expires {method.expiry}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
                  {!method.isDefault && (
                    <button className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-sm rounded-lg transition-all">
                      Set Default
                    </button>
                  )}
                  <button className="flex-1 px-3 py-2 bg-white/5 hover:bg-red-500/10 text-white hover:text-red-400 text-sm rounded-lg transition-all">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Transaction History</h3>
              <div className="flex gap-3">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#32b8c6] transition-colors"
                >
                  <option value="all">All Time</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl">
                    <CreditCard className="w-5 h-5 text-white/60" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{transaction.description}</h4>
                    <div className="flex items-center gap-3 text-sm text-white/50">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {transaction.date}
                      </span>
                      <span>•</span>
                      <span>{transaction.method}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-lg mb-1">
                    ${transaction.amount.toLocaleString()}
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'Completed'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
