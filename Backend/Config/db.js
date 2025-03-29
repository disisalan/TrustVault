const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Required for Neon
        },
    },
    logging: false, // Set to true if you want SQL logs
});


const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Connected');
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
};

// Close connection on app exit
process.on('SIGINT', async () => {
    console.log('\n🔌 Closing database connection...');
    await sequelize.close();
    console.log('✅ Connection closed.');
    process.exit(0);
});

module.exports = { sequelize, connectDB };
