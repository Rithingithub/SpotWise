import React from 'react';
import { IoChevronBackCircleOutline } from 'react-icons/io5';  // Import the IoChevronBackCircleOutline icon
import css_styles from "../components/style.module.css";
import prjLogo from '../images/icon_car.png';




const settings = () => {
   
    
      const goBack = () => {
          // Use a regular anchor tag to navigate to the main page
        window.location.href = '/';
      };

      const goTo= () => {
        // Use a regular anchor tag to navigate to the main page
      window.location.href = 'https://github.com/Rithingithub/SpotWise?tab=readme-ov-file';
    };

    const goTomit= () => {
      // Use a regular anchor tag to navigate to the main page
    window.location.href = 'https://github.com/Rithingithub/SpotWise?tab=MIT-1-ov-file';
  };

  const goTous= () => {
    // Use a regular anchor tag to navigate to the main page
  window.location.href = 'https://github.com/Rithingithub/SpotWise';
};
    


      return (
        <div>
          <div className = {css_styles['Header']}>
          <img src       = {prjLogo} alt = "Logo" width = {55} height = {35} />
            <h2>SpotWise</h2>
          </div>
          <button                     className = {css_styles["back-button"]} onClick = {goBack}>
          <IoChevronBackCircleOutline className = {css_styles['icon']}/> {/* Use the IoChevronBackCircleOutline icon */}
          </button>
          <div className={css_styles['Settings']}>
            <h1>Settings</h1>
          </div>
          <div className={css_styles['Settings_components']}>
            <hr />
            <h2 className={css_styles['Settings_hr']} onClick={goTo}>Terms and Conditions</h2>
            {/* <button><IoChevronForwardCircle className = {css_styles['iconfor']}/></button> */}
            <hr />
            <h2 className={css_styles['Settings_hr']} onClick={goTomit}>Privacy Policy</h2>
            <hr />
            <h2 className={css_styles['Settings_hr']} onClick={goTous}>About Us</h2>
            <hr />
          </div>
        </div>
      );
    };
    
  
    


export default settings;
