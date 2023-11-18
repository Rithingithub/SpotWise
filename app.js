const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const Passwordless = require("supertokens-node/recipe/passwordless");
const { middleware, errorHandler } = require("supertokens-node/framework/express");
const express = require("express");
const cors = require("cors");
const routers = require('./router/router');
const { connectToDatabase } = require('./database/database');

require('dotenv').config();
connectToDatabase();

// Initialize SuperTokens
supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "https://st-dev-d7b68450-55f7-11ee-8ee2-61be51f08b14.aws.supertokens.io",
    // connectionURI: "postgresql://db_xw2uj1nu6gmt_user:0sv9zvgag80nhpwz5@us-east-1-dev-1.cluster-cef2h4iyk59c.us-east-1.rds.amazonaws.com:5432/db_xw2uj1nu6gmt",
    apiKey: "3nP=9NfYE2LM-Poc=dAR1iMRme" 
},
  appInfo: {
    // Application-specific information
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
// Define your API routes here
// ...your API routes
app.use('/api/v1', routers);
// Error handling middleware
app.use(errorHandler());

// Custom error handler
app.use((err, req, res, next) => {
  // TODO: Handle errors
});

// Start your Express server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});