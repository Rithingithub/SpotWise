// const supertokens = require("supertokens-node");
// const Session = require("supertokens-node/recipe/session");
// const Passwordless = require("supertokens-node/recipe/passwordless");
// const { middleware, errorHandler } = require("supertokens-node/framework/express");
// const express = require("express");
// const cors = require("cors");

// const { connectToDatabase } = require('./database/database');
// const { verifySession } = require("supertokens-node/recipe/session/framework/express");
// const Razorpay = require("razorpay");

// require('dotenv').config();
// connectToDatabase();

// // Initialize SuperTokens
// supertokens.init({
//   framework: "express",
//   supertokens: {
//     connectionURI: "http://localhost:3567",
//     apiKey: process.env.DOCKER_API_KEY,
//   },
//   appInfo: {
//     appName: "SpotWise",
//     apiDomain: "http://localhost:8000",
//     websiteDomain: "http://localhost:3000",
//     apiBasePath: "/auth",
//     websiteBasePath: "/auth",
//   },
//   recipeList: [
//     Passwordless.init({
//       flowType: "USER_INPUT_CODE",
//       contactMethod: "PHONE",
//     }),
//     Session.init(),
//   ],
// });

// const app = express();

// // SuperTokens Middleware
// app.use(middleware());

// // Uncomment the following lines if you have specific routes or APIs
// app.post("/userdata", verifySession(), async (req, res) => {
//   let userId = req.session.getUserId();
//   // mutate some user data
//   res.send({ userId });
// });

// // Define your API routes here
// // app.use('/api/v1', routers);

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// app.post("/order", async (req, res) => {
//   try {
//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
//       console.error("Razorpay API key ID or secret is missing.");
//       return res.status(500).send("Error");
//     }

//     console.log("Initializing Razorpay with key_id:", process.env.RAZORPAY_KEY_ID);
//     console.log("Initializing Razorpay with key_secret:", process.env.RAZORPAY_SECRET);

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_SECRET,
//     });

//     console.log("Razorpay initialized successfully");

//     const options = req.body;
//     console.log("Creating Razorpay order with options:", options);

//     const order = await razorpay.orders.create(options);

//     if (!order) {
//       console.error("Error creating Razorpay order");
//       return res.status(500).send("Error");
//     }

//     console.log("Razorpay order created successfully:", order);
//     res.json(order);
//   } catch (err) {
//     console.error("Error in Razorpay integration:", err);
//     res.status(500).send("Error");
//   }
// });


// // Error handling middleware
// app.use(errorHandler());

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const Passwordless = require("supertokens-node/recipe/passwordless");
const { middleware, errorHandler } = require("supertokens-node/framework/express");
const express = require("express");
const Razorpay = require("razorpay");

require('dotenv').config();

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
  isInServerlessEnv: true,
});

const app = express();

// SuperTokens Middleware
app.use(middleware());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Update with your frontend URL
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.post("/userdata", middleware(), async (req, res) => {
  try {
    let userId = req.session.getUserId();
    // mutate some user data
    res.send({ userId });
  } catch (error) {
    console.error("Error in /userdata:", error);
    res.status(500).send("Error");
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
