import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addItemPhoto } from '../store/actions';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

function AddPhoto(props) {
  const { addItemPhoto, currentTruck, menuItem } = props;
  const [photoURL, setPhotoURL] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    addItemPhoto(currentTruck.id, menuItem.id, photoURL);
    setPhotoURL('');
  };
  return (
    <Form>
      <FloatingLabel label='Add Photo'>
        <Form.Control
          value={photoURL}
          type='text'
          placeholder='Add A Photo'
          onChange={e => setPhotoURL(e.target.value)}
        />
      </FloatingLabel>
      <Button onClick={onSubmit}>Submit</Button>
    </Form>
  );
}

const mapStateToProps = state => {
  return {
    currentTruck: state.currentTruck,
  };
};

export default connect(mapStateToProps, { addItemPhoto })(AddPhoto);
