import React, { useEffect } from 'react';
import { useRazorpay } from 'react-razorpay';

const Checkout = () => {
  const { createOrder, options } = useRazorpay();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      document.getElementById('rzp-button1').onclick = function (e) {
        createOrder(); // Assuming you have a createOrder function from react-razorpay
        rzp.open();
        e.preventDefault();
      };
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [options, createOrder]);

  return <button id="rzp-button1">Pay</button>;
};

export default Checkout;
