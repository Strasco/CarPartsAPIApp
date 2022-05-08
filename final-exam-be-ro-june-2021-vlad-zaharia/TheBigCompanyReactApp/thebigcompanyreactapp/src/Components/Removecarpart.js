import React, { Component } from "react";
import Navbar from "./Navbar";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class Addcarpart extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      carid: "",
      token: "",
      removalMessage: "",
    };
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/notloggedin" />;
    }
    return (
      <div className="container">
        <Navbar />
        <div className="form-box">
          <h2 className="login-title">Add car part</h2>
          <input
            name="carid"
            className="input-item"
            type="text"
            placeholder="car part ID"
            onChange={this.handleInputChange}
          ></input>

          <input
            type="submit"
            onClick={this.removeCarPartButton}
            className="input-item"
          ></input>
          <h2>{this.state.removalMessage}</h2>
        </div>
      </div>
    );
  }

  removeCarPartButton = () => {
    axios
      .delete(`/api/carparts/${this.state.carid}`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        this.setState({ removalMessage: "Car part has been removed!" });
        this.msgTimeout();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      removalMessage: "",
    });
  };

  componentDidMount = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (token !== undefined) {
      this.setState({ token: token });
    } else {
      this.setState({ redirect: true });
    }
  };
}
