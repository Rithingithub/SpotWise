const { Client } = require('pg');
require('dotenv').config();

const dbClient = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const connectToDatabase = () => {
  dbClient.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.message);
    } else {
      console.log('Connected to the database');
    }
  });
};

module.exports = {
  dbClient,
  connectToDatabase
};
