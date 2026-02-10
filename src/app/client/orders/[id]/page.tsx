'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  CreditCard, 
  MapPin, 
  Package, 
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Shield,
  Truck,
  Phone,
  Mail,
  Download
} from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  status: string
  paymentStatus: string
  paymentMethod: string
  amount: number
  downPayment: number
  financingDetails?: {
    financed: boolean
    provider: string
    term: number
    interestRate: number
    monthlyPayment: number
  }
  deliveryAddress: {
    street: string
    city: string
    postcode: string
    country: string
  }
  deliveryDate: string
  notes: string
  trackingInfo?: {
    carrier: string
    trackingNumber?: string
    status: string
  }
  insuranceInfo?: {
    provider: string
    policyNumber: string
    coverage: string
    value: number
  }
  documents: string[]
  vehicle: {
    make: string
    model: string
    year: number
    color: string
    vin: string
    images: string[]
  }
  createdAt: string
  updatedAt: string
}

const statusColors: Record<string, string> = {
  'pending': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'confirmed': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'processing': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'ready-for-delivery': 'bg-green-500/10 text-green-500 border-green-500/20',
  'delivered': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  'cancelled': 'bg-red-500/10 text-red-500 border-red-500/20',
}

const paymentStatusColors: Record<string, string> = {
  'pending': 'bg-yellow-500/10 text-yellow-500',
  'paid': 'bg-green-500/10 text-green-500',
  'failed': 'bg-red-500/10 text-red-500',
  'refunded': 'bg-gray-500/10 text-gray-500',
}

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrderDetails()
  }, [params.id])

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setOrder(data)
      }
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const downloadDocument = (doc: string) => {
    // In production, this would download from server
    console.log('Downloading:', doc)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-white/60">Loading order details...</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl text-white mb-2">Order Not Found</h2>
          <p className="text-white/60 mb-6">The order you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/client/orders')}
            className="bg-[#D67C3C] hover:bg-[#B85A1F] text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/client/orders')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Orders
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-white mb-2">Order Details</h1>
              <p className="text-white/60">Order #{order.orderNumber}</p>
            </div>
            <div className="flex gap-3">
              <span className={`px-4 py-2 rounded-lg border text-sm font-medium ${statusColors[order.status]}`}>
                {order.status.replace('-', ' ').toUpperCase()}
              </span>
              <span className={`px-4 py-2 rounded-lg text-sm font-medium ${paymentStatusColors[order.paymentStatus]}`}>
                {order.paymentStatus.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vehicle Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="relative h-64">
                <img
                  src={order.vehicle.images[0]}
                  alt={`${order.vehicle.make} ${order.vehicle.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-light text-white mb-2">
                  {order.vehicle.year} {order.vehicle.make} {order.vehicle.model}
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/40 mb-1">Color</p>
                    <p className="text-white">{order.vehicle.color}</p>
                  </div>
                  <div>
                    <p className="text-white/40 mb-1">VIN</p>
                    <p className="text-white font-mono text-xs">{order.vehicle.vin}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Order Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#141414] border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-light text-white mb-6 flex items-center gap-2">
                <Clock size={20} className="text-[#D67C3C]" />
                Order Timeline
              </h3>
              <div className="space-y-4">
                <TimelineItem
                  title="Order Placed"
                  date={formatDate(order.createdAt)}
                  completed={true}
                />
                <TimelineItem
                  title="Payment Confirmed"
                  date={order.paymentStatus === 'paid' ? formatDate(order.createdAt) : undefined}
                  completed={order.paymentStatus === 'paid'}
                />
                <TimelineItem
                  title="Processing"
                  completed={['processing', 'ready-for-delivery', 'delivered'].includes(order.status)}
                />
                <TimelineItem
                  title="Ready for Delivery"
                  completed={['ready-for-delivery', 'delivered'].includes(order.status)}
                />
                <TimelineItem
                  title="Delivered"
                  date={order.status === 'delivered' && order.deliveryDate ? formatDate(order.deliveryDate) : undefined}
                  completed={order.status === 'delivered'}
                />
              </div>
            </motion.div>

            {/* Delivery Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#141414] border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-light text-white mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-[#D67C3C]" />
                Delivery Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-white/40 text-sm mb-1">Delivery Address</p>
                  <p className="text-white">{order.deliveryAddress.street}</p>
                  <p className="text-white">
                    {order.deliveryAddress.city}, {order.deliveryAddress.postcode}
                  </p>
                  <p className="text-white">{order.deliveryAddress.country}</p>
                </div>
                {order.deliveryDate && (
                  <div>
                    <p className="text-white/40 text-sm mb-1">Expected Delivery</p>
                    <p className="text-white">{formatDate(order.deliveryDate)}</p>
                  </div>
                )}
                {order.trackingInfo && (
                  <div className="bg-[#0a0a0a] rounded-lg p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck size={16} className="text-[#D67C3C]" />
                      <p className="text-white font-medium">{order.trackingInfo.carrier}</p>
                    </div>
                    {order.trackingInfo.trackingNumber && (
                      <p className="text-sm text-white/60 font-mono">{order.trackingInfo.trackingNumber}</p>
                    )}
                    <p className="text-sm text-white/80 mt-2">{order.trackingInfo.status}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Notes */}
            {order.notes && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#141414] border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-xl font-light text-white mb-4">Order Notes</h3>
                <p className="text-white/80 text-sm leading-relaxed">{order.notes}</p>
              </motion.div>
            )}
          </div>

          {/* Right Column - Financial & Documents */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#141414] border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-light text-white mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-[#D67C3C]" />
                Payment Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/60">Vehicle Price</span>
                  <span className="text-white font-medium">{formatCurrency(order.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Down Payment</span>
                  <span className="text-white font-medium">{formatCurrency(order.downPayment)}</span>
                </div>
                {order.financingDetails && (
                  <>
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-white font-medium mb-2">Financing Details</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Provider</span>
                          <span className="text-white">{order.financingDetails.provider}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Term</span>
                          <span className="text-white">{order.financingDetails.term} months</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Interest Rate</span>
                          <span className="text-white">{order.financingDetails.interestRate}%</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span className="text-white/60">Monthly Payment</span>
                          <span className="text-[#D67C3C]">{formatCurrency(order.financingDetails.monthlyPayment)}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between">
                    <span className="text-white/60">Payment Method</span>
                    <span className="text-white">{order.paymentMethod}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Insurance */}
            {order.insuranceInfo && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#141414] border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-xl font-light text-white mb-6 flex items-center gap-2">
                  <Shield size={20} className="text-[#D67C3C]" />
                  Insurance
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-white/40 mb-1">Provider</p>
                    <p className="text-white">{order.insuranceInfo.provider}</p>
                  </div>
                  <div>
                    <p className="text-white/40 mb-1">Policy Number</p>
                    <p className="text-white font-mono text-xs">{order.insuranceInfo.policyNumber}</p>
                  </div>
                  <div>
                    <p className="text-white/40 mb-1">Coverage</p>
                    <p className="text-white">{order.insuranceInfo.coverage}</p>
                  </div>
                  <div>
                    <p className="text-white/40 mb-1">Insured Value</p>
                    <p className="text-white font-medium">{formatCurrency(order.insuranceInfo.value)}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Documents */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#141414] border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-light text-white mb-6 flex items-center gap-2">
                <FileText size={20} className="text-[#D67C3C]" />
                Documents
              </h3>
              <div className="space-y-2">
                {order.documents.map((doc, index) => (
                  <button
                    key={index}
                    onClick={() => downloadDocument(doc)}
                    className="w-full flex items-center justify-between p-3 bg-[#0a0a0a] hover:bg-white/5 border border-white/5 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-white/40" />
                      <span className="text-sm text-white">{doc}</span>
                    </div>
                    <Download size={16} className="text-white/40 group-hover:text-[#D67C3C] transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#141414] border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-light text-white mb-4">Need Help?</h3>
              <p className="text-white/60 text-sm mb-4">Our team is here to assist you with any questions.</p>
              <div className="space-y-2">
                <a
                  href="mailto:support@nordlion.com"
                  className="flex items-center gap-2 text-[#D67C3C] hover:text-[#B85A1F] transition-colors text-sm"
                >
                  <Mail size={16} />
                  support@nordlion.com
                </a>
                <a
                  href="tel:+442079460958"
                  className="flex items-center gap-2 text-[#D67C3C] hover:text-[#B85A1F] transition-colors text-sm"
                >
                  <Phone size={16} />
                  +44 20 7946 0958
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TimelineItem({ title, date, completed }: { title: string; date?: string; completed: boolean }) {
  return (
    <div className="flex items-start gap-4">
      <div className="relative">
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
          completed 
            ? 'bg-[#D67C3C] border-[#D67C3C]' 
            : 'bg-[#0a0a0a] border-white/20'
        }`}>
          {completed && <CheckCircle size={16} className="text-white" />}
        </div>
      </div>
      <div className="flex-1 pb-4">
        <p className={`font-medium ${
          completed ? 'text-white' : 'text-white/40'
        }`}>{title}</p>
        {date && <p className="text-sm text-white/60 mt-1">{date}</p>}
      </div>
    </div>
  )
}
