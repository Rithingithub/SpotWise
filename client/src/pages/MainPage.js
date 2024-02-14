import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import box_style from './box.module.css';


import Session from 'supertokens-web-js/recipe/session';
import { useNavigate } from 'react-router-dom';


const BoxComponent = ({ content }) => {
  return (
    <div className={box_style['box']}>
      {content || "Default content"}
    </div>
  );
};

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function doesSessionExist() {
      try {
        if (await Session.doesSessionExist()) {
        } else {
          navigate('/auth', { replace: true });
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    }
     doesSessionExist();
  }, [navigate]);

  return (
    <div>
      <div className={box_style['Navbar']}>
        <Navbar />
      </div>
      <div className={box_style['box-container']}>
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
