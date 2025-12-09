import React, { useState } from "react";
import "./login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    console.log("Login");
  };

  return (
    <div className="inner-container">
      <div className="left-side">
        <img
          src={"src/assets/backgroundImage.jpg"}
          alt="logo"
          className="left-background-image"
        />
      </div>
      <div className="right-side">
        <form className="login-form">
          <h1>Login</h1>
          <input
            onChange={handleEmailChange}
            value={email}
            type="email"
            placeholder="Enter Email"
            required
            className="input"
          />
          <input
            onChange={handlePasswordChange}
            value={password}
            type="password"
            placeholder="Enter Password"
            className="input"
            required
          />
          <button type="submit" className="login-button" onClick={handleLogin}>
            Login
          </button>
          {/* <p>
            Don't have an account? <a href="#">Register</a>
          </p>
          <p>
            Forgot password? <a href="#">Reset password</a>
          </p> */}
        </form>
      </div>
    </div>
  );
};
