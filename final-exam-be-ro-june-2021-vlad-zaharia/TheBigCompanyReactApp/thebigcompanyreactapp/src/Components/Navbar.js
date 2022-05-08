import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "../App.css";
import axios from "axios";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Link to="/">
          <button className="navbar-button">Home</button>
        </Link>
        <Link to="/main">
          <button className="navbar-button">Main</button>
        </Link>
        <Link to="/addcarpart">
          <button className="navbar-button navbar-button-middle">
            Add Car Part
          </button>
        </Link>
        <Link to="/removecarpart">
          <button className="navbar-button navbar-button-middle">
            Remove Car Part
          </button>
        </Link>
        <Link to="/addimage">
          <button className="navbar-button navbar-button-middle">
            Add Image
          </button>
        </Link>
        <Link to="/login">
          <button className="navbar-button navbar-button-right">Login</button>
        </Link>
        <Link to="/register">
          <button className="navbar-button navbar-button-right">
            Register
          </button>
        </Link>
        <Link to="/">
          <button
            onClick={this.logoutFunctionality}
            className="navbar-button navbar-button-right"
          >
            Logout
          </button>
        </Link>
      </div>
    );
  }

  logoutFunctionality = () => {
    const cookies = new Cookies();
    if (cookies.get("token") !== undefined) {
      console.log("decrementing users");
      axios.post("http://localhost:3000/api/auth/decusers");
      cookies.remove("token");
    }
  };
}
