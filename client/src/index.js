// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext';
import PhoneNumberInput from './pages/PhoneNumberInput';
import OTPVerification from './pages/OTPVerification';
import MainPage from './pages/MainPage';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          {/* Step 1: Collect Phone Number */}
          <Route path="/" element={<PhoneNumberInput />} />

          {/* Step 2: Verify OTP */}
          <Route path="/OTPVerification" element={<OTPVerification />} />

          {/* Step 3: Main Page */}
          <Route path="/MainPage" element={<MainPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
