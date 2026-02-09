'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, canAccessDashboard } from '@/lib/auth'
import { Search, Filter, Plus, Edit, Trash2, Eye, X, Upload, DollarSign } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  condition: string
  status: string
  featured: boolean
  images: string[]
  description: string
  specifications: any
  views?: number
}

export default function AdminVehicles() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add')
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || !canAccessDashboard('admin')) {
      router.push('/auth/login')
      return
    }
    setUser(currentUser)
    fetchVehicles()
  }, [router])

  const fetchVehicles = async () => {
    try {
      // TODO: Replace with real API when backend is ready
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vehicles`)
      // const data = await response.json()
      // setVehicles(data.vehicles)
      
      // Mock data from seeded database
      setTimeout(() => {
        setVehicles([
          {
            id: '1',
            make: 'Ferrari',
            model: '296 GTB',
            year: 2024,
            price: 325000,
            mileage: 250,
            condition: 'new',
            status: 'available',
            featured: true,
            images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888'],
            description: 'Stunning Ferrari 296 GTB with hybrid V6 powertrain',
            specifications: { engine: '3.0L V6', power: '830hp', transmission: '8-speed' },
            views: 1247
          },
          {
            id: '2',
            make: 'Lamborghini',
            model: 'Revuelto',
            year: 2024,
            price: 608358,
            mileage: 100,
            condition: 'new',
            status: 'available',
            featured: true,
            images: ['https://images.unsplash.com/photo-1544829099-b9a0c07fad1a'],
            description: 'First-ever V12 hybrid super sports car from Lamborghini',
            specifications: { engine: '6.5L V12', power: '1015hp', transmission: '8-speed' },
            views: 2145
          },
          {
            id: '3',
            make: 'Porsche',
            model: '911 Turbo S',
            year: 2023,
            price: 230000,
            mileage: 1500,
            condition: 'used',
            status: 'sold',
            featured: false,
            images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70'],
            description: 'Iconic 911 with incredible performance',
            specifications: { engine: '3.8L Flat-6', power: '640hp', transmission: '8-speed PDK' },
            views: 3421
          },
          {
            id: '4',
            make: 'McLaren',
            model: '750S',
            year: 2024,
            price: 324000,
            mileage: 50,
            condition: 'new',
            status: 'available',
            featured: true,
            images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d'],
            description: 'The most powerful series-production McLaren ever',
            specifications: { engine: '4.0L V8', power: '750hp', transmission: '7-speed' },
            views: 1876
          },
          {
            id: '5',
            make: 'Aston Martin',
            model: 'DBS 770 Ultimate',
            year: 2023,
            price: 395000,
            mileage: 500,
            condition: 'new',
            status: 'available',
            featured: false,
            images: ['https://images.unsplash.com/photo-1580414057011-c81e21178a76'],
            description: 'Final edition of the DBS Superleggera',
            specifications: { engine: '5.2L V12', power: '770hp', transmission: '8-speed' },
            views: 1543
          },
          {
            id: '6',
            make: 'Bentley',
            model: 'Continental GT Speed',
            year: 2023,
            price: 285000,
            mileage: 800,
            condition: 'used',
            status: 'pending',
            featured: false,
            images: ['https://images.unsplash.com/photo-1617654112368-307921291f42'],
            description: 'Luxury grand tourer with unmatched comfort',
            specifications: { engine: '6.0L W12', power: '659hp', transmission: '8-speed' },
            views: 987
          },
          {
            id: '7',
            make: 'Rolls-Royce',
            model: 'Spectre',
            year: 2024,
            price: 420000,
            mileage: 0,
            condition: 'new',
            status: 'available',
            featured: true,
            images: ['https://images.unsplash.com/photo-1563720360172-67b8f3dce741'],
            description: 'The first fully electric Rolls-Royce',
            specifications: { engine: 'Electric', power: '577hp', transmission: 'Single-speed' },
            views: 2341
          },
          {
            id: '8',
            make: 'Mercedes-AMG',
            model: 'GT Black Series',
            year: 2022,
            price: 389000,
            mileage: 1200,
            condition: 'used',
            status: 'available',
            featured: false,
            images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8'],
            description: 'Track-focused supercar from AMG',
            specifications: { engine: '4.0L V8', power: '720hp', transmission: '7-speed DCT' },
            views: 1654
          },
          {
            id: '9',
            make: 'Bugatti',
            model: 'Chiron Super Sport',
            year: 2022,
            price: 3900000,
            mileage: 800,
            condition: 'used',
            status: 'available',
            featured: true,
            images: ['https://images.unsplash.com/photo-1566023888012-f8f9c6da149a'],
            description: 'One of the fastest production cars ever made',
            specifications: { engine: '8.0L W16', power: '1600hp', transmission: '7-speed DSG' },
            views: 8934
          },
          {
            id: '10',
            make: 'Pagani',
            model: 'Huayra Roadster BC',
            year: 2023,
            price: 3500000,
            mileage: 200,
            condition: 'new',
            status: 'reserved',
            featured: true,
            images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e'],
            description: 'Bespoke Italian hypercar, extremely rare',
            specifications: { engine: '6.0L V12', power: '800hp', transmission: '7-speed' },
            views: 12456
          },
        ])
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Failed to fetch vehicles:', error)
      setLoading(false)
    }
  }

  const handleAddVehicle = () => {
    setModalMode('add')
    setSelectedVehicle(null)
    setFormData({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      condition: 'new',
      status: 'available',
      featured: false,
      images: [],
      description: '',
      specifications: {}
    })
    setShowModal(true)
  }

  const handleEditVehicle = (vehicle: Vehicle) => {
    setModalMode('edit')
    setSelectedVehicle(vehicle)
    setFormData(vehicle)
    setShowModal(true)
  }

  const handleViewVehicle = (vehicle: Vehicle) => {
    setModalMode('view')
    setSelectedVehicle(vehicle)
    setShowModal(true)
  }

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return

    try {
      // TODO: Replace with real API
      // const token = localStorage.getItem('token')
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vehicles/${vehicleId}`, {
      //   method: 'DELETE',
      //   headers: { 'Authorization': `Bearer ${token}` }
      // })
      
      setVehicles(vehicles.filter(v => v.id !== vehicleId))
      alert('Vehicle deleted successfully!')
    } catch (error) {
      console.error('Failed to delete vehicle:', error)
      alert('Failed to delete vehicle')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // TODO: Replace with real API
      // const token = localStorage.getItem('token')
      // const url = modalMode === 'add'
      //   ? `${process.env.NEXT_PUBLIC_API_URL}/api/vehicles`
      //   : `${process.env.NEXT_PUBLIC_API_URL}/api/vehicles/${selectedVehicle?.id}`
      // 
      // const response = await fetch(url, {
      //   method: modalMode === 'add' ? 'POST' : 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(formData)
      // })
      // const data = await response.json()

      if (modalMode === 'add') {
        const newVehicle = { ...formData, id: Date.now().toString(), views: 0 }
        setVehicles([...vehicles, newVehicle])
      } else {
        setVehicles(vehicles.map(v => v.id === selectedVehicle?.id ? { ...formData, id: v.id } : v))
      }

      setShowModal(false)
      alert(`Vehicle ${modalMode === 'add' ? 'added' : 'updated'} successfully!`)
    } catch (error) {
      console.error('Failed to save vehicle:', error)
      alert('Failed to save vehicle')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/10 text-green-400'
      case 'sold': return 'bg-red-500/10 text-red-400'
      case 'pending': return 'bg-yellow-500/10 text-yellow-400'
      case 'reserved': return 'bg-blue-500/10 text-blue-400'
      default: return 'bg-white/5 text-white/40'
    }
  }

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || vehicle.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D67C3C]"></div>
      </div>
    )
  }

  return (
    <div>
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-white">Vehicle Management</h1>
              <p className="text-sm text-white/50 font-light mt-1">{vehicles.length} total vehicles</p>
            </div>
            <button
              onClick={handleAddVehicle}
              className="px-4 py-2 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Add Vehicle
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vehicles..."
              className="w-full pl-10 pr-4 py-3 bg-[#141414] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#D67C3C] font-light"
            />
          </div>
          <button className="px-4 py-3 bg-[#141414] border border-white/10 hover:border-white/20 rounded-xl text-white transition-colors flex items-center gap-2">
            <Filter size={18} />
            <span className="text-sm font-light">Filter</span>
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          {['all', 'available', 'sold', 'pending', 'reserved'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-light transition-colors whitespace-nowrap ${
                selectedStatus === status ? 'bg-[#D67C3C] text-white' : 'bg-[#141414] text-white/50 hover:text-white border border-white/5'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden hover:border-[#D67C3C]/50 transition-all group"
            >
              <div className="relative h-48 bg-white/5">
                <img
                  src={vehicle.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
                {vehicle.featured && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#D67C3C] text-white text-xs font-semibold rounded-full">
                    FEATURED
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {vehicle.make} {vehicle.model}
                </h3>
                <p className="text-sm text-white/50 mb-3">{vehicle.year} • {vehicle.mileage.toLocaleString()} miles</p>
                <p className="text-2xl font-bold text-[#D67C3C] mb-4">
                  £{vehicle.price.toLocaleString()}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <button
                    onClick={() => handleViewVehicle(vehicle)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    title="View"
                  >
                    <Eye size={18} className="text-white/60" />
                  </button>
                  <button
                    onClick={() => handleEditVehicle(vehicle)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit size={18} className="text-white/60" />
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} className="text-red-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Add/Edit/View Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141414] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-[#141414] border-b border-white/10 p-6 flex items-center justify-between">
                <h2 className="text-xl font-light text-white">
                  {modalMode === 'add' ? 'Add Vehicle' : modalMode === 'edit' ? 'Edit Vehicle' : 'Vehicle Details'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <X size={20} className="text-white/60" />
                </button>
              </div>

              {modalMode === 'view' ? (
                <div className="p-6 space-y-6">
                  <img
                    src={selectedVehicle?.images[0]}
                    alt={`${selectedVehicle?.make} ${selectedVehicle?.model}`}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {selectedVehicle?.make} {selectedVehicle?.model}
                    </h3>
                    <p className="text-3xl font-bold text-[#D67C3C] mb-4">
                      £{selectedVehicle?.price.toLocaleString()}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/5 p-4 rounded-lg">
                        <p className="text-white/50 text-sm mb-1">Year</p>
                        <p className="text-white font-semibold">{selectedVehicle?.year}</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <p className="text-white/50 text-sm mb-1">Mileage</p>
                        <p className="text-white font-semibold">{selectedVehicle?.mileage.toLocaleString()} miles</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <p className="text-white/50 text-sm mb-1">Condition</p>
                        <p className="text-white font-semibold capitalize">{selectedVehicle?.condition}</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <p className="text-white/50 text-sm mb-1">Status</p>
                        <p className="text-white font-semibold capitalize">{selectedVehicle?.status}</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">Description</h4>
                      <p className="text-white/70">{selectedVehicle?.description}</p>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-3">Specifications</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(selectedVehicle?.specifications || {}).map(([key, value]) => (
                          <div key={key} className="bg-white/5 p-3 rounded-lg">
                            <p className="text-white/50 text-xs mb-1 capitalize">{key}</p>
                            <p className="text-white text-sm font-medium">{value as string}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {selectedVehicle?.views && (
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <p className="text-white/50 text-sm">Views: <span className="text-white font-semibold">{selectedVehicle.views.toLocaleString()}</span></p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Make</label>
                      <input
                        type="text"
                        value={formData.make}
                        onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D67C3C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Model</label>
                      <input
                        type="text"
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D67C3C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Year</label>
                      <input
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D67C3C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Price (£)</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D67C3C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Mileage</label>
                      <input
                        type="number"
                        value={formData.mileage}
                        onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
                        required
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D67C3C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Condition</label>
                      <select
                        value={formData.condition}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D67C3C]"
                      >
                        <option value="new">New</option>
                        <option value="used">Used</option>
                        <option value="certified">Certified Pre-Owned</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D67C3C]"
                      >
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                        <option value="pending">Pending</option>
                        <option value="reserved">Reserved</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="w-4 h-4 rounded border-white/10 text-[#D67C3C] focus:ring-[#D67C3C]"
                        />
                        <span className="text-sm text-white/70">Featured Vehicle</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D67C3C] resize-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg transition-colors font-medium"
                    >
                      {modalMode === 'add' ? 'Add Vehicle' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
