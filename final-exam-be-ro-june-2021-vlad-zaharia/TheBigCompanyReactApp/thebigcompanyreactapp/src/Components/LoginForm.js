import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      email: "",
      password: "",
    };
  }
  render() {
    if (this.state.redirect) {
      console.log("this is true");
      return <Redirect to="/main" />;
    }
    return (
      <div className="form-box">
        <h2 className="login-title">Login</h2>
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
          type="submit"
          onClick={this.loginButtonClick}
          className="input-item"
        ></input>
      </div>
    );
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentDidMount = () => {
    // axios.get("/api/carparts").then((response) => {
    //   console.log(response.data);
    // });
  };

  loginButtonClick = () => {
    axios
      .post("http://localhost:3000/api/auth/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response.data.token + "helllooo");
        const cookies = new Cookies();
        console.log(cookies.get("token") + "hereeee");
        if (cookies.get("token") === undefined) {
          console.log("incrementing users");
          axios.post("/api/auth/incusers");
        }
        cookies.set("token", response.data.token, { path: "/" });
        console.log(cookies.get("token"));
        this.setState({ redirect: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
