import "./App.css";
import React from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Main from "./Components/Main";
import NotLoggedIn from "./Components/NotLoggedIn";
import Addcarpart from "./Components/Addcarpart";
import Removecarpart from "./Components/Removecarpart";
import Addimage from "./Components/Addimage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/main" exact component={Main}></Route>
          <Route path="/notloggedin" exact component={NotLoggedIn}></Route>
          <Route path="/addcarpart" exact component={Addcarpart}></Route>
          <Route path="/removecarpart" exact component={Removecarpart}></Route>
          <Route path="/addimage" exact component={Addimage}></Route>
        </Switch>
      </Router>
    </>
  );
}
export default App;
