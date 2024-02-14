import React from 'react';
import { IoChevronBackCircleOutline } from 'react-icons/io5'; // Import the IoChevronBackCircleOutline icon
import css_styles from "../components/style.module.css";
import prjLogo from '../images/icon_car.png';
import gpay from './paymentimages/gpay.png'
import paypal from './paymentimages/paypal.png'
import visa from './paymentimages/visa.png'
import apay from './paymentimages/apay.png'
const PaymentTiles = () => {
  const goBack = () => {
    // Use a regular anchor tag to navigate to the main page
    window.location.href = '/';
  };
  return (
    <div>
      <div className={css_styles['Header']}>
        <img src={prjLogo} alt="Logo" width={55} height={35} />
        <h2>SpotWise</h2>
      </div>
      <button className={css_styles["back-button"]} onClick={goBack}>
        <IoChevronBackCircleOutline className='icon'/> {/* Use the IoChevronBackCircleOutline icon */}
      </button>
      <div className={css_styles['paytiles']}>
      <img src={gpay} alt="googlepay" width={175} height={120} />
      <img src={paypal} alt="paypal" width={175} height={120} />
      <img src={visa} alt="visa" width={175} height={120} />
      <img src={apay} alt="applepay" width={175} height={120} />
      </div>
      
    </div>
  );
};

export default PaymentTiles;
