import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Navbar from '../components/Navbar';

const mapContainerStyle = {
  height: '100vh',
  width: '100%',
};

const defaultCenter = { lat: 0, lng: 0 }; // Initial location

const MainPage = () => {
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const [isInsideBox, setIsInsideBox] = useState(false);
  const [locationPermission, setLocationPermission] = useState(null);

  const markerSpring = useSpring({
    to: { lat: currentLocation.lat, lng: currentLocation.lng },
    config: { tension: 180, friction: 12 },
  });

  useEffect(() => {
    const askForLocationPermission = async () => {
      try {
        await navigator.permissions.request({ name: 'geolocation' });
        setLocationPermission('granted');
      } catch (error) {
        console.error('Error requesting location permission:', error);
        setLocationPermission('denied');
      }
    };

    askForLocationPermission();
  }, []);

  useEffect(() => {
    if (locationPermission === 'granted') {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          checkInsideBox({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error watching location:', error.message);
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [locationPermission]);

  const checkInsideBox = ({ lat, lng }) => {
    // Define the coordinates of the box
    const boxCoordinates = {
      top: 40,
      right: -80,
      bottom: -10,
      left: -150,
    };

    // Check if the current location is inside the box
    setIsInsideBox(lat > boxCoordinates.bottom && lat < boxCoordinates.top && lng > boxCoordinates.left && lng < boxCoordinates.right);
  };

  const handleGetCurrentLocation = () => {
    if (locationPermission === 'granted') {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current location:', error.message);
        }
      );
    }
  };

  return (
    <div>
      <div className='Navbar'>
        <Navbar />
      </div>

      
    </div>
  );
};

export default MainPage;
