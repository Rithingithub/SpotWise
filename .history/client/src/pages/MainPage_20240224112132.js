import React from 'react';
import Navbar from '../components/Navbar';
import BoxComponent from './BoxComponent'; 
import box_style from './box.module.css';

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
    </div>

    

      );







}
export default MainPage;