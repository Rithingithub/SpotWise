const express = require('express');
const app = express();
require('dotenv').config(); 

const routers = require('./router/router');

// Middleware
app.use(express.json());

// Use the router
app.use('/api/v1', routers);

const PORT = process.env.PORT; // Use the PORT variable from environment or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
