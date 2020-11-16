//* populate informative error message
//* set up yup validation and type to submitBTN

import React, {useState} from 'react';
import * as yup from 'yup';

export default function Signup() {
  const initialState = { username: '', password: '', email: '', usertype: ''};
  const [signupInput, setSignupInput] = useState(initialState);
  const [validationError, setValidationError] = useState(initialState);
  console.log(validationError);
  const [submitBtn, setSubmitBtn] = useState(false);
  console.log(signupInput);

  const onChangeFunc = (e) => {
    const typeOfValue = e.target.type === 'radio' ? e.target.id : e.target.value
    setSignupInput({ ...signupInput, [e.target.name]: typeOfValue });
    validate(e);
  };
  
  const onSubmitFunc = (e) => {
    e.preventDefault();
    setSignupInput(initialState);
  }

  const validate = (e) => {
    const typeOfValue = e.target.type === 'radio' ? e.target.checked : e.target.value //!I think this is e.target.checked for truthy
    yup
      .reach(formSchema, e.target.name) //reach into the formSchema object template and look for the e.target.name
      .validate(typeOfValue) //...and validate typeOfValue against fomrSchema
      .then( ifValid => {
        setValidationError({...validationError, [e.target.name]: ''
      })
      })
      .catch( ifErr => {
        setValidationError({
          ...validationError, [e.target.name]: ifErr.errors[0]
        })
      })

  }

  //*Yup validation
  const formSchema = yup.object().shape({
    username: yup.string().required('This is not some fly by night app. All who wish to pass must supply a username'),
    password: yup.string().required('We promise to keep your password a secret, but you do need to supply one'),
    email: yup.string().email('Not so fast trickster! I know an email when I see one and this ain\'t it. Try again hot shot!').required('Who doesn\'t have an email address?'),
    usertype: yup.boolean().oneOf([true]).required('You will NEVER see this message! Mwah hahaha!') //!This might be buggy one of the group of radio buttons needs to be true.
  });

  return (
    <>
      <div>Signup Page</div>
      <form onSubmit={onSubmitFunc}>
        <label htmlFor="usertype"> Diner
          <input type="radio" name='usertype' id='diner' value='diner' checked={signupInput.usertype === 'diner' ? true : false} onChange={onChangeFunc}/>
        </label> {}
        <label htmlFor="usertype"> Operator
          <input type="radio" name='usertype' id='operator' value='operator' checked={signupInput.usertype === 'operator' ? true : false} onChange={onChangeFunc}/>
        </label>
        <br />
        <label htmlFor="username">
          {"Username"}
          <input
            type="text"
            id="username"
            name="username"
            value={signupInput.username}
            onChange={onChangeFunc}
          /> {validationError.username}
        </label>
        <br />
        <label htmlFor="password">
          {"Password"}
          <input
            type="text"
            id="password"
            name="password"
            value={signupInput.password}
            onChange={onChangeFunc}
          /> {validationError.password}
        </label>
        <br />
        <label htmlFor="email">
          {"Email"}
          <input
            type="email"
            id="email"
            name="email"
            value={signupInput.email}
            onChange={onChangeFunc}
          />{validationError.email}
        </label>
        <br/>
        <button disabled={submitBtn}>Submit</button>
      </form>
    </>
  );
}