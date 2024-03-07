const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const Passwordless = require("supertokens-node/recipe/passwordless");
const { middleware, errorHandler } = require("supertokens-node/framework/express");
const express = require("express");
const cors = require("cors");
const routers = require('./router/router');
const { connectToDatabase } = require('./database/database');
const { verifySession } = require ("supertokens-node/recipe/session/framework/express");
const { SessionRequest } = require("supertokens-node/framework/express");
const Razorpay = require("razorpay");
const YOUR_DOMAIN = 'http://localhost:3000';
const Dashboard = require("supertokens-node/recipe/dashboard");
const http = require('http');
const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);

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

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

// SuperTokens Middleware
app.use(middleware());

app.post("/change-user-data", verifySession(), async (req, res) => {
  let userId = req.session.getUserId();
  // mutate some user data
  res.send({
      userId
  })
});

// Define your API routes here
app.use('/api/v1', routers);


//CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

//RAZORPAY 

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

// Error handling middleware
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

const io = new Server(server);
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('slotChange', ({ slot, color }) => {
    console.log(`Received slotChange event for slot ${slot} with color ${color}`);
    // Broadcast the slotChange event to all clients except the sender
    socket.broadcast.emit('slotChange', { slot, color });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
