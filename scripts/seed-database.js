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

    // Seed Users - Admin + Test Users
    console.log('👥 Seeding users...');
    const users = await User.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        email: 'admin@nordlion.com',
        password: await bcrypt.hash('Admin123!@#', 10),
        name: 'Luc Demierre',
        phone: '+44 20 7946 0958',
        role: 'admin',
        isOnline: false,
        verified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luc',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        email: 'james.carter@example.com',
        password: await bcrypt.hash('Client123!@#', 10),
        name: 'James Carter',
        phone: '+44 20 7946 1234',
        role: 'client',
        isOnline: false,
        verified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        email: 'sarah.williams@example.com',
        password: await bcrypt.hash('Client123!@#', 10),
        name: 'Sarah Williams',
        phone: '+44 20 7946 5678',
        role: 'client',
        isOnline: false,
        verified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        email: 'michael.brown@example.com',
        password: await bcrypt.hash('Client123!@#', 10),
        name: 'Michael Brown',
        phone: '+44 20 7946 9012',
        role: 'client',
        isOnline: false,
        verified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        email: 'dealer@elitecars.com',
        password: await bcrypt.hash('Dealer123!@#', 10),
        name: 'Elite Cars Ltd',
        phone: '+44 20 7946 3456',
        role: 'broker',
        isOnline: false,
        verified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elite',
      },
    ], { individualHooks: false });
    console.log(`✅ Created ${users.length} users\n`);

    // Seed Vehicles - Real luxury cars with proper details
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
        features: ['F1 DCT Transmission', 'Hybrid V6 Powertrain', 'Carbon Fiber Package', 'ADAS', 'Apple CarPlay'],
        description: 'The 296 GTB redefines the concept of driving pleasure with its V6 hybrid powertrain. Revolutionary F1-derived DCT transmission delivers 830 hp.',
        location: 'London, UK',
        views: 156,
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
        status: 'sold',
        color: 'Verde Mantis',
        transmission: 'automatic',
        fuelType: 'hybrid',
        engineSize: '6.5L V12',
        horsepower: 1015,
        torque: 807,
        images: [
          'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800',
          'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800',
        ],
        features: ['LDVI 2.0', 'Carbon Fiber Monocoque', 'Active Aero', '4WD', '8-Speed DCT'],
        description: 'The first super sports V12 HPEV (High Performance Electrified Vehicle). Revolutionary hybrid system with 1,015 hp and 9,500 rpm redline.',
        location: 'London, UK',
        views: 243,
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
        status: 'available',
        color: 'GT Silver Metallic',
        transmission: 'automatic',
        fuelType: 'gasoline',
        engineSize: '3.8L Flat-6',
        horsepower: 640,
        torque: 800,
        images: [
          'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=800',
          'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800',
        ],
        features: ['Sport Chrono Package', 'PASM', 'Rear Axle Steering', 'PDLS+', '8-Speed PDK'],
        description: 'The benchmark sports car. Unmatched versatility and performance with 640 hp twin-turbo flat-six and PDK transmission.',
        location: 'Manchester, UK',
        views: 87,
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
        status: 'reserved',
        color: 'Azores Orange',
        transmission: 'automatic',
        fuelType: 'gasoline',
        engineSize: '4.0L V8',
        horsepower: 750,
        torque: 800,
        images: [
          'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800',
          'https://images.unsplash.com/photo-1580414053360-1a068582c223?w=800',
        ],
        features: ['Carbon Fiber Monocoque', 'ProActive Chassis Control', 'Track Mode', 'Drift Mode', '7-Speed SSG'],
        description: 'Lighter. Faster. Sharper. The most powerful series-production McLaren supercar with 750 hp and revolutionary carbon fiber construction.',
        location: 'London, UK',
        views: 134,
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
          'https://images.unsplash.com/photo-1606016159991-8665804d6bf9?w=800',
          'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800',
        ],
        features: ['Carbon Ceramic Brakes', 'Bang & Olufsen Audio', 'Adaptive Damping', 'Carbon Fiber Bodywork'],
        description: 'The ultimate expression of DBS Superleggera. Breathtaking V12 performance with 770 hp from the iconic 5.2L twin-turbo V12.',
        location: 'Birmingham, UK',
        views: 92,
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
        status: 'available',
        color: 'Beluga Black',
        transmission: 'automatic',
        fuelType: 'gasoline',
        engineSize: '6.0L W12',
        horsepower: 650,
        torque: 900,
        images: [
          'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
          'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800',
        ],
        features: ['W12 Engine', 'Mulliner Specification', 'Naim for Bentley Audio', '4-Seat Configuration'],
        description: 'Grand touring perfection. Unrivaled luxury meets exhilarating performance with the legendary 6.0L W12 producing 650 hp.',
        location: 'London, UK',
        views: 67,
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
        engineSize: 'Dual Electric Motors',
        horsepower: 577,
        torque: 900,
        images: [
          'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800',
          'https://images.unsplash.com/photo-1619976215249-59ab26ffa758?w=800',
        ],
        features: ['102 kWh Battery', 'Starlight Headliner', 'Spirit of Ecstasy', 'Bespoke Audio System'],
        description: 'The first fully electric Rolls-Royce. Ultra-luxury redefined with 577 hp and a 260-mile range. Single-speed electric transmission.',
        location: 'London, UK',
        views: 189,
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
          'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
        ],
        features: ['Flat-Plane Crank V8', 'Adjustable Coilover Suspension', 'Active Aero Package', 'Race Track Modes'],
        description: 'The most powerful AMG ever. Track-focused road-legal supercar with 720 hp flat-plane crank V8 and 7-speed DCT.',
        location: 'Edinburgh, UK',
        views: 78,
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
          'https://images.unsplash.com/photo-1566023888817-8c52fc734fbe?w=800',
          'https://images.unsplash.com/photo-1566024287389-235743e8e43e?w=800',
        ],
        features: ['Quad-Turbo W16', 'All-Wheel Drive', 'Carbon Fiber Monocoque', 'Luxury Handcrafted Interior'],
        description: 'The pinnacle of automotive engineering. 1,600 hp of pure hypercar perfection from the legendary W16 engine with 7-speed DSG.',
        location: 'London, UK',
        views: 312,
        isFeatured: true,
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440010',
        make: 'Koenigsegg',
        model: 'CC850',
        year: 2023,
        price: 3650000,
        mileage: 200,
        vin: 'ZN8PA20A0PS123456',
        condition: 'new',
        status: 'available',
        color: 'Konigsegg Orange',
        transmission: 'manual',
        fuelType: 'gasoline',
        engineSize: '5.0L V8',
        horsepower: 1385,
        torque: 1020,
        images: [
          'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=800',
          'https://images.unsplash.com/photo-1552519507-cf0d9ee52da8?w=800',
        ],
        features: ['Engage Shift System', 'Manual/Auto Hybrid Gearbox', 'Carbon Fiber Construction', 'Limited to 70 Units'],
        description: 'Limited production hybrid hypercar with revolutionary Engage Shift System. 1,385 hp from twin-turbo V8. Only 70 units worldwide.',
        location: 'London, UK',
        views: 287,
        isFeatured: true,
      },
    ]);
    console.log(`✅ Created ${vehicles.length} luxury vehicles\n`);

    // Seed Orders
    console.log('📦 Seeding orders...');
    const orders = await Order.bulkCreate([
      {
        id: '770e8400-e29b-41d4-a716-446655440001',
        userId: users[1].id, // James Carter
        vehicleId: vehicles[1].id, // Lamborghini Revuelto (SOLD)
        orderNumber: 'NL-2026-001',
        status: 'delivered',
        paymentStatus: 'paid',
        paymentMethod: 'Bank Transfer',
        amount: 608358.00,
        downPayment: 150000.00,
        financingDetails: {
          financed: true,
          provider: 'Lombard Automotive Finance',
          term: 48,
          interestRate: 4.5,
          monthlyPayment: 10453.21
        },
        deliveryAddress: {
          street: '15 Kensington Palace Gardens',
          city: 'London',
          postcode: 'W8 4QP',
          country: 'United Kingdom'
        },
        deliveryDate: new Date('2026-01-15'),
        notes: 'Customer requested Verde Mantis exterior with Nero Ade interior. Full paint protection film applied.',
        trackingInfo: {
          carrier: 'Enclosed Auto Transport Ltd',
          trackingNumber: 'EAT-UK-2026-001',
          status: 'Delivered'
        },
        insuranceInfo: {
          provider: 'Chubb Insurance',
          policyNumber: 'CHB-LUX-2026-JC01',
          coverage: 'Comprehensive',
          value: 650000
        },
        documents: ['invoice.pdf', 'contract.pdf', 'insurance.pdf', 'delivery-receipt.pdf']
      },
      {
        id: '770e8400-e29b-41d4-a716-446655440002',
        userId: users[3].id, // Michael Brown
        vehicleId: vehicles[3].id, // McLaren 750S (RESERVED)
        orderNumber: 'NL-2026-002',
        status: 'processing',
        paymentStatus: 'paid',
        paymentMethod: 'Wire Transfer',
        amount: 324000.00,
        downPayment: 324000.00,
        deliveryAddress: {
          street: '28 The Bishops Avenue',
          city: 'London',
          postcode: 'N2 0BE',
          country: 'United Kingdom'
        },
        deliveryDate: new Date('2026-02-25'),
        notes: 'Full payment received. Vehicle being prepared for delivery. Customer requested track day package installation.',
        trackingInfo: {
          carrier: 'McLaren Collection Service',
          status: 'In Preparation'
        },
        insuranceInfo: {
          provider: 'Hagerty Insurance',
          policyNumber: 'HAG-SPR-2026-MB01',
          coverage: 'Agreed Value',
          value: 350000
        },
        documents: ['invoice.pdf', 'contract.pdf', 'insurance-quote.pdf']
      },
      {
        id: '770e8400-e29b-41d4-a716-446655440003',
        userId: users[2].id, // Sarah Williams
        vehicleId: vehicles[0].id, // Ferrari 296 GTB
        orderNumber: 'NL-2026-003',
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod: 'Pending',
        amount: 325000.00,
        downPayment: 50000.00,
        financingDetails: {
          financed: true,
          provider: 'Ferrari Financial Services',
          term: 60,
          interestRate: 3.9,
          monthlyPayment: 5042.15
        },
        deliveryAddress: {
          street: '42 Eaton Square',
          city: 'London',
          postcode: 'SW1W 9DA',
          country: 'United Kingdom'
        },
        notes: 'Awaiting financing approval. Customer interested in extended warranty package.',
        documents: ['quote.pdf', 'financing-application.pdf']
      },
    ]);
    console.log(`✅ Created ${orders.length} orders\n`);

    // Seed Reviews
    console.log('⭐ Seeding reviews...');
    const reviews = await Review.bulkCreate([
      {
        userId: users[1].id, // James Carter
        vehicleId: vehicles[1].id, // Lamborghini Revuelto
        rating: 5,
        title: 'Absolutely Breathtaking Machine',
        comment: 'The Revuelto is everything I hoped for and more. The hybrid V12 delivers mind-blowing performance while the interior craftsmanship is second to none. NordLion made the entire purchase process seamless and professional. Highly recommend!',
        verified: true,
      },
      {
        userId: users[2].id, // Sarah Williams
        vehicleId: vehicles[6].id, // Rolls-Royce Spectre
        rating: 5,
        title: 'The Future of Luxury',
        comment: 'As my first electric vehicle, the Spectre exceeded all expectations. Silent, powerful, and utterly luxurious. The team at NordLion were fantastic throughout the entire process.',
        verified: false,
      },
      {
        userId: users[3].id, // Michael Brown
        vehicleId: vehicles[2].id, // Porsche 911 Turbo S
        rating: 5,
        title: 'Daily Driver Perfection',
        comment: 'Used this as my daily for 6 months - absolutely faultless. The 911 Turbo S is incredibly practical yet devastatingly quick. Great service from NordLion as always.',
        verified: true,
      },
      {
        userId: users[1].id, // James Carter
        vehicleId: vehicles[0].id, // Ferrari 296 GTB
        rating: 5,
        title: 'Hybrid Done Right',
        comment: 'The 296 GTB proves that hybrid technology can enhance the driving experience. The instant torque from the electric motor combined with the screaming V6 is addictive. Bellissimo!',
        verified: true,
      },
    ]);
    console.log(`✅ Created ${reviews.length} reviews\n`);

    // Seed Messages
    console.log('💬 Seeding messages...');
    const messages = await Message.bulkCreate([
      // Conversation 1: James Carter <-> Admin
      {
        senderId: users[1].id,
        receiverId: users[0].id,
        subject: 'Inquiry about Lamborghini Revuelto',
        message: 'Hi, I\'m interested in the Lamborghini Revuelto. Is it still available? Can we arrange a test drive?',
        isRead: true,
        createdAt: new Date('2026-01-05T10:30:00'),
      },
      {
        senderId: users[0].id,
        receiverId: users[1].id,
        subject: 'Re: Inquiry about Lamborghini Revuelto',
        message: 'Hello James! Yes, the Revuelto is available. I\'d be happy to arrange a test drive. When would work best for you? We\'re available this Thursday or Friday.',
        isRead: true,
        createdAt: new Date('2026-01-05T11:15:00'),
      },
      {
        senderId: users[1].id,
        receiverId: users[0].id,
        subject: 'Re: Inquiry about Lamborghini Revuelto',
        message: 'Friday at 2 PM would be perfect. Looking forward to it!',
        isRead: true,
        createdAt: new Date('2026-01-05T11:45:00'),
      },
      // Conversation 2: Sarah Williams <-> Admin
      {
        senderId: users[2].id,
        receiverId: users[0].id,
        subject: 'Ferrari 296 GTB Financing Options',
        message: 'Hello, I\'m very interested in the Ferrari 296 GTB. What financing options do you offer? I\'m looking at a 60-month term.',
        isRead: true,
        createdAt: new Date('2026-02-01T14:20:00'),
      },
      {
        senderId: users[0].id,
        receiverId: users[2].id,
        subject: 'Re: Ferrari 296 GTB Financing Options',
        message: 'Hi Sarah! We work with Ferrari Financial Services and several other premium lenders. For a 60-month term on the 296 GTB, we can offer rates starting from 3.9% APR. Shall I send you a detailed quote?',
        isRead: true,
        createdAt: new Date('2026-02-01T15:00:00'),
      },
      {
        senderId: users[2].id,
        receiverId: users[0].id,
        subject: 'Re: Ferrari 296 GTB Financing Options',
        message: 'Yes please! That rate sounds very competitive. Also, does it come with any warranty?',
        isRead: false,
        createdAt: new Date('2026-02-01T15:30:00'),
      },
      // Conversation 3: Michael Brown <-> Admin
      {
        senderId: users[3].id,
        receiverId: users[0].id,
        subject: 'McLaren 750S Delivery Update',
        message: 'Hi there, just checking on the status of my McLaren 750S order. Still on track for late February delivery?',
        isRead: true,
        createdAt: new Date('2026-02-08T09:00:00'),
      },
      {
        senderId: users[0].id,
        receiverId: users[3].id,
        subject: 'Re: McLaren 750S Delivery Update',
        message: 'Good morning Michael! Yes, everything is on schedule. Your 750S is currently having the track day package installed. We\'re expecting delivery February 25th as planned. I\'ll send you photos once it\'s ready!',
        isRead: true,
        createdAt: new Date('2026-02-08T10:30:00'),
      },
      {
        senderId: users[3].id,
        receiverId: users[0].id,
        subject: 'Re: McLaren 750S Delivery Update',
        message: 'Excellent! Can\'t wait. Please do send photos - and let me know if you need anything else from my end.',
        isRead: false,
        createdAt: new Date('2026-02-08T11:00:00'),
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
    console.log('   │ Admin:    admin@nordlion.com      / Admin123!@#     │');
    console.log('   │ Client 1: james.carter@example.com / Client123!@#   │');
    console.log('   │ Client 2: sarah.williams@example.com / Client123!@# │');
    console.log('   │ Client 3: michael.brown@example.com / Client123!@#  │');
    console.log('   │ Dealer:   dealer@elitecars.com    / Dealer123!@#    │');
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
