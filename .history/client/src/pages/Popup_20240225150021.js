import React from 'react';
import styles from './Popup.module.css';

const Popup = ({ onClose, onSelectSlot }) => {
  return (
    <div className={styles.popup}>
      <h2>Select Slot</h2>
      <button onClick={onSelectSlot}>Select Slot</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default Popup;
