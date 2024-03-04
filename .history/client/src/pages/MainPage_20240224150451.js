import React from 'react';
import Navbar from '../components/Navbar';
import prjLogo from '../images/icon_car.png';
import styles from '../components/style.module.css'

const MainPage = () => {
  const redirectToSlot = () => {
    window.location.href = '/SlotPage';
  };

  return (
    <div>
      <div className={styles['Header']}>
        <img src={prjLogo} alt="Logo" width={55} height={35} />
        <h2>SpotWise</h2>
      </div>
      <div className={box_style['Navbar']}>
        <Navbar />
      </div>
      <div>
        <button onClick={redirectToSlot}>hello</button>
      </div>
    </div>



      );







}
export default MainPage;