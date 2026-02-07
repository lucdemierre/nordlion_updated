/**
 * NordLion Database Seed Script
 * Populates database with realistic luxury vehicles, users, orders, and reviews
 * Run with: node scripts/seed-database.js
 */

const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

// Database connection
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/nordlion_db', {
  logging: false,
  dialectOptions: {
    ssl: process.env.DATABASE_URL?.includes('cloud') ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
});

// Import models (we'll define them inline for the seed script)
const { DataTypes } = Sequelize;

// User Model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin', 'dealer'),
    defaultValue: 'user',
  },
  phone: DataTypes.STRING,
  avatar: DataTypes.STRING,
  isOnline: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  lastSeenAt: DataTypes.DATE,
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  preferences: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
}, {
  timestamps: true,
  indexes: [
    { fields: ['email'] },
    { fields: ['role'] },
    { fields: ['isOnline'] },
  ],
});

// Vehicle Model
const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  make: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  mileage: DataTypes.INTEGER,
  vin: {
    type: DataTypes.STRING,
    unique: true,
  },
  condition: {
    type: DataTypes.ENUM('new', 'used', 'certified'),
    defaultValue: 'used',
  },
  status: {
    type: DataTypes.ENUM('available', 'sold', 'pending', 'reserved'),
    defaultValue: 'available',
  },
  color: DataTypes.STRING,
  transmission: DataTypes.STRING,
  fuelType: DataTypes.STRING,
  engineSize: DataTypes.STRING,
  horsepower: DataTypes.INTEGER,
  torque: DataTypes.INTEGER,
  acceleration: DataTypes.STRING,
  topSpeed: DataTypes.INTEGER,
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  features: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  description: DataTypes.TEXT,
  location: DataTypes.STRING,
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
  indexes: [
    { fields: ['make', 'model'] },
    { fields: ['status'] },
    { fields: ['featured'] },
    { fields: ['price'] },
  ],
});

// Order Model
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  vehicleId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'processing', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
  totalPrice: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  paymentMethod: DataTypes.STRING,
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
    defaultValue: 'pending',
  },
  deliveryAddress: DataTypes.JSONB,
  notes: DataTypes.TEXT,
}, {
  timestamps: true,
  indexes: [
    { fields: ['userId'] },
    { fields: ['vehicleId'] },
    { fields: ['status'] },
  ],
});

// Review Model
const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  vehicleId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: DataTypes.TEXT,
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
  indexes: [
    { fields: ['userId'] },
    { fields: ['vehicleId'] },
    { fields: ['rating'] },
  ],
});

// Message Model (for real-time chat)
const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  readAt: DataTypes.DATE,
}, {
  timestamps: true,
  indexes: [
    { fields: ['senderId'] },
    { fields: ['receiverId'] },
    { fields: ['read'] },
  ],
});

// Define relationships
User.hasMany(Order, { foreignKey: 'userId' });
User.hasMany(Review, { foreignKey: 'userId' });
User.hasMany(Message, { as: 'SentMessages', foreignKey: 'senderId' });
User.hasMany(Message, { as: 'ReceivedMessages', foreignKey: 'receiverId' });

Vehicle.hasMany(Order, { foreignKey: 'vehicleId' });
Vehicle.hasMany(Review, { foreignKey: 'vehicleId' });

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

Message.belongsTo(User, { as: 'Sender', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'Receiver', foreignKey: 'receiverId' });

