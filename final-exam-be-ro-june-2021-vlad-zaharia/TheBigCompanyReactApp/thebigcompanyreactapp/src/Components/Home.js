import React, { Component } from "react";
import Navbar from "./Navbar";

export default class home extends Component {
  render() {
    return (
      <>
        <div className="container">
          <Navbar></Navbar>
          <h1> Welcome to The Big Company electric car parts website</h1>
        </div>
      </>
    );
  }
}
