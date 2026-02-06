'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, canAccessDashboard, logout } from '@/lib/auth'
import { Search, Filter, Plus, Edit, Trash2, Mail, Shield, CheckCircle, XCircle, MoreVertical, LogOut, Home } from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  role: 'client' | 'broker' | 'admin'
  status: 'active' | 'inactive' | 'suspended'
  verified: boolean
  joinDate: string
  lastActive: string
  orders: number
  spent: number
}

export default function AdminUsers() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedRole, setSelectedRole] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('admin')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  const users: User[] = [
    { id: '1', name: 'John Smith', email: 'john@example.com', role: 'client', status: 'active', verified: true, joinDate: 'Jan 15, 2026', lastActive: '2 hours ago', orders: 3, spent: 845000 },
    { id: '2', name: 'Emma Wilson', email: 'emma@example.com', role: 'broker', status: 'active', verified: true, joinDate: 'Dec 10, 2025', lastActive: '1 day ago', orders: 0, spent: 0 },
    { id: '3', name: 'Michael Brown', email: 'michael@example.com', role: 'client', status: 'active', verified: true, joinDate: 'Nov 20, 2025', lastActive: '3 hours ago', orders: 5, spent: 1200000 },
    { id: '4', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'client', status: 'inactive', verified: false, joinDate: 'Feb 1, 2026', lastActive: '1 week ago', orders: 0, spent: 0 },
    { id: '5', name: 'David Miller', email: 'david@example.com', role: 'admin', status: 'active', verified: true, joinDate: 'Oct 5, 2025', lastActive: '30 min ago', orders: 0, spent: 0 },
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/10 text-red-400 border-red-500/20'
      case 'broker': return 'bg-[#D67C3C]/10 text-[#D67C3C] border-[#D67C3C]/20'
      case 'client': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      default: return 'bg-white/5 text-white/40 border-white/10'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-400'
      case 'inactive': return 'bg-yellow-500/10 text-yellow-400'
      case 'suspended': return 'bg-red-500/10 text-red-400'
      default: return 'bg-white/5 text-white/40'
    }
  }

  const filteredUsers = selectedRole === 'all' 
    ? users 
    : users.filter(u => u.role === selectedRole)

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Home size={20} className="text-white/60" />
              </Link>
              <div>
                <h1 className="text-2xl font-light text-white">User Management</h1>
                <p className="text-sm text-white/50 font-light mt-1">{users.length} total users</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <Plus size={16} />
                Add User
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-colors flex items-center gap-2 text-red-400 font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search & Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users by name or email..."
              className="w-full pl-10 pr-4 py-3 bg-[#141414] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light"
            />
          </div>
          <button className="px-4 py-3 bg-[#141414] border border-white/10 hover:border-white/20 rounded-xl text-white transition-colors flex items-center gap-2">
            <Filter size={18} />
            <span className="text-sm font-light">Filter</span>
          </button>
        </div>

        {/* Role Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          {['all', 'client', 'broker', 'admin'].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-lg text-sm font-light transition-colors whitespace-nowrap ${
                selectedRole === role
                  ? 'bg-[#D67C3C] text-white'
                  : 'bg-[#141414] text-white/50 hover:text-white border border-white/5'
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        {/* Users Table */}
        <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/5">
                <tr className="text-left">
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Verified</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/50 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center text-white font-medium text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">{user.name}</p>
                          <p className="text-xs text-white/40 font-light">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.verified ? (
                        <CheckCircle size={18} className="text-green-400" />
                      ) : (
                        <XCircle size={18} className="text-red-400" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-white/70 font-light">{user.lastActive}</p>
                        <p className="text-xs text-white/40 font-light">Joined {user.joinDate}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-white font-medium">{user.orders}</p>
                        {user.spent > 0 && (
                          <p className="text-xs text-[#D67C3C] font-light">${(user.spent / 1000).toFixed(0)}K</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <Mail size={16} className="text-white/60" />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <Edit size={16} className="text-white/60" />
                        </button>
                        <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <MoreVertical size={16} className="text-white/60" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
