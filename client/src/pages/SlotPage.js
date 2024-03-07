// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import BoxComponent from './BoxComponent';
// import Popup from './Popup';
// import box_style from './box.module.css';
// import styles from '../components/style.module.css';
// import io from 'socket.io-client';

// const SlotPage = () => {
//   const socket = io.connect('http://localhost:8000');

//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [selectedCenter, setSelectedCenter] = useState('');
//   const [slots, setSlots] = useState({});

//   useEffect(() => {
//     // Get the selected center from URL parameters
//     const urlParams = new URLSearchParams(window.location.search);
//     const center = urlParams.get('center');
//     setSelectedCenter(center);
//     //socket
//     socket.on('slotChange', ({ slot, color }) => {
//       setSlots((prevSlots) => ({
//         ...prevSlots,
//         [slot]: color,
//       }));
//     });

//     return () => {
//       socket.off('slotChange');
//     };

//   }, [socket]);

//   const handleSelectSlot = (content) => {
//     // Set the selected slot and show the popup
//     setSelectedSlot(content);
//     setShowPopup(true);

//     socket.emit('slotChange', { slot: content, color: 'red' });
//   };

//   const handleClosePopup = () => {
//     // Close the popup and reset the selected slot
//     setSelectedSlot(null);
//     setShowPopup(false);
//   };

//   // const redirectToTimer = () => {
//   //   // Redirect to the timer page with the selected slot information
//   //   window.location.href = `/timer?center=${selectedCenter}&content=${selectedSlot}`;
//   // };

//   const redirectToCheckout = () => {
//     // Redirect to the checkout page with the selected slot information
//     window.location.href = `/checkout?center=${selectedCenter}&content=${selectedSlot}`;
//   }


//   return (
//     <div>
//       <div className={styles['Navbar']}>
//         <Navbar />
//       </div>
//       <div className={box_style['box-container']}>
//         {/* <h2>Selected Center: {selectedCenter}</h2> */}
//         {Object.keys(slots).map((slot) => (
//           <BoxComponent
//             key={slot}
//             content={slot}
//             color={slots[slot]}
//             handleClick={() => handleSelectSlot(slot)}
//           />
//         ))}
//         <BoxComponent content="A1" handleClick={() => handleSelectSlot("A1")} />
//         <BoxComponent content="A2" handleClick={() => handleSelectSlot("A2")} />
//         <BoxComponent content="A3" handleClick={() => handleSelectSlot("A3")} />
//         <BoxComponent content="A4" handleClick={() => handleSelectSlot("A4")}  />
//         <BoxComponent content="A5" handleClick={() => handleSelectSlot("A5")}  />
//         <BoxComponent content="A6" handleClick={() => handleSelectSlot("A6")}  />
//         <BoxComponent content="A7" handleClick={() => handleSelectSlot("A7")}  />
//         <BoxComponent content="A8" handleClick={() => handleSelectSlot("A8")}  />
//         <BoxComponent content="A9" handleClick={() => handleSelectSlot("A9")}  />
//         <BoxComponent content="A10" handleClick={() => handleSelectSlot("A10")}  />
//         <BoxComponent content="A11" handleClick={() => handleSelectSlot("A11")} />
//         <BoxComponent content="A12" handleClick={() => handleSelectSlot("A12")} />
//         {/* ... (other BoxComponent instances) */}
//       </div>

//       {showPopup && (
//         <Popup onClose={handleClosePopup} onSelectSlot={redirectToCheckout} />
//       )}
//     </div>
//   );
// };

// export default SlotPage;

















// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import BoxComponent from './BoxComponent';
// import Popup from './Popup';
// import box_style from './box.module.css';
// import styles from '../components/style.module.css';
// import io from 'socket.io-client';

// const SlotPage = () => {
//   const socket = io.connect('http://localhost:8000');

//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [selectedCenter, setSelectedCenter] = useState('');
//   const [slots, setSlots] = useState({
//     A1: 'Green',
//     A2: 'Green',
//     A3: 'Green',
//     A4: 'Green',
//     A5: 'Green',
//     A6: 'Green',
//     A7: 'Green',
//     A8: 'Green',
//     A9: 'Green',
//     A10: 'Green',
//     A11: 'Green',
//     A12: 'Green',
//   });

//   useEffect(() => {
//     // Get the selected center from URL parameters
//     const urlParams = new URLSearchParams(window.location.search);
//     const center = urlParams.get('center');
//     setSelectedCenter(center);

