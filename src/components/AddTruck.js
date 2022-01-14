import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { addTruck, updateTruck } from '../store/actions';
import { useHistory } from 'react-router-dom';
import stringifyLocation from '../utils/stringifyLocation';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from 'react-bootstrap';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import parseLocation from '../utils/parseLocation';

import StyledAddTruck from '../styles/StyledAddTruck';

import '@reach/combobox/styles.css';

function AddTruck(props) {
  const { user, addTruck, updateTruck, truckToEdit, error } = props;
  const { push } = useHistory();
  //manage state for the form inputs
  const [formState, setFormSate] = useState(
    truckToEdit
      ? truckToEdit
      : {
          name: '',
          imageOfTruck: '',
          cuisineType: '',
          currentLocation: '',
          departureTime: '',
        }
  );
  //managing error state
  const [errors, setErrors] = useState({
    name: '',
    imageOfTruck: '',
    cuisineType: '',
    currentLocation: '',
  });

  //submit state checks whether the form can be submited
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //inline validation on one key/value pair at a time
  const validateChange = event => {
    //.reach is in the yup library
    //returns a promise
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then(valid => {
        //value from valid comes from .validate
        //if the input is passing formSchema
        setErrors({ ...errors, [event.target.name]: '' });
      })
      .catch(error => {
        //if the input is breakign formSchema
        //capture the error message
        setErrors({ ...errors, [event.target.name]: error.errors[0] });
      });

    //need to call this function the onChange function = inputChnage
  };

  //onChange function
  const inputChange = event => {
    //allows us to pass around synthertic events
    event.persist();
    console.log(event.target.name);
    console.log(event.target.value);

    const newFormState = {
      ...formState,
      [event.target.name]: event.target.value,
    };

    //event is being passed in to the validateChange function i created
    validateChange(event);

    setFormSate(newFormState);
  };

  //form schema set of rules
  //object is coming from yup library
  //shape function takes in an object {}
  const formSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    imageOfTruck: yup.string().required('URL Link required'),
    cuisineType: yup.string().required('Cuisine type is required'),
    currentLocation: yup.string().required('Location is required'),
    departureTime: yup.string(),
  });

  useEffect(() => {
    //isValid comes from the yup library
    //checking formSchema against formState
    //comparing the keys and the values
    //returns a promise
    formSchema.isValid(formState).then(valid => {
      //we can check the process has been completed
      setButtonDisabled(!valid);
    });
  }, [formState]);
  //do something every time formState changes

  //onSubmit function
  const formSubmit = event => {
    event.preventDefault();
    const departureTime = new Date(formState.departureTime);
    console.log(Date.parse(departureTime));
    const newTruck = {
      name: formState.name.trim(),
      imageOfTruck: formState.imageOfTruck,
      cuisineType: formState.cuisineType.trim(),
      currentLocation: formState.currentLocation,
      operatorId: user.operatorId,
      departureTime: Date.parse(departureTime),
    };
    truckToEdit
      ? updateTruck(truckToEdit.id, newTruck, push)
      : addTruck(newTruck, push);
  };
  const getLocation = e => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(position => {
      setFormSate({
        ...formState,
        currentLocation: stringifyLocation(position),
      });
    });
  };

  const userLocation = parseLocation('43.6034958,-110.7363361');

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => userLocation.lat, lng: () => userLocation.lng },
      radius: 200 * 1000,
    },
  });

  return (
    <Container fluid='md'>
      <Form onSubmit={formSubmit} className='m-3'>
        <Row className='d-flex justify-content-center'>
          <Col md={6}>
            <Form.Group>
              <FloatingLabel label='Name' className='my-2'>
                <Form.Control
                  type='text'
                  placeholder='Trucks Name'
                  id='name'
                  name='name'
                  value={formState.name}
                  onChange={inputChange}
                  isInvalid={errors.name}
                />
              </FloatingLabel>
              <Form.Control.Feedback type='invlaid' className='text-danger m-0'>
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
          <Col md={6}>
            <FloatingLabel label='Picture of Truck' className='my-2'>
              <Form.Control
                id='imageOfTruck'
                type='text'
                name='imageOfTruck'
                value={formState.imageOfTruck}
                placeholder='Add URL Link of your picture'
                onChange={inputChange}
                isInvalid={errors.imageOfTruck}
              />
            </FloatingLabel>
            <Form.Control.Feedback type='invlaid' className='text-danger m-0'>
              {errors.imageOfTruck}
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
          <Col md={6}>
            <FloatingLabel label='Cuisine Type' className='my-2'>
              <Form.Control
                id='cuisineType'
                type='text'
                name='cuisineType'
                value={formState.cuisineType}
                placeholder='Type of Cuisine'
                onChange={inputChange}
                isInvalid={errors.cuisineType}
              />
            </FloatingLabel>
            <Form.Control.Feedback
              type='invlaid'
              className='text-danger m-0'
            ></Form.Control.Feedback>
          </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
          <Col md={6}>
            <FloatingLabel label="Truck's Location" className='my-2'>
              <Form.Control
                id='currentLocation'
                type='text'
                name='currentLocation'
                value={formState.currentLocation}
                placeholder='Location'
                onChange={inputChange}
                isInvalid={errors.currentLocation}
              />
            </FloatingLabel>
            <Form.Control.Feedback type='invlaid' className='text-danger m-0'>
              {errors.currentLocation}
            </Form.Control.Feedback>
          </Col>
        </Row>

        {/* <Row>
          <Col>
            <Combobox
              onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();
                try {
                  const results = await getGeocode({ address });
                  const { lat, lng } = await getLatLng(results[0]);
                  setFormSate({
                    ...formState,
                    currentLocation: `${lat},${lng}`,
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <ComboboxInput
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                disabled={!ready}
                placeholder="Enter an address."
              />
              <ComboboxPopover>
                <ComboboxList className="searchResults">
                  {status === "OK" &&
                    data.map((suggestion) => (
                      <ComboboxOption
                        key={suggestion.id}
                        value={suggestion.description}
                      />
                    ))}
                </ComboboxList>
              </ComboboxPopover>
            </Combobox>
          </Col>
        </Row> */}

        <Row className='d-flex justify-content-center'>
          <Col md={6}>
            <Button
              variant='primary'
              size='lg'
              className='my-2'
              onClick={getLocation}
            >
              Get Current Location
            </Button>
          </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
          <Col md={6}>
            <Form.Group>
              <FloatingLabel label='Departure Time' className='my-2'>
                <Form.Control
                  name='departureTime'
                  type='datetime-local'
                  id='departureTime'
                  onChange={inputChange}
                  value={formState.departureTime}
                  isInvalid={errors.departureTime}
                />
              </FloatingLabel>
              <Form.Control.Feedback type='invlaid' className='text-danger m-0'>
                {errors.departureTime}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Col md={6}>
            <Button
              variant='primary'
              type='submit'
              size='lg'
              className='my-2'
              disabled={buttonDisabled}
            >
              {truckToEdit ? 'Submit Edit' : 'Add Truck'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
const mapStateToProps = state => {
  return {
    user: state.user,
    truckToEdit: state.truckToEdit,
    error: state.error,
  };
};

export default connect(mapStateToProps, { addTruck, updateTruck })(AddTruck);
