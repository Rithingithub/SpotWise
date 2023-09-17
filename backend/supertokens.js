import supertokens from "supertokens-node";

supertokens.init({
    supertokens: {
        connectionURI: "http://localhost:3567",
        apiKey: "someKey" // OR can be undefined
    },
    appInfo: {
        apiDomain: "http://localhost:4000",
        appName: "SpotWise",
        websiteDomain: "http://localhost:3000"
    },
    recipeList: []
});