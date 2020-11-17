import React, {useState} from 'react';
import * as yup from 'yup';


export default function MenuItem() {
  const initialStateObj = { itemName: "", itemDescription: "", itemPrice: "" };
  const [ input, setInput] = useState(initialStateObj);
console.log(input);

const onChange = (e) => {
  setInput({...input, [e.target.name]: e.target.value});
}

const validate = e => {
  yup.reach().validate().then().catch()
}

  return (
    <>
      <div>Add Menu Item</div>
      <form action="">
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
      </form>
    </>
  );
}
