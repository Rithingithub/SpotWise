import React from 'react'
import { IoChevronBackCircleOutline } from 'react-icons/io5'; // Import the IoChevronBackCircleOutline icon
import "../components/style.css";
import prjLogo from '../images/icon_car.png';

const history = () => {
    const goBack = () => {
        // Use a regular anchor tag to navigate to the main page
        window.location.href = '/';
      };
      return (
        <div>
          <div className='Header'>
            <img src={prjLogo} alt="Logo" width={55} height={35} />
            <h2>SpotWise</h2>
          </div>
          <button className="back-button" onClick={goBack}>
            <IoChevronBackCircleOutline className='icon'/> {/* Use the IoChevronBackCircleOutline icon */}
          </button>
        </div>
      );
}

export default history
