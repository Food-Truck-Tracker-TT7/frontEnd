import React from 'react';
import stringifyLocation from '../utils/stringifyLocation';

export default function Locate(props) {
  const { panTo } = props;
  return (
    <button
      className='locate'
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log(stringifyLocation(position));
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      Locate Me
    </button>
  );
}
