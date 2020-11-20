import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setFilteredTrucks, clearFilteredTrucks } from '../store/actions';

function CuisineFilter(props) {
  const { setFilteredTrucks, clearFilteredTrucks } = props;
  const [filterValue, setFilterValue] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    setFilteredTrucks(filterValue);
  };
  const handleClear = () => {
    clearFilteredTrucks();
    setFilterValue('');
  };
  return (
    <div className='filter'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={filterValue}
          onChange={e => {
            setFilterValue(e.target.value);
          }}
          placeholder='What are you in the mood to eat?'
        />
      </form>
      <button onClick={handleClear}>Reset</button>
    </div>
  );
}

export default connect(
  () => {
    return {};
  },
  { setFilteredTrucks, clearFilteredTrucks }
)(CuisineFilter);
