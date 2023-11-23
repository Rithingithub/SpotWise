import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import prjLogo from '../images/icon_car.png';
import '../App.css';
import Navbar from '../components/Navbar';

const MainPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Check if the Geolocation API is available
    if (navigator.geolocation) {
      // Get the current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );

      // Watch for changes in the device's location
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error watching location:', error.message);
        }
      );

      // Cleanup the watcher when the component unmounts
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <div className='Navbar'>
        <React.Fragment>
          <Navbar />
        </React.Fragment>
      </div>

      <div className='map-container'>
        {/* Display the current location or a default location */}
        {currentLocation ? (
          <FontAwesomeIcon icon={faMapMarkerAlt} size="5x" color="blue" />
        ) : (
          <p>Loading location...</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
