import React, { Component } from "react";
import Navbar from "../Components/Navbar";
import RegisterForm from "../Components/RegisterForm";

export default class Register extends Component {
  render() {
    return (
      <>
        <div className="container">
          <Navbar />
          <RegisterForm />
        </div>
      </>
    );
  }
}
