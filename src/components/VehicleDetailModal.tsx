'use client'

import { Vehicle } from '@/lib/database/schema'
import { X, MapPin, Calendar, Gauge, Fuel, Settings, Shield, CheckCircle } from 'lucide-react'

interface VehicleDetailModalProps {
  vehicle: Vehicle
  onClose: () => void
}

export default function VehicleDetailModal({ vehicle, onClose }: VehicleDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-light text-white">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h2>
            <p className="text-sm text-white/50 font-light mt-1">
              VIN: {vehicle.specifications.vin}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={24} className="text-white/60" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image Placeholder */}
          <div className="h-64 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Gauge size={48} className="text-white/10 mx-auto mb-2" />
              <p className="text-white/30 text-sm">Vehicle Image</p>
            </div>
          </div>

          {/* Price & Status */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-light text-[#D67C3C]">
                ${vehicle.price.toLocaleString()}
              </p>
              <p className="text-sm text-white/50 font-light mt-1">
                {vehicle.mileage.toLocaleString()} miles
              </p>
            </div>
            <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
              vehicle.status === 'available' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
              vehicle.status === 'reserved' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
              vehicle.status === 'in-transit' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
              'bg-gray-500/10 text-gray-400 border border-gray-500/20'
            }`}>
              {vehicle.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Description</h3>
            <p className="text-white/70 font-light leading-relaxed">
              {vehicle.description}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#141414] border border-white/5 rounded-lg p-4">
              <MapPin size={20} className="text-[#D67C3C] mb-2" />
              <p className="text-xs text-white/40 mb-1">Location</p>
              <p className="text-sm text-white font-light">{vehicle.location}</p>
            </div>
            <div className="bg-[#141414] border border-white/5 rounded-lg p-4">
              <Calendar size={20} className="text-[#D67C3C] mb-2" />
              <p className="text-xs text-white/40 mb-1">Year</p>
              <p className="text-sm text-white font-light">{vehicle.year}</p>
            </div>
            <div className="bg-[#141414] border border-white/5 rounded-lg p-4">
              <Gauge size={20} className="text-[#D67C3C] mb-2" />
              <p className="text-xs text-white/40 mb-1">Condition</p>
              <p className="text-sm text-white font-light capitalize">{vehicle.condition.replace('-', ' ')}</p>
            </div>
            <div className="bg-[#141414] border border-white/5 rounded-lg p-4">
              <Fuel size={20} className="text-[#D67C3C] mb-2" />
              <p className="text-xs text-white/40 mb-1">Fuel</p>
              <p className="text-sm text-white font-light">{vehicle.specifications.fuelType}</p>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Settings size={20} className="text-[#D67C3C]" />
              Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Engine', value: vehicle.specifications.engine },
                { label: 'Transmission', value: vehicle.specifications.transmission },
                { label: 'Drivetrain', value: vehicle.specifications.drivetrain },
                { label: 'Horsepower', value: `${vehicle.specifications.horsepower} hp` },
                { label: 'Torque', value: `${vehicle.specifications.torque} lb-ft` },
                { label: 'Top Speed', value: `${vehicle.specifications.topSpeed} mph` },
                { label: '0-60 mph', value: vehicle.specifications.acceleration },
                { label: 'Exterior Color', value: vehicle.specifications.exteriorColor },
                { label: 'Interior Color', value: vehicle.specifications.interiorColor },
              ].map((spec, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-sm text-white/50 font-light">{spec.label}</span>
                  <span className="text-sm text-white font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-[#D67C3C]" />
              Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {vehicle.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D67C3C]"></div>
                  <span className="text-sm text-white/70 font-light">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Shield size={20} className="text-[#D67C3C]" />
              Vehicle History
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#141414] border border-white/5 rounded-lg p-4 text-center">
                <p className="text-2xl font-light text-white mb-1">{vehicle.history.owners}</p>
                <p className="text-xs text-white/40">Previous Owners</p>
              </div>
              <div className="bg-[#141414] border border-white/5 rounded-lg p-4 text-center">
                <p className="text-2xl font-light text-white mb-1">{vehicle.history.accidents}</p>
                <p className="text-xs text-white/40">Accidents</p>
              </div>
              <div className="bg-[#141414] border border-white/5 rounded-lg p-4 text-center">
                <p className="text-2xl font-light text-white mb-1">
                  {vehicle.history.serviceRecords ? 'Yes' : 'No'}
                </p>
                <p className="text-xs text-white/40">Service Records</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 px-6 py-3 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-lg font-medium transition-colors">
              Inquire Now
            </button>
            <button className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-colors">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
