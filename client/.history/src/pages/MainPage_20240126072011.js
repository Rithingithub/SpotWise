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
        <BoxComponent content="This is the first box!" />
        <BoxComponent content="This is the second box!" />
        <BoxComponent content="This is the third box!" />
        <BoxComponent content="This is the fourth box!" />
        <BoxComponent content="This is the fifth box!" />
        <BoxComponent content="This is the sixth box!" />
        <BoxComponent content="This is the seventh box!" />
        <BoxComponent content="This is the eighth box!" />
        <BoxComponent content="This is the ninth box!" />
        <BoxComponent content="This is the tenth box!" />
        <BoxComponent content="This is the eleventh box!" />
        <BoxComponent content="This is the twelfth box!" />
      </div>

      <p>
        This is some content below the boxes. You can add more text or other components here.
      </p>
    </div>
  );
};

export default MainPage;
