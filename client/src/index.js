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
          <Route path="/" element={<MainPage />} />       
          <Route path="/auth" element={<PhoneNumberInput />} />
          <Route path="/OTP" element={<OTPVerification />} />
          <Route path="/PaymentTiles" element={<PaymentTiles />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/history" element={<History />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
