const express = require('express');
const cors = require('cors');
const supertokens = require('supertokens-node');
const Session = require('supertokens-node/recipe/session');
const Passwordless = require('supertokens-node/recipe/passwordless');
const { middleware, errorHandler } = require('supertokens-node/framework/express');

const app = express(); // Create a single Express app instance

// Initialize SuperTokens
supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "https://try.supertokens.com", // Replace with your core instance URL
        // apiKey: <API_KEY(if configured)>,
    },
    appInfo: {
        appName: "SpotWise",
        apiDomain: "http://localhost:4000", // Change to port 4000
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        Passwordless.init({
            flowType: "USER_INPUT_CODE",
            contactMethod: "PHONE"
        }),
        Session.init()
    ]
});

app.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));

// IMPORTANT: CORS should be before the below line.
app.use(middleware());

// ... Define your API routes here

// Error handler for SuperTokens
app.use(errorHandler());

// Your custom error handler
app.use((err, req, res, next) => {
    // Handle your errors here
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});
const port = 4000; // Port for API domain

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});