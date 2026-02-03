'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react'
import { useState } from 'react'

const conversations = [
  {
    id: '1',
    name: 'Support Team',
    avatar: 'ST',
    lastMessage: 'Your vehicle will be delivered tomorrow',
    time: '10:30 AM',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'James Miller',
    avatar: 'JM',
    lastMessage: 'The Porsche specs look amazing!',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Concierge Service',
    avatar: 'CS',
    lastMessage: 'How can I assist you today?',
    time: '2 days ago',
    unread: 0,
    online: true,
  },
  {
    id: '4',
    name: 'Emma Watson',
    avatar: 'EW',
    lastMessage: 'Thank you for the recommendation',
    time: '3 days ago',
    unread: 0,
    online: false,
  },
]

const messages = [
  {
    id: '1',
    sender: 'them',
    text: 'Hello! Your Porsche 911 Turbo S order has been confirmed.',
    time: '10:00 AM',
  },
  {
    id: '2',
    sender: 'me',
    text: 'Great! When can I expect delivery?',
    time: '10:15 AM',
  },
  {
    id: '3',
    sender: 'them',
    text: 'Your vehicle will be delivered tomorrow between 2-4 PM. Our team will contact you an hour before arrival.',
    time: '10:30 AM',
  },
  {
    id: '4',
    sender: 'me',
    text: 'Perfect! Looking forward to it.',
    time: '10:32 AM',
  },
]

export default function MessagesPage() {
  const [selectedConv, setSelectedConv] = useState(conversations[0])
  const [messageText, setMessageText] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Here you would send the message
      setMessageText('')
    }
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)]">
        <div className="bg-[#141414] rounded-2xl border border-white/5 h-full flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-80 border-r border-white/5 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#32b8c6] transition-colors"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-white/[0.02] transition-colors border-b border-white/5 ${
                    selectedConv.id === conv.id ? 'bg-white/[0.05]' : ''
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#32b8c6] to-[#1a6873] flex items-center justify-center text-white font-semibold">
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#141414]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white truncate">{conv.name}</h3>
                      <span className="text-xs text-white/40 flex-shrink-0">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white/50 truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-[#32b8c6] text-white text-xs rounded-full flex-shrink-0">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#32b8c6] to-[#1a6873] flex items-center justify-center text-white font-semibold">
                    {selectedConv.avatar}
                  </div>
                  {selectedConv.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#141414]" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{selectedConv.name}</h3>
                  <p className="text-xs text-white/50">{selectedConv.online ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-white/60" />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-white/60" />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-white/60" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md ${
                      message.sender === 'me'
                        ? 'bg-[#32b8c6] text-white'
                        : 'bg-[#0a0a0a] text-white'
                    } px-4 py-3 rounded-2xl`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'me' ? 'text-white/70' : 'text-white/40'
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/5">
              <div className="flex items-end gap-3">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors flex-shrink-0">
                  <Paperclip className="w-5 h-5 text-white/60" />
                </button>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Type a message..."
                  rows={1}
                  className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#32b8c6] transition-colors resize-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-[#32b8c6] hover:bg-[#2aa0ad] rounded-xl transition-all flex-shrink-0"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
