'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Send, Paperclip, Search, MoreVertical } from 'lucide-react'

const conversations = [
  {
    id: '1',
    name: 'NordLion Support',
    avatar: null,
    lastMessage: 'Your vehicle delivery is scheduled for...',
    timestamp: '2 hours ago',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Sales Team',
    avatar: null,
    lastMessage: 'We have a special offer on the Porsche...',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Finance Department',
    avatar: null,
    lastMessage: 'Your payment has been processed',
    timestamp: '3 days ago',
    unread: 0,
    online: true,
  },
]

const messages = [
  {
    id: '1',
    sender: 'support',
    content: 'Hello! How can we assist you today?',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    sender: 'user',
    content: 'Hi, I wanted to check on my order status for the Porsche 911.',
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    sender: 'support',
    content: 'Of course! Let me check that for you right away.',
    timestamp: '10:33 AM',
  },
  {
    id: '4',
    sender: 'support',
    content: 'Your vehicle delivery is scheduled for February 20th, 2024. Everything is on track!',
    timestamp: '10:35 AM',
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messageInput, setMessageInput] = useState('')

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle send message
      setMessageInput('')
    }
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-80px)] flex">
        {/* Conversations List */}
        <div className="w-80 bg-[#141414] border-r border-white/5 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] transition-colors"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-white/[0.02] transition-colors border-b border-white/5 ${
                  selectedConversation.id === conversation.id ? 'bg-white/[0.05]' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{conversation.name[0]}</span>
                  </div>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#141414] rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium text-sm truncate">{conversation.name}</span>
                    <span className="text-xs text-white/40 font-light">{conversation.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white/50 font-light truncate pr-2">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <span className="flex-shrink-0 w-5 h-5 bg-[#D67C3C] rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 flex flex-col bg-[#0f0f0f]">
          {/* Header */}
          <div className="h-16 px-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D67C3C] to-[#B85A1F] flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{selectedConversation.name[0]}</span>
                </div>
                {selectedConversation.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0f0f0f] rounded-full" />
                )}
              </div>
              <div>
                <h2 className="text-white font-medium text-sm">{selectedConversation.name}</h2>
                <p className="text-xs text-white/40 font-light">{selectedConversation.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-md ${
                  message.sender === 'user'
                    ? 'bg-[#D67C3C] text-white'
                    : 'bg-[#141414] text-white'
                } rounded-2xl px-4 py-3`}>
                  <p className="text-sm font-light">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-white/40'
                  } font-light`}>
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
                <Paperclip className="w-5 h-5 text-white/60" />
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
                  className="w-full px-4 py-3 bg-[#141414] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] transition-colors resize-none"
                />
              </div>
              <button
                onClick={handleSendMessage}
                className="p-3 bg-[#D67C3C] hover:bg-[#B85A1F] rounded-xl transition-colors"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
