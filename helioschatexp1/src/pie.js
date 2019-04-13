import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import PieClass from "./PieClass";
//import PieHooks from "./PieHooks";
//import PieSVG from "./PieSVG";
//import AnimatedPieHooks from "./AnimatedPieHooks";
//import AnimatedPieSVG from "./AnimatedPieSVG";

//import "./styles.css";

const generateData = (value, length = 5) => {
  return d3.range(length).map((item, index) => ({
    date: index,
    value: value === null || value === undefined ? Math.random() * 100 : value
  }));
};
class Pie extends Component {
  constructor(props) {
    super(props);
    this.changeData = this.changeData.bind(this);
    this.state = { data: [] };
  }

  changeData = () => {
    this.setState({data:generateData()});
  };

  componentDidMount() {
    this.setState({data:generateData()});
    console.log(generateData());
  }

  render() {
    return (
      <div className="App">
        <div>
          <button onClick={this.changeData}>Transform</button>
        </div>

        {/*
          <span className="label">Animated Pie SVG (React Spring)</span>
          <AnimatedPieSVG
            data={data}
            width={200}
            height={200}
            innerRadius={60}
            outerRadius={100}
          />
        </div>
        <div>
          <span className="label">Animated Pie Hooks (D3 animations)</span>
          <AnimatedPieHooks
            data={data}
            width={200}
            height={200}
            innerRadius={60}
            outerRadius={100}
          />
        </div>
        <div>
          <span className="label">SVG Elements</span>
          <PieSVG
            data={data}
            width={200}
            height={200}
            innerRadius={60}
            outerRadius={100}
          />
        </div>
        <div>
          <span className="label">Hooks</span>
          <PieHooks
            data={data}
            width={200}
            height={200}
            innerRadius={60}
            outerRadius={100}
          />
        </div>
        */}
        <div>
          <span className="label">React Class</span>
          <PieClass
            data={this.state.data}
            width={200}
            height={200}
            innerRadius={60}
            outerRadius={100}
          />
        </div>
      </div>
    );
  }
};
export default Pie;
