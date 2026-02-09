'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Send, Search, Phone, Video, MoreVertical } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface User {
  id: string
  name: string
  avatar: string
  isOnline: boolean
  lastSeen?: string
}

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  createdAt: string
  read: boolean
}

interface Conversation {
  partner: User
  lastMessage: Message
  unreadCount: number
}

export default function MessagesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('admin')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
    fetchConversations()
  }, [router])

  const fetchConversations = async () => {
    try {
      // TODO: Replace with real API when backend is ready
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/conversations`)
      // const data = await response.json()
      
      // Data from seeded database
      const mockConversations: Conversation[] = [
        {
          partner: {
            id: '2',
            name: 'John Hamilton',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            isOnline: false,
          },
          lastMessage: {
            id: '3',
            senderId: '2',
            receiverId: '1',
            content: "That would be great! I'm available this weekend.",
            createdAt: new Date(Date.now() - 40 * 60000).toISOString(),
            read: true,
          },
          unreadCount: 0,
        },
        {
          partner: {
            id: '3',
            name: 'Sarah Chen',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            isOnline: true,
          },
          lastMessage: {
            id: '4',
            senderId: '3',
            receiverId: '1',
            content: 'Hello! I wanted to inquire about the Bugatti Chiron.',
            createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
            read: false,
          },
          unreadCount: 1,
        },
        {
          partner: {
            id: '5',
            name: 'Michael Sterling',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
            isOnline: false,
            lastSeen: '3 days ago',
          },
          lastMessage: {
            id: '6',
            senderId: '5',
            receiverId: '1',
            content: 'Is the McLaren 750S negotiable on price?',
            createdAt: new Date(Date.now() - 5 * 3600000).toISOString(),
            read: false,
          },
          unreadCount: 1,
        },
      ]
      setConversations(mockConversations)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch conversations:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.partner.id)
    }
  }, [selectedConversation])

  const loadMessages = async (partnerId: string) => {
    try {
      // TODO: Replace with real API
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/${partnerId}`)
      // const data = await response.json()
      
      // Mock messages from seeded database
      const mockMessagesByUser: Record<string, Message[]> = {
        '2': [
          {
            id: '1',
            senderId: '2',
            receiverId: '1',
            content: "Hi, I'm interested in the Ferrari 296 GTB. Is it still available?",
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            read: true,
          },
          {
            id: '2',
            senderId: '1',
            receiverId: '2',
            content: 'Yes, the Ferrari is available! Would you like to schedule a viewing?',
            createdAt: new Date(Date.now() - 3000000).toISOString(),
            read: true,
          },
          {
            id: '3',
            senderId: '2',
            receiverId: '1',
            content: "That would be great! I'm available this weekend.",
            createdAt: new Date(Date.now() - 2400000).toISOString(),
            read: true,
          },
        ],
        '3': [
          {
            id: '4',
            senderId: '3',
            receiverId: '1',
            content: 'Hello! I wanted to inquire about the Bugatti Chiron. Can you provide more details?',
            createdAt: new Date(Date.now() - 7200000).toISOString(),
            read: true,
          },
          {
            id: '5',
            senderId: '1',
            receiverId: '3',
            content: 'The Bugatti Chiron Super Sport is an exceptional vehicle with only 800 miles. Let me send you the full spec sheet.',
            createdAt: new Date(Date.now() - 6600000).toISOString(),
            read: true,
          },
        ],
        '5': [
          {
            id: '6',
            senderId: '5',
            receiverId: '1',
            content: 'Is the McLaren 750S negotiable on price?',
            createdAt: new Date(Date.now() - 18000000).toISOString(),
            read: true,
          },
          {
            id: '7',
            senderId: '1',
            receiverId: '5',
            content: 'Hello Michael! The McLaren is priced competitively. Let me discuss with the owner and get back to you.',
            createdAt: new Date(Date.now() - 17400000).toISOString(),
            read: true,
          },
        ],
      }

      const userMessages = mockMessagesByUser[partnerId] || []
      setMessages(userMessages)
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation) return

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: '1',
      receiverId: selectedConversation.partner.id,
      content: messageInput,
      createdAt: new Date().toISOString(),
      read: false,
    }

    // TODO: Send to API
    // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, {
    //   method: 'POST',
    //   body: JSON.stringify(newMessage)
    // })

    setMessages([...messages, newMessage])
    setMessageInput('')
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const filteredConversations = conversations.filter(conv =>
    conv.partner.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D67C3C]"></div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-light text-white">Messages</h1>
          <p className="text-sm text-white/50 font-light mt-1">Manage conversations with clients</p>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto px-6 py-6 w-full">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Conversations List */}
          <div className="col-span-4 bg-[#141414] border border-white/5 rounded-xl flex flex-col">
            <div className="p-4 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#D67C3C]"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.partner.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-4 flex items-start space-x-3 hover:bg-white/5 transition-colors border-b border-white/5 ${
                    selectedConversation?.partner.id === conv.partner.id ? 'bg-white/10' : ''
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={conv.partner.avatar}
                      alt={conv.partner.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {conv.partner.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#141414] rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white truncate">{conv.partner.name}</h3>
                      <span className="text-xs text-white/50">{formatTime(conv.lastMessage.createdAt)}</span>
                    </div>
                    <p className="text-sm text-white/60 truncate">{conv.lastMessage.content}</p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <div className="flex-shrink-0 ml-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#D67C3C] rounded-full">
                        {conv.unreadCount}
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="col-span-8 bg-[#141414] border border-white/5 rounded-xl flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={selectedConversation.partner.avatar}
                        alt={selectedConversation.partner.name}
                        className="w-10 h-10 rounded-full"
                      />
                      {selectedConversation.partner.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#141414] rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{selectedConversation.partner.name}</h3>
                      <p className="text-sm text-white/50">
                        {selectedConversation.partner.isOnline ? 'Online' : `Last seen ${selectedConversation.partner.lastSeen}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-white/60 hover:text-white transition-colors">
                      <Phone size={20} />
                    </button>
                    <button className="p-2 text-white/60 hover:text-white transition-colors">
                      <Video size={20} />
                    </button>
                    <button className="p-2 text-white/60 hover:text-white transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.senderId === '1' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                            message.senderId === '1'
                              ? 'bg-gradient-to-r from-[#D67C3C] to-[#B85A1F] text-white'
                              : 'bg-white/10 text-white'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === '1' ? 'text-white/70' : 'text-white/50'
                          }`}>
                            {formatTime(message.createdAt)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-white/5">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#D67C3C]"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="p-3 bg-gradient-to-r from-[#D67C3C] to-[#B85A1F] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-white/40">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={32} className="text-white/40" />
                  </div>
                  <p className="text-lg">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
