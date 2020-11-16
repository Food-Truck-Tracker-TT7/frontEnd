import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

export default function Login() {
  //manage state for the form inputs
  const [formState, setFormSate] = useState({
    username: "",
    password: "",
  });

  //submit state checks whether the form can be submited
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //inline validation on key/value pair at a time
  const validateChange = (event) => {};

  //onChange function
  const inputChange = (event) => {
    console.log(event.target.value);
    setFormSate(event.target.value);
  };

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
        <button type="submit" disabled={buttonDisabled}>
          Log In
        </button>
        <Link to="/signup">Not a member?</Link>
      </form>
    </div>
  );
}
