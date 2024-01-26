import React from 'react';
import Navbar from '../components/Navbar';
import '../components/style.css';

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
