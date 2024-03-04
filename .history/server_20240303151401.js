const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const Passwordless = require("supertokens-node/recipe/passwordless");
const { middleware, errorHandler } = require("supertokens-node/framework/express");
const express = require("express");
const cors = require("cors");

const { connectToDatabase } = require('./database/database');
const { verifySession } = require("supertokens-node/recipe/session/framework/express");
const Razorpay = require("razorpay");

require('dotenv').config();
connectToDatabase();

// Initialize SuperTokens
supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "http://localhost:3567",
    apiKey: process.env.DOCKER_API_KEY,
  },
  appInfo: {
    appName: "SpotWise",
    apiDomain: "http://localhost:8000",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    Passwordless.init({
      flowType: "USER_INPUT_CODE",
      contactMethod: "PHONE",
    }),
    Session.init(),
  ],
});

const app = express();

// SuperTokens Middleware
app.use(middleware());

// Uncomment the following lines if you have specific routes or APIs
// app.post("/userdata", verifySession(), async (req, res) => {
//   let userId = req.session.getUserId();
//   // mutate some user data
//   res.send({ userId });
// });

// Define your API routes here
// app.use('/api/v1', routers);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/orders", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

// Error handling middleware
app.use(errorHandler());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
