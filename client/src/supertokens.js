import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import Passwordless from 'supertokens-web-js/recipe/passwordless'

SuperTokens.init({
    appInfo: {
        apiDomain: "http://localhost:4000",
        apiBasePath: "/auth",
        appName: "...",
    },
    recipeList: [
        Session.init(),
        Passwordless.init(),
    ],
});
