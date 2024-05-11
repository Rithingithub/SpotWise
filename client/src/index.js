import './app.module.css';
import './index.css';

import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';

import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import Passwordless from 'supertokens-web-js/recipe/passwordless';

import { AuthProvider } from './pages/AuthContext';
import PhoneNumberInput from './pages/PhoneNumberInput';
import OTPVerification from './pages/OTPVerification';
import MainPage from './pages/MainPage';
import SlotPage from './pages/SlotPage';
import RefreshSession from "./pages/RefreshSession";
import PaymentTiles from './components/PaymentTiles';
import Settings from './components/settings';
import History from './components/history';
import Support from './components/support';
import Timer from './pages/Timer';
import MapPage from './pages/MapPage';


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
            <Route path="/auth" element={<PhoneNumberInput />} />
            <Route path="/" element={<MapPage />} />
            <Route path="/refresh" element={<RefreshSession />} />
            <Route path="/SlotPage" element={<SlotPage />} />
            <Route path="/OTP" element={<OTPVerification />} />
            <Route path="/PaymentTiles" element={<PaymentTiles />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/history" element={<History />} />
            <Route path="/support" element={<Support />} />
            <Route path="/timer" element={<Timer />} />
          
        
          </Routes>
        </Router>
      </AuthProvider>
    </React.StrictMode>,
document.getElementById("root")
);
  
