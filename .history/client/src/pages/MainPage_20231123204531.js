import React, { useState } from 'react'; // Add this line to import useState
import prjLogo from '../images/icon_car.png';
import '../App.css';
import Navbar from '../components/Navbar';
import ParkingSlot from '../components/ParkingSlot'; // Add this line to import ParkingSlot

const MainPage = () => {
  

  return (
    <div>
      <div className='Navbar'>
        <React.Fragment>
          <Navbar />
        </React.Fragment>
      </div>
      <div>
       <div className='grid-item'>
        1
       </div>
    </div>
  );
}

export default MainPage;
