require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize } = require('../backend/config/database');

// Import models directly (they already have sequelize instance)
const User = require('../backend/models/User.model');
const Vehicle = require('../backend/models/Vehicle.model');
const Order = require('../backend/models/Order.model');
const Review = require('../backend/models/Review.model');
const Message = require('../backend/models/Message.model');

// Define associations
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Vehicle.hasMany(Order, { foreignKey: 'vehicleId' });
Order.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Vehicle.hasMany(Review, { foreignKey: 'vehicleId' });
Review.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

User.hasMany(Message, { as: 'SentMessages', foreignKey: 'senderId' });
User.hasMany(Message, { as: 'ReceivedMessages', foreignKey: 'receiverId' });
Message.belongsTo(User, { as: 'Sender', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'Receiver', foreignKey: 'receiverId' });

const seedDatabase = async () => {
  try {
    console.log('\n' + '='.repeat(60));
    console.log('🌱 NordLion Database Seeder');
    console.log('='.repeat(60) + '\n');

    console.log('🔄 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!\n');

    console.log('🔄 Syncing database schema (this will reset all data)...');
    await sequelize.sync({ force: true });
    console.log('✅ Database schema synced!\n');

    // Seed Users (passwords already hashed in model hooks, but we hash here to bypass hooks)
    console.log('👥 Seeding users...');
    const users = await User.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        email: 'admin@nordlion.com',
        password: await bcrypt.hash('Admin123!@#', 10),
        name: 'Luc Demierre',
        phone: '+44 20 7946 0958',
        role: 'admin',
        isOnline: true,
        verified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luc',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        email: 'john.hamilton@example.com',
        password: await bcrypt.hash('User123!@#', 10),
        name: 'John Hamilton',
        phone: '+44 20 7946 0123',
        role: 'user',
        isOnline: false,
        verified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        totalPurchases: 2,
        totalSpent: 555000,
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        email: 'sarah.chen@example.com',
        password: await bcrypt.hash('User123!@#', 10),
        name: 'Sarah Chen',
        phone: '+44 20 7946 0456',
        role: 'user',
        isOnline: true,
        verified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        totalPurchases: 1,
        totalSpent: 325000,
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        email: 'dealer@elitecars.com',
        password: await bcrypt.hash('Dealer123!@#', 10),
        name: 'Elite Cars London',
        phone: '+44 20 7946 0789',
        role: 'dealer',
        isOnline: false,
        verified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elite',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        email: 'michael.sterling@example.com',
        password: await bcrypt.hash('User123!@#', 10),
        name: 'Michael Sterling',
        phone: '+44 20 7946 0321',
        role: 'user',
        isOnline: false,
        verified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      },
    ], { individualHooks: false }); // Skip model hooks since we pre-hash
    console.log(`✅ Created ${users.length} users\n`);

    // Seed Vehicles
    console.log('🚗 Seeding luxury vehicles...');
    const vehicles = await Vehicle.bulkCreate([
      {
        id: '660e8400-e29b-41d4-a716-446655440001',
        make: 'Ferrari',
        model: '296 GTB',
        year: 2024,
        price: 325000,
        mileage: 250,
        vin: 'ZFF11KLA0P0294810',
        condition: 'new',
        status: 'available',
        color: 'Rosso Corsa',
        transmission: 'automatic',
        fuelType: 'hybrid',
        engineSize: '3.0L V6',
        horsepower: 830,
        torque: 740,
        images: [
          'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
          'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800',
        ],
        features: ['Carbon Fiber', 'ADAS', 'Apple CarPlay', 'Premium Sound'],
        description: 'The 296 GTB redefines the concept of driving pleasure with its V6 hybrid powertrain. F1 DCT transmission.',
        location: 'London, UK',
        views: 1247,
        isFeatured: true,
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440002',
        make: 'Lamborghini',
        model: 'Revuelto',
        year: 2024,
        price: 608358,
        mileage: 100,
        vin: 'ZHWGU5ZD0PLA13094',
        condition: 'new',
        status: 'available',
        color: 'Verde Mantis',
        transmission: 'automatic',
        fuelType: 'hybrid',
        engineSize: '6.5L V12',
        horsepower: 1015,
        torque: 807,
        images: [
          'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
          'https://images.unsplash.com/photo-1621135802920-1734c8c4b75f?w=800',
        ],
        features: ['LDVI 2.0', 'Carbon Fiber Monocoque', 'Active Aero', '4WD'],
        description: 'The first super sports V12 hybrid plug-in HPEV. Revolutionary performance with 8-Speed DCT.',
        location: 'London, UK',
        views: 2145,
        isFeatured: true,
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440003',
        make: 'Porsche',
        model: '911 Turbo S',
        year: 2023,
        price: 230000,
        mileage: 1500,
        vin: 'WP0AB2A99PS123456',
        condition: 'used',
        status: 'sold',
        color: 'GT Silver Metallic',
        transmission: 'automatic',
        fuelType: 'gasoline',
        engineSize: '3.8L Flat-6',
        horsepower: 640,
        torque: 800,
        images: [
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
          'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800',
        ],
        features: ['Sport Chrono', 'PASM', 'Rear Axle Steering', 'PDLS+'],
        description: 'The benchmark sports car. Unmatched versatility and performance with 8-Speed PDK.',
        location: 'Manchester, UK',
        views: 3421,
        isFeatured: false,
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440004',
        make: 'McLaren',
        model: '750S',
        year: 2024,
        price: 324000,
        mileage: 50,
        vin: 'SBM15DCA0PW003456',
        condition: 'new',
        status: 'available',
        color: 'Azores Orange',
        transmission: 'automatic',
        fuelType: 'gasoline',
        engineSize: '4.0L V8',
        horsepower: 750,
        torque: 800,
        images: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
          'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800',
        ],
        features: ['Carbon Fiber Tub', 'ProActive Chassis', 'Drift Mode', 'Track Telemetry'],
        description: 'Lighter. Faster. Sharper. The most powerful series-production McLaren supercar with 7-Speed SSG.',
        location: 'London, UK',
        views: 1876,
        isFeatured: true,
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440005',
        make: 'Aston Martin',
        model: 'DBS 770 Ultimate',
        year: 2023,
        price: 395000,
        mileage: 500,
        vin: 'SCFRMFBW5PGL12345',
        condition: 'new',
        status: 'available',
        color: 'Xenon Grey',
        transmission: 'automatic',
        fuelType: 'gasoline',
        engineSize: '5.2L V12',
        horsepower: 770,
        torque: 900,
        images: [
          'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
          'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
        ],
        features: ['Carbon Ceramic Brakes', 'Bang & Olufsen', 'Adaptive Damping', 'Carbon Fiber'],
        description: 'The ultimate expression of DBS Superleggera. Breathtaking V12 performance with 8-Speed Auto.',
        location: 'Birmingham, UK',
        views: 1543,
        isFeatured: false,
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440006',
        make: 'Bentley',
        model: 'Continental GT Speed',
        year: 2023,
        price: 285000,
        mileage: 800,
        vin: 'SCBCA13W5PC123456',
        condition: 'used',
        status: 'pending',
        color: 'Beluga Black',
        transmission: 'automatic',
        fuelType: 'gasoline',
        engineSize: '6.0L W12',
        horsepower: 650,
        torque: 900,
        images: [
          'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
          'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800',
        ],
        features: ['W12 Engine', 'Mulliner Spec', 'Naim Audio', '4-Seat Config'],
        description: 'Grand touring perfection. Unrivaled luxury meets exhilarating performance with 8-Speed DCT.',
        location: 'London, UK',
        views: 987,
        isFeatured: false,
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440007',
        make: 'Rolls-Royce',
        model: 'Spectre',
        year: 2024,
        price: 420000,
        mileage: 0,
        vin: 'SCA664S50PUX12345',
        condition: 'new',
        status: 'available',
        color: 'Tempest Grey',
        transmission: 'automatic',
        fuelType: 'electric',
        engineSize: 'Electric Motor',
        horsepower: 577,
        torque: 900,
        images: [
          'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800',
          'https://images.unsplash.com/photo-1609881875668-87a81e8dc5d8?w=800',
        ],
        features: ['102 kWh Battery', 'Starlight Headliner', 'Spirit of Ecstasy', 'Bespoke Audio'],
        description: 'The first fully electric Rolls-Royce. Ultra-luxury redefined with Single-Speed transmission.',
        location: 'London, UK',
        views: 2341,
        isFeatured: true,
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440008',
        make: 'Mercedes-AMG',
        model: 'GT Black Series',
        year: 2022,
        price: 389000,
        mileage: 1200,
        vin: 'WDD1781771A123456',
        condition: 'used',
        status: 'available',
        color: 'Magno Graphite Grey',
        transmission: 'automatic',
        fuelType: 'gasoline',
        engineSize: '4.0L V8',
        horsepower: 720,
        torque: 800,
        images: [
          'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
          'https://images.unsplash.com/photo-1611821064430-4e34e13c25a5?w=800',
        ],
        features: ['Flat-Plane Crank', 'Adjustable Coilovers', 'Aero Package', 'Track Modes'],
        description: 'The most powerful AMG ever. Track-focused road-legal supercar with 7-Speed DCT.',
        location: 'Edinburgh, UK',
        views: 1654,
        isFeatured: false,
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440009',
        make: 'Bugatti',
        model: 'Chiron Super Sport',
        year: 2022,
        price: 3900000,
        mileage: 800,
        vin: 'VF9SP2V30PM795123',
        condition: 'used',
        status: 'available',
        color: 'Black Carbon',
        transmission: 'automatic',
        fuelType: 'gasoline',
        engineSize: '8.0L W16',
        horsepower: 1600,
        torque: 1600,
        images: [
          'https://images.unsplash.com/photo-1566023888661-6d7a769f7ea2?w=800',
          'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800',
        ],
        features: ['Quad Turbo W16', 'All-Wheel Drive', 'Carbon Fiber Body', 'Luxury Interior'],
        description: 'The pinnacle of automotive engineering. 1600hp of pure hypercar perfection with 7-Speed DSG.',
        location: 'London, UK',
        views: 8934,
        isFeatured: true,
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440010',
        make: 'Pagani',
        model: 'Huayra Roadster BC',
        year: 2023,
        price: 3500000,
        mileage: 200,
        vin: 'ZN8PA20A0PS123456',
        condition: 'used',
        status: 'reserved',
        color: 'Bianco Benny',
        transmission: 'manual',
        fuelType: 'gasoline',
        engineSize: '6.0L V12',
        horsepower: 800,
        torque: 1050,
        images: [
          'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800',
          'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
        ],
        features: ['AMG V12 Twin-Turbo', 'Carbo-Titanium Monocoque', 'Active Aero', 'Bespoke'],
        description: 'Automotive art. Hand-crafted perfection with only 40 units worldwide. 7-Speed Sequential.',
        location: 'London, UK',
        views: 12456,
        isFeatured: true,
      },
    ]);
    console.log(`✅ Created ${vehicles.length} luxury vehicles\n`);

    // Seed Orders
    console.log('📦 Seeding orders...');
    const orders = await Order.bulkCreate([
      {
        id: '770e8400-e29b-41d4-a716-446655440001',
        userId: users[1].id,
        vehicleId: vehicles[2].id,
        status: 'completed',
        amount: 230000,
        paymentMethod: 'wire_transfer',
        paymentStatus: 'paid',
        deliveryAddress: { street: '15 Kensington High St', city: 'London', postcode: 'W8 5NP', country: 'UK' },
        notes: 'Please include full service history',
      },
      {
        id: '770e8400-e29b-41d4-a716-446655440002',
        userId: users[2].id,
        vehicleId: vehicles[0].id,
        status: 'processing',
        amount: 325000,
        paymentMethod: 'bank_transfer',
        paymentStatus: 'paid',
        deliveryAddress: { street: '42 Berkeley Square', city: 'London', postcode: 'W1J 5AJ', country: 'UK' },
        notes: 'Urgent delivery requested',
      },
      {
        id: '770e8400-e29b-41d4-a716-446655440003',
        userId: users[1].id,
        vehicleId: vehicles[5].id,
        status: 'pending',
        amount: 285000,
        paymentMethod: 'financing',
        paymentStatus: 'pending',
        deliveryAddress: { street: '15 Kensington High St', city: 'London', postcode: 'W8 5NP', country: 'UK' },
        notes: 'Awaiting finance approval',
      },
    ]);
    console.log(`✅ Created ${orders.length} orders\n`);

    // Seed Reviews
    console.log('⭐ Seeding reviews...');
    const reviews = await Review.bulkCreate([
      {
        userId: users[1].id,
        vehicleId: vehicles[2].id,
        rating: 5,
        comment: 'Absolutely stunning vehicle. The performance is incredible and the service was impeccable.',
        verified: true,
      },
      {
        userId: users[2].id,
        vehicleId: vehicles[0].id,
        rating: 5,
        comment: 'Dream car delivered! NordLion made the entire process seamless.',
        verified: true,
      },
      {
        userId: users[4].id,
        vehicleId: vehicles[3].id,
        rating: 5,
        comment: 'The McLaren 750S is even better in person. Can\'t wait to get mine!',
        verified: false,
      },
      {
        userId: users[1].id,
        vehicleId: vehicles[8].id,
        rating: 5,
        comment: 'The Chiron is the ultimate machine. Worth every penny.',
        verified: false,
      },
    ]);
    console.log(`✅ Created ${reviews.length} reviews\n`);

    // Seed Messages
    console.log('💬 Seeding messages...');
    const messages = await Message.bulkCreate([
      {
        senderId: users[1].id,
        receiverId: users[0].id,
        content: 'Hi, I\'m interested in the Ferrari 296 GTB. Is it still available?',
        type: 'inquiry',
        read: true,
        readAt: new Date(Date.now() - 3600000),
      },
      {
        senderId: users[0].id,
        receiverId: users[1].id,
        content: 'Yes, the Ferrari is available! Would you like to schedule a viewing?',
        type: 'text',
        read: true,
        readAt: new Date(Date.now() - 3000000),
      },
      {
        senderId: users[1].id,
        receiverId: users[0].id,
        content: 'That would be great! I\'m available this weekend.',
        type: 'text',
        read: true,
        readAt: new Date(Date.now() - 2400000),
      },
      {
        senderId: users[2].id,
        receiverId: users[0].id,
        content: 'Hello! I wanted to inquire about the Bugatti Chiron. Can you provide more details?',
        type: 'inquiry',
        read: false,
      },
      {
        senderId: users[0].id,
        receiverId: users[2].id,
        content: 'The Bugatti Chiron Super Sport is an exceptional vehicle with only 800 miles. Let me send you the full spec sheet.',
        type: 'text',
        read: true,
        readAt: new Date(),
      },
      {
        senderId: users[4].id,
        receiverId: users[0].id,
        content: 'Is the McLaren 750S negotiable on price?',
        type: 'inquiry',
        read: false,
      },
    ]);
    console.log(`✅ Created ${messages.length} messages\n`);

    console.log('='.repeat(60));
    console.log('✨ Database seeded successfully!');
    console.log('='.repeat(60));
    console.log('\n📊 Summary:');
    console.log(`   👥 Users:     ${users.length}`);
    console.log(`   🚗 Vehicles:  ${vehicles.length}`);
    console.log(`   📦 Orders:    ${orders.length}`);
    console.log(`   ⭐ Reviews:   ${reviews.length}`);
    console.log(`   💬 Messages:  ${messages.length}`);
    console.log('\n🔐 Login Credentials:');
    console.log('   ┌─────────────────────────────────────────────────────┐');
    console.log('   │ Admin:  admin@nordlion.com / Admin123!@#           │');
    console.log('   │ User:   john.hamilton@example.com / User123!@#     │');
    console.log('   │ Dealer: dealer@elitecars.com / Dealer123!@#        │');
    console.log('   └─────────────────────────────────────────────────────┘');
    console.log('\n🚀 Next Steps:');
    console.log('   1. cd backend && npm run dev     (Terminal 1)');
    console.log('   2. npm run dev                   (Terminal 2)');
    console.log('   3. Open: http://localhost:3000\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:');
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
