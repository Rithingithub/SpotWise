import React from 'react';
import { useLocation } from 'react-router-dom';

const OTPVerification = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const phoneNumber = queryParams.get('phoneNumber');

  return (
    <div>
      <h1>OTP Verification</h1>
      <p>Phone Number: {phoneNumber}</p>
      {console.log(phoneNumber)}
    </div>
  );
}

export default OTPVerification;
