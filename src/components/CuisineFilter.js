import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  setFilteredTrucksCuisine,
  clearFilteredTrucks,
} from '../store/actions';
import { Form, Button, FloatingLabel, Container } from 'react-bootstrap';

function CuisineFilter(props) {
  const { setFilteredTrucksCuisine, clearFilteredTrucks } = props;
  const [filterValue, setFilterValue] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    setFilteredTrucksCuisine(filterValue);
  };
  const handleClear = () => {
    clearFilteredTrucks();
    setFilterValue('');
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit} className='inline m-2'>
        <FloatingLabel label='Cuiseine Filter'>
          <Form.Control
            type='text'
            value={filterValue}
            onChange={e => {
              setFilterValue(e.target.value);
            }}
            placeholder='What are you in the mood to eat?'
          />
        </FloatingLabel>
      </Form>
      <Button variant='primary' onClick={handleClear}>
        Reset
      </Button>
    </Container>
  );
}

export default connect(
  () => {
    return {};
  },
  { setFilteredTrucksCuisine, clearFilteredTrucks }
)(CuisineFilter);
