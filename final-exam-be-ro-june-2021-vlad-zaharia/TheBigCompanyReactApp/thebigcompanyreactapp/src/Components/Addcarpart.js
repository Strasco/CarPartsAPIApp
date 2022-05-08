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
      name: "",
      description: "",
      image: "",
      imageText: "",
      category: "",
      token: "",
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
            name="name"
            className="input-item"
            type="text"
            placeholder="name"
            onChange={this.handleInputChange}
          ></input>
          <input
            name="category"
            className="input-item"
            type="text"
            placeholder="category"
            onChange={this.handleInputChange}
          ></input>
          <input
            name="description"
            className="input-item"
            type="text"
            placeholder="description"
            onChange={this.handleInputChange}
          ></input>
          <input
            name="image"
            className="input-item"
            type="text"
            placeholder="image URL"
            onChange={this.handleInputChange}
          ></input>
          <input
            name="imageText"
            className="input-item"
            type="text"
            placeholder="image text"
            onChange={this.handleInputChange}
          ></input>
          <input
            type="submit"
            onClick={this.addCarpartButtonClick}
            className="input-item"
          ></input>
        </div>
      </div>
    );
  }

  addCarpartButtonClick = () => {
    axios
      .post(
        "/api/carparts",
        {
          name: this.state.name,
          description: this.state.description,
          category: this.state.category,
          image: this.state.image,
          imageText: this.state.imageText,
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
    console.log(event.target.value);
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
