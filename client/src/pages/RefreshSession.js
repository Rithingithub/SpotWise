import { useEffect } from 'react';
import Session from 'supertokens-web-js/recipe/session';

function RefreshSession() {
    useEffect(() => {
        async function attemptRefresh() {
            Session.attemptRefreshingSession().then(success => {
                if (success) {
                    // we have new session tokens, so we redirect the user back
                    // to where they were.
                    const urlParams = new URLSearchParams(window.location.search);
                    window.location.href = urlParams.get('redirectBack');
                } else {
                    // we redirect to the login page since the user
                    // is now logged out
                    window.location.href = "/auth"
                }
            });
        }
        attemptRefresh();
    }, []);

}

export default RefreshSession;
