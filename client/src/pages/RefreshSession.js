import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Session from 'supertokens-web-js/recipe/session';

function RefreshSession() {
    const navigate = useNavigate();
    useEffect(() => {
        async function attemptRefresh() {
            Session.attemptRefreshingSession().then(success => {
                if (success) {
                    navigate('/');
                } else {
                    navigate("/auth");
                }
            });
        }
        attemptRefresh();
    }, [navigate]);
}

export default RefreshSession;
