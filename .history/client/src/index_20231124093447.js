// index.js
import React from 'react';
import './App.css';
import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import Passwordless from 'supertokens-web-js/recipe/passwordless'
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext';
import PhoneNumberInput from './pages/PhoneNumberInput';
import OTPVerification from './pages/OTPVerification';
import MainPage from './pages/MainPage';
import PaymentTiles from './components/PaymentTiles'
import Settings from './components/settings'
import History from './components/history'
import Support from './components/support'
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


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          {/* Step 1: Collect Phone Number */}
          <Route path="/" element={<MainPage />} />

          {/* Collect Phone Number */}
          <Route path="/auth" element={<PhoneNumberInput />} />

          {/* Verify OTP */}
          <Route path="/OTP" element={<OTPVerification />} />

          <Route path="/PaymentTiles" element={<PaymentTiles />} />

          <Route path="/settings" element={<settings />} />

          <Route path="/history" element={<history />} />

          <Route path="/support" element={<support />} />


        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