// Seed Data
const LUXURY_VEHICLES = [
  {
    make: 'Ferrari',
    model: '296 GTB',
    year: 2024,
    price: 325000,
    mileage: 120,
    vin: 'ZFF11WPA0P0262891',
    condition: 'new',
    status: 'available',
    color: 'Rosso Corsa',
    transmission: '8-Speed DCT',
    fuelType: 'Hybrid V6',
    engineSize: '3.0L Twin-Turbo V6 + Electric',
    horsepower: 830,
    torque: 740,
    acceleration: '0-100 km/h in 2.9s',
    topSpeed: 330,
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200',
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200',
      'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1200',
    ],
    features: [
      'Carbon Fiber Interior Package',
      'Daytona-Style Racing Seats',
      'Advanced Driver Assistance System',
      'Bespoke Audio System',
      'Adaptive Suspension',
      '20" Forged Wheels',
    ],
    description: 'The Ferrari 296 GTB represents the pinnacle of Ferrari\'s hybrid technology, combining a thunderous twin-turbo V6 with an electric motor for breathtaking performance.',
    location: 'London, UK',
    featured: true,
  },
  {
    make: 'Lamborghini',
    model: 'Revuelto',
    year: 2024,
    price: 608358,
    mileage: 50,
    vin: 'ZHWUR4ZF1PLA09876',
    condition: 'new',
    status: 'available',
    color: 'Verde Scandal',
    transmission: '8-Speed DCT',
    fuelType: 'Hybrid V12',
    engineSize: '6.5L V12 + Electric',
    horsepower: 1015,
    torque: 807,
    acceleration: '0-100 km/h in 2.5s',
    topSpeed: 350,
    images: [
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200',
    ],
    features: [
      'Plug-in Hybrid Technology',
      'Carbon Fiber Monocoque',
      'Active Aerodynamics',
      'Tamburello Audio System',
      'Rear-Wheel Steering',
      'Launch Control',
    ],
    description: 'The Revuelto is Lamborghini\'s first plug-in hybrid supercar, delivering over 1000 hp from its V12 hybrid powertrain.',
    location: 'Dubai, UAE',
    featured: true,
  },
  {
    make: 'Porsche',
    model: '911 Turbo S',
    year: 2024,
    price: 230000,
    mileage: 1500,
    vin: 'WP0AB2A99PS112234',
    condition: 'used',
    status: 'available',
    color: 'Jet Black Metallic',
    transmission: '8-Speed PDK',
    fuelType: 'Gasoline',
    engineSize: '3.8L Twin-Turbo Flat-6',
    horsepower: 640,
    torque: 800,
    acceleration: '0-100 km/h in 2.6s',
    topSpeed: 330,
    images: [
      'https://images.unsplash.com/photo-1611651338412-8403fa6e3599?w=1200',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200',
    ],
    features: [
      'Sport Chrono Package',
      'PASM Sports Suspension',
      'Ceramic Composite Brakes',
      'Burmester Audio',
      'Leather Interior',
      'Sport Exhaust System',
    ],
    description: 'The 911 Turbo S sets the benchmark for everyday supercar performance with its twin-turbocharged flat-six engine.',
    location: 'Monaco',
    featured: true,
  },
  {
    make: 'McLaren',
    model: '750S',
    year: 2024,
    price: 324000,
    mileage: 200,
    vin: 'SBM14DCA2PW004321',
    condition: 'new',
    status: 'available',
    color: 'MSO Lantana Purple',
    transmission: '7-Speed SSG',
    fuelType: 'Gasoline',
    engineSize: '4.0L Twin-Turbo V8',
    horsepower: 750,
    torque: 800,
    acceleration: '0-100 km/h in 2.8s',
    topSpeed: 332,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200',
    ],
    features: [
      'Carbon Fiber Racing Seats',
      'Proactive Chassis Control II',
      'Variable Drift Control',
      'Bowers & Wilkins Audio',
      'MSO Defined Options',
      'Lightweight Wheels',
    ],
    description: 'The McLaren 750S represents the evolution of the Super Series, offering track-focused performance with road car refinement.',
    location: 'London, UK',
    featured: false,
  },
  {
    make: 'Aston Martin',
    model: 'DBS 770 Ultimate',
    year: 2023,
    price: 395000,
    mileage: 800,
    vin: 'SCFRMFAW5PGL12345',
    condition: 'used',
    status: 'available',
    color: 'Ceramic Grey',
    transmission: '8-Speed Automatic',
    fuelType: 'Gasoline',
    engineSize: '5.2L Twin-Turbo V12',
    horsepower: 770,
    torque: 900,
    acceleration: '0-100 km/h in 3.2s',
    topSpeed: 340,
    images: [
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200',
    ],
    features: [
      'Q by Aston Martin Specification',
      'Carbon Fiber Body Panels',
      'Adaptive Damping System',
      'Bang & Olufsen Audio',
      'Full Leather Interior',
      'Bespoke Exterior Paint',
    ],
    description: 'The final iteration of Aston Martin\'s V12-powered DBS, the 770 Ultimate is a collector\'s piece combining British elegance with raw power.',
    location: 'Geneva, Switzerland',
    featured: false,
  },
  {
    make: 'Bentley',
    model: 'Continental GT Speed',
    year: 2024,
    price: 285000,
    mileage: 500,
    vin: 'SCBGT63W2PC056789',
    condition: 'used',
    status: 'available',
    color: 'Beluga Black',
    transmission: '8-Speed DCT',
    fuelType: 'Gasoline',
    engineSize: '6.0L Twin-Turbo W12',
    horsepower: 650,
    torque: 900,
    acceleration: '0-100 km/h in 3.6s',
    topSpeed: 335,
    images: [
      'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200',
    ],
    features: [
      'Mulliner Driving Specification',
      'Naim for Bentley Audio',
      'Rotating Display',
      'Massage Seats',
      'Adaptive Cruise Control',
      'Night Vision System',
    ],
    description: 'The Continental GT Speed combines Bentley\'s signature luxury craftsmanship with exhilarating performance from its W12 engine.',
    location: 'Paris, France',
    featured: false,
  },
  {
    make: 'Rolls-Royce',
    model: 'Spectre',
    year: 2024,
    price: 420000,
    mileage: 300,
    vin: 'SCA664C50PUX98765',
    condition: 'new',
    status: 'reserved',
    color: 'Gunmetal',
    transmission: 'Single-Speed Electric',
    fuelType: 'Electric',
    engineSize: 'Dual Electric Motors',
    horsepower: 584,
    torque: 900,
    acceleration: '0-100 km/h in 4.4s',
    topSpeed: 250,
    images: [
      'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200',
    ],
    features: [
      'Bespoke Audio System',
      'Starlight Headliner',
      'Illuminated Grille',
      'Magic Carpet Ride',
      'Illuminated Fascia',
      'Bespoke Leather & Wood',
    ],
    description: 'Rolls-Royce\'s first all-electric vehicle, the Spectre combines zero-emission motoring with uncompromising luxury and refinement.',
    location: 'London, UK',
    featured: true,
  },
  {
    make: 'Mercedes-AMG',
    model: 'GT Black Series',
    year: 2023,
    price: 389000,
    mileage: 1200,
    vin: 'WDD1971281N234567',
    condition: 'used',
    status: 'available',
    color: 'Magma Beam Orange',
    transmission: '7-Speed DCT',
    fuelType: 'Gasoline',
    engineSize: '4.0L Twin-Turbo V8',
    horsepower: 720,
    torque: 800,
    acceleration: '0-100 km/h in 3.2s',
    topSpeed: 325,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200',
    ],
    features: [
      'Track Package',
      'Carbon Fiber Aerodynamics',
      'Adjustable Coilover Suspension',
      'Lightweight Wheels',
      'Roll Cage',
      'Alcantara Interior',
    ],
    description: 'The most powerful AMG production car ever, the GT Black Series is engineered for maximum track performance.',
    location: 'Stuttgart, Germany',
    featured: false,
  },
  {
    make: 'Bugatti',
    model: 'Chiron Super Sport',
    year: 2023,
    price: 3900000,
    mileage: 400,
    vin: 'VF9SP3V30PS780321',
    condition: 'used',
    status: 'pending',
    color: 'Nocturne Black',
    transmission: '7-Speed DSG',
    fuelType: 'Gasoline',
    engineSize: '8.0L Quad-Turbo W16',
    horsepower: 1600,
    torque: 1600,
    acceleration: '0-100 km/h in 2.4s',
    topSpeed: 440,
    images: [
      'https://images.unsplash.com/photo-1566023888828-e52a1b6274e0?w=1200',
    ],
    features: [
      'Sky View Glass Roof',
      'Carbon Fiber Construction',
      'Active Aerodynamics',
      'Bespoke Audio',
      'Full Leather & Alcantara',
      'Telemetry System',
    ],
    description: 'The Chiron Super Sport pushes the boundaries of automotive engineering with its quad-turbocharged W16 engine producing 1600 hp.',
    location: 'Monaco',
    featured: true,
  },
  {
    make: 'Pagani',
    model: 'Huayra Roadster BC',
    year: 2023,
    price: 3500000,
    mileage: 150,
    vin: 'ZN8PA11A0PS000123',
    condition: 'used',
    status: 'available',
    color: 'Bianco Benny',
    transmission: '7-Speed Sequential',
    fuelType: 'Gasoline',
    engineSize: '6.0L Twin-Turbo V12 AMG',
    horsepower: 800,
    torque: 1050,
    acceleration: '0-100 km/h in 2.8s',
    topSpeed: 350,
    images: [
      'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200',
    ],
    features: [
      'Carbo-Titanium Monocoque',
      'Unique Art Interior',
      'Active Aerodynamics',
      'Handcrafted Components',
      'Pirelli P Zero Trofeo R',
      'One of 40 Units',
    ],
    description: 'A masterpiece of automotive art, the Huayra Roadster BC combines Mercedes-AMG power with Pagani\'s artisanal craftsmanship.',
    location: 'Milan, Italy',
    featured: true,
  },
];

