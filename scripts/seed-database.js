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

    // Seed Users - ONLY REAL ADMIN
    console.log('👥 Seeding users...');
    const users = await User.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        email: 'admin@nordlion.com',
        password: await bcrypt.hash('Admin123!@#', 10),
        name: 'Luc Demierre',
        phone: '+44 20 7946 0958',
        role: 'admin',
        isOnline: false, // Will be set to true when actually logged in
        verified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luc',
      },
    ], { individualHooks: false });
    console.log(`✅ Created ${users.length} user (admin only)\n`);

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
          'https://www.ferrari.com/content/dam/ferrari/common/navigation/granturismo/296-gtb/ferrari-296-gtb-granturismo-navigation-01.jpg',
          'https://www.ferrari.com/content/dam/ferrari/common/navigation/granturismo/296-gtb/ferrari-296-gtb-granturismo-navigation-02.jpg',
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
        status: 'available',
        color: 'Verde Mantis',
        transmission: 'automatic',
        fuelType: 'hybrid',
        engineSize: '6.5L V12',
        horsepower: 1015,
        torque: 807,
        images: [
          'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_gw/revuelto/2024/02_09/gate_01.jpg',
          'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_gw/revuelto/2024/02_09/gate_02.jpg',
        ],
        features: ['LDVI 2.0', 'Carbon Fiber Monocoque', 'Active Aero', '4WD', '8-Speed DCT'],
        description: 'The first super sports V12 HPEV (High Performance Electrified Vehicle). Revolutionary hybrid system with 1,015 hp and 9,500 rpm redline.',
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
          'https://files.porsche.com/filestore/image/multimedia/none/992-tu-s-modelimage-sideshot/model/cfbb8ed3-1a15-11ea-80c7-005056bbdc38/porsche-model.png',
          'https://files.porsche.com/filestore/image/multimedia/none/992-turbo-s-modelimage/model/930894f1-6214-11ea-80c8-005056bbdc38/porsche-model.png',
        ],
        features: ['Sport Chrono Package', 'PASM', 'Rear Axle Steering', 'PDLS+', '8-Speed PDK'],
        description: 'The benchmark sports car. Unmatched versatility and performance with 640 hp twin-turbo flat-six and PDK transmission.',
        location: 'Manchester, UK',
        views: 0,
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
          'https://assets.oneweb.mercedes-benz.com/iris/iris.jpg?COSY-EU-100-1713d0VXqNFqtyO67PobkmP3eWru5GTEvrjOfHEDatRbhQCrrfrEfO1qbFv5au5kiEq0l3fallQy9xTpJ8cyWRi5g6lMn',
          'https://assets.oneweb.mercedes-benz.com/iris/iris.jpg?COSY-EU-100-1713d0VXqNFqtyO67PobkmP3eWru5GTEvrjOfHEDatRbhQCrrfrEfO1qbFv5au5kiEq0l3fallQy9xTpJ8cyWRi5g6lMn',
        ],
        features: ['Carbon Fiber Monocoque', 'ProActive Chassis Control', 'Track Mode', 'Drift Mode', '7-Speed SSG'],
        description: 'Lighter. Faster. Sharper. The most powerful series-production McLaren supercar with 750 hp and revolutionary carbon fiber construction.',
        location: 'London, UK',
        views: 0,
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
          'https://www.astonmartin.com/-/media/aston-martin/images/models/heritage-models/dbs-770-ultimate/gallery/am_dbs_770_ultimate_01.jpg',
          'https://www.astonmartin.com/-/media/aston-martin/images/models/heritage-models/dbs-770-ultimate/gallery/am_dbs_770_ultimate_02.jpg',
        ],
        features: ['Carbon Ceramic Brakes', 'Bang & Olufsen Audio', 'Adaptive Damping', 'Carbon Fiber Bodywork'],
        description: 'The ultimate expression of DBS Superleggera. Breathtaking V12 performance with 770 hp from the iconic 5.2L twin-turbo V12.',
        location: 'Birmingham, UK',
        views: 0,
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
          'https://www.bentleymotors.com/content/dam/bentley/Master/Models/Continental%20GT/Speed/MY24/Gallery/16x9/Continental_GT_Speed_03.jpg',
          'https://www.bentleymotors.com/content/dam/bentley/Master/Models/Continental%20GT/Speed/MY24/Gallery/16x9/Continental_GT_Speed_02.jpg',
        ],
        features: ['W12 Engine', 'Mulliner Specification', 'Naim for Bentley Audio', '4-Seat Configuration'],
        description: 'Grand touring perfection. Unrivaled luxury meets exhilarating performance with the legendary 6.0L W12 producing 650 hp.',
        location: 'London, UK',
        views: 0,
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
          'https://www.rolls-roycemotorcars.com/content/dam/rrmc/marketUK/rollsroycemotorcars_com/spectre/page-properties/RR_Spectre.jpg',
          'https://www.rolls-roycemotorcars.com/content/dam/rrmc/marketUK/rollsroycemotorcars_com/spectre/page-properties/RR_Spectre_Interior.jpg',
        ],
        features: ['102 kWh Battery', 'Starlight Headliner', 'Spirit of Ecstasy', 'Bespoke Audio System'],
        description: 'The first fully electric Rolls-Royce. Ultra-luxury redefined with 577 hp and a 260-mile range. Single-speed electric transmission.',
        location: 'London, UK',
        views: 0,
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
          'https://assets.oneweb.mercedes-benz.com/iris/iris.jpg?COSY-EU-100-1713d0VXq0Q9ZF8BqfXqRpLOIDL3U5YALPE1LsxBieoQpJH',
          'https://assets.oneweb.mercedes-benz.com/iris/iris.jpg?COSY-EU-100-1713d0VXq0Q9ZF8BqfXqRpLOIDL3U5YALPE1LsxBieoQpJH',
        ],
        features: ['Flat-Plane Crank V8', 'Adjustable Coilover Suspension', 'Active Aero Package', 'Race Track Modes'],
        description: 'The most powerful AMG ever. Track-focused road-legal supercar with 720 hp flat-plane crank V8 and 7-speed DCT.',
        location: 'Edinburgh, UK',
        views: 0,
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
          'https://www.bugatti.com/media/news/2021/the-chiron-super-sport-300/Desktop_01.jpg',
          'https://www.bugatti.com/media/news/2021/the-chiron-super-sport-300/Desktop_02.jpg',
        ],
        features: ['Quad-Turbo W16', 'All-Wheel Drive', 'Carbon Fiber Monocoque', 'Luxury Handcrafted Interior'],
        description: 'The pinnacle of automotive engineering. 1,600 hp of pure hypercar perfection from the legendary W16 engine with 7-speed DSG.',
        location: 'London, UK',
        views: 0,
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
          'https://www.koenigsegg.com/wp-content/uploads/2023/08/CC850_01.jpg',
          'https://www.koenigsegg.com/wp-content/uploads/2023/08/CC850_02.jpg',
        ],
        features: ['Engage Shift System', 'Manual/Auto Hybrid Gearbox', 'Carbon Fiber Construction', 'Limited to 70 Units'],
        description: 'Limited production hybrid hypercar with revolutionary Engage Shift System. 1,385 hp from twin-turbo V8. Only 70 units worldwide.',
        location: 'London, UK',
        views: 0,
        isFeatured: true,
      },
    ]);
    console.log(`✅ Created ${vehicles.length} luxury vehicles\n`);

    console.log('='.repeat(60));
    console.log('✨ Database seeded successfully!');
    console.log('='.repeat(60));
    console.log('\n📊 Summary:');
    console.log(`   👥 Users:     ${users.length} (Admin only)`);
    console.log(`   🚗 Vehicles:  ${vehicles.length}`);
    console.log(`   📦 Orders:    0 (will be created by real customers)`);
    console.log(`   ⭐ Reviews:   0 (will be created by real customers)`);
    console.log(`   💬 Messages:  0 (will be created by real customers)`);
    console.log('\n🔐 Login Credentials:');
    console.log('   ┌─────────────────────────────────────────────────────┐');
    console.log('   │ Admin:  admin@nordlion.com / Admin123!@#           │');
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
