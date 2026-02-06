'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/BottomNav'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Send, Paperclip, Search, MoreVertical, Phone, Video, Image as ImageIcon } from 'lucide-react'

interface Conversation {
  id: string
  name: string
  avatar?: string
  role: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
}

interface Message {
  id: string
  sender: 'user' | 'support'
  content: string
  timestamp: string
  attachments?: { name: string; url: string }[]
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'James Wilson',
    role: 'Your Broker',
    lastMessage: 'The Porsche 911 GT3 RS is ready for shipping...',
    timestamp: '2 min ago',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'NordLion Support',
    role: 'Customer Support',
    lastMessage: 'Your verification documents have been approved',
    timestamp: '1 hour ago',
    unread: 0,
    online: true,
  },
  {
    id: '3',
    name: 'Sarah Mitchell',
    role: 'Sales Team',
    lastMessage: 'We found a Ferrari SF90 matching your criteria',
    timestamp: '3 hours ago',
    unread: 1,
    online: false,
  },
  {
    id: '4',
    name: 'Finance Department',
    role: 'Finance',
    lastMessage: 'Your payment has been processed successfully',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
  },
]

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      sender: 'support',
      content: 'Hi! I have great news about your Porsche 911 GT3 RS order.',
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      sender: 'user',
      content: 'That\'s wonderful! What\'s the update?',
      timestamp: '10:32 AM',
    },
    {
      id: '3',
      sender: 'support',
      content: 'The vehicle has passed final inspection and is ready for shipping. Expected delivery is February 20th.',
      timestamp: '10:33 AM',
    },
    {
      id: '4',
      sender: 'support',
      content: 'I\'ve attached the inspection report and shipping documents for your review.',
      timestamp: '10:34 AM',
      attachments: [
        { name: 'Inspection_Report.pdf', url: '#' },
        { name: 'Shipping_Documents.pdf', url: '#' },
      ],
    },
    {
      id: '5',
      sender: 'user',
      content: 'Perfect! Thank you so much for keeping me updated.',
      timestamp: '10:35 AM',
    },
  ],
}

export default function ClientMessages() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(mockConversations[0])
  const [messages, setMessages] = useState<Message[]>(mockMessages['1'])
  const [messageInput, setMessageInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('client')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
  }, [router])

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    setMessages(mockMessages[conversation.id] || [])
  }

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const now = new Date()
      const timestamp = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        content: messageInput,
        timestamp,
      }

      setMessages([...messages, newMessage])
      setMessageInput('')

      // Simulate response
      setTimeout(() => {
        const autoReply: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'support',
          content: 'Thank you for your message. I\'ll get back to you shortly with more information.',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        }
        setMessages((prev) => [...prev, autoReply])
      }, 1500)
    }
  }

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-24">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-light text-white">Messages</h1>
          <p className="text-sm text-white/50 font-light mt-1">
            Chat with your broker and support team
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
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#22c55e] transition-colors"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="max-h-[600px] overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => handleConversationSelect(conversation)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-white/[0.02] transition-colors border-b border-white/5 text-left ${
                      selectedConversation.id === conversation.id ? 'bg-white/[0.05]' : ''
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {conversation.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#22c55e] border-2 border-[#141414] rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium text-sm truncate">
                          {conversation.name}
                        </span>
                        <span className="text-xs text-white/40 font-light">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-white/30 font-light mb-1">{conversation.role}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-white/50 font-light truncate pr-2">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <span className="flex-shrink-0 w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center text-white text-xs font-medium">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Message Thread */}
          <div className="lg:col-span-2">
            <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden flex flex-col h-[700px]">
              {/* Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    {selectedConversation.online && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22c55e] border-2 border-[#141414] rounded-full" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-white font-medium text-sm">{selectedConversation.name}</h2>
                    <p className="text-xs text-white/40 font-light">
                      {selectedConversation.online ? 'Online' : selectedConversation.role}
                    </p>
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
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-md">
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.sender === 'user'
                            ? 'bg-[#22c55e] text-white'
                            : 'bg-[#0a0a0a] text-white border border-white/5'
                        }`}
                      >
                        <p className="text-sm font-light">{message.content}</p>
                        {message.attachments && (
                          <div className="mt-3 space-y-2">
                            {message.attachments.map((attachment, i) => (
                              <a
                                key={i}
                                href={attachment.url}
                                className="flex items-center gap-2 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                              >
                                <Paperclip size={14} />
                                <span className="text-xs">{attachment.name}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                      <p
                        className={`text-xs mt-1 font-light ${
                          message.sender === 'user' ? 'text-right text-white/40' : 'text-white/30'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/5">
                <div className="flex items-end gap-3">
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <Paperclip size={20} className="text-white/60" />
                  </button>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <ImageIcon size={20} className="text-white/60" />
                  </button>
                  <div className="flex-1">
                    <textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      placeholder="Type a message..."
                      rows={1}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#22c55e] transition-colors resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="p-3 bg-[#22c55e] hover:bg-[#16a34a] rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} className="text-white" />
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
