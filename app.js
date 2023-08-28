const express = require('express');
const { Client } = require('pg');

const app = express();
require('dotenv').config();

const routers = require('./router/router');

// Middleware
app.use(express.json());

// Use the router
app.use('/api/v1', routers);

// Database connection configuration
const dbClient = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "1234",
  database: "postgres"
});

// Endpoint to retrieve user IDs and usernames
app.get('/api/v1/users', (req, res) => {
  dbClient.connect();

  dbClient.query(`SELECT id, username FROM users`, (err, dbRes) => {
    if (!err) {
      res.json(dbRes.rows);
    } else {
      console.log(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }

    dbClient.end();
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
