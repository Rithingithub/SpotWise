import React, { useState } from 'react'; // Add this line to import useState
import prjLogo from '../images/icon_car.png';
import '../App.css';
import Navbar from '../components/Navbar';
import ParkingSlot from '../components/ParkingSlot'; // Add this line to import ParkingSlot

const MainPage = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotClick = (slotNumber) => {
    setSelectedSlot(slotNumber);

    // Create a new popup window
    const popupWindow = window.open('', '_blank', 'width=400,height=300');

    // Construct the content for the popup window
    const popupContent = `
        <html>
            <head>
                <title>Slot Selection</title>
            </head>
            <body>
                <h2>Selected Slot: ${slotNumber}</h2>
                <button onclick="handleSelectSlot()">Select Slot</button>
                <button onclick="handleCheckAnother()">Check Another Slot</button>
                <script>
                    function handleSelectSlot() {
                        // Handle logic for selecting the slot
                        // For example: Mark the slot as occupied
                        // You can add your logic here
                        alert('Slot ${slotNumber} has been selected!');
                        window.close(); // Close the popup window after selecting
                    }

                    function handleCheckAnother() {
                        // Handle logic for checking another slot
                        // For example: Allow the user to choose a different slot
                        // You can add your logic here
                        alert('Checking another slot...');
                        window.close(); // Close the popup window after checking another slot
                    }
                </script>
            </body>
        </html>
    `;

    // Write the content to the popup window
    popupWindow.document.write(popupContent);
};


  return (
    <div>
      <div className='Navbar'>
        <React.Fragment>
          <Navbar />
        </React.Fragment>
      </div>
      <div>
        <div className="parking-slots-container">
          {[1, 2, 3, 4, 5].map((slotNumber) => (
            <ParkingSlot key={slotNumber} slotNumber={slotNumber} onClick={handleSlotClick} />
          ))}
        </div>
        {selectedSlot && <p>You selected Parking Slot {selectedSlot}</p>}
      </div>
    </div>
  );
}

export default MainPage;
