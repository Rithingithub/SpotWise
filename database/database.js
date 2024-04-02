const { Client } = require('pg');
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const History = sequelize.define('History', {
    timestamp: {
        type: Sequelize.DATE,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    payAmount: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');
    await sequelize.sync(); // Sync the model with the database
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

module.exports = {
  sequelize,
  History,
  connectToDatabase
};
