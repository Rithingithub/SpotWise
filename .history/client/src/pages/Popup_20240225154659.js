import React from 'react';
import styles from './Popup.module.css';

const Popup = ({ onClose, onSelectSlot }) => {
  return (
    <div className={styles.popup}>
      
      <button onClick={onSelectSlot}>Select Slot</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default Popup;
