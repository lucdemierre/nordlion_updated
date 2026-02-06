import { supabase, supabaseAdmin } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type User = Database['public']['Tables']['users']['Row']
type Vehicle = Database['public']['Tables']['vehicles']['Row']
type Order = Database['public']['Tables']['orders']['Row']
type Message = Database['public']['Tables']['messages']['Row']

// User queries
export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error) throw error
  return data as User
}

export async function getUserById(id: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as User
}

export async function createUser(userData: Database['public']['Tables']['users']['Insert']) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .insert(userData)
    .select()
    .single()

  if (error) throw error
  return data as User
}

export async function updateUser(id: string, updates: Database['public']['Tables']['users']['Update']) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as User
}

// Vehicle queries
export async function getAllVehicles(filters?: {
  status?: string
  make?: string
  minPrice?: number
  maxPrice?: number
}) {
  let query = supabase.from('vehicles').select('*')

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  if (filters?.make) {
    query = query.eq('make', filters.make)
  }
  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice)
  }
  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) throw error
  return data as Vehicle[]
}

export async function getVehicleById(id: string) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Vehicle
}

export async function createVehicle(vehicleData: Database['public']['Tables']['vehicles']['Insert']) {
  const { data, error } = await supabase
    .from('vehicles')
    .insert(vehicleData)
    .select()
    .single()

  if (error) throw error
  return data as Vehicle
}

export async function updateVehicle(id: string, updates: Database['public']['Tables']['vehicles']['Update']) {
  const { data, error } = await supabase
    .from('vehicles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Vehicle
}

export async function deleteVehicle(id: string) {
  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Order queries
export async function getOrdersByUserId(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      vehicle:vehicles(*),
      broker:users!orders_broker_id_fkey(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createOrder(orderData: Database['public']['Tables']['orders']['Insert']) {
  const { data, error } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single()

  if (error) throw error
  return data as Order
}

// Message queries
export async function getMessagesByConversation(conversationId: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data as Message[]
}

export async function createMessage(messageData: Database['public']['Tables']['messages']['Insert']) {
  const { data, error } = await supabase
    .from('messages')
    .insert(messageData)
    .select()
    .single()

  if (error) throw error
  return data as Message
}

export async function markMessagesAsRead(conversationId: string, userId: string) {
  const { error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('conversation_id', conversationId)
    .eq('receiver_id', userId)
    .eq('read', false)

  if (error) throw error
}
