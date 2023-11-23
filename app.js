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

// Define your API routes here
app.use('/api/v1', routers);

// Error handling middleware
app.use(errorHandler());

// Custom error handler
app.use((err, req, res, next) => {
  // TODO: Handle errors
});

// Start your Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
