import React from 'react';
import styles from './Popup.module.css';
import prjLogo from '../images/icon_car.png';




const Popup = ({ onSelectSlot, onClose }) => {
  const handleSelectSlot = async (e) => {
    onSelectSlot(); 
    onClose(); 
    window.location.href = '/timer'; 
    // window.location.href = '/checkout';
  }


  const amount = 10000;
const currency = "INR";
const receiptId = "qwsaql";


  const handlePay = async (e) => {

   
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




  
 

  
  return (
    <div className={styles.popup}>
      <button onClick={handleSelectSlot}>Select Slot</button>
      <button onClick={handlePay}>Reserve Slot</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default Popup;



// import React from 'react';
// import styles from './Popup.module.css';
// import prjLogo from '../images/icon_car.png';

// const amount = 500;
// const currency = "INR";
// const receiptId = "qwsaql";

// const Popup = ({ onSelectSlot, onClose }) => {
//   const handleSelectSlot = async (e) => {
//     onSelectSlot(); 
//     onClose(); 
//     try {
//       const response = await fetch("http://localhost:8000/order", {
//         method: "POST",
//         body: JSON.stringify({
//           amount,
//           currency,
//           receipt: receiptId,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const order = await response.json();
//       console.log(order);

//       // Redirect to Razorpay payment page
//       const options = {
//         key: "NA7EysQ5wOAzXsVhRtqyD4wB",
//         amount: order.amount, // order amount
//         currency: order.currency, // currency
//         order_id: order.id, // order ID
//         name: "Spotwise",
//         description: "A Smart Parking System",
//         image: prjLogo,
//         handler: function (response) {
//           // Handle successful payment
//           alert("Payment successful!");
//         },
//         prefill: {
//           name: "Gaurav Kumar",
//           email: "gaurav.kumar@example.com",
//           contact: "9000090000",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };
//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();

//       e.preventDefault();
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle the error, e.g., display an error message to the user
//     }
//   };

//   return (
//     <div className={styles.popup}>
//       <button onClick={handleSelectSlot}>Select Slot</button>
//       <button onClick={handleSelectSlot}>Reserve Slot</button>
//       <button onClick={onClose}>Cancel</button>
//     </div>
//   );
// };

// export default Popup;



  
