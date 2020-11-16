const parseLocation = locationString => {
  const [userLat, userLng] = locationString.split(',');
  return {
    lat: Number(userLat),
    lng: Number(userLng),
  };
};

export default parseLocation;
