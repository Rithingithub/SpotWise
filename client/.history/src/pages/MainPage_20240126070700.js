import React from 'react';
import Navbar from '../components/Navbar';
import './box.css';

function BoxComponent() {
  return (
    <div className="box1">
      This is a box!
    </div>
    
  );
}

const MainPage = () => {
  return (
    <div>
      <div className='Navbar'>
        <Navbar />
      </div>

      <BoxComponent /> 

      <p>
        This is some content below the box. You can add more text or other components here.
      </p>
    </div>
  );
};

export default MainPage;