const USERS = [
  {
    email: 'admin@nordlion.com',
    password: 'Admin123!@#',
    name: 'Luc Demierre',
    role: 'admin',
    phone: '+44 20 7946 0958',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luc',
    isOnline: true,
    lastSeenAt: new Date(),
    verified: true,
    preferences: {
      notifications: true,
      newsletter: true,
      language: 'en',
    },
  },
  {
    email: 'john.hamilton@example.com',
    password: 'User123!@#',
    name: 'John Hamilton',
    role: 'user',
    phone: '+44 20 7946 1234',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    isOnline: false,
    lastSeenAt: new Date(Date.now() - 3600000), // 1 hour ago
    verified: true,
    preferences: {
      notifications: true,
      newsletter: true,
      language: 'en',
    },
  },
  {
    email: 'sarah.chen@example.com',
    password: 'User123!@#',
    name: 'Sarah Chen',
    role: 'user',
    phone: '+852 2123 4567',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    isOnline: true,
    lastSeenAt: new Date(),
    verified: true,
    preferences: {
      notifications: false,
      newsletter: true,
      language: 'en',
    },
  },
  {
    email: 'dealer@elitecars.com',
    password: 'Dealer123!@#',
    name: 'Elite Cars Monaco',
    role: 'dealer',
    phone: '+377 97 97 1234',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Elite',
    isOnline: false,
    lastSeenAt: new Date(Date.now() - 86400000), // 1 day ago
    verified: true,
    preferences: {
      notifications: true,
      newsletter: false,
      language: 'fr',
    },
  },
  {
    email: 'michael.ross@example.com',
    password: 'User123!@#',
    name: 'Michael Ross',
    role: 'user',
    phone: '+971 4 123 4567',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    isOnline: false,
    lastSeenAt: new Date(Date.now() - 7200000), // 2 hours ago
    verified: true,
    preferences: {
      notifications: true,
      newsletter: true,
      language: 'en',
    },
  },
];

