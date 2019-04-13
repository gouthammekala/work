import React, { Component } from "react";
import logo from "./logo.svg";
import Sidebar from "./component/sidebar";
import Header from "./component/header";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import  Onechat  from "./chats/oneChat";
import  TreeMap  from "./chats/TreeMap";
import  CalenderView  from "./chats/CalenderView";
import datagridV from './datagridV';
import Pie from './pie';

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
              <Route exact path="/calenderview" component={CalenderView}/>
              <Route exact path="/datagrid" component={datagridV}/>
              <Route exact path="/pie" component={Pie}/>
              
              
              </div>
            </Switch>
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
