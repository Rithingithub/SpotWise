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

const FirstBox = () => {
  return <BoxComponent content="This is the first box!" />;
};

const SecondBox = () => {
  return <BoxComponent content="This is the second box!" />;
};

const ThirdBox = () => {
  return <BoxComponent content="This is the third box!" />;
};

const FourthBox = () => {
  return <BoxComponent content="This is the fourth box!" />;
};

const FifthBox = () => {
  return <BoxComponent content="This is the fifth box!" />;
};

const SixthBox = () => {
  return <BoxComponent content="This is the sixth box!" />;
};

const SeventhBox = () => {
  return <BoxComponent content="This is the seventh box!" />;
};

const EighthBox = () => {
  return <BoxComponent content="This is the eighth box!" />;
};

const NinthBox = () => {
  return <BoxComponent content="This is the ninth box!" />;
};

const TenthBox = () => {
  return <BoxComponent content="This is the tenth box!" />;
};

const EleventhBox = () => {
  return <BoxComponent content="This is the eleventh box!" />;
};

const TwelthBox = () => {
  return <BoxComponent content="This is the twelth box!" />;
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
      <FourthBox />
      <FifthBox />
      <SixthBox />
      <SeventhBox />
      <EighthBox />
      <NinthBox />
      <TenthBox />
      <EleventhBox />
      <TwelthBox />

      <p>
        This is some content below the boxes. You can add more text or other components here.
      </p>
    </div>
  );
};

export default MainPage;
