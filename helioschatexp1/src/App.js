import React, { Component } from "react";
import logo from "./logo.svg";
import Sidebar from "./component/sidebar";
import Header from "./component/header";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import  Onechat  from "./chats/oneChat";
import  TreeMap  from "./chats/TreeMap";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper d-flex">
          <Sidebar />
          <div id="page-content-wrapper">
            <Header />
            <Switch>
              <div className="container">
              <Route exact path="/" component={Onechat}/>
              <Route exact path="/tree" component={TreeMap}/>
              </div>
            </Switch>
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
