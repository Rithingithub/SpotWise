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

      <LoadScript googleMapsApiKey="AIzaSyBKFGFSP7NNoNkxVu4jDgE8Qd6_gfMwO-I">
        <GoogleMap mapContainerStyle={mapContainerStyle} center={currentLocation} zoom={8}>
          {locationPermission === 'granted' && (
            <>
              <animated.div
                style={{
                  position: 'absolute',
                  left: `${markerSpring.lng + 180}px`,
                  top: `${90 - markerSpring.lat}px`,
                }}
              >
                <Marker position={{ lat: markerSpring.lat, lng: markerSpring.lng }} />
              </animated.div>
              <button className="get-location-button" onClick={handleGetCurrentLocation}>
                Get My Exact Location
              </button>
            </>
          )}
        </GoogleMap>
      </LoadScript>

      <style jsx>{`
        .map-container {
          background-color: black;
          position: relative;
        }

        .get-location-button {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default MainPage;
