
import React from 'react'
import prjLogo from '../images/icon_car.png';
import '../App.css';
import Navbar from '../components/Navbar';


const MainPage = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotClick = (slotNumber) => {
    setSelectedSlot(slotNumber);
    // Add your logic for handling the click event, such as marking the slot as occupied or navigating to a payment page.
  };
  return (
   <div>
     
      <div className='Navbar'>
      <React.Fragment>
			<Navbar/>
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
  )
}

export default MainPage
