import React from 'react';
import Navbar from '../components/Navbar';
import '../components/style.css';

const BoxComponent = ({ content }) => {
  return (
    <div className="box">
      {content}
    </div>
  );
};

const FirstBox = () => {
  return <BoxComponent content="This is the first box!" />;
};

const SecondBox = () => {
  return <BoxComponent content="This is the second box!" />;
};

const ThirdBox = () => {
  return <BoxComponent content="This is the third box!" />;
};

const MainPage = () => {
  return (
    <div>
      <div className='Navbar'>
        <Navbar />
      </div>

      <FirstBox />
      <SecondBox />
      <ThirdBox />

      <p>
        This is some content below the boxes. You can add more text or other components here.
      </p>
    </div>
  );
};

export default MainPage;
