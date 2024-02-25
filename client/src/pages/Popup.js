import React from 'react';
import styles from './Popup.module.css';

const Popup = ({ onSelectSlot, onClose }) => {
  const handleSelectSlot = () => {
    onSelectSlot(); // Call the function passed from SlotPage.js
    onClose(); // Close the popup
  };

  return (
    <div className={styles.popup}>
      <button onClick={handleSelectSlot}>Select Slot</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default Popup;
