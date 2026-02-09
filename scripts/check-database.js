require('dotenv').config();
const { Sequelize } = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env file!');
  console.log('\nPlease create a .env file with:');
  console.log('DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/nordlion_db');
  process.exit(1);
}

console.log('\n' + '='.repeat(60));
console.log('🔍 NordLion Database Health Check');
console.log('='.repeat(60) + '\n');

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
});

async function checkDatabase() {
  try {
    // Test connection
    console.log('📡 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful!\n');

    // Check if tables exist
    console.log('📋 Checking tables...');
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    if (results.length === 0) {
      console.log('⚠️  No tables found! Run the seed script to populate the database.');
      console.log('   Command: node scripts/seed-database.js\n');
    } else {
      console.log(`✅ Found ${results.length} tables:\n`);
      
      for (const row of results) {
        const tableName = row.table_name;
        const [countResult] = await sequelize.query(`SELECT COUNT(*) as count FROM "${tableName}"`);
        const count = parseInt(countResult[0].count);
        
        const emoji = count > 0 ? '✅' : '⚠️ ';
        console.log(`   ${emoji} ${tableName.padEnd(20)} - ${count} records`);
      }
      console.log('');
    }

    // Check specific data
    console.log('🔍 Checking specific data...\n');
    
    try {
      const [vehicles] = await sequelize.query('SELECT COUNT(*) as count FROM "Vehicles"');
      const vehicleCount = parseInt(vehicles[0].count);
      console.log(`   ${vehicleCount > 0 ? '✅' : '❌'} Vehicles: ${vehicleCount}`);
      
      if (vehicleCount > 0) {
        const [vehicleList] = await sequelize.query('SELECT make, model, price, status FROM "Vehicles" LIMIT 5');
        console.log('\n   Top 5 Vehicles:');
        vehicleList.forEach((v, i) => {
          console.log(`   ${i + 1}. ${v.make} ${v.model} - £${v.price.toLocaleString()} (${v.status})`);
        });
      }
    } catch (err) {
      console.log('   ⚠️  Vehicles table not found');
    }

    console.log('');

    try {
      const [users] = await sequelize.query('SELECT COUNT(*) as count FROM "Users"');
      const userCount = parseInt(users[0].count);
      console.log(`   ${userCount > 0 ? '✅' : '❌'} Users: ${userCount}`);
      
      if (userCount > 0) {
        const [userList] = await sequelize.query('SELECT name, email, role FROM "Users" LIMIT 5');
        console.log('\n   Registered Users:');
        userList.forEach((u, i) => {
          console.log(`   ${i + 1}. ${u.name} (${u.email}) - ${u.role}`);
        });
      }
    } catch (err) {
      console.log('   ⚠️  Users table not found');
    }

    console.log('');

    try {
      const [orders] = await sequelize.query('SELECT COUNT(*) as count FROM "Orders"');
      const orderCount = parseInt(orders[0].count);
      console.log(`   ${orderCount > 0 ? '✅' : '❌'} Orders: ${orderCount}`);
    } catch (err) {
      console.log('   ⚠️  Orders table not found');
    }

    try {
      const [messages] = await sequelize.query('SELECT COUNT(*) as count FROM "Messages"');
      const messageCount = parseInt(messages[0].count);
      console.log(`   ${messageCount > 0 ? '✅' : '❌'} Messages: ${messageCount}`);
    } catch (err) {
      console.log('   ⚠️  Messages table not found');
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎉 Database Status: HEALTHY');
    console.log('='.repeat(60) + '\n');

    console.log('💡 Next Steps:');
    console.log('   1. Start backend: cd backend && npm run dev');
    console.log('   2. Start frontend: npm run dev');
    console.log('   3. Login with: admin@nordlion.com / Admin123!@#\n');

  } catch (error) {
    console.error('\n❌ Database check failed!');
    console.error('\nError:', error.message);
    
    if (error.message.includes('password authentication failed')) {
      console.log('\n💡 Fix: Update your DATABASE_URL in .env with correct password');
    } else if (error.message.includes('does not exist')) {
      console.log('\n💡 Fix: Create database in PGAdmin:');
      console.log('   1. Open PGAdmin 4');
      console.log('   2. Right-click "Databases" > Create > Database');
      console.log('   3. Name: nordlion_db');
      console.log('   4. Click Save');
      console.log('\n   Or run: psql -U postgres -c "CREATE DATABASE nordlion_db;"');
    } else if (error.message.includes('connect ECONNREFUSED')) {
      console.log('\n💡 Fix: PostgreSQL is not running');
      console.log('   - Start PostgreSQL from PGAdmin or services');
      console.log('   - Or run: brew services start postgresql (macOS)');
      console.log('   - Or run: sudo service postgresql start (Linux)');
    }
    
    console.log('');
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

checkDatabase();
