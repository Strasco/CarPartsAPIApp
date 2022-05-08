import React, { Component } from "react";
import Navbar from "./Navbar";
import Cookies from "universal-cookie";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      loggedInMessage: "You are NOT logged in",
      token: "",
      usersList: [],
      carparts: [],
      redirect: false,
      carpartCategory: "",
      loggedUsers: 0,
    };
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/notloggedin" />;
    }
    return (
      <div className="container">
        <Navbar />
        <div>
          <h1>{this.state.loggedInMessage}</h1>
          <h2>Logged in users: {this.state.loggedUsers}</h2>
          <h2>List of all users</h2>
          <div className="usersContainer">
            <ul>{this.state.usersList}</ul>
          </div>
          <h2>List of car parts</h2>
          <h3>Filter by category</h3>
          <input type="text" onChange={this.handleInputChange}></input>
          <button onClick={this.fetchCarpartsWithCategory}>
            Get by category
          </button>
          <br /> <br />
          <div className="usersContainer">{this.state.carparts}</div>
        </div>
      </div>
    );
  }

  handleInputChange = (event) => {
    this.setState({
      carpartCategory: event.target.value,
    });
  };

  componentDidMount = async () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (token !== undefined) {
      try {
        await axios.get("/api/auth/loggedusers").then((response) => {
          console.log(response.data.counter);
          this.setState({ loggedUsers: response.data.counter });
        });
      } catch (err) {
        console.log(err);
      }

      console.log("got here");
      this.setState({ loggedInMessage: "You are logged in! :)", token: token });

      //show list of users----------------------------------------------
      this.fetchUsers(token);
      //show list of car parts----------------------------------------------
      this.fetchCarparts(token);
    } else {
      this.setState({ redirect: true });
    }
  };
  fetchCarpartsWithCategory = async () => {
    await axios
      .get(`/api/carparts?category=${this.state.carpartCategory}`, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        var mycarparts = [];
        const dbcarparts = response.data.data;
        dbcarparts.forEach((carpart) => {
          mycarparts.push(
            <li>
              Category: {carpart.category}, Description:
              {carpart.description}, Name: {carpart.name}, Image:{" "}
              <a href={carpart.image} target="_blank">
                {carpart.image_text} click here
              </a>
            </li>
          );
        });
        this.setState({ carparts: mycarparts });
      });
  };
  fetchCarparts = async (token) => {
    await axios
      .get(`/api/carparts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        var mycarparts = [];
        const dbcarparts = response.data.data;
        dbcarparts.forEach((carpart) => {
          mycarparts.push(
            <li>
              Category: {carpart.category}, Description:
              {carpart.description}, Name: {carpart.name}, Image:{" "}
              <a href={carpart.image} target="_blank">
                {carpart.image_text} click here
              </a>
            </li>
          );
        });
        this.setState({ carparts: mycarparts });
      });
  };
  fetchUsers = async (token) => {
    await axios
      .get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        var usersList = [];
        const users = response.data.data;
        users.forEach((user) => {
          usersList.push(
            <li>
              Email: {user.email}, Name: {user.name}
            </li>
          );
        });
        this.setState({ usersList: usersList });
      });
  };
}
