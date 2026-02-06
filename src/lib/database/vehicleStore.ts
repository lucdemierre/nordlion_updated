// Vehicle Store - Simulates database
// Will be replaced with Supabase in production

import { Vehicle } from './schema'

class VehicleStore {
  private vehicles: Map<string, Vehicle> = new Map()

  constructor() {
    this.initializeData()
  }

  private initializeData() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nordlion_vehicles')
      if (saved) {
        const parsed = JSON.parse(saved)
        this.vehicles = new Map(Object.entries(parsed).map(([k, v]: [string, any]) => [
          k,
          { ...v, dateAdded: new Date(v.dateAdded), dateModified: new Date(v.dateModified) }
        ]))
      } else {
        this.seedDefaultVehicles()
      }
    }
  }

  private seedDefaultVehicles() {
    const defaultVehicles: Vehicle[] = [
      {
        id: 'v1',
        make: 'Porsche',
        model: '911 GT3 RS',
        year: 2024,
        price: 289000,
        mileage: 450,
        location: 'London, UK',
        status: 'available',
        images: ['/vehicles/porsche-gt3rs.jpg'],
        description: 'The most hardcore 911 ever built. Track-focused engineering meets daily usability.',
        specifications: {
          engine: '4.0L Flat-6',
          transmission: '7-Speed PDK',
          drivetrain: 'RWD',
          fuelType: 'Petrol',
          horsepower: 525,
          torque: 465,
          topSpeed: 184,
          acceleration: '3.0s',
          exteriorColor: 'GT Silver Metallic',
          interiorColor: 'Black Leather',
          vin: 'WP0ZZZ99ZTS000001'
        },
        features: [
          'Carbon Ceramic Brakes',
          'Sport Chrono Package',
          'Front Axle Lift',
          'PCCB',
          'Sport Exhaust',
          'Clubsport Package',
          'Roll Cage',
          'Fire Extinguisher'
        ],
        condition: 'new',
        history: { owners: 0, accidents: 0, serviceRecords: true },
        dateAdded: new Date(),
        dateModified: new Date()
      },
      {
        id: 'v2',
        make: 'Ferrari',
        model: 'SF90 Stradale',
        year: 2023,
        price: 625000,
        mileage: 1200,
        location: 'Monaco',
        status: 'reserved',
        images: ['/vehicles/ferrari-sf90.jpg'],
        description: 'Ferrari\'s first plug-in hybrid supercar. 1000hp of pure Italian engineering.',
        specifications: {
          engine: '4.0L Twin-Turbo V8 + 3 Electric Motors',
          transmission: '8-Speed DCT',
          drivetrain: 'AWD',
          fuelType: 'Hybrid',
          horsepower: 986,
          torque: 590,
          topSpeed: 211,
          acceleration: '2.5s',
          exteriorColor: 'Rosso Corsa',
          interiorColor: 'Nero Leather',
          vin: 'ZFF90LLA0P0000001'
        },
        features: [
          'Carbon Fiber Package',
          'Racing Seats',
          'Telemetry System',
          'Adaptive Suspension',
          'Apple CarPlay',
          'Alcantara Steering Wheel',
          'Michelin Pilot Sport Cup 2'
        ],
        condition: 'used',
        history: { owners: 1, accidents: 0, serviceRecords: true },
        dateAdded: new Date(),
        dateModified: new Date()
      },
      {
        id: 'v3',
        make: 'Lamborghini',
        model: 'Aventador SVJ',
        year: 2023,
        price: 575000,
        mileage: 800,
        location: 'Dubai, UAE',
        status: 'available',
        images: ['/vehicles/lambo-svj.jpg'],
        description: 'The ultimate Aventador. Nürburgring lap record holder.',
        specifications: {
          engine: '6.5L V12',
          transmission: '7-Speed ISR',
          drivetrain: 'AWD',
          fuelType: 'Petrol',
          horsepower: 770,
          torque: 531,
          topSpeed: 217,
          acceleration: '2.8s',
          exteriorColor: 'Verde Mantis',
          interiorColor: 'Black/Green Alcantara',
          vin: 'ZHWUC4ZD0KLA00001'
        },
        features: [
          'ALA 2.0 Active Aero',
          'Carbon Fiber Body',
          'Titanium Exhaust',
          'Rear-Wheel Steering',
          'Magneto-Rheological Suspension',
          'Forged Carbon Interior',
          'Track Telemetry'
        ],
        condition: 'used',
        history: { owners: 1, accidents: 0, serviceRecords: true },
        dateAdded: new Date(),
        dateModified: new Date()
      },
      {
        id: 'v4',
        make: 'McLaren',
        model: '720S Spider',
        year: 2024,
        price: 385000,
        mileage: 300,
        location: 'Los Angeles, USA',
        status: 'available',
        images: ['/vehicles/mclaren-720s.jpg'],
        description: 'Open-top supercar with F1 DNA. Retractable hardtop for all-weather performance.',
        specifications: {
          engine: '4.0L Twin-Turbo V8',
          transmission: '7-Speed SSG',
          drivetrain: 'RWD',
          fuelType: 'Petrol',
          horsepower: 710,
          torque: 568,
          topSpeed: 212,
          acceleration: '2.9s',
          exteriorColor: 'Burton Blue',
          interiorColor: 'Tan Leather',
          vin: 'SBM14DCA8KW000001'
        },
        features: [
          'Carbon Fiber Monocage',
          'Proactive Chassis Control',
          'Variable Drift Control',
          'Retractable Hardtop',
          'Bowers & Wilkins Audio',
          'Track Telemetry',
          'Stealth Pack'
        ],
        condition: 'certified-pre-owned',
        history: { owners: 1, accidents: 0, serviceRecords: true },
        dateAdded: new Date(),
        dateModified: new Date()
      },
      {
        id: 'v5',
        make: 'Aston Martin',
        model: 'DBS Superleggera',
        year: 2024,
        price: 345000,
        mileage: 250,
        location: 'London, UK',
        status: 'sold',
        images: ['/vehicles/aston-dbs.jpg'],
        description: 'British GT perfection. The most powerful production Aston Martin.',
        specifications: {
          engine: '5.2L Twin-Turbo V12',
          transmission: '8-Speed Automatic',
          drivetrain: 'RWD',
          fuelType: 'Petrol',
          horsepower: 715,
          torque: 664,
          topSpeed: 211,
          acceleration: '3.4s',
          exteriorColor: 'Onyx Black',
          interiorColor: 'Obsidian Black Leather',
          vin: 'SCFRMFAW0KGL00001'
        },
        features: [
          'Carbon Ceramic Brakes',
          'Bang & Olufsen Audio',
          'Carbon Fiber Aero Package',
          'Adaptive Damping',
          'Heated/Ventilated Seats',
          '360 Camera',
          'Premium Audio'
        ],
        condition: 'new',
        history: { owners: 0, accidents: 0, serviceRecords: true },
        dateAdded: new Date(),
        dateModified: new Date()
      }
    ]

    defaultVehicles.forEach(v => this.vehicles.set(v.id, v))
    this.saveToStorage()
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      const obj: Record<string, Vehicle> = {}
      this.vehicles.forEach((v, id) => { obj[id] = v })
      localStorage.setItem('nordlion_vehicles', JSON.stringify(obj))
    }
  }

  getAll(): Vehicle[] {
    return Array.from(this.vehicles.values())
  }

  getById(id: string): Vehicle | undefined {
    return this.vehicles.get(id)
  }

  getByStatus(status: Vehicle['status']): Vehicle[] {
    return this.getAll().filter(v => v.status === status)
  }

  create(vehicle: Omit<Vehicle, 'id' | 'dateAdded' | 'dateModified'>): Vehicle {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: `v${Date.now()}`,
      dateAdded: new Date(),
      dateModified: new Date()
    }
    this.vehicles.set(newVehicle.id, newVehicle)
    this.saveToStorage()
    return newVehicle
  }

  update(id: string, updates: Partial<Vehicle>): Vehicle | null {
    const vehicle = this.vehicles.get(id)
    if (!vehicle) return null
    
    const updated = { ...vehicle, ...updates, dateModified: new Date() }
    this.vehicles.set(id, updated)
    this.saveToStorage()
    return updated
  }

  delete(id: string): boolean {
    const deleted = this.vehicles.delete(id)
    if (deleted) this.saveToStorage()
    return deleted
  }

  search(query: string): Vehicle[] {
    const q = query.toLowerCase()
    return this.getAll().filter(v => 
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.location.toLowerCase().includes(q)
    )
  }
}

export const vehicleStore = new VehicleStore()
