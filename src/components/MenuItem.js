import React, {useState, useEffect} from 'react';
import * as yup from 'yup';


export default function MenuItem() {
  const initialStateObj = { itemName: "", itemDescription: "", itemPrice: "" };
  const [ input, setInput] = useState(initialStateObj);
  const [ errorState, setErrorState ] = useState({});
  const [ btnState, setBtnState ] = useState(true);
console.log(input);
console.log(errorState);

const onSubmitFunc = e => {
  e.preventDefault();
  setInput(initialStateObj);
}

const onChange = (e) => {
  setInput({...input, [e.target.name]: e.target.value});
  validate(e);
}

const formSchema =  yup.object().shape({
  itemName: yup.string().required('We need an item name to add this to your menu.'),
  itemDescription: yup.string().required('Please provide us with a description of this item.'),
  itemPrice: yup.number().required('A price is required to add this item to your menu.')
})

const validate = (e) => {
  yup
    .reach(formSchema, e.target.name)
    .validate(e.target.value)
    .then((ifValid) => {
      setErrorState({ ...errorState, [e.target.name]: "" });
    })
    .catch((ifErr) => {
      setErrorState({ ...errorState, [e.target.name]: ifErr.errors[0] });
    });
};

useEffect(()=>{
  formSchema.isValid(input).then(valid => {
    setBtnState(!valid);
  })
}, [input]);

  return (
    <>
      <div>Add Menu Item</div>
      <form onSubmit={onSubmitFunc}>
        <label htmlFor="itemName">
          Item Name:
          <input
            type="text"
            name="itemName"
            id="itemName"
            value={input.itemName}
            onChange={onChange}
          />
        </label>
        <br/>
        <label htmlFor="itemDescription">
          Item Description:
          <input
            type="text"
            name="itemDescription"
            id="itemDescription"
            value={input.itemDescription}
            onChange={onChange}
          />
        </label>
        <br/>
        <label htmlFor="itemPrice">
          Item Price: $
          <input
            type="number"
            name="itemPrice"
            id="itemPrice"
            value={input.itemPrice}
            onChange={onChange}
          />
        </label>
        <br/>
        <button disabled={btnState}>Click to Submit Item</button>
      </form>
    </>
  );
}
