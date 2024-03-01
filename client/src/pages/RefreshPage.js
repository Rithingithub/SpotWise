import { useEffect } from 'react';
import Session from 'supertokens-web-js/recipe/session';

function attemptRefresh() {
    Session.attemptRefreshingSession().then(success => {
        if (success) {
            window.location.href = "/MainPage";
        } else {
            window.location.href = "/"
        }
    })
}

function RefreshPage() {
    useEffect(() => {
        attemptRefresh();
    }, []); 
    return null; 
}

export default RefreshPage;
