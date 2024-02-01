import React from 'react';
import Navbar from '../components/Navbar';
import './box.css';
import location from '../images/locationicon.png'

const BoxComponent = ({ content }) => {
  return (
    <div className="box">
      {content || "Default content"}
    </div>
  );
};

const MainPage = () => {
  return (
    <div>
      <div className='Navbar'>
        <Navbar />
      </div>

      <div className="basket-container">
        <div className="box-container">
          <BoxComponent content="A1" />
          <BoxComponent content="A2" />
          <BoxComponent content="A3" />
          <BoxComponent content="A4" />
          <BoxComponent content="A5" />
          <BoxComponent content="A6" />
          <BoxComponent content="A7" />
          <BoxComponent content="A8" />
          <BoxComponent content="A9" />
          <BoxComponent content="A10" />
          
        </div>
        <div className="location-symbol"><img src={location} alt="Location Icon" /></div>
      </div>
    </div>
  );
};

export default MainPage;
