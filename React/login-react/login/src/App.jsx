import React from "react";
import { Login } from "./components/login/login";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <h1>Welcome to the Login Page</h1>
      <Link className="login-btn" to="/login">
        Login
      </Link>
    </div>
  );
}

export default App;
