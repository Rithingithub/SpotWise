import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import BoxComponent from './BoxComponent';
import Popup from './Popup';
import box_style from './box.module.css';
import styles from '../components/style.module.css';
import io from 'socket.io-client';

import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://hxapmewlaqrojlkcvpef.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4YXBtZXdsYXFyb2psa2N2cGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU0MTc3MjAsImV4cCI6MjAzMDk5MzcyMH0.tSlkmFjsH8tgVX0PIkL8Cd_iyjr6LzJMdltjrUYyWss");

const socket = io.connect('http://localhost:8000');

const SlotPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [slotColors, setSlotColors] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const center = urlParams.get('center');
    setSelectedCenter(center);

    console.log("Socket connected:", socket.connected);
    return () => {
      console.log("Socket disconnected");
      // Clean up the socket connection
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Listen for slotChange events from the server
    socket.on('slotChange', ({ slot, color }) => {
      // Update the slot color in the state
      setSlotColors(prevState => ({
        ...prevState,
        [slot]: color
      }));
    });

    // Clean up event listener on unmount
    return () => {
      socket.off('slotChange');
    };
  }, []);


  const handleSelectSlot = async (content) => {
    const urlParams = new URLSearchParams(window.location.search);
    const center = urlParams.get('center');

   
    const { data, error } = await supabase
      .from('Histories')
      .insert([
        { location: 'someValue' , payAmount: 75 },
      ])
      .select()
            

    setSelectedSlot(content);
    setSelectedCenter(center);
    setShowPopup(true);
    socket.emit('slotChange', { slot: content, color: 'red' });
  
    // Set a timer to revert the color back to its original state after an hour
    setTimeout(() => {
      setSlotColors(prevState => ({
        ...prevState,
        [content]: 'Green'
      }));
    }, 3600000); // 1 hour in milliseconds
  };
  

  const handleClosePopup = () => {
    setSelectedSlot(null);
    setShowPopup(false);
  };

  const redirectToCheckout = () => {
    window.location.href = `/timer?center=${selectedCenter}&content=${selectedSlot}`;
  };

  return (
    <div>
      <div className={styles['Navbar']}>
        <Navbar />
      </div>
      <div className={box_style['box-container']}>
        {['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12'].map(slot => (
          <BoxComponent
            key={slot}
            content={slot}
            color={slotColors[slot] || 'Green'}
            handleClick={() => handleSelectSlot(slot)}
          />
        ))}
      </div>
      {showPopup && (
        <Popup onClose={handleClosePopup} onSelectSlot={redirectToCheckout} />
      )}
    </div>
  );
};

export default SlotPage;
