import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import app from '../app.module.css';
import prjLogo from '../images/icon_car.png';
import { createCode } from "supertokens-web-js/recipe/passwordless";

const PhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  async function sendOTP() {
    try {
      // Add the country code "+91" to the beginning of the phone number
      const formattedPhoneNumber = '+91' + phoneNumber;

      let response = await createCode({
        phoneNumber: formattedPhoneNumber
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

    // Call the sendOTP function
    await sendOTP();
    
    // Redirect to OTPVerification page with the formatted phone number as a query parameter
    navigate(`/OTP?phoneNumber=${encodeURIComponent('+91' + phoneNumber)}`);
  };

  return (
    <div>
      <div className={app['Header']}>
        <img src={prjLogo} alt="Logo" width={55} height={35} />
        <h2>SpotWise</h2>
      </div>
     
      <div className={app['Content']}>
        <form onSubmit={handleClick}>
          <h1>Login</h1>
          {/* <label >Phone Number:</label> */}
          <div className={app['input-container']}>
            {/* <div className='country-code' style={{
              width: '30px',
              height: '100%',
              border: '1px solid white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '5px',
            }}>+91</div> */}
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
