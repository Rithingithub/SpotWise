

import React, { useState, useEffect } from 'react';
import styles from './timer.module.css';
import prjLogo from '../images/icon_car.png';
import css_styles from '../components/style.module.css';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';



const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
const day = currentDate.getDate();
const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [stoppedAmount, setStoppedAmount] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [content, setContent] = useState('');

  const [stopTime, setStopTime] = useState(null);
  const [initialStartTime, setInitialStartTime] = useState(null);

  const handleStartStop = () => {
    if (isActive) {
      setIsActive(false);
      if (!initialStartTime) {
        setInitialStartTime(new Date()); // Capture initial starting time
      }
      alert(`Calculating . . . . . . `);
    } else {
      setIsActive(true);
      setStopTime(new Date()); // Capture stopping time when the counter stops
      setStoppedAmount(calculateAmount());
    }
  };

  const calculateAmount = () => {
    const hours = seconds / 3600;
    const roundedHours = Math.ceil(hours);
    return roundedHours * 30;
  };

  const amount = 500;
const currency = "INR";
const receiptId = "qwsaql";

const handlePay = async () => {
  try {
    // Assuming you have the necessary details for the order
    const response = await fetch("http://localhost:8000/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const order = await response.json();
    console.log(order);

    // Redirect to the checkout page with the order ID
    history.push(`/checkout?orderId=${order.orderId}`);
  } catch (error) {
    console.error("Error:", error);
    // Handle the error, e.g., display an error message to the user
  }
};


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const center = urlParams.get('center');
    const content = urlParams.get('content');

    setSelectedCenter(center);
    setContent(content);

    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}h ${minutes
      .toString()
      .padStart(2, '0')}m ${remainingSeconds.toString().padStart(2, '0')}s`;
  };

  const goBack = () => {
    window.location.href = '/SlotPage';
  };

  return (
    <div>
      <div>
        <div className={css_styles['Header']}>
          <img src={prjLogo} alt="Logo" width={55} height={35} />
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
            <svg
              className={styles['clock-icon']}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
        <div>Parking Area: {selectedCenter}</div>
        <div>Address</div>
        <div>Parking Spot: {content}</div>
        <div>Coordinate</div>
        <div>Date: {formattedDate}</div>
        {/* <div>Starting Time: {startTime && startTime.toLocaleTimeString()}</div>
        <div>Stopping Time:{stopTime &&  stopTime.toLocaleTimeString()}</div> */}
        {/* {startTime && <div>Starting Time: {startTime.toLocaleTimeString()}</div>}
        {stopTime && <div>Stopping Time: {stopTime.toLocaleTimeString()}</div>} */}
        {/* {initialStartTime && <div>Starting Time: {initialStartTime.toLocaleTimeString()}</div>}
        {stopTime && <div>Stopping Time: {stopTime.toLocaleTimeString()}</div>} */}
        {initialStartTime && <div>Starting Time: {initialStartTime.toLocaleTimeString()}</div>}
        {!isActive && stopTime && <div>Stopping Time: {stopTime.toLocaleTimeString()}</div>}
      </div>
      <div className={styles['buttons-container']}>
        <button
          onClick={handleStartStop}
          className={`${styles['button-stop-or-start']} ${
            isActive ? styles['stop'] : styles['start']
          }`}
        >
          {isActive ? 'Stop' : 'Start'}
        </button>
        {!isActive && stoppedAmount !== null && (
          <button onClick={handlePay} className={styles['payButton']}>
            Pay ₹{stoppedAmount}
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;
