require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize } = require('../backend/config/database');

// Import models
const User = require('../backend/models/User.model');
const Vehicle = require('../backend/models/Vehicle.model');
const Order = require('../backend/models/Order.model');
const Review = require('../backend/models/Review.model');
const Message = require('../backend/models/Message.model');

// Define associations
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'customer' });

Vehicle.hasMany(Order, { foreignKey: 'vehicleId' });
Order.belongsTo(Vehicle, { foreignKey: 'vehicleId', as: 'vehicle' });

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
    console.log('🌱 NordLion Database Seeder v2');
    console.log('='.repeat(60) + '\n');

    console.log('🔄 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!\n');

    console.log('🔄 Syncing database schema (this will reset all data)...');
    await sequelize.sync({ force: true });
    console.log('✅ Database schema synced!\n');

    // Seed Users with CORRECT WORKING EMAILS
    console.log('👥 Seeding users...');
    const users = await User.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        email: 'admin@nordlion.com',
        password: await bcrypt.hash('Admin123!@#', 10),
        name: 'Luc Demierre',
        phone: '+44 20 7946 0958',
        role: 'admin',
        isOnline: false,  // Only show online when actually logged in
        verified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luc',
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        email: 'client@nordlionauto.com',  // WORKING EMAIL
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
        email: 'broker@nordlionauto.com',  // WORKING EMAIL
        password: await bcrypt.hash('Broker123!@#', 10),
        name: 'Sarah Williams',
        phone: '+44 20 7946 5678',
        role: 'broker',
        isOnline: false,
        verified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      },
    ], { individualHooks: false });
    console.log(`✅ Created ${users.length} users\n`);

    // Seed Vehicles with Unsplash images
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
          'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80',
          'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=80',
        ],
        features: ['F1 DCT Transmission', 'Hybrid V6 Powertrain', 'Carbon Fiber Package', 'ADAS', 'Apple CarPlay'],
        description: 'The 296 GTB redefines the concept of driving pleasure with its V6 hybrid powertrain. Revolutionary F1-derived DCT transmission delivers 830 hp.',
        location: 'London, UK',
        views: 0,
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
          'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&q=80',
          'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=1200&q=80',
        ],
        features: ['LDVI 2.0', 'Carbon Fiber Monocoque', 'Active Aero', '4WD', '8-Speed DCT'],
        description: 'The first super sports V12 HPEV. Revolutionary hybrid system with 1,015 hp and 9,500 rpm redline.',
        location: 'London, UK',
        views: 0,
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
          'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=1200&q=80',
          'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1200&q=80',
        ],
        features: ['Sport Chrono Package', 'PASM', 'Rear Axle Steering', 'PDLS+', '8-Speed PDK'],
        description: 'The benchmark sports car. Unmatched versatility and performance with 640 hp twin-turbo flat-six.',
        location: 'Manchester, UK',
        views: 0,
        isFeatured: false,
      },
    ]);
    console.log(`✅ Created ${vehicles.length} luxury vehicles\n`);

    // Seed Orders
    console.log('📦 Seeding orders...');
    const orders = await Order.bulkCreate([
      {
        id: '770e8400-e29b-41d4-a716-446655440001',
        userId: users[1].id, // James Carter
        vehicleId: vehicles[1].id, // Lamborghini (SOLD)
        orderNumber: 'NL-2026-001',
        status: 'delivered',
        paymentStatus: 'paid',
        paymentMethod: 'Bank Transfer',
        amount: 608358.00,
        downPayment: 150000.00,
        deliveryAddress: {
          street: '15 Kensington Palace Gardens',
          city: 'London',
          postcode: 'W8 4QP',
          country: 'United Kingdom'
        },
        deliveryDate: new Date('2026-01-15'),
        notes: 'Delivered successfully',
        createdAt: new Date('2026-01-01'),
        documents: ['invoice.pdf', 'contract.pdf', 'insurance.pdf']
      },
      {
        id: '770e8400-e29b-41d4-a716-446655440002',
        userId: users[1].id,
        vehicleId: vehicles[0].id, // Ferrari
        orderNumber: 'NL-2026-002',
        status: 'processing',
        paymentStatus: 'paid',
        paymentMethod: 'Wire Transfer',
        amount: 325000.00,
        downPayment: 325000.00,
        deliveryAddress: {
          street: '28 The Bishops Avenue',
          city: 'London',
          postcode: 'N2 0BE',
          country: 'United Kingdom'
        },
        deliveryDate: new Date('2026-02-25'),
        notes: 'In preparation',
        createdAt: new Date('2026-02-05'),
        documents: ['invoice.pdf', 'contract.pdf']
      },
    ]);
    console.log(`✅ Created ${orders.length} orders\n`);

    // Seed Reviews
    console.log('⭐ Seeding reviews...');
    const reviews = await Review.bulkCreate([
      {
        userId: users[1].id,
        vehicleId: vehicles[1].id,
        rating: 5,
        title: 'Absolutely Breathtaking Machine',
        comment: 'The Revuelto is everything I hoped for and more. The hybrid V12 delivers mind-blowing performance.',
        verified: true,
      },
    ]);
    console.log(`✅ Created ${reviews.length} reviews\n`);

    // Seed Messages
    console.log('💬 Seeding messages...');
    const messages = await Message.bulkCreate([
      {
        senderId: users[1].id,
        receiverId: users[0].id,
        subject: 'Inquiry about Ferrari 296 GTB',
        message: 'Hi, I\'m interested in the Ferrari. Can we arrange a test drive?',
        isRead: true,
        createdAt: new Date('2026-02-01T10:30:00'),
      },
      {
        senderId: users[0].id,
        receiverId: users[1].id,
        subject: 'Re: Inquiry about Ferrari 296 GTB',
        message: 'Hello James! Yes, the Ferrari is available. When would work for you?',
        isRead: true,
        createdAt: new Date('2026-02-01T11:15:00'),
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
    console.log('\n🔐 WORKING Login Credentials:');
    console.log('   ┌─────────────────────────────────────────────────────┐');
    console.log('   │ Admin:  admin@nordlion.com      / Admin123!@#       │');
    console.log('   │ Client: client@nordlionauto.com / Client123!@#      │');
    console.log('   │ Broker: broker@nordlionauto.com / Broker123!@#      │');
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
