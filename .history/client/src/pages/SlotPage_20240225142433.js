

import React from 'react';
import Navbar from '../components/Navbar';
import BoxComponent from './BoxComponent';
import box_style from './box.module.css';
import styles from '../components/style.module.css';

const SlotPage = () => {
  const redirectToTimer = () => {
    window.location.href = '/timer';
  };

  // Retrieve the selected center from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCenter = urlParams.get('center');

  return (
    <div>
      <div className={styles['Navbar']}>
        <Navbar />
      </div>
      <div className={box_style['box-container']}>
        <h2>Selected Center: {selectedCenter}</h2>
        <BoxComponent content="A1" handleClick={redirectToTimer} />
        <BoxComponent content="A2" handleClick={redirectToTimer} />
        <BoxComponent content="A3" handleClick={redirectToTimer} />
        <BoxComponent content="A4" handleClick={redirectToTimer} />
        <BoxComponent content="A5" handleClick={redirectToTimer} />
        <BoxComponent content="A6" handleClick={redirectToTimer} />
        <BoxComponent content="A7" handleClick={redirectToTimer} />
        <BoxComponent content="A8" handleClick={redirectToTimer} />
        <BoxComponent content="A9" handleClick={redirectToTimer} />
        <BoxComponent content="A10" handleClick={redirectToTimer} />
        <BoxComponent content="A11" handleClick={redirectToTimer} />
        <BoxComponent content="A12" handleClick={redirectToTimer} />
      </div>
    </div>
  );
};

export default SlotPage;
