'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ArrowLeft, Package, User, Car, CreditCard, MapPin, Calendar, FileText, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Order {
  id: string
  orderNumber: string
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
  totalPrice: number
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  customer: {
    id: string
    name: string
    email: string
    phone: string
    avatar: string
  }
  vehicle: {
    id: string
    make: string
    model: string
    year: number
    price: number
    vin: string
    color: string
    images: string[]
  }
  deliveryAddress: {
    street: string
    city: string
    postcode: string
    country: string
  }
  notes?: string
  timeline: {
    date: string
    status: string
    description: string
  }[]
}

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with API call
    setTimeout(() => {
      const mockOrder: Order = {
        id: params.id as string,
        orderNumber: 'NL-2024-001',
        status: 'processing',
        createdAt: '2024-02-01T10:30:00Z',
        updatedAt: '2024-02-05T14:20:00Z',
        totalPrice: 325000,
        paymentMethod: 'bank_transfer',
        paymentStatus: 'paid',
        customer: {
          id: '1',
          name: 'Sarah Chen',
          email: 'sarah.chen@example.com',
          phone: '+44 20 7946 0456',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        },
        vehicle: {
          id: 'v1',
          make: 'Ferrari',
          model: '296 GTB',
          year: 2024,
          price: 325000,
          vin: 'ZFF11KLA0P0294810',
          color: 'Rosso Corsa',
          images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'],
        },
        deliveryAddress: {
          street: '42 Berkeley Square',
          city: 'London',
          postcode: 'W1J 5AJ',
          country: 'UK',
        },
        notes: 'Urgent delivery requested. Customer prefers delivery on weekends.',
        timeline: [
          {
            date: '2024-02-01T10:30:00Z',
            status: 'Order Placed',
            description: 'Order has been placed successfully',
          },
          {
            date: '2024-02-02T09:15:00Z',
            status: 'Payment Confirmed',
            description: 'Payment of £325,000 received via bank transfer',
          },
          {
            date: '2024-02-03T11:45:00Z',
            status: 'Vehicle Prepared',
            description: 'Vehicle inspection and preparation completed',
          },
          {
            date: '2024-02-05T14:20:00Z',
            status: 'Processing',
            description: 'Final documentation and delivery scheduling in progress',
          },
        ],
      }
      setOrder(mockOrder)
      setLoading(false)
    }, 500)
  }, [params.id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'processing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-white/10 text-white/60 border-white/20'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">Order not found</h2>
        <Link href="/admin/orders" className="text-primary-400 hover:text-primary-300">
          Back to orders
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 glass-effect rounded-lg border border-white/10 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-display font-bold gradient-text">Order Details</h1>
            <p className="text-white/60 mt-1">{order.orderNumber}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(order.status)}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-8 space-y-6">
          {/* Vehicle Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-xl border border-white/10 p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Car className="text-primary-400" size={20} />
              <h2 className="text-xl font-display font-bold text-white">Vehicle Information</h2>
            </div>
            <div className="flex space-x-4">
              <img
                src={order.vehicle.images[0]}
                alt={`${order.vehicle.make} ${order.vehicle.model}`}
                className="w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {order.vehicle.year} {order.vehicle.make} {order.vehicle.model}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-white/50">VIN</p>
                    <p className="text-white font-mono">{order.vehicle.vin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Color</p>
                    <p className="text-white">{order.vehicle.color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Price</p>
                    <p className="text-2xl font-bold gradient-text">
                      £{order.vehicle.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Customer Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-xl border border-white/10 p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <User className="text-primary-400" size={20} />
              <h2 className="text-xl font-display font-bold text-white">Customer Information</h2>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src={order.customer.avatar}
                alt={order.customer.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{order.customer.name}</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm text-white/50">Email</p>
                    <p className="text-white">{order.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Phone</p>
                    <p className="text-white">{order.customer.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Delivery Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-xl border border-white/10 p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="text-primary-400" size={20} />
              <h2 className="text-xl font-display font-bold text-white">Delivery Address</h2>
            </div>
            <div className="space-y-1 text-white">
              <p>{order.deliveryAddress.street}</p>
              <p>{order.deliveryAddress.city}, {order.deliveryAddress.postcode}</p>
              <p>{order.deliveryAddress.country}</p>
            </div>
          </motion.div>

          {/* Notes */}
          {order.notes && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="text-primary-400" size={20} />
                <h2 className="text-xl font-display font-bold text-white">Order Notes</h2>
              </div>
              <p className="text-white/80">{order.notes}</p>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-6">
          {/* Payment Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-effect rounded-xl border border-white/10 p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="text-primary-400" size={20} />
              <h2 className="text-lg font-display font-bold text-white">Payment</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-white/50">Total Amount</p>
                <p className="text-2xl font-bold gradient-text">£{order.totalPrice.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-white/50">Payment Method</p>
                <p className="text-white capitalize">{order.paymentMethod.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-white/50">Payment Status</p>
                <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(order.paymentStatus)}`}>
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-xl border border-white/10 p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="text-primary-400" size={20} />
              <h2 className="text-lg font-display font-bold text-white">Order Timeline</h2>
            </div>
            <div className="space-y-4">
              {order.timeline.map((event, index) => (
                <div key={index} className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary-500/20 border-2 border-primary-500 flex items-center justify-center">
                      <CheckCircle size={16} className="text-primary-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{event.status}</p>
                    <p className="text-sm text-white/60">{event.description}</p>
                    <p className="text-xs text-white/40 mt-1">{formatDate(event.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-xl border border-white/10 p-6"
          >
            <h2 className="text-lg font-display font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full btn-primary">Update Status</button>
              <button className="w-full px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                Contact Customer
              </button>
              <button className="w-full px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                Generate Invoice
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
