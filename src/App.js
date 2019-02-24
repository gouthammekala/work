import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as d3 from "d3";
import Circle from "./Circle";
import HeatMap from "./HeatMap/HeatMap";
import BarChat1 from "./BarChat1";
import BarChat2 from "./BarChat2";
import BarChat from './BarChat';
import Linear from './Linear';
import Linear1 from './Linear1';
import Tree from './Tree';
import Circle1 from './Circle1';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { map: "" };
  }

  loadMap = parm => {
    switch (parm) {
      case "circles":
        this.setState({ map: <Circle /> });
        return;
        case "HeatMap":
        this.setState({ map: <HeatMap /> });
        return;
        case "BarChat1":
        this.setState({ map: <BarChat1 /> });
        return;
        case "BarChat2":
        this.setState({ map: <BarChat2 /> });
        return;
        case "BarChat":
        this.setState({ map: <BarChat /> });
        return;
        case "Linear":
        this.setState({ map: <Linear /> });
        return;
        case "Linear1":
        this.setState({ map: <Linear1 /> });
        return;
        return;
        case "Tree":
        this.setState({ map: <Tree /> });
        return;
        case "Circle1":
        this.setState({ map: <Circle1 /> });
        return;
      default:
      this.setState({ map: <Circle /> });
    }
  };

  render() {
    // this.loadMap('circles');
    return (
      <div className="App">
        <div className="links">
          <a href="#" className="alink" onClick={() => this.loadMap("circles")}>
            Map1
          </a>
          <a href="#" className="alink" onClick={() => this.loadMap("HeatMap")}>
            Map2
          </a>
          <a href="#" className="alink" onClick={() => this.loadMap("BarChat1")}>
            Map3
          </a>
          <a href="#" className="alink" onClick={() => this.loadMap("BarChat2")}>
            Map4
          </a>
          <a href="#" className="alink" onClick={() => this.loadMap("BarChat")}>
            Map5
          </a>
          <a href="#" className="alink" onClick={() => this.loadMap("Linear")}>
            Map6
          </a>
          <a href="#" className="alink" onClick={() => this.loadMap("Linear1")}>
            Map7
          </a>
          <a href="#" className="alink" onClick={() => this.loadMap("Tree")}>
            Map8
          </a>
          <a href="#" className="alink" onClick={() => this.loadMap("Circle1")}>
            Map9
          </a>
        </div>

        {this.state.map}
      </div>
    );
  }
}

export default App;
