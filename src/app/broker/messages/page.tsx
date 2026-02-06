'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { messageStore, type Message, type Conversation } from '@/lib/messageStore'
import { Search, Send, Paperclip, Phone, Video, MoreVertical } from 'lucide-react'

export default function BrokerMessages() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState('')
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('broker')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
    
    // Load conversations
    const convos = messageStore.getConversations('broker')
    setConversations(convos)
    
    // Set default conversation
    if (convos.length > 0 && !selectedConversation) {
      setSelectedConversation(convos[0].id)
      setMessages(messageStore.getMessages(convos[0].id))
      messageStore.markAsRead(convos[0].id)
    }
  }, [router])

  useEffect(() => {
    if (selectedConversation) {
      const msgs = messageStore.getMessages(selectedConversation)
      setMessages(msgs)
      
      // Mark as read and update conversations
      messageStore.markAsRead(selectedConversation)
      const updatedConvos = messageStore.getConversations('broker')
      setConversations(updatedConvos)
      
      setTimeout(() => {
        const container = document.querySelector('.messages-container')
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      }, 100)
    }
  }, [selectedConversation])

  const activeConversation = conversations.find(c => c.id === selectedConversation)

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      messageStore.addMessage(selectedConversation, {
        conversationId: selectedConversation,
        text: messageInput.trim(),
        sender: 'me',
        senderName: 'You',
        timestamp: new Date(),
        read: true,
      })

      const updatedMessages = messageStore.getMessages(selectedConversation)
      setMessages(updatedMessages)
      
      const updatedConvos = messageStore.getConversations('broker')
      setConversations(updatedConvos)

      setMessageInput('')
      
      setTimeout(() => {
        const container = document.querySelector('.messages-container')
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      }, 100)
    }
  }

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit' 
    })
  }

  if (!user) return null

  return (
    <div className="flex h-screen bg-[#0f0f0f]">
      <Sidebar role="broker" />
      
      <div className="flex-1 flex ml-16">
        <div className="w-80 border-r border-white/5 bg-[#0a0a0a] flex flex-col">
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search clients..."
                className="w-full pl-10 pr-4 py-2 bg-[#141414] border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light"
              />
            </div>
          </div>

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

        {activeConversation ? (
          <div className="flex-1 flex flex-col">
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

            <div className="flex-1 overflow-y-auto p-6 space-y-4 messages-container">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-md ${
                    message.sender === 'me' ? 'bg-[#D67C3C]' : 'bg-[#141414]'
                  } rounded-lg px-4 py-3`}>
                    <p className="text-sm text-white font-light">{message.text}</p>
                    <span className="text-xs text-white/40 font-light mt-1 block">{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>

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
                  disabled={!messageInput.trim()}
                  className="px-4 py-3 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
