import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import prjLogo from '../images/icon_car.png';

const OTPVerification = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const phoneNumber = queryParams.get('phoneNumber');

  // Create separate state variables for each OTP input field
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');

  const handleOtpVerification = (e) => {
    e.preventDefault();

    // Combine the separate OTP values into one OTP string
    const otp = otp1 + otp2 + otp3 + otp4;

    // Validate the OTP here (you can add your logic for OTP validation)
    const isOtpValid = otp === '1234'; // Replace '1234' with your actual OTP validation logic

    if (isOtpValid) {
      // If OTP is valid, navigate to the main page
      // You can use window.location.href or any routing library for navigation
      window.location.href = '/MainPage'; // This is a simple example using window.location.href
    } else {
      // Handle OTP validation failure (e.g., display an error message)
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div>
      <div className='Header'>
        <img src={prjLogo} alt="Logo" width={55} height={35} />
        <h2>SpotWise</h2>
      </div>
     <br />
      <div className='VContent'>
       
      
        <form onSubmit={handleOtpVerification}>
        <label>Enter verification code <br /><br /><br /></label>
          <div className='Vinput-container'>
            <input
              type="text"
              id="otp1"
              name="otp1"
              maxLength="1"
              value={otp1}
              onChange={(e) => setOtp1(e.target.value)}
            />
          </div>
          <div className='Vinput-container'>
            <input
              type="text"
              id="otp2"
              name="otp2"
              maxLength="1"
              value={otp2}
              onChange={(e) => setOtp2(e.target.value)}
            />
          </div>
          <div className='Vinput-container'>
            <input
              type="text"
              id="otp3"
              name="otp3"
              maxLength="1"
              value={otp3}
              onChange={(e) => setOtp3(e.target.value)}
            />
          </div>
          <div className='Vinput-container'>
            <input
              type="text"
              id="otp4"
              name="otp4"
              maxLength="1"
              value={otp4}
              onChange={(e) => setOtp4(e.target.value)}
            />
          </div>
          <div  >
            <br /><br /><br />
            <div><p>Did'nt recieve code?<span className='green-text' > Resend</span></p></div>
            <br /><br />
            <button type="submit">Verify OTP</button>
          
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
