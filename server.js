const express = require("express");
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io');
const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const Passwordless = require("supertokens-node/recipe/passwordless");
const { middleware, errorHandler } = require("supertokens-node/framework/express");
const routers = require('./router/router');
const { connectToDatabase } = require('./database/database');
const { verifySession } = require ("supertokens-node/recipe/session/framework/express");
const { SessionRequest } = require("supertokens-node/framework/express");
const Razorpay = require("razorpay");
const YOUR_DOMAIN = 'http://localhost:3000';
const Dashboard = require("supertokens-node/recipe/dashboard");

require('dotenv').config();
connectToDatabase();

// Initialize SuperTokens
supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "http://localhost:3567",
  },
  appInfo: {
    appName: "SpotWise",
    apiDomain: "http://localhost:8000",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    Dashboard.init({
      admins: [],
    }),
    Passwordless.init({
      flowType: "USER_INPUT_CODE",
      contactMethod: "PHONE",
    }),
    Session.init(),
  ],
});

// Create an Express app instance
const app = express();
const server = http.createServer(app);

// CORS
const corsOptions = {
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
};

// CORS (Socket)
const io = new Server(server, {
  cors: corsOptions,
});

// CORS (Supertokens, Razorpay)
app.use(cors(corsOptions));

// Socket Connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on('slotChange', ({ slot, color }) => {
    console.log(`Received slotChange event for slot ${slot} with color ${color}`);
    
    // Broadcast the slotChange event to all clients including the sender
    io.emit('slotChange', { slot, color });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Middleware (Supertokens)
app.use(middleware());
app.post("/change-user-data", verifySession(), async (req, res) => {
  let userId = req.session.getUserId();
  res.send({
      userId
  })
});

// Define your API routes here
app.use('/api/v1', routers);

// Middleware (JSON, URL)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Razorpay
app.post("/order", async (req, res) => {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
      console.error("Razorpay API key ID or secret is missing.");
      return res.status(500).send("Error");
    }

    console.log("Initializing Razorpay with key_id:", process.env.RAZORPAY_KEY_ID);
    console.log("Initializing Razorpay with key_secret:", process.env.RAZORPAY_SECRET);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    console.log("Razorpay initialized successfully");

    const options = req.body;
    console.log("Creating Razorpay order with options:", options);

    const order = await razorpay.orders.create(options);

    if (!order) {
      console.error("Error creating Razorpay order");
      return res.status(500).send("Error");
    }

    console.log("Razorpay order created successfully:", order);
    res.json(order);
  } catch (err) {
    console.error("Error in Razorpay integration:", err);
    res.status(500).send("Error");
  }
});

// Middleware (errorHandler)
app.use(errorHandler());

// Custom error handler
app.use((err, req, res, next) => {
  // TODO: Handle errors
});

// Start your Express server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



