import React, { useState, useEffect } from 'react';
import styles from './timer.module.css'; 
import prjLogo from '../images/icon_car.png';
import css_styles from "../components/style.module.css";
import { IoChevronBackCircleOutline } from 'react-icons/io5';

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
    window.location.href = '/Checkout';
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

  const goBack = () => {
    window.location.href = '/';
  };

  return (
    <div>
      <div>
        <div className={css_styles['Header']}>
                <img src={prjLogo} alt='Logo' width={55} height={35} />
                <h2>SpotWise</h2>
            </div>
            <button className={css_styles['back-button']} onClick={goBack}>
                <IoChevronBackCircleOutline className={css_styles['icon']} />
            </button>
            <div className={styles['timer-heading']}>
                <h1 className={styles['timer_heading']}>Parking Timer</h1>
            </div>
      </div>
      <div className={styles['container-timer']}>
        <div className={styles['card-content']}>
          <div className={styles['clock-info']}>
            <svg className={styles['clock-icon']} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <div>Countdown</div>
          </div>
          <div className={styles['clock-info']}>
            <div>{formatTime(seconds)}</div>
          </div>
         
        </div>
      </div>
      <div className={styles['details-container']}>
            <div>hello</div>
      </div>
      <div className={styles['buttons-container']}>
      
     <button
      onClick={handleStartStop}
      className={`${styles['button-stop-or-start']} ${isActive ? styles['stop'] : styles['start']}`}
    >
      {isActive ? 'Stop' : 'Start'}
    </button>
      {!isActive && stoppedAmount !== null && <button onClick={handlePay} className={styles['payButton']}>Pay ₹{stoppedAmount}</button>}
      </div>
    </div>
  );
};

export default Timer;