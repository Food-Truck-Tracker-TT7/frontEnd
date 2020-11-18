import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from '@react-google-maps/api';

import Search from './Search';
import Locate from './Locate';
import parseLocation from '../utils/parseLocation'; //takes in location string and returns a location object
import { fetchTrucks, updateDinerLocation } from '../store/actions';

import FoodTruckMarker from '../images/foodtruckmarker.png';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '94vh',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = props => {
  const { user, userType, trucks, fetchTrucks } = props;
  const [center, setCenter] = useState(
    parseLocation('43.6034958,-110.7363361')
  );

  useEffect(() => {
    fetchTrucks();
    if (userType === 'diner') {
      navigator.geolocation.getCurrentPosition(position => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  // pans the map to the target location
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  //selected truck information
  const [selected, setSelected] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    // googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: libraries,
  });
  if (loadError) return 'Error Loading Map';

  if (!isLoaded) return 'Loading';

  return (
    <>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {/* Create markers for each truck */}
        {trucks.map(truck => {
          return (
            <Marker
              icon={{
                url: FoodTruckMarker,
                scaledSize: new window.google.maps.Size(50, 50),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(25, 25),
              }}
              key={truck.id}
              position={parseLocation(truck.currentLocation)}
              onClick={() => {
                setCenter(parseLocation(truck.currentLocation));
                setSelected(truck);
              }}
            />
          );
        })}

        {selected ? (
          <InfoWindow
            position={parseLocation(selected.currentLocation)}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <Link to={`/truck/${selected.id}`}>{selected.name}</Link>
              </h2>
              <p>Food Type: {selected.cuisineType}</p>
              <p>Average Rating: {selected.customerRatingsAvg}/5</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    userType: state.userType,
    trucks: state.trucks,
  };
};

export default connect(mapStateToProps, { fetchTrucks, updateDinerLocation })(
  Map
);
