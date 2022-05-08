import React, { Component } from "react";
import Navbar from "./Navbar";

export default class NotLoggedIn extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <h1>You are not logged in</h1>
      </div>
    );
  }
}
