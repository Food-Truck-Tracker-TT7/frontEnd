const stringifyLocation = positionObj => {
  return `${positionObj.coords.latitude},${positionObj.coords.longitude}`;
};

export default stringifyLocation;
