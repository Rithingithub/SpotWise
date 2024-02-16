import React, { useState, useEffect } from 'react';
import styles from './timer.module.css'; 

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [stoppedAmount, setStoppedAmount] = useState(null);

  //Alert message
  const handleStartStop = () => {
    if (isActive) {
      setIsActive(false);
      setStoppedAmount(calculateAmount());
      alert(`Calculating . . . . . . `);
    } else {
      setIsActive(true);
    }
  };
  //Amount calculation
  const calculateAmount = () => {
    const hours = seconds / 3600; 
    const roundedHours = Math.ceil(hours);
    return roundedHours * 30;
  };

  const handlePay = () => {

  //Checkout page
    window.location.href = '/checkout';
  };

  //Time format
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${remainingSeconds.toString().padStart(2, '0')}s`;
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.cardcontent}>
          <div className={styles.clockinfo}>
            <svg className={styles.clockicon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <div>Countdown</div>
          </div>
          <div className={styles.clockinfo}>
            <div>{formatTime(seconds)}</div>
          </div>
          {/* Separate button for stop and start */}
          <button onClick={handleStartStop} className={styles.button}>{isActive ? 'Stop' : 'Start'}</button>
          {/* Button to pay */}
          {!isActive && stoppedAmount !== null && <button onClick={handlePay} className={styles.payButton}>Pay ₹{stoppedAmount}</button>}
        </div>
      </div>
    </div>
  );
};

export default Timer;
