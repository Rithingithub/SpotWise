import React from 'react';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import css_styles from "../components/style.module.css";
import prjLogo from '../images/icon_car.png';
import gpay from './paymentimages/gpay.png'
import paypal from './paymentimages/paypal.png'
import visa from './paymentimages/visa.png'
import apay from './paymentimages/apay.png'
import paytm from './paymentimages/paytm.png'
import phonepe from './paymentimages/phonepe.png'
import amazonpay from './paymentimages/amazonpay.png'
import netbank from './paymentimages/netbank.png'

const PaymentTiles = () => {
  const goBack = () => {
    window.location.href = '/';
  };

  return (
    <div>
      <div className={css_styles['Header']}>
        <img src={prjLogo} alt="Logo" width={55} height={35} />
        <h2>SpotWise</h2>
      </div>
      <button className={css_styles["back-button"]} onClick={goBack}>
        <IoChevronBackCircleOutline className={css_styles['icon']}/>
      </button>
      <div className={css_styles['paytiles']}>
        <img src={gpay} alt="googlepay" width={175} height={120} />
        <img src={paypal} alt="paypal" width={175} height={120} />
        <img src={visa} alt="visa" width={175} height={120} />
        <img src={apay} alt="applepay" width={175} height={120} />
        <img src={paytm} alt="paytm" width={175} height={120} />
        <img src={phonepe} alt="phonepe" width={175} height={120} />
        <img src={amazonpay} alt="amazonpay" width={175} height={120} />
        <img src={netbank} alt="netbank" width={175} height={120} />
      </div>
    </div>
  );
};

export default PaymentTiles;


