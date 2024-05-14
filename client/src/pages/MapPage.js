import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import prjLogo from '../images/icon_car.png';
import markerIcon from '../images/sp.png';
import Navbar from '../components/Navbar';
import styles from '../components/style.module.css';
import mapstyles from './map.module.css';
import mdit from '../images/mdit.png';
import { useNavigate } from 'react-router-dom';



const MapPage = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const containerStyle = {
        width: '100%', // Adjusted width to fill the viewport
        height: 'calc(100vh - 70px)', // Adjusted height to fill the viewport without causing scrolling
    };

    const center = {
        lat: 11.450331415247035,
        lng: 75.7707386164108
    };

    const points = [
        {
            lat: 11.437087,
            lng: 75.764821
        }
    ];

    const goBack = () => {
        window.location.href = '/';
      };

    const navigate = useNavigate();
    const [selectedCenter, setSelectedCenter] = useState('');
    // const handleViewCarPark = () => {
    //     // navigate('/SlotPage');
    //     window.location.href = `/SlotPage?center=${selectedCenter}`;
    // };

    const redirectToSlot = () => {
        if (selectedCenter) {
          
        }window.location.href = `/SlotPage?center=${selectedCenter}`;
      };

    const [popupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    };

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    }, [center]);

    const onUnmount = React.useCallback(function callback(map) {
    }, []);

    return (
        <div>
            <div className={styles['Header']}>
                <img src={prjLogo} alt="Logo" width={55} height={35} />
                <h2>SpotWise</h2>
            </div>
            <div className={styles['Navbar']}>
                <Navbar />
            </div>
            {isLoaded && (
                <div className={mapstyles.mapContainer}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        mapTypeId={'satellite'} 
                        options={{
                            streetViewControl: false,
                            mapTypeControl:false,

                        }}
                    >
                        {points.map((point, i) => (
                            <Marker
                                key={i}
                                position={point}
                                onClick={togglePopup}
                                icon={{
                                    url: markerIcon,
                                    scaledSize: new window.google.maps.Size(30, 30),
                                }}
                            />
                        ))}
                        {popupVisible && (
                            <div className={mapstyles.popup}>
                                <img src={mdit} alt="Mdit" />
                                <h4>M.Dasan Institute of Technology</h4>
                                <button className={mapstyles.button} onClick={redirectToSlot}>View Car Park</button>
                                <button className={mapstyles.button} onClick={goBack}>Cancel</button>
                            </div>
                        )}
                    </GoogleMap>
                </div>
            )}
        </div>
    );
};

export default MapPage;


