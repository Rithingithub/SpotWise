// In SlotPage.js
import React, { useEffect, useState } from 'react';
import prjLogo from '../images/icon_car.png';
import Navbar from '../components/Navbar';
import BoxComponent from './BoxComponent';
import Popup from './Popup';
import box_style from './box.module.css';
import styles from '../components/style.module.css';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:8000');


const SlotPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [slotColors, setSlotColors] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const center = urlParams.get('center');
    setSelectedCenter(center);

    console.log("Socket connected:", socket.connected);
    return () => {
      console.log("Socket disconnected");
      // Clean up the socket connection
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Listen for slotChange events from the server
    socket.on('slotChange', ({ slot, color }) => {
      // Update the slot color in the state
      setSlotColors(prevState => ({
        ...prevState,
        [slot]: color
      }));
    });

    // Clean up event listener on unmount
    return () => {
      socket.off('slotChange');
    };
  }, []);

  const amount = 500;
  const currency = "INR";
  const receiptId = "qwsaql";

  const handleSelectSlot = async (content, e) => {
    const urlParams = new URLSearchParams(window.location.search);
    const center = urlParams.get('center');

    setSelectedSlot(content);
    setSelectedCenter(center);
    // setShowPopup(true);
    socket.emit('slotChange', { slot: content, color: 'red' });

    // Set a timer to revert the color back to its original state after an hour
    setTimeout(() => {
      setSlotColors(prevState => ({
        ...prevState,
        [content]: 'Green'
      }));
    }, 3600000); // 1 hour in milliseconds


    try {
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

      // Razorpay SDK script inclusion
      const razorpayScript = document.createElement("script");
      razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(razorpayScript);

      razorpayScript.onload = () => {
        // Initialize Razorpay only when the script is loaded
        initializeRazorpay(order);
      };

      e.preventDefault();
    } catch (error) {
      console.error("Error:", error);
      // Handle the error, e.g., display an error message to the user
    }
  };


  const initializeRazorpay = (order) => {
    var options = {
      key: "rzp_test_ugQ7FvkaVje1q9", // Enter the Key ID generated from the Dashboard
      amount,
      currency,
      "name": "Spotwise", //your business name
      "description": "A Smart Parking System",
      "image": {prjLogo},
      "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": "Gaurav Kumar", //your customer's name
          "email": "gaurav.kumar@example.com", 
          "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);

    });
    rzp1.open();
      };


  const handleClosePopup = () => {
    setSelectedSlot(null);
    setShowPopup(false);
  };

  const redirectToCheckout = () => {
    window.location.href = `/checkout?center=${selectedCenter}&content=${selectedSlot}`;
  };

  return (
    <div>
      <div className={styles['Navbar']}>
        <Navbar />
      </div>
      <div className={box_style['box-container']}>
        {['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12'].map(slot => (
          <BoxComponent
            key={slot}
            content={slot}
            color={slotColors[slot] || 'Green'}
            handleClick={() => handleSelectSlot(slot)}
          />
        ))}
      </div>
      {showPopup && (
        <Popup onClose={handleClosePopup} onSelectSlot={redirectToCheckout} />
      )}
    </div>
  );
};

export default SlotPage;
