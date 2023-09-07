import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import prjLogo from '../images/icon_car.png';

const PhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    // Validate the phone number here if needed

    // Redirect to OTPVerification page with the phone number as a query parameter
    navigate(`/OTPVerification?phoneNumber=${phoneNumber}`);
  };

  return (
    <div>
      <div className='Header'>
        <img src={prjLogo} alt="Logo" width={64} height={43} />
        <h1>SpotWise</h1>
      </div>
      <div className='Content'>
        <form onSubmit={handleClick}>
          <div className='input-container'>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button type="submit">Get OTP</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PhoneNumber;