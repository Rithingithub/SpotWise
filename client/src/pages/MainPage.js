import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Session from 'supertokens-web-js/recipe/session';
import prjLogo from '../images/icon_car.png';
import main_styles from './main.module.css';
import box_style from './box.module.css';
import styles from '../components/style.module.css';

const MainPage = () => {
  // State variables
  const [selectedCenter, setSelectedCenter] = useState('');

  // Event handlers
  const handleSelectChange = (e) => {
    setSelectedCenter(e.target.value);
  };

  const redirectToSlot = () => {
    if (selectedCenter) {
      window.location.href = `/SlotPage?center=${selectedCenter}`;
    }
  };
  
  // JSX structure
  return (
    <div>
      <div className={styles['Header']}>
        <img src={prjLogo} alt="Logo" width={55} height={35} />
        <h2>SpotWise</h2>
      </div>
      <div className={styles['Navbar']}>
        <Navbar />
      </div>
      <div className={main_styles['parking_center']}>
        <h1>Select Parking Centre:</h1>
      </div>
      <div>
        <select
          id="parking-centers"
          name="parking-centers"
          value={selectedCenter}
          onChange={handleSelectChange}
        >
          <option value="">Select a center</option>
          <option value="M Dit">Mdit</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>
      <div>
        <button onClick={redirectToSlot} disabled={!selectedCenter} className={main_styles['custom-button']}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default MainPage;
