import React from 'react';
import { connect } from 'react-redux';
import { setFilteredTrucksRating } from '../store/actions';

function RatingFilter(props) {
  const onChange = e => {
    props.setFilteredTrucksRating(e.target.value);
  };
  return (
    <div>
      <form>
        <select onChange={onChange}>
          <option value=''>-</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </form>
    </div>
  );
}

export default connect(
  () => {
    return {};
  },
  { setFilteredTrucksRating }
)(RatingFilter);
