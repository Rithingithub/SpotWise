import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import prjLogo from '../images/icon_car.png';
import { createCode } from "supertokens-web-js/recipe/passwordless";

const PhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  async function sendOTP(phoneNumber) {
    try {
      let response = await createCode({
        phoneNumber
      });

      // OTP sent successfully.
      window.alert("Please check your phone for an OTP");
    } catch (err) {
      if (err.isSuperTokensGeneralError === true) {
        // This may be a custom error message sent from the API by you,
        // or if the input phone number is not valid.
        window.alert(err.message);
      } else {
        window.alert("Oops! Something went wrong.");
      }
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();

    // Validate the phone number here if needed

    // Call the sendOTP function with the phone number
    await sendOTP(phoneNumber);
    
    // Redirect to OTPVerification page with the phone number as a query parameter
    navigate(`/OTP?phoneNumber=${phoneNumber}`);
  };

  return (
    <div>
      <div className='Header'>
        <img src={prjLogo} alt="Logo" width={55} height={35} />
        <h2>SpotWise</h2>
      </div>
     
      <div className='Content'>
      
        <form onSubmit={handleClick}>
        <h1>Login</h1>
        <label >Phone Number:</label>
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
