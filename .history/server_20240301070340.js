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
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const YOUR_DOMAIN = 'http://localhost:3000';

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
    Passwordless.init({
      flowType: "USER_INPUT_CODE",
      contactMethod: "PHONE",
    }),
    Session.init(),
  ],
});

// Create an Express app instance
const app = express();

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
app.post("/like-comment", verifySession(), (req, res) => {
  let userId = req.session.getUserId();
  
});
// Define your API routes here
app.use('/api/v1', routers);

// //Stripe API
// app.get('/config', (req, res) => {
//   res.json({ key: process.env.STRIPE_PUBLISHABLE_KEY });
// });

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     ui_mode: 'embedded',
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: 'price_1Of342SFm20wFv9NOJ1Lp2Sb',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
//   });

//   res.send({clientSecret: session.client_secret});
// });

// app.get('/session-status', async (req, res) => {
//   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

//   res.send({
//     status: session.status,
//     customer_email: session.customer_details.email
//   });
// });

// // Error handling middleware
// app.use(errorHandler());

// // Custom error handler
// app.use((err, req, res, next) => {
//   // TODO: Handle errors
// });

// Start your Express server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// var instance = new Razorpay({ key_id: 'rzp_test_ugQ7FvkaVje1q9', key_secret: 'NA7EysQ5wOAzXsVhRtqyD4wB' })

// instance.orders.create({
// amount: 50000,
// currency: "INR",
// receipt: "receipt#1",
// notes: {
//     key1: "value3",
//     key2: "value2"
// }
// })

const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: 'rzp_test_ugQ7FvkaVje1q9',
  key_secret: 'NA7EysQ5wOAzXsVhRtqyD4wB',
});

app.post('/create-order', async (req, res) => {
  const options = {
    amount: 1000, // amount in paise (example: 1000 paise = ₹10)
    currency: 'INR',
  };
  
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});






