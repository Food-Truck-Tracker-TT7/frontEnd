import React from 'react';
import { LocateBtn } from '../styles/LightModeStyles';

export default function Locate(props) {
  const { panTo } = props;
  return (
    <button
      className='locate'
      onClick={() => {
        navigator.geolocation.getCurrentPosition(position => {
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }}
    >
      Locate Me
    </button>
  );
}
