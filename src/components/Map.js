import React, { useState, useRef, useCallback, useEffect } from 'react';

import { connect } from 'react-redux';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';

import Search from './Search';
import Locate from './Locate';
import parseLocation from '../utils/parseLocation';
import stringifyLocation from '../utils/stringifyLocation';
import { fetchTrucks, updateDinerLocation } from '../store/actions';
import CuisineFilter from './CuisineFilter';

import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';

import FoodTruckMarker from '../images/foodtruckmarker.png';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '94vh',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = props => {
  const {
    user,
    userType,
    trucks,
    fetchTrucks,
    updateDinerLocation,
    findTruck,
    filteredTrucks,
  } = props;

  const [center, setCenter] = useState(
    parseLocation('43.6034958,-110.7363361')
  );

  useEffect(() => {
    fetchTrucks();
    findTruck
      ? setCenter(parseLocation(findTruck))
      : navigator.geolocation.getCurrentPosition(
          position => {
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            if (userType === 'diner') {
              updateDinerLocation(user.dinerId, {
                currentLocation: stringifyLocation(position),
              });
            }
          },
          () => {
            if (userType === 'diner') {
              setCenter(parseLocation(user.currentLocation));
            }
          }
        );
  }, [
    fetchTrucks,
    findTruck,
    updateDinerLocation,
    user.currentLocation,
    user.dinerId,
    userType,
  ]);

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
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: libraries,
  });

  const { push } = useHistory();

  if (loadError) return 'Error Loading Map';

  if (!isLoaded) return 'Loading';

  return (
    <Container fluid className='p-0'>
      <Row className='map-elements text-center'>
        <Col>
          <CuisineFilter />
        </Col>
        <Col>
          <Search panTo={panTo} />
        </Col>
        <Col>
          <Locate panTo={panTo} />
        </Col>
      </Row>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {/* Create markers for each truck */}

        {filteredTrucks
          ? filteredTrucks.map(truck => {
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
            })
          : trucks.map(truck => {
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

        {selected && (
          <InfoWindow
            className='z-top'
            position={parseLocation(selected.currentLocation)}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <Card style={{ width: '18rem' }}>
              <Card.Img variant='top' src={selected.imageOfTruck} />
              <Card.Body>
                <Card.Title>{selected.name}</Card.Title>
                <Card.Text>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      Food Type: {selected.cuisineType}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Average Rating:{' '}
                      {selected.customerRatingsAvg
                        ? selected.customerRatingsAvg
                        : 'N/A'}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Departure Time:{' '}
                      {new Date(
                        parseInt(selected.departureTime)
                      ).toLocaleString()}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>

                <Button
                  variant='primary'
                  onClick={() => {
                    push(`/truck/${selected.id}`);
                  }}
                >
                  More Info
                </Button>
              </Card.Body>
            </Card>
          </InfoWindow>
        )}
      </GoogleMap>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    userType: state.userType,
    trucks: state.trucks,
    findTruck: state.findTruck,
    filteredTrucks: state.filteredTrucks,
  };
};

export default connect(mapStateToProps, { fetchTrucks, updateDinerLocation })(
  Map
);
