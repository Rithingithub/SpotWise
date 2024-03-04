import React from 'react'
import { IoChevronBackCircleOutline } from 'react-icons/io5'; // Import the IoChevronBackCircleOutline icon
import css_styles from "../components/style.module.css";
import prjLogo from '../images/icon_car.png';

const history = () => {
    const goBack = () => {
        // Use a regular anchor tag to navigate to the main page
        window.location.href = '/MainPage';
      };
      return (
        <div>
          <div className={css_styles['Header']}>
            <img src={prjLogo} alt="Logo" width={55} height={35} />
            <h2>SpotWise</h2>
          </div>
          <button className={css_styles['back-button']} onClick={goBack}>
            <IoChevronBackCircleOutline className={css_styles['icon']}/> {/* Use the IoChevronBackCircleOutline icon */}
          </button>
        </div>
      );
}

export default history
