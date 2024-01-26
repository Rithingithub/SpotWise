import React from 'react';
import Navbar from '../components/Navbar';
import './box.css';

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

      <div className="box-container">
        <BoxComponent content="A1"/>
        <BoxComponent content="A2"/>
        <BoxComponent content="A3"/>
        <BoxComponent content="A4"/>
        <BoxComponent content="A5" />
        <BoxComponent content="A6" />
        <BoxComponent content="A7" />
        <BoxComponent content="A8" />
        <BoxComponent content="A9" />
        <BoxComponent content="A10" />
        <BoxComponent content="A11" />
        <BoxComponent content="A12" />
      </div>

      
    </div>
  );
};

export default MainPage;