const REVIEWS = [
  {
    rating: 5,
    comment: 'Absolutely stunning vehicle! The buying experience was seamless and the team at NordLion was professional throughout. Highly recommend!',
    verified: true,
  },
  {
    rating: 5,
    comment: 'Best hypercar purchase I\'ve ever made. The attention to detail and customer service exceeded all expectations.',
    verified: true,
  },
  {
    rating: 4,
    comment: 'Fantastic car and great service. Only minor issue was delivery took a bit longer than expected, but worth the wait!',
    verified: true,
  },
  {
    rating: 5,
    comment: 'This is automotive perfection. The team helped me through every step of the process. Can\'t wait to order my next car from NordLion!',
    verified: true,
  },
];

const MESSAGES = [
  {
    content: 'Hi, I\'m interested in the Ferrari 296 GTB. Is it still available?',
    read: true,
    readAt: new Date(Date.now() - 3000000),
  },
  {
    content: 'Yes, the Ferrari 296 GTB is still available! Would you like to schedule a viewing?',
    read: true,
    readAt: new Date(Date.now() - 2900000),
  },
  {
    content: 'That would be great! What times work for you?',
    read: true,
    readAt: new Date(Date.now() - 2800000),
  },
  {
    content: 'We have availability tomorrow at 2pm or Friday at 10am. Which works better?',
    read: false,
    readAt: null,
  },
];

