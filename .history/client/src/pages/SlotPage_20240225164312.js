

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BoxComponent from './BoxComponent';
import Popup from './Popup';
import box_style from './box.module.css';
import styles from '../components/style.module.css';

const SlotPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSelectSlot = (content) => {
    // Set the selected slot and show the popup
    setSelectedSlot(content);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    // Close the popup and reset the selected slot
    setSelectedSlot(null);
    setShowPopup(false);
  };

  const redirectToTimer = () => {
    // Redirect to the timer page with the selected slot information
    window.location.href = `/timer?center=${selectedCenter}&content=${selectedSlot}`;
  };


  return (
    <div>
      <div className={styles['Navbar']}>
        <Navbar />
      </div>
      <div className={box_style['box-container']}>
        {/* <h2>Selected Center: {selectedCenter}</h2> */}
        <BoxComponent content="A1" handleClick={() => handleSelectSlot("A1")} />
        <BoxComponent content="A2" handleClick={() => handleSelectSlot("A2")} />
        <BoxComponent content="A3" handleClick={() => handleSelectSlot("A3")} />
        <BoxComponent content="A4" handleClick={() => handleSelectSlot("A4")}  />
        <BoxComponent content="A5" handleClick={() => handleSelectSlot("A5")}  />
        <BoxComponent content="A6" handleClick={() => handleSelectSlot("A6")}  />
        <BoxComponent content="A7" handleClick={() => handleSelectSlot("A7")}  />
        <BoxComponent content="A8" handleClick={() => handleSelectSlot("A8")}  />
        <BoxComponent content="A9" handleClick={() => handleSelectSlot("A9")}  />
        <BoxComponent content="A10" handleClick={() => handleSelectSlot("A10")}  />
        <BoxComponent content="A11" handleClick={() => handleSelectSlot("A11")} />
        <BoxComponent content="A12" handleClick={() => handleSelectSlot("A12")} />
      </div>

      {showPopup && (
        // <Popup onClose={handleClosePopup} selectedSlot={selectedSlot} />
        <Popup onClose={handleClosePopup} onSelectSlot={redirectToTimer} />
      )}
    </div>
  );
};

export default SlotPage;
