import React, { useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from '@react-google-maps/api';

import FoodTruckMarker from '../images/foodtruckmarker.png';
import Search from './Search';
import Locate from './Locate';

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
  const { user, trucks } = props;

  const [userLat, userLng] = user.currentLocation.split(',');

  const center = {
    lat: Number(userLat),
    lng: Number(userLng),
  };

  const mapRef = useRef();
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  // pans the map to the target location
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  });

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
        zoom={15}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {/* Create markers for each truck */}
        {trucks.map(truck => {
          const [lat, lng] = truck.currentLocation.split(',');
          return (
            <Marker
              icon={{
                url: FoodTruckMarker,
                scaledSize: new window.google.maps.Size(50, 50),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(25, 25),
              }}
              key={truck.id}
              position={{ lat: Number(lat), lng: Number(lng) }}
              onClick={() => {
                setSelected({
                  ...truck,
                  currentLocation: { lat: Number(lat), lng: Number(lng) },
                });
              }}
            />
          );
        })}

        {selected ? (
          <InfoWindow
            position={{
              lat: selected.currentLocation.lat,
              lng: selected.currentLocation.lng,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>{selected.name}</h2>
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
    trucks: state.trucks,
  };
};

export default connect(mapStateToProps, {})(Map);
