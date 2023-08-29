const express = require('express');
const app = express();
require('dotenv').config();

const routers = require('./router/router');
const { connectToDatabase } = require('./database/database');

// Middleware
app.use(express.json());

// Connect to the database
connectToDatabase();

// Use the router
app.use('/api/v1', routers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
