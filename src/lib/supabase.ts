import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client for browser usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client with service role (use only in server-side code)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password_hash: string
          first_name: string
          last_name: string
          role: 'client' | 'broker' | 'admin'
          phone: string | null
          location: string | null
          avatar_url: string | null
          verified: boolean
          status: 'active' | 'inactive' | 'suspended'
          last_active: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      vehicles: {
        Row: {
          id: string
          make: string
          model: string
          year: number
          price: number
          status: 'available' | 'reserved' | 'sold'
          mileage: number | null
          location: string | null
          vin: string | null
          description: string | null
          features: any
          specifications: any
          images: string[]
          views: number
          inquiries: number
          added_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['vehicles']['Row'], 'id' | 'created_at' | 'updated_at' | 'views' | 'inquiries'>
        Update: Partial<Database['public']['Tables']['vehicles']['Insert']>
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string
          vehicle_id: string
          broker_id: string | null
          price: number
          status: 'processing' | 'in-transit' | 'delivered' | 'completed' | 'cancelled'
          payment_status: 'pending' | 'paid' | 'refunded'
          tracking_number: string | null
          estimated_delivery: string | null
          delivery_address: string | null
          notes: string | null
          metadata: any
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          receiver_id: string
          content: string
          attachments: string[]
          read: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['messages']['Insert']>
      }
      documents: {
        Row: {
          id: string
          user_id: string
          order_id: string | null
          vehicle_id: string | null
          name: string
          type: string | null
          category: string | null
          file_url: string
          file_size: number | null
          status: 'pending' | 'approved' | 'rejected'
          uploaded_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['documents']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['documents']['Insert']>
      }
    }
  }
}
