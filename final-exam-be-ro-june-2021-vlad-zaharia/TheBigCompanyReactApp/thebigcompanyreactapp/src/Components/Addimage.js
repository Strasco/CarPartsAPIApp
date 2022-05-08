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
      carpartID: "",
      url_reference: "",
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
            name="carpartID"
            className="input-item"
            type="text"
            placeholder="URL Reference"
            onChange={this.handleInputChange}
          ></input>
          <input
            name="url_reference"
            className="input-item"
            type="text"
            placeholder="carpartID"
            onChange={this.handleInputChange}
          ></input>
          <input
            type="submit"
            onClick={this.addImageButton}
            className="input-item"
          ></input>
        </div>
      </div>
    );
  }

  addImageButton = () => {
    axios
      .post(
        "/api/images",
        {
          carpartID: this.state.carpartID,
          url_reference: this.state.url_reference,
        },
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentDidMount = () => {
    const cookies = new Cookies();
    console.log(cookies.get("token"));
    const token = cookies.get("token");
    if (token !== undefined) {
      this.setState({ token: token });
    } else {
      this.setState({ redirect: true });
    }
  };
}
