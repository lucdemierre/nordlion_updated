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

export default function BrokerMessages() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState('')
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'John Smith',
      avatar: 'JS',
      lastMessage: 'When can I view the Porsche?',
      time: '5m ago',
      unread: 3,
      online: true,
      messages: [
        { id: '1', text: 'Hi, I\'m interested in the Porsche 911 GT3 RS', sender: 'other', time: '2:30 PM' },
        { id: '2', text: 'Great choice! It\'s an amazing vehicle. When would you like to schedule a viewing?', sender: 'me', time: '2:32 PM' },
        { id: '3', text: 'How about this weekend?', sender: 'other', time: '2:35 PM' },
        { id: '4', text: 'Saturday at 2 PM works perfectly. I\'ll arrange everything.', sender: 'me', time: '2:36 PM' },
        { id: '5', text: 'When can I view the Porsche?', sender: 'other', time: '2:40 PM' },
      ],
    },
    {
      id: '2',
      name: 'Emma Wilson',
      avatar: 'EW',
      lastMessage: 'Thanks for the quote!',
      time: '1h ago',
      unread: 0,
      online: false,
      messages: [
        { id: '1', text: 'Can you send me a quote for the Ferrari SF90?', sender: 'other', time: '1:00 PM' },
        { id: '2', text: 'Absolutely! The Ferrari SF90 is priced at $625,000. Would you like financing options?', sender: 'me', time: '1:05 PM' },
        { id: '3', text: 'Yes, please send me the financing details.', sender: 'other', time: '1:10 PM' },
        { id: '4', text: 'I\'ve sent the complete package to your email. Check it out!', sender: 'me', time: '1:15 PM' },
        { id: '5', text: 'Thanks for the quote!', sender: 'other', time: '1:20 PM' },
      ],
    },
    {
      id: '3',
      name: 'Michael Brown',
      avatar: 'MB',
      lastMessage: 'Looking for a Lamborghini',
      time: '3h ago',
      unread: 2,
      online: true,
      messages: [
        { id: '1', text: 'Do you have any Lamborghinis in stock?', sender: 'other', time: '11:30 AM' },
        { id: '2', text: 'We have a stunning Aventador SVJ available!', sender: 'me', time: '11:35 AM' },
        { id: '3', text: 'Looking for a Lamborghini', sender: 'other', time: '11:40 AM' },
      ],
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      lastMessage: 'Confirmed the delivery',
      time: 'Yesterday',
      unread: 0,
      online: false,
      messages: [
        { id: '1', text: 'Is my McLaren ready for delivery?', sender: 'other', time: 'Yesterday 4:00 PM' },
        { id: '2', text: 'Yes! We can deliver it tomorrow morning.', sender: 'me', time: 'Yesterday 4:05 PM' },
        { id: '3', text: 'Perfect! 10 AM works for me.', sender: 'other', time: 'Yesterday 4:10 PM' },
        { id: '4', text: 'Confirmed the delivery', sender: 'other', time: 'Yesterday 4:15 PM' },
      ],
    },
  ])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('broker')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
    
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0].id)
    }
  }, [router])

  const activeConversation = conversations.find(c => c.id === selectedConversation)

  const handleSendMessage = () => {
    if (messageInput.trim() && activeConversation) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageInput.trim(),
        sender: 'me',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      }

      setConversations(prevConversations => 
        prevConversations.map(conv => {
          if (conv.id === selectedConversation) {
            return {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: newMessage.text,
              time: 'Just now',
            }
          }
          return conv
        })
      )

      setMessageInput('')
      
      setTimeout(() => {
        const messagesContainer = document.querySelector('.messages-container')
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight
        }
      }, 100)
    }
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
