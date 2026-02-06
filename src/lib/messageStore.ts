// Message Store - Complete persistence system
// Stores messages in localStorage with full history

export interface Message {
  id: string
  conversationId: string
  text: string
  sender: 'me' | 'other'
  senderName: string
  timestamp: Date
  read: boolean
}

export interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  role: 'client' | 'broker' | 'admin'
}

class MessageStore {
  private messages: Map<string, Message[]> = new Map()
  private conversations: Map<string, Conversation> = new Map()

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage()
      if (this.conversations.size === 0) {
        this.initializeDefaultConversations()
      }
    }
  }

  private loadFromStorage() {
    try {
      const storedMessages = localStorage.getItem('nordlion_messages')
      const storedConversations = localStorage.getItem('nordlion_conversations')

      if (storedMessages) {
        const parsed = JSON.parse(storedMessages)
        Object.entries(parsed).forEach(([convId, msgs]: [string, any[]]) => {
          this.messages.set(
            convId,
            msgs.map(m => ({ ...m, timestamp: new Date(m.timestamp) }))
          )
        })
      }

      if (storedConversations) {
        const parsed = JSON.parse(storedConversations)
        Object.entries(parsed).forEach(([id, conv]: [string, any]) => {
          this.conversations.set(id, conv)
        })
      }
    } catch (error) {
      console.error('Failed to load messages from storage:', error)
    }
  }

  private saveToStorage() {
    try {
      const messagesObj: Record<string, Message[]> = {}
      this.messages.forEach((msgs, convId) => {
        messagesObj[convId] = msgs
      })

      const conversationsObj: Record<string, Conversation> = {}
      this.conversations.forEach((conv, id) => {
        conversationsObj[id] = conv
      })

      localStorage.setItem('nordlion_messages', JSON.stringify(messagesObj))
      localStorage.setItem('nordlion_conversations', JSON.stringify(conversationsObj))
    } catch (error) {
      console.error('Failed to save messages to storage:', error)
    }
  }

  private initializeDefaultConversations() {
    const defaultConversations: Conversation[] = [
      {
        id: 'broker-1',
        name: 'Sarah Johnson (Broker)',
        avatar: 'SJ',
        lastMessage: 'Your Porsche GT3 RS order is being processed',
        time: '2m ago',
        unread: 2,
        online: true,
        role: 'client'
      },
      {
        id: 'support',
        name: 'Support Team',
        avatar: 'ST',
        lastMessage: 'How can we help you today?',
        time: '1h ago',
        unread: 0,
        online: true,
        role: 'client'
      },
      {
        id: 'client-1',
        name: 'John Smith',
        avatar: 'JS',
        lastMessage: 'Thank you for the update!',
        time: '3h ago',
        unread: 1,
        online: false,
        role: 'broker'
      }
    ]

    const defaultMessages: Record<string, Message[]> = {
      'broker-1': [
        {
          id: 'm1',
          conversationId: 'broker-1',
          text: 'Hello! I\'m Sarah, your assigned broker. I\'ll be helping you with your vehicle purchase.',
          sender: 'other',
          senderName: 'Sarah Johnson',
          timestamp: new Date(Date.now() - 3600000),
          read: true
        },
        {
          id: 'm2',
          conversationId: 'broker-1',
          text: 'Hi Sarah! Thank you. I\'m interested in the Porsche 911 GT3 RS.',
          sender: 'me',
          senderName: 'You',
          timestamp: new Date(Date.now() - 3500000),
          read: true
        },
        {
          id: 'm3',
          conversationId: 'broker-1',
          text: 'Excellent choice! That\'s one of our most popular models. The GT3 RS is currently available in GT Silver Metallic.',
          sender: 'other',
          senderName: 'Sarah Johnson',
          timestamp: new Date(Date.now() - 3400000),
          read: true
        },
        {
          id: 'm4',
          conversationId: 'broker-1',
          text: 'Perfect! What\'s the next step?',
          sender: 'me',
          senderName: 'You',
          timestamp: new Date(Date.now() - 3300000),
          read: true
        },
        {
          id: 'm5',
          conversationId: 'broker-1',
          text: 'I\'ve started processing your order. I\'ll need some documents from you.',
          sender: 'other',
          senderName: 'Sarah Johnson',
          timestamp: new Date(Date.now() - 120000),
          read: false
        },
        {
          id: 'm6',
          conversationId: 'broker-1',
          text: 'Your Porsche GT3 RS order is being processed. Expected delivery: 2-3 weeks.',
          sender: 'other',
          senderName: 'Sarah Johnson',
          timestamp: new Date(Date.now() - 60000),
          read: false
        }
      ],
      'support': [
        {
          id: 's1',
          conversationId: 'support',
          text: 'Welcome to NordLion Auto! How can we help you today?',
          sender: 'other',
          senderName: 'Support Team',
          timestamp: new Date(Date.now() - 7200000),
          read: true
        },
        {
          id: 's2',
          conversationId: 'support',
          text: 'I have a question about vehicle shipping.',
          sender: 'me',
          senderName: 'You',
          timestamp: new Date(Date.now() - 7100000),
          read: true
        },
        {
          id: 's3',
          conversationId: 'support',
          text: 'We offer worldwide shipping! Would you like more details?',
          sender: 'other',
          senderName: 'Support Team',
          timestamp: new Date(Date.now() - 7000000),
          read: true
        }
      ],
      'client-1': [
        {
          id: 'c1',
          conversationId: 'client-1',
          text: 'Your Ferrari SF90 has arrived at our facility!',
          sender: 'me',
          senderName: 'You',
          timestamp: new Date(Date.now() - 10800000),
          read: true
        },
        {
          id: 'c2',
          conversationId: 'client-1',
          text: 'That\'s great news! When can I pick it up?',
          sender: 'other',
          senderName: 'John Smith',
          timestamp: new Date(Date.now() - 10700000),
          read: false
        },
        {
          id: 'c3',
          conversationId: 'client-1',
          text: 'You can schedule a pickup anytime this week.',
          sender: 'me',
          senderName: 'You',
          timestamp: new Date(Date.now() - 10600000),
          read: true
        },
        {
          id: 'c4',
          conversationId: 'client-1',
          text: 'Thank you for the update!',
          sender: 'other',
          senderName: 'John Smith',
          timestamp: new Date(Date.now() - 10500000),
          read: false
        }
      ]
    }

    defaultConversations.forEach(c => this.conversations.set(c.id, c))
    Object.entries(defaultMessages).forEach(([convId, msgs]) => this.messages.set(convId, msgs))
    
    this.saveToStorage()
  }

  getConversations(role: 'client' | 'broker' | 'admin'): Conversation[] {
    return Array.from(this.conversations.values())
      .filter(c => c.role === role)
      .sort((a, b) => {
        // Sort by unread first, then by time
        if (a.unread > 0 && b.unread === 0) return -1
        if (a.unread === 0 && b.unread > 0) return 1
        return 0
      })
  }

  getMessages(conversationId: string): Message[] {
    const messages = this.messages.get(conversationId) || []
    return messages.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
  }

  addMessage(conversationId: string, message: Omit<Message, 'id'>): void {
    const newMessage: Message = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    const existing = this.messages.get(conversationId) || []
    existing.push(newMessage)
    this.messages.set(conversationId, existing)

    // Update conversation
    const conversation = this.conversations.get(conversationId)
    if (conversation) {
      conversation.lastMessage = message.text.substring(0, 50) + (message.text.length > 50 ? '...' : '')
      conversation.time = 'Just now'
      this.conversations.set(conversationId, conversation)
    }

    this.saveToStorage()
  }

  markAsRead(conversationId: string): void {
    const conversation = this.conversations.get(conversationId)
    if (conversation) {
      conversation.unread = 0
      this.conversations.set(conversationId, conversation)
      this.saveToStorage()
    }

    // Mark all messages as read
    const messages = this.messages.get(conversationId)
    if (messages) {
      messages.forEach(m => m.read = true)
      this.messages.set(conversationId, messages)
      this.saveToStorage()
    }
  }

  getUnreadCount(conversationId: string): number {
    const conversation = this.conversations.get(conversationId)
    return conversation?.unread || 0
  }

  clearAllData(): void {
    this.messages.clear()
    this.conversations.clear()
    localStorage.removeItem('nordlion_messages')
    localStorage.removeItem('nordlion_conversations')
    this.initializeDefaultConversations()
  }
}

export const messageStore = new MessageStore()
