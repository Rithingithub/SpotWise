import React from 'react';
import Navbar from '../components/Navbar';
import '../components/style.css';



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