async function seedDatabase() {
  try {
    console.log('🚀 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    console.log('🔄 Syncing models...');
    await sequelize.sync({ force: true }); // WARNING: This will drop all tables
    console.log('✅ Models synced');

    console.log('\n👤 Creating users...');
    const users = [];
    for (const userData of USERS) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      users.push(user);
      console.log(`  ✓ Created ${user.role}: ${user.name} (${user.email})`);
    }

    console.log('\n🚗 Creating vehicles...');
    const vehicles = [];
    for (const vehicleData of LUXURY_VEHICLES) {
      const vehicle = await Vehicle.create(vehicleData);
      vehicles.push(vehicle);
      console.log(`  ✓ Created ${vehicle.year} ${vehicle.make} ${vehicle.model} - £${vehicle.price.toLocaleString()}`);
    }

    console.log('\n📦 Creating orders...');
    const orders = [];
    // Create 3 sample orders
    const orderData = [
      {
        userId: users[1].id, // John
        vehicleId: vehicles[6].id, // Rolls-Royce Spectre
        status: 'completed',
        totalPrice: vehicles[6].price,
        paymentMethod: 'Bank Transfer',
        paymentStatus: 'paid',
        deliveryAddress: {
          street: '123 Mayfair Street',
          city: 'London',
          postcode: 'W1K 1QZ',
          country: 'United Kingdom',
        },
        notes: 'Customer requested bespoke interior customization',
      },
      {
        userId: users[2].id, // Sarah
        vehicleId: vehicles[8].id, // Bugatti Chiron
        status: 'processing',
        totalPrice: vehicles[8].price,
        paymentMethod: 'Wire Transfer',
        paymentStatus: 'paid',
        deliveryAddress: {
          street: '88 Queens Road',
          city: 'Hong Kong',
          postcode: '',
          country: 'Hong Kong SAR',
        },
        notes: 'Express delivery requested',
      },
      {
        userId: users[4].id, // Michael
        vehicleId: vehicles[1].id, // Lamborghini Revuelto
        status: 'confirmed',
        totalPrice: vehicles[1].price,
        paymentMethod: 'Cryptocurrency',
        paymentStatus: 'pending',
        deliveryAddress: {
          street: 'Palm Jumeirah',
          city: 'Dubai',
          postcode: '',
          country: 'UAE',
        },
        notes: 'Customer awaiting BTC confirmation',
      },
    ];

    for (const order of orderData) {
      const created = await Order.create(order);
      orders.push(created);
      console.log(`  ✓ Created order #${created.id.slice(0, 8)}... - ${created.status}`);
    }

    console.log('\n⭐ Creating reviews...');
    // Add reviews from different users to different vehicles
    const reviewData = [
      { userId: users[1].id, vehicleId: vehicles[6].id, ...REVIEWS[0] },
      { userId: users[2].id, vehicleId: vehicles[8].id, ...REVIEWS[1] },
      { userId: users[4].id, vehicleId: vehicles[0].id, ...REVIEWS[2] },
      { userId: users[1].id, vehicleId: vehicles[2].id, ...REVIEWS[3] },
    ];

    for (const review of reviewData) {
      await Review.create(review);
      console.log(`  ✓ Created ${review.rating}⭐ review`);
    }

    console.log('\n💬 Creating messages...');
    // Create message thread between admin and user
    const messageData = [
      { senderId: users[1].id, receiverId: users[0].id, ...MESSAGES[0] },
      { senderId: users[0].id, receiverId: users[1].id, ...MESSAGES[1] },
      { senderId: users[1].id, receiverId: users[0].id, ...MESSAGES[2] },
      { senderId: users[0].id, receiverId: users[1].id, ...MESSAGES[3] },
    ];

    for (const message of messageData) {
      await Message.create(message);
      console.log(`  ✓ Created message`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ DATABASE SEEDED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log('\n📊 Summary:');
    console.log(`  • Users: ${users.length}`);
    console.log(`  • Vehicles: ${vehicles.length}`);
    console.log(`  • Orders: ${orders.length}`);
    console.log(`  • Reviews: ${reviewData.length}`);
    console.log(`  • Messages: ${messageData.length}`);
    console.log('\n🔐 Admin Login:');
    console.log(`  Email: admin@nordlion.com`);
    console.log(`  Password: Admin123!@#`);
    console.log('\n👤 Test User Login:');
    console.log(`  Email: john.hamilton@example.com`);
    console.log(`  Password: User123!@#`);
    console.log('\n');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// Run the seed
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('🎉 Seeding completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding error:', error);
      process.exit(1);
    });
}

module.exports = { seedDatabase };
