import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Navbar from '../components/Navbar';

const mapContainerStyle = {
  height: '100vh',
  width: '100%',
};

const defaultCenter = { lat: 0, lng: 0 }; // Initial location

const MainPage = () => {
  
  const BoxComponent = () => {
    return (
      <div className="box">
        This is a box!
      </div>
    );
  };

  

  return (
    <div>
      <div className='Navbar'>
        <Navbar />
      </div>

      
    </div>
  );
};

export default MainPage;