//     // Listen for changes in slots from other clients
//     socket.on('slotChange', ({ slot, color }) => {
//       console.log(`Received slotChange event for slot ${slot} with color ${color}`);
//       setSlots((prevSlots) => ({
//         ...prevSlots,
//         [slot]: color,
//       }));
//     });

//     return () => {
//       socket.off('slotChange');
//     };
//   }, [socket]);

//   const handleSelectSlot = (content) => {
//     // Set the selected slot and show the popup
//     setSelectedSlot(content);
//     setShowPopup(true);

//     // Emit the selected slot and color to all clients
//     socket.emit('slotChange', { slot: content, color: 'red' });
//   };

//   const handleClosePopup = () => {
//     // Close the popup and reset the selected slot
//     setSelectedSlot(null);
//     setShowPopup(false);
//   };

//   const redirectToCheckout = () => {
//     // Redirect to the checkout page with the selected slot information
//     window.location.href = `/checkout?center=${selectedCenter}&content=${selectedSlot}`;
//   };

//   return (
//     <div>
//       <div className={styles['Navbar']}>
//         <Navbar />
//       </div>
//       <div className={box_style['box-container']}>
//         {Object.keys(slots).map((slot) => (
//           <BoxComponent
//             key={slot}
//             content={slot}
//             color={slots[slot]}
//             handleClick={() => handleSelectSlot(slot)}
//           />
//         ))}
//       </div>

//       {showPopup && (
//         <Popup onClose={handleClosePopup} onSelectSlot={redirectToCheckout} />
//       )}
//     </div>
//   );
// };

// export default SlotPage;




import React, { useEffect , useState } from 'react';
import Navbar from '../components/Navbar';
import BoxComponent from './BoxComponent';
import Popup from './Popup';
import box_style from './box.module.css';
import styles from '../components/style.module.css';
import io from 'socket.io-client';

const SlotPage = () => {
  const socket = io.connect('http://localhost:8000');

  const [showPopup, setShowPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState('');

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
  }, [socket]);


  const handleSelectSlot = (content) => {
    // Get the selected center from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const center = urlParams.get('center');
  
    // Set the selected slot and center
    setSelectedSlot(content);
    setSelectedCenter(center); // Set the selected center based on URL parameter
  
    // Show the popup and emit the slotChange event
    setShowPopup(true);
    socket.emit('slotChange', { slot: content, color: 'red' });
  };
  
  

  const handleClosePopup = () => {
    // Close the popup and reset the selected slot
    setSelectedSlot(null);
    setShowPopup(false);
  };
    
  const redirectToCheckout = () => {
    console.log("Selected Center:", selectedCenter);
    console.log("Selected Slot:", selectedSlot);
    // Redirect to the checkout page with the selected slot information
    window.location.href = `/checkout?center=${selectedCenter}&content=${selectedSlot}`;
  };

  return (
    <div>
      <div className={styles['Navbar']}>
        <Navbar />
      </div>
      <div className={box_style['box-container']}>
        <BoxComponent content="A1" socket={socket} handleClick={() => handleSelectSlot("A1")} />
        <BoxComponent content="A2" socket={socket} handleClick={() => handleSelectSlot("A2")} />
        <BoxComponent content="A3" socket={socket} handleClick={() => handleSelectSlot("A3")} />
        <BoxComponent content="A4" socket={socket} handleClick={() => handleSelectSlot("A4")} />
        <BoxComponent content="A5" socket={socket} handleClick={() => handleSelectSlot("A5")} />
        <BoxComponent content="A6" socket={socket} handleClick={() => handleSelectSlot("A6")} />
        <BoxComponent content="A7" socket={socket} handleClick={() => handleSelectSlot("A7")} />
        <BoxComponent content="A8" socket={socket} handleClick={() => handleSelectSlot("A8")} />
        <BoxComponent content="A9" socket={socket} handleClick={() => handleSelectSlot("A9")} />
        <BoxComponent content="A10" socket={socket} handleClick={() => handleSelectSlot("A10")} />
        <BoxComponent content="A11" socket={socket} handleClick={() => handleSelectSlot("A11")} />
        <BoxComponent content="A12" socket={socket} handleClick={() => handleSelectSlot("A12")} />
      </div>
      {showPopup && (
        <Popup onClose={handleClosePopup} onSelectSlot={redirectToCheckout} />
      )}
    </div>
  );
};

export default SlotPage;
