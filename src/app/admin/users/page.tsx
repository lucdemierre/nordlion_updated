'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Search, Filter, Plus, Edit, Trash2, Mail, CheckCircle, XCircle, MoreVertical } from 'lucide-react'

export default function AdminUsers() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRole, setSelectedRole] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('admin')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
    fetchUsers()
  }, [router])

  const fetchUsers = async () => {
    try {
      // TODO: Replace with real API call when backend is ready
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      //   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      // })
      // const data = await response.json()
      
      // Mock data from seeded database
      setTimeout(() => {
        setUsers([
          { id: '1', name: 'Luc Demierre', email: 'admin@nordlion.com', role: 'admin', status: 'active', verified: true, joinDate: 'Oct 5, 2025', lastActive: 'Online', orders: 0, spent: 0, isOnline: true },
          { id: '2', name: 'John Hamilton', email: 'john.hamilton@example.com', role: 'user', status: 'active', verified: true, joinDate: 'Jan 15, 2026', lastActive: '2 hours ago', orders: 2, spent: 515000, isOnline: false },
          { id: '3', name: 'Sarah Chen', email: 'sarah.chen@example.com', role: 'user', status: 'active', verified: true, joinDate: 'Dec 10, 2025', lastActive: 'Online', orders: 1, spent: 325000, isOnline: true },
          { id: '4', name: 'Elite Cars London', email: 'dealer@elitecars.com', role: 'dealer', status: 'active', verified: true, joinDate: 'Nov 20, 2025', lastActive: '1 day ago', orders: 0, spent: 0, isOnline: false },
          { id: '5', name: 'Michael Sterling', email: 'michael.sterling@example.com', role: 'user', status: 'active', verified: true, joinDate: 'Feb 1, 2026', lastActive: '3 days ago', orders: 0, spent: 0, isOnline: false },
        ])
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Failed to fetch users:', error)
      setLoading(false)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/10 text-red-400 border-red-500/20'
      case 'dealer': return 'bg-[#D67C3C]/10 text-[#D67C3C] border-[#D67C3C]/20'
      case 'user': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
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
    ? users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()))
    : users.filter(u => u.role === selectedRole && (u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())))

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D67C3C]"></div>
      </div>
    )
  }

  return (
    <div>
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-white">User Management</h1>
              <p className="text-sm text-white/50 font-light mt-1">{users.length} total users</p>
            </div>
            <button className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Plus size={16} />
              Add User
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
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

        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          {['all', 'user', 'dealer', 'admin'].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-lg text-sm font-light transition-colors whitespace-nowrap ${
                selectedRole === role ? 'bg-[#D67C3C] text-white' : 'bg-[#141414] text-white/50 hover:text-white border border-white/5'
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

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
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center text-white font-medium text-sm">
                            {u.name.split(' ').map((n: string) => n[0]).join('')}
                          </div>
                          {u.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#141414] rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">{u.name}</p>
                          <p className="text-xs text-white/40 font-light">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getRoleColor(u.role)}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(u.status)}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.verified ? (
                        <CheckCircle size={18} className="text-green-400" />
                      ) : (
                        <XCircle size={18} className="text-red-400" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-white/70 font-light">{u.lastActive}</p>
                        <p className="text-xs text-white/40 font-light">Joined {u.joinDate}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-white font-medium">{u.orders}</p>
                        {u.spent > 0 && (
                          <p className="text-xs text-[#D67C3C] font-light">£{(u.spent / 1000).toFixed(0)}K</p>
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
