import React from 'react';
import Navbar from '../components/Navbar';
import BoxComponent from './BoxComponent'; 
import box_style from './box.module.css';

const SlotPage = () => {
  const redirectToTimer = () => {
    window.location.href = '/timer';
  };

  return (
    <div>
      <div className={box_style['Navbar']}>
        <Navbar />
      </div>
      <div className={box_style['box-container']}>
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
