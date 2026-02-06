'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Search, Send, Paperclip, Phone, Video, MoreVertical } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'me' | 'other'
  time: string
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  messages: Message[]
}

export default function ClientMessages() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState('')

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
      name: 'Sarah - Broker',
      avatar: 'SB',
      lastMessage: 'Your Porsche 911 GT3 RS is ready for delivery!',
      time: '2m ago',
      unread: 2,
      online: true,
      messages: [
        { id: '1', text: 'Hello! I have an update on your order.', sender: 'other', time: '10:30 AM' },
        { id: '2', text: 'Great! What\'s the news?', sender: 'me', time: '10:32 AM' },
        { id: '3', text: 'Your Porsche 911 GT3 RS has cleared customs and is ready for delivery!', sender: 'other', time: '10:33 AM' },
        { id: '4', text: 'That\'s fantastic! When can I expect it?', sender: 'me', time: '10:35 AM' },
        { id: '5', text: 'We can arrange delivery for tomorrow afternoon. Does 2 PM work for you?', sender: 'other', time: '10:36 AM' },
      ],
    },
    {
      id: '2',
      name: 'Support Team',
      avatar: 'ST',
      lastMessage: 'We\'ve processed your document request',
      time: '1h ago',
      unread: 0,
      online: false,
      messages: [
        { id: '1', text: 'Hi, how can I help you today?', sender: 'other', time: '9:00 AM' },
        { id: '2', text: 'I need a copy of my purchase agreement', sender: 'me', time: '9:05 AM' },
        { id: '3', text: 'I\'ll get that for you right away.', sender: 'other', time: '9:06 AM' },
        { id: '4', text: 'We\'ve processed your document request. Check your Documents section.', sender: 'other', time: '9:15 AM' },
      ],
    },
    {
      id: '3',
      name: 'John - Sales',
      avatar: 'JS',
      lastMessage: 'I found a Ferrari SF90 that matches your criteria',
      time: '3h ago',
      unread: 1,
      online: true,
      messages: [
        { id: '1', text: 'Good morning! I have something exciting to show you.', sender: 'other', time: '7:30 AM' },
        { id: '2', text: 'What is it?', sender: 'me', time: '7:45 AM' },
        { id: '3', text: 'I found a Ferrari SF90 that matches your criteria - low mileage, perfect condition', sender: 'other', time: '7:46 AM' },
        { id: '4', text: 'The price is $625,000. Interested?', sender: 'other', time: '7:47 AM' },
      ],
    },
    {
      id: '4',
      name: 'Emma - Finance',
      avatar: 'EF',
      lastMessage: 'Your financing has been approved',
      time: 'Yesterday',
      unread: 0,
      online: false,
      messages: [
        { id: '1', text: 'Good news about your financing application!', sender: 'other', time: 'Yesterday 4:00 PM' },
        { id: '2', text: 'Tell me more!', sender: 'me', time: 'Yesterday 4:05 PM' },
        { id: '3', text: 'Your financing has been approved for up to $1.5M at 3.2% APR', sender: 'other', time: 'Yesterday 4:06 PM' },
        { id: '4', text: 'That\'s excellent! Thank you!', sender: 'me', time: 'Yesterday 4:10 PM' },
      ],
    },
  ]

  const activeConversation = conversations.find(c => c.id === selectedConversation)

  // Set default conversation on mount
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0].id)
    }
  }, [])

  const handleSendMessage = () => {
    if (messageInput.trim() && activeConversation) {
      // In production, send via API
      console.log('Sending message:', messageInput)
      setMessageInput('')
    }
  }

  if (!user) return null

  return (
    <div className="flex h-screen bg-[#0f0f0f]">
      <Sidebar role="client" />
      
      <div className="flex-1 flex ml-16">
        {/* Conversations List */}
        <div className="w-80 border-r border-white/5 bg-[#0a0a0a] flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-[#141414] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full p-4 flex items-start gap-3 border-b border-white/5 hover:bg-white/5 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-white/5' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center text-white font-medium">
                    {conversation.avatar}
                  </div>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0a]"></div>
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-white truncate">{conversation.name}</p>
                    <span className="text-xs text-white/40 font-light">{conversation.time}</span>
                  </div>
                  <p className="text-xs text-white/50 font-light truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#D67C3C] flex items-center justify-center">
                    <span className="text-xs text-white font-medium">{conversation.unread}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {activeConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="h-16 px-6 border-b border-white/5 flex items-center justify-between bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center text-white font-medium text-sm">
                    {activeConversation.avatar}
                  </div>
                  {activeConversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0a]"></div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{activeConversation.name}</p>
                  <p className="text-xs text-white/40 font-light">
                    {activeConversation.online ? 'Online' : 'Offline'}
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
              {activeConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-md ${
                    message.sender === 'me' ? 'bg-[#D67C3C]' : 'bg-[#141414]'
                  } rounded-lg px-4 py-3`}>
                    <p className="text-sm text-white font-light">{message.text}</p>
                    <span className="text-xs text-white/40 font-light mt-1 block">{message.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/5 bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <Paperclip size={20} className="text-white/60" />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 bg-[#141414] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-3 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white/40 font-light">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  )
}
