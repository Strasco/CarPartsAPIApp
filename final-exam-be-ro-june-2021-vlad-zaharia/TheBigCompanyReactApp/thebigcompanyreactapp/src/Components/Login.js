import React, { Component } from "react";
import Navbar from "../Components/Navbar";
import "../App.css";
import axios from "axios";
import LoginForm from "./LoginForm";

export default class Login extends Component {
  render() {
    return (
      <>
        <div className="container">
          <Navbar />
          <LoginForm />
        </div>
      </>
    );
  }
}
