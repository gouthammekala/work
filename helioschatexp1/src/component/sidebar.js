import React, { Component } from 'react';
import './sidebar.css';
import {  Link } from "react-router-dom";
class Sidebar extends Component {
  render() {
    return (
        <div className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">Helios Chat Examples</div>
        <div className="list-group list-group-flush">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/tree">Tree Map</Link>
          </li>
        </ul>

        </div>
      </div>
    );
  }
}

export default Sidebar;