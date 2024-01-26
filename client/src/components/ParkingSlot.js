// ParkingSlot.js
import React from 'react';

const ParkingSlot = ({ slotNumber, onClick }) => {
  return (
    <div className="parking-slot" onClick={() => onClick(slotNumber)}>
      Parking Slot {slotNumber}
    </div>
  );
};

export default ParkingSlot;
