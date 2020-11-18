import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { addMenuItem, updateMenuItem } from '../store/actions';
import { useHistory } from 'react-router-dom';

function MenuItem(props) {
  const { currentTruck, addMenuItem, menuItemToEdit, updateMenuItem } = props;
  const { push } = useHistory();
  const initialStateObj = { itemName: '', itemDescription: '', itemPrice: '' };
  const [input, setInput] = useState(
    menuItemToEdit ? menuItemToEdit : initialStateObj
  );
  const [errorState, setErrorState] = useState({});
  const [btnState, setBtnState] = useState(true);

  const onSubmitFunc = e => {
    e.preventDefault();
    const newMenuItem = {
      itemName: input.itemName.trim(),
      itemDescription: input.itemDescription.trim(),
      itemPrice: input.itemPrice,
    };
    menuItemToEdit
      ? updateMenuItem(currentTruck.id, menuItemToEdit.id, newMenuItem, push)
      : addMenuItem(currentTruck.id, newMenuItem, push);
    setInput(initialStateObj);
  };

  const onChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
    validate(e);
  };

  const formSchema = yup.object().shape({
    itemName: yup.string().required('Name required.'),
    itemDescription: yup.string().required('Description required.'),
    itemPrice: yup.number('Price required').required('Price required.'),
  });

  const validate = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(ifValid => {
        setErrorState({ ...errorState, [e.target.name]: '' });
      })
      .catch(ifErr => {
        setErrorState({ ...errorState, [e.target.name]: ifErr.errors[0] });
      });
  };
  useEffect(() => {
    formSchema.isValid(input).then(valid => {
      setBtnState(!valid);
    });
  }, [input]);

  return (
    <>
      <div>{menuItemToEdit ? 'Edit' : 'Add'} Menu Item</div>
      <form onSubmit={onSubmitFunc}>
        <label htmlFor='itemName'>
          Item Name:
          <input
            type='text'
            name='itemName'
            id='itemName'
            value={input.itemName}
            onChange={onChange}
            placeholder={errorState.itemName}
          />
        </label>
        <br />
        <label htmlFor='itemDescription'>
          Item Description:
          <input
            type='text'
            name='itemDescription'
            id='itemDescription'
            value={input.itemDescription}
            onChange={onChange}
            placeholder={errorState.itemDescription}
          />
        </label>
        <br />
        <label htmlFor='itemPrice'>
          Item Price: $
          <input
            type='number'
            name='itemPrice'
            id='itemPrice'
            value={input.itemPrice}
            onChange={onChange}
            placeholder={errorState.itemPrice}
          />
        </label>
        <br />
        <button disabled={btnState}>Click to Submit Item</button>
      </form>
    </>
  );
}

const mapStateToProps = state => {
  return {
    currentTruck: state.currentTruck,
    menuItemToEdit: state.menuItemToEdit,
  };
};

export default connect(mapStateToProps, { addMenuItem, updateMenuItem })(
  MenuItem
);
