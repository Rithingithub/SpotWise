import React, { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import {EmbeddedCheckoutProvider,EmbeddedCheckout} from '@stripe/react-stripe-js';
import {BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom";

import styles from './checkout.module.css'

// Component for the checkout form
const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const fetchStripePublishableKey = async () => {
      const response = await fetch('/config');
      const { key } = await response.json();
      const stripePromise = loadStripe(key);
      setStripePromise(stripePromise);
    };

    fetchStripePublishableKey();
  }, []);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch("/create-checkout-session", {
        method: "POST",
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, []);

  return (
    <div className={styles.checkout}>
      {clientSecret && stripePromise && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}

// Component to handle the return after payment completion
const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const fetchSessionStatus = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get('session_id');

      const response = await fetch(`/session-status?session_id=${sessionId}`);
      const data = await response.json();
      
      setStatus(data.status);
      setCustomerEmail(data.customer_email);
    };

    fetchSessionStatus();
  }, []);

  if (status === 'open') {
    return <Navigate to="/checkout" />;
  }

  if (status === 'complete') {
    return (
      <section className={styles.success}>
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.
          If you have any questions, please email <a href="mailto:Spotwise@gmail.com">SpotWise@gmail.com</a>.
        </p>
      </section>
    );
  }

  return null;
}

export { CheckoutForm, Return };
