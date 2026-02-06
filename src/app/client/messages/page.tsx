'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react'

interface Message {
  id: string
  sender: 'user' | 'support'
  content: string
  timestamp: Date
  read: boolean
}

interface Conversation {
  id: string
  name: string
  role: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
}

export default function ClientMessages() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedConvo, setSelectedConvo] = useState<string>('1')
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'support',
      content: 'Hello! How can I assist you with your vehicle order today?',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
    {
      id: '2',
      sender: 'user',
      content: 'Hi! I wanted to check on the delivery status of my Porsche 911 GT3 RS.',
      timestamp: new Date(Date.now() - 3400000),
      read: true,
    },
    {
      id: '3',
      sender: 'support',
      content: 'Of course! Your Porsche 911 GT3 RS is currently in transit and expected to arrive on February 15th. I can provide you with the tracking number if you\'d like.',
      timestamp: new Date(Date.now() - 3200000),
      read: true,
    },
  ])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('client')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Sales Team',
      role: 'Vehicle Specialist',
      avatar: 'ST',
      lastMessage: 'Your Porsche is in transit...',
      timestamp: '2h ago',
      unread: 0,
      online: true,
    },
    {
      id: '2',
      name: 'Support',
      role: 'Customer Service',
      avatar: 'CS',
      lastMessage: 'We\'ve received your inquiry',
      timestamp: '1d ago',
      unread: 2,
      online: false,
    },
    {
      id: '3',
      name: 'Finance Team',
      role: 'Payment Processing',
      avatar: 'FT',
      lastMessage: 'Payment confirmed',
      timestamp: '3d ago',
      unread: 0,
      online: false,
    },
  ]

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
      read: false,
    }

    setMessages([...messages, userMsg])
    setNewMessage('')

    // Simulate response
    setTimeout(() => {
      const responseMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        content: 'Thank you for your message. Our team will get back to you shortly.',
        timestamp: new Date(),
        read: false,
      }
      setMessages(prev => [...prev, responseMsg])
    }, 1500)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-24">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-light text-white">Messages</h1>
          <p className="text-sm text-white/50 font-light mt-1">
            Chat with your dedicated team
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
              {/* Search */}
              <div className="p-4 border-b border-white/5">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light"
                  />
                </div>
              </div>

              {/* Conversation List */}
              <div className="divide-y divide-white/5">
                {conversations.map((convo) => (
                  <button
                    key={convo.id}
                    onClick={() => setSelectedConvo(convo.id)}
                    className={`w-full p-4 text-left transition-colors ${
                      selectedConvo === convo.id ? 'bg-[#D67C3C]/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center text-white font-medium">
                          {convo.avatar}
                        </div>
                        {convo.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#141414]"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-white">{convo.name}</p>
                          <span className="text-xs text-white/40 font-light">{convo.timestamp}</span>
                        </div>
                        <p className="text-xs text-white/40 font-light mb-1">{convo.role}</p>
                        <p className="text-sm text-white/60 font-light truncate">{convo.lastMessage}</p>
                        {convo.unread > 0 && (
                          <div className="mt-2">
                            <span className="px-2 py-1 bg-[#D67C3C] text-white text-xs rounded-full">
                              {convo.unread} new
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2">
            <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center text-white font-medium">
                    ST
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Sales Team</p>
                    <p className="text-xs text-green-400 font-light">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <Phone size={18} className="text-white/60" />
                  </button>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <Video size={18} className="text-white/60" />
                  </button>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <MoreVertical size={18} className="text-white/60" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-xl p-3 ${
                        msg.sender === 'user'
                          ? 'bg-[#D67C3C] text-white'
                          : 'bg-[#0a0a0a] text-white'
                      }`}
                    >
                      <p className="text-sm font-light">{msg.content}</p>
                      <p className="text-xs mt-2 opacity-60">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/5">
                <div className="flex items-end gap-2">
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <Paperclip size={20} className="text-white/60" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light pr-10"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors">
                      <Smile size={20} />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-3 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
