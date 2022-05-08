import React, { Component } from "react";
import "../App.css";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      name: "",
      email: "",
      password: "",
      addedMessage: "",
    };
  }
  render() {
    return (
      <div className="form-box">
        <h2 className="login-title">Register</h2>
        <input
          name="name"
          className="input-item"
          type="text"
          placeholder="Name"
          onChange={this.handleInputChange}
        ></input>
        <input
          name="email"
          className="input-item"
          type="text"
          placeholder="Email"
          onChange={this.handleInputChange}
        ></input>
        <input
          name="password"
          className="input-item"
          type="text"
          placeholder="Password"
          onChange={this.handleInputChange}
        ></input>
        <input
          onClick={this.registerButtonClick}
          className="input-item"
          type="submit"
        ></input>
        <h3>{this.state.addedMessage}</h3>
      </div>
    );
  }

  handleInputChange = (event) => {
    this.setState({ addedMessage: "" });
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentDidMount = () => {
    // axios.get("/api/carparts").then((response) => {
    //   console.log(response.data);
    // });
  };

  registerButtonClick = () => {
    axios
      .post("http://localhost:3000/api/auth/register", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        console.log("Hello" + response);
        console.log(response.data.token + "helllooo");
        this.setState({ addedMessage: "Done!" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
