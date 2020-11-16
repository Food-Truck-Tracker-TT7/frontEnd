import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <p>Log In</p>
      <form>
        <label htmlFor="email">
          Email
          <input id="email" type="email" />
        </label>
        <label htmlFor="password">
          Password
          <input id="password" type="password" />
        </label>
        <button>Log In</button>
        <Link to="/signup">Not a member?</Link>
      </form>
    </div>
  );
}
