import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import prjLogo from '../images/icon_car.png';
import { resendCode, consumeCode } from "supertokens-web-js/recipe/passwordless";
import appStyles from '../app.module.css';
import styles from '../components/style.module.css'

const OTPVerification = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const phoneNumber = queryParams.get('phoneNumber');

  // Create state variable for OTP
  const [otp, setOtp] = useState('');

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    
    try {
      let response = await consumeCode({
        userInputCode: otp
      });

      if (response.status === "OK") {
        if (response.createdNewUser) {
          // user sign up success
        } else {
          // user sign in success
        }
        window.location.assign("/"); // Corrected route to "Mainpage"
      } else if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
        window.alert("Wrong OTP! Please try again. Number of attempts left: " + (response.maximumCodeInputAttempts - response.failedCodeInputAttemptCount));
      } else if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
        window.alert("Old OTP entered. Please regenerate a new one and try again");
      } else {
        window.alert("Login failed. Please try again");
        window.location.assign("/auth");
      }
    } catch (err) {
      if (err.isSuperTokensGeneralError === true) {
        window.alert(err.message);
      } else {
        window.alert("Oops! Something went wrong.");
      }
    }
  };

  async function resendOTP() {
    try {
      let response = await resendCode();

      if (response.status === "RESTART_FLOW_ERROR") {
        window.alert("Login failed. Please try again");
        window.location.assign("/auth");
      } else {
        window.alert("Please check your phone for the OTP");
      }
    } catch (err) {
      if (err.isSuperTokensGeneralError === true) {
        window.alert(err.message);
      } else {
        window.alert("Oops! Something went wrong.");
      }
    }
  }

  return (
    <div>
      <div className={appStyles['Header']}>
        <img src={prjLogo} alt="Logo" width={55} height={35} />
        <h2>SpotWise</h2>
      </div>
      <br />
      <div className={styles['VContent']}>
        <form onSubmit={handleOtpVerification}>
          <div className={styles['Vtitle']}>
            <label>Enter 6-digit verification code <br /><br /><br /></label>
            <label>Enter verification code <br /><br /><br /></label>
          </div>
          <div className={styles['Vinput-container']}>
            <input
              type="text"
              id="otp"
              name="otp"
              maxLength="6"  // Set the maximum length of OTP
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <div>
            <br /><br /><br />
            <div><p>Didn't receive the code?<span className={styles['green-text']} onClick={resendOTP}> Resend </span></p></div>
            <br /><br />
            <button type="submit">Verify OTP</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
