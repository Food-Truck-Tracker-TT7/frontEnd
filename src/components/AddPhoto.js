import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addItemPhoto } from '../store/actions';
import { useHistory } from 'react-router-dom';

function AddPhoto(props) {
  const { addItemPhoto, currentTruck, menuItem } = props;
  const { push } = useHistory();
  const [photoURL, setPhotoURL] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    addItemPhoto(currentTruck.id, menuItem.id, photoURL, push);
  };
  return (
    <div>
      <input
        value={photoURL}
        type='text'
        placeholder='Add A Photo'
        onChange={e => setPhotoURL(e.target.value)}
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentTruck: state.currentTruck,
  };
};

export default connect(mapStateToProps, { addItemPhoto })(AddPhoto);
