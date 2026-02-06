// Message Store - Simulates database storage
// In production, this will be replaced with Supabase

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
    this.initializeDefaultData()
  }

  private initializeDefaultData() {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('nordlion_messages')
      const savedConversations = localStorage.getItem('nordlion_conversations')

      if (savedMessages) {
        const parsed = JSON.parse(savedMessages)
        this.messages = new Map(Object.entries(parsed).map(([k, v]: [string, any]) => [
          k,
          (v as any[]).map(m => ({ ...m, timestamp: new Date(m.timestamp) }))
        ]))
      }

      if (savedConversations) {
        const parsed = JSON.parse(savedConversations)
        this.conversations = new Map(Object.entries(parsed))
      }

      // If no saved data, initialize with defaults
      if (!savedMessages || !savedConversations) {
        this.initializeDefaults()
      }
    }
  }

  private initializeDefaults() {
    // Client conversations (talking to brokers/support)
    const clientConversations: Conversation[] = [
      { id: 'c1', name: 'Sarah - Broker', avatar: 'SB', lastMessage: 'Your Porsche 911 GT3 RS is ready for delivery!', time: '2m ago', unread: 2, online: true, role: 'client' },
      { id: 'c2', name: 'Support Team', avatar: 'ST', lastMessage: 'We\'ve processed your document request', time: '1h ago', unread: 0, online: false, role: 'client' },
      { id: 'c3', name: 'John - Sales', avatar: 'JS', lastMessage: 'I found a Ferrari SF90 that matches your criteria', time: '3h ago', unread: 1, online: true, role: 'client' },
      { id: 'c4', name: 'Emma - Finance', avatar: 'EF', lastMessage: 'Your financing has been approved', time: 'Yesterday', unread: 0, online: false, role: 'client' },
    ]

    // Broker conversations (talking to clients)
    const brokerConversations: Conversation[] = [
      { id: 'b1', name: 'John Smith', avatar: 'JS', lastMessage: 'When can I view the Porsche?', time: '5m ago', unread: 3, online: true, role: 'broker' },
      { id: 'b2', name: 'Emma Wilson', avatar: 'EW', lastMessage: 'Thanks for the quote!', time: '1h ago', unread: 0, online: false, role: 'broker' },
      { id: 'b3', name: 'Michael Brown', avatar: 'MB', lastMessage: 'Looking for a Lamborghini', time: '3h ago', unread: 2, online: true, role: 'broker' },
      { id: 'b4', name: 'Sarah Johnson', avatar: 'SJ', lastMessage: 'Confirmed the delivery', time: 'Yesterday', unread: 0, online: false, role: 'broker' },
    ]

    // Store conversations
    clientConversations.forEach(c => this.conversations.set(c.id, c))
    brokerConversations.forEach(c => this.conversations.set(c.id, c))

    // Initialize default messages
    this.messages.set('c1', [
      { id: 'm1', conversationId: 'c1', text: 'Hello! I have an update on your order.', sender: 'other', senderName: 'Sarah', timestamp: new Date(), read: true },
      { id: 'm2', conversationId: 'c1', text: 'Great! What\'s the news?', sender: 'me', senderName: 'You', timestamp: new Date(), read: true },
      { id: 'm3', conversationId: 'c1', text: 'Your Porsche 911 GT3 RS has cleared customs and is ready for delivery!', sender: 'other', senderName: 'Sarah', timestamp: new Date(), read: false },
      { id: 'm4', conversationId: 'c1', text: 'That\'s fantastic! When can I expect it?', sender: 'me', senderName: 'You', timestamp: new Date(), read: true },
      { id: 'm5', conversationId: 'c1', text: 'We can arrange delivery for tomorrow afternoon. Does 2 PM work for you?', sender: 'other', senderName: 'Sarah', timestamp: new Date(), read: false },
    ])

    this.messages.set('b1', [
      { id: 'm6', conversationId: 'b1', text: 'Hi, I\'m interested in the Porsche 911 GT3 RS', sender: 'other', senderName: 'John', timestamp: new Date(), read: true },
      { id: 'm7', conversationId: 'b1', text: 'Great choice! When would you like to schedule a viewing?', sender: 'me', senderName: 'You', timestamp: new Date(), read: true },
      { id: 'm8', conversationId: 'b1', text: 'How about this weekend?', sender: 'other', senderName: 'John', timestamp: new Date(), read: false },
      { id: 'm9', conversationId: 'b1', text: 'Saturday at 2 PM works perfectly.', sender: 'me', senderName: 'You', timestamp: new Date(), read: true },
      { id: 'm10', conversationId: 'b1', text: 'When can I view the Porsche?', sender: 'other', senderName: 'John', timestamp: new Date(), read: false },
    ])

    this.saveToLocalStorage()
  }

  private saveToLocalStorage() {
    if (typeof window !== 'undefined') {
      const messagesObj: Record<string, Message[]> = {}
      this.messages.forEach((messages, conversationId) => {
        messagesObj[conversationId] = messages
      })

      const conversationsObj: Record<string, Conversation> = {}
      this.conversations.forEach((conversation, id) => {
        conversationsObj[id] = conversation
      })

      localStorage.setItem('nordlion_messages', JSON.stringify(messagesObj))
      localStorage.setItem('nordlion_conversations', JSON.stringify(conversationsObj))
    }
  }

  // Get conversations by role
  getConversations(role: 'client' | 'broker' | 'admin'): Conversation[] {
    return Array.from(this.conversations.values()).filter(c => c.role === role)
  }

  // Get messages for a conversation
  getMessages(conversationId: string): Message[] {
    return this.messages.get(conversationId) || []
  }

  // Add a new message
  addMessage(conversationId: string, message: Omit<Message, 'id'>): Message {
    const newMessage: Message = {
      ...message,
      id: `m${Date.now()}`,
    }

    const messages = this.messages.get(conversationId) || []
    messages.push(newMessage)
    this.messages.set(conversationId, messages)

    // Update conversation
    const conversation = this.conversations.get(conversationId)
    if (conversation) {
      conversation.lastMessage = message.text
      conversation.time = 'Just now'
      this.conversations.set(conversationId, conversation)
    }

    this.saveToLocalStorage()
    return newMessage
  }

  // Mark messages as read
  markAsRead(conversationId: string) {
    const messages = this.messages.get(conversationId) || []
    messages.forEach(m => {
      if (m.sender === 'other') {
        m.read = true
      }
    })
    this.messages.set(conversationId, messages)

    // Update unread count
    const conversation = this.conversations.get(conversationId)
    if (conversation) {
      conversation.unread = 0
      this.conversations.set(conversationId, conversation)
    }

    this.saveToLocalStorage()
  }

  // Get unread count for a conversation
  getUnreadCount(conversationId: string): number {
    const messages = this.messages.get(conversationId) || []
    return messages.filter(m => m.sender === 'other' && !m.read).length
  }

  // Clear all data (for testing)
  clearAll() {
    this.messages.clear()
    this.conversations.clear()
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nordlion_messages')
      localStorage.removeItem('nordlion_conversations')
    }
    this.initializeDefaults()
  }
}

export const messageStore = new MessageStore()
