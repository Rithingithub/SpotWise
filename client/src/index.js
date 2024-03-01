import './app.module.css';
import './index.css';

import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import Passwordless from 'supertokens-web-js/recipe/passwordless'


import { AuthProvider } from './pages/AuthContext';
import PhoneNumberInput from './pages/PhoneNumberInput';
import OTPVerification from './pages/OTPVerification';
import MainPage from './pages/MainPage';
import SlotPage from './pages/SlotPage';
import RefreshPage from './pages/RefreshPage';
import PaymentTiles from './components/PaymentTiles'
import Settings from './components/settings'
import History from './components/history'
import Support from './components/support'
import Timer from './pages/Timer';
import { Return, CheckoutForm } from './pages/CheckoutForm';

SuperTokens.init({
  appInfo: {
    apiDomain: "http://localhost:8000",
    apiBasePath: "/auth",
    appName: "SpotWise",
  },
  recipeList: [
    Session.init(),
    Passwordless.init(),
  ],
});

const App = () => {
  useEffect(() => {
    async function checkSession() {
      if (await Session.doesSessionExist()) {
        // window.location.href = "/MainPage";
      } else {
        // window.location.href = "/";
      }
    }
    checkSession();
  }, []);

  return (
    <React.StrictMode>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PhoneNumberInput />} />
            <Route path="/MainPage" element={<MainPage />} />
            <Route path="/refresh-page" element={<RefreshPage />} />
            <Route path="/SlotPage" element={<SlotPage />} />
            <Route path="/OTP" element={<OTPVerification />} />
            <Route path="/PaymentTiles" element={<PaymentTiles />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/history" element={<History />} />
            <Route path="/support" element={<Support />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/return" element={<Return />} />
          </Routes>
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);