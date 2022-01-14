import React from 'react';
import Button from 'react-bootstrap/Button';

export default function Locate(props) {
  const { panTo } = props;
  return (
    <Button
      className='inline'
      variant='primary'
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
    </Button>
  );
}
