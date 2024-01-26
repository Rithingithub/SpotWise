import React from 'react';
import Navbar from '../components/Navbar';
import '../components/style.css';

const BoxComponent = () => {
  return (
    <div className="box">
      This is a box!
    </div>
  );
};

const MainPage = () => {
  return (
    <div>
      <div className='Navbar'>
        <Navbar />
      </div>

      <BoxComponent /> {/* Include BoxComponent here */}
    </div>
  );
};

export default MainPage;
