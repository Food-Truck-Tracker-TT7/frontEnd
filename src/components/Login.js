import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

export default function Login() {
  //manage state for the form inputs
  const [formState, setFormSate] = useState({
    username: "",
    password: "",
    // accountType: "",
  });

  //submit state checks whether the form can be submited
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //inline validation on key/value pair at a time
  const validateChange = (event) => {};

  //onChange function
  const inputChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);

    const newFormState = {
      ...formState,
      [event.target.name]: event.target.value,
    };
    setFormSate(newFormState);
  };

  //form schema set of rules
  //object is coming from yup library
  //shape function takes in an object {}
  const formSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    // accountType: yup.string().oneOf(["diner", "operator"]),
  });

  useEffect(() => {
    //isValid comes from the yup library
    //checking formSchema against formState
    //comparing the keys and the values
    //returns a promise
    formSchema.isValid(formState).then((valid) => {
      //we can check the process has been completed
      setButtonDisabled(!valid);
    });
  }, [formState]);
  //do something every time formState changes

  //onSubmit function
  const formSubmit = (event) => {};

  return (
    <div>
      <p>Log In</p>
      <form onSubmit={formSubmit}>
        <label htmlFor="username">
          Username
          <input
            id="username"
            type="text"
            name="username"
            value={formState.username}
            placeholder="USERNAME"
            onChange={inputChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            value={formState.password}
            placeholder="PASSWORD"
            onChange={inputChange}
          />
        </label>
        {/* not sure if log in page needs to a section for either diner or operator */}
        {/* <label htmlFor="accountType">
          Diner or Operator
          <select
            name="accountType"
            id="accountType"
            value={formState.accountType}
            onChange={inputChange}
          >
            <option value="">Select</option>
            <option value="diner">Diner</option>
            <option value="operator">Operator</option>
          </select>
        </label> */}
        <button type="submit" disabled={buttonDisabled}>
          Log In
        </button>
        <Link to="/signup">Not a member?</Link>
        <Link to="/">Home Page</Link>
      </form>
    </div>
  );
}
